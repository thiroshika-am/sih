import { useState, useEffect } from 'react';
import { wsService } from '../services/websocket';
import { UserSearch, MapPin, Compass, Clock, ScanFace, Target, Activity } from 'lucide-react';

export const PersonIntelligence = () => {
  const [person, setPerson] = useState<any>(null);

  useEffect(() => {
    // We'll hook into detection and risk_update to populate a mock person profile
    const unsubDet = wsService.subscribe('detection', (data) => {
      setPerson((prev: any) => ({
        id: `P-${data.person_id.split('-')[1] || data.person_id}`,
        camera: data.camera_id,
        zone: data.zone,
        confidence: data.confidence || 0.96,
        trackingConf: 0.93,
        status: 'UNKNOWN',
        risk: prev?.risk || 45,
        direction: 'NORTH-EAST',
        firstDetected: new Date(Date.now() - 5 * 60000).toLocaleTimeString(),
        lastDetected: new Date().toLocaleTimeString(),
        sightings: (prev?.sightings || 0) + 1,
        timeline: [
          ...((prev?.timeline || []).slice(-4)),
          { time: new Date().toLocaleTimeString(), event: `Detected at ${data.zone}` }
        ]
      }));
    });

    const unsubRisk = wsService.subscribe('risk_update', (data) => {
      setPerson((prev: any) => prev ? { ...prev, risk: data.risk_score } : prev);
    });

    return () => {
      unsubDet();
      unsubRisk();
    };
  }, []);

  return (
    <div className="flex flex-col h-full p-4 gap-4 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-4 rounded-lg shrink-0 shadow-lg shadow-black/20">
        <div className="p-2 bg-blue-500/10 rounded-md border border-blue-500/30">
          <UserSearch className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-100 tracking-wide">Person Intelligence</h1>
          <p className="text-xs text-slate-400 font-mono tracking-widest uppercase">Target Profiling & Tracking History</p>
        </div>
      </div>

      {!person ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-slate-900 border border-slate-800 border-dashed rounded-lg text-slate-500">
           <UserSearch className="w-16 h-16 mb-4 opacity-50" />
           <p className="font-mono tracking-widest uppercase">Waiting for active tracks...</p>
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
          {/* Left Col - Identity & Core Stats */}
          <div className="col-span-4 flex flex-col gap-4 overflow-y-auto">
             <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 shadow-lg flex flex-col items-center relative overflow-hidden">
                <div className="absolute top-0 w-full h-1 bg-blue-500"></div>
                <div className="w-32 h-32 border-2 border-blue-500/50 rounded-lg mb-4 flex items-center justify-center bg-slate-950 relative">
                   <ScanFace className="w-16 h-16 text-blue-400/50" />
                   <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuNSIvPgo8L3N2Zz4=')] opacity-50 mix-blend-overlay"></div>
                   <div className="absolute bottom-2 right-2 text-[10px] bg-blue-500 text-white px-1 font-mono font-bold rounded">LIVE</div>
                </div>
                <h2 className="text-2xl font-black font-mono tracking-wider text-slate-100 mb-1">{person.id}</h2>
                <div className="bg-amber-500/20 text-amber-400 border border-amber-500/50 px-3 py-1 rounded text-xs font-bold tracking-widest mb-6">
                  IDENTITY: {person.status}
                </div>

                <div className="w-full space-y-3">
                   <div className="flex justify-between items-center bg-slate-950 p-2 rounded border border-slate-800">
                     <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase flex items-center gap-1"><MapPin className="w-3 h-3"/> Current Zone</span>
                     <span className="text-xs font-mono font-bold text-slate-200">{person.zone}</span>
                   </div>
                   <div className="flex justify-between items-center bg-slate-950 p-2 rounded border border-slate-800">
                     <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase flex items-center gap-1"><Compass className="w-3 h-3"/> Direction</span>
                     <span className="text-xs font-mono font-bold text-slate-200">{person.direction}</span>
                   </div>
                   <div className="flex justify-between items-center bg-slate-950 p-2 rounded border border-slate-800">
                     <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase flex items-center gap-1"><Target className="w-3 h-3"/> Detection Conf</span>
                     <span className="text-xs font-mono font-bold text-emerald-400">{(person.confidence * 100).toFixed(1)}%</span>
                   </div>
                   <div className="flex justify-between items-center bg-slate-950 p-2 rounded border border-slate-800">
                     <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase flex items-center gap-1"><Activity className="w-3 h-3"/> Tracking Conf</span>
                     <span className="text-xs font-mono font-bold text-emerald-400">{(person.trackingConf * 100).toFixed(1)}%</span>
                   </div>
                </div>

                <div className="w-full mt-6 text-left">
                   <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-1 mb-3">Identity Verification</h3>
                   <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                         <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">✓</div>
                         Step 1: Person detected
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                         <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">✓</div>
                         Step 2: Feature extraction
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                         <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">✓</div>
                         Step 3: Reference comparison
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                         <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">✓</div>
                         Step 4: Confidence calculated
                      </div>
                   </div>
                   
                   <div className="bg-slate-950 border border-slate-800 p-3 rounded text-center">
                     <div className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mb-1">Resulting Match</div>
                     <div className="text-sm font-black tracking-widest text-amber-500">{person.status}</div>
                     <div className="text-[10px] text-slate-400 font-mono mt-1">Confidence: 34.7%</div>
                     <div className="text-[8px] text-slate-600 font-mono mt-2 uppercase">* Note: Using simulated data</div>
                   </div>
                </div>
             </div>
          </div>

          {/* Right Col - Risk & Timeline */}
          <div className="col-span-8 flex flex-col gap-4 overflow-y-auto">
             <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 shadow-lg">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4">Risk Assessment</h3>
                <div className="flex items-center gap-8">
                   <div className="relative w-32 h-32 flex items-center justify-center">
                     <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                       <path className="text-slate-800" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                       <path className={`${person.risk >= 80 ? 'text-red-500' : person.risk >= 50 ? 'text-amber-500' : 'text-emerald-500'} transition-all duration-1000`} strokeDasharray={`${person.risk}, 100`} strokeWidth="4" stroke="currentColor" fill="none" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                     </svg>
                     <div className="absolute flex flex-col items-center">
                       <span className={`text-3xl font-black font-mono ${person.risk >= 80 ? 'text-red-400' : person.risk >= 50 ? 'text-amber-400' : 'text-emerald-400'}`}>{person.risk}</span>
                     </div>
                   </div>
                   
                   <div className="flex-1 space-y-4">
                      <div>
                         <div className="flex justify-between text-xs font-mono text-slate-400 mb-1"><span>Identity Risk</span> <span>+15</span></div>
                         <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800"><div className="bg-amber-500 h-full w-[15%]"></div></div>
                      </div>
                      <div>
                         <div className="flex justify-between text-xs font-mono text-slate-400 mb-1"><span>Zone Risk</span> <span>+{(person.risk * 0.4).toFixed(0)}</span></div>
                         <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800"><div className="bg-red-500 h-full" style={{width: `${person.risk * 0.4}%`}}></div></div>
                      </div>
                      <div>
                         <div className="flex justify-between text-xs font-mono text-slate-400 mb-1"><span>Movement Anomaly</span> <span>+{(person.risk * 0.3).toFixed(0)}</span></div>
                         <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800"><div className="bg-blue-500 h-full" style={{width: `${person.risk * 0.3}%`}}></div></div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 shadow-lg flex-1">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4">Tracking Timeline</h3>
                
                <div className="relative border-l border-slate-700 ml-3 space-y-6 mt-4">
                  {(person.timeline || []).map((t: any, i: number) => (
                    <div key={i} className="relative pl-6">
                      <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[6.5px] top-1 shadow-[0_0_8px_rgba(59,130,246,0.8)] border-2 border-slate-900"></div>
                      <div className="text-[10px] text-blue-400 font-mono font-bold mb-1 flex items-center gap-1"><Clock className="w-3 h-3" /> {t.time}</div>
                      <div className="text-sm text-slate-200">{t.event}</div>
                    </div>
                  ))}
                  <div className="relative pl-6 opacity-50">
                    <div className="absolute w-3 h-3 bg-slate-600 rounded-full -left-[6.5px] top-1 border-2 border-slate-900"></div>
                    <div className="text-[10px] text-slate-400 font-mono font-bold mb-1">{person.firstDetected}</div>
                    <div className="text-sm text-slate-400">Target First Acquired</div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
