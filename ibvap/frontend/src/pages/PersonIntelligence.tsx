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
      <div className="flex items-center gap-3 bg-military-panel border border-military-green/30 p-4 rounded-lg shrink-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.4)]">
        <div className="p-2 bg-military-green/10 rounded-md border border-military-green/30">
          <UserSearch className="w-6 h-6 text-military-green" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-military-text tracking-wide">Person Intelligence</h1>
          <p className="text-[10px] text-military-muted font-mono tracking-widest uppercase">Target Profiling & Tracking History</p>
        </div>
      </div>

      {!person ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-military-panel border border-military-green/30 border-dashed rounded-lg text-military-muted">
           <UserSearch className="w-16 h-16 mb-4 opacity-50" />
           <p className="font-mono text-[10px] tracking-widest font-bold uppercase">Waiting for active tracks...</p>
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
          {/* Left Col - Identity & Core Stats */}
          <div className="col-span-4 flex flex-col gap-4 overflow-y-auto">
             <div className="bg-military-panel border border-military-green/30 rounded-lg p-5 shadow-[inset_0_0_15px_rgba(0,0,0,0.4)] flex flex-col items-center relative overflow-hidden">
                <div className="absolute top-0 w-full h-1 bg-military-green"></div>
                <div className="w-32 h-32 border-2 border-military-green/50 rounded-lg mb-4 flex items-center justify-center bg-military-bg relative">
                   <ScanFace className="w-16 h-16 text-military-green/50" />
                   <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9IjAuNSIvPgo8L3N2Zz4=')] opacity-50 mix-blend-overlay"></div>
                   <div className="absolute bottom-2 right-2 text-[10px] bg-military-green text-military-bg px-1 font-mono font-bold rounded">LIVE</div>
                </div>
                <h2 className="text-2xl font-black font-mono tracking-wider text-military-text mb-1">{person.id}</h2>
                <div className="bg-military-warning/20 text-military-warning border border-military-warning/50 px-3 py-1 rounded text-[10px] font-mono font-bold tracking-widest mb-6">
                  IDENTITY: {person.status}
                </div>

                <div className="w-full space-y-3">
                   <div className="flex justify-between items-center bg-military-bg p-2 rounded border border-military-green/30">
                     <span className="text-[10px] text-military-muted font-bold tracking-widest uppercase flex items-center gap-1 font-mono"><MapPin className="w-3 h-3"/> Current Zone</span>
                     <span className="text-xs font-mono font-bold text-military-text">{person.zone}</span>
                   </div>
                   <div className="flex justify-between items-center bg-military-bg p-2 rounded border border-military-green/30">
                     <span className="text-[10px] text-military-muted font-bold tracking-widest uppercase flex items-center gap-1 font-mono"><Compass className="w-3 h-3"/> Direction</span>
                     <span className="text-xs font-mono font-bold text-military-text">{person.direction}</span>
                   </div>
                   <div className="flex justify-between items-center bg-military-bg p-2 rounded border border-military-green/30">
                     <span className="text-[10px] text-military-muted font-bold tracking-widest uppercase flex items-center gap-1 font-mono"><Target className="w-3 h-3"/> Detection Conf</span>
                     <span className="text-xs font-mono font-bold text-military-success">{(person.confidence * 100).toFixed(1)}%</span>
                   </div>
                   <div className="flex justify-between items-center bg-military-bg p-2 rounded border border-military-green/30">
                     <span className="text-[10px] text-military-muted font-bold tracking-widest uppercase flex items-center gap-1 font-mono"><Activity className="w-3 h-3"/> Tracking Conf</span>
                     <span className="text-xs font-mono font-bold text-military-success">{(person.trackingConf * 100).toFixed(1)}%</span>
                   </div>
                </div>

                <div className="w-full mt-6 text-left">
                   <h3 className="text-[10px] font-bold font-mono text-military-muted uppercase tracking-widest border-b border-military-green/30 pb-1 mb-3">Identity Verification</h3>
                   <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-[10px] tracking-widest font-mono text-military-success">
                         <div className="w-4 h-4 rounded-full bg-military-success/20 border border-military-success/50 flex items-center justify-center">✓</div>
                         Step 1: Person detected
                      </div>
                      <div className="flex items-center gap-2 text-[10px] tracking-widest font-mono text-military-success">
                         <div className="w-4 h-4 rounded-full bg-military-success/20 border border-military-success/50 flex items-center justify-center">✓</div>
                         Step 2: Feature extraction
                      </div>
                      <div className="flex items-center gap-2 text-[10px] tracking-widest font-mono text-military-success">
                         <div className="w-4 h-4 rounded-full bg-military-success/20 border border-military-success/50 flex items-center justify-center">✓</div>
                         Step 3: Reference comparison
                      </div>
                      <div className="flex items-center gap-2 text-[10px] tracking-widest font-mono text-military-success">
                         <div className="w-4 h-4 rounded-full bg-military-success/20 border border-military-success/50 flex items-center justify-center">✓</div>
                         Step 4: Confidence calculated
                      </div>
                   </div>
                   
                   <div className="bg-military-bg border border-military-green/30 p-3 rounded text-center">
                     <div className="text-[10px] text-military-muted font-bold tracking-widest uppercase font-mono mb-1">Resulting Match</div>
                     <div className="text-sm font-black font-mono tracking-widest text-military-warning">{person.status}</div>
                     <div className="text-[10px] text-military-muted font-mono mt-1">Confidence: 34.7%</div>
                     <div className="text-[8px] text-military-green/50 font-mono mt-2 uppercase">* Note: Using simulated data</div>
                   </div>
                </div>
             </div>
          </div>

          {/* Right Col - Risk & Timeline */}
          <div className="col-span-8 flex flex-col gap-4 overflow-y-auto">
             <div className="bg-military-panel border border-military-green/30 rounded-lg p-5 shadow-[inset_0_0_15px_rgba(0,0,0,0.4)]">
                <h3 className="text-[10px] font-bold text-military-muted font-mono uppercase tracking-widest border-b border-military-green/30 pb-2 mb-4">Risk Assessment</h3>
                <div className="flex items-center gap-8">
                   <div className="relative w-32 h-32 flex items-center justify-center">
                     <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                       <path className="text-military-green/20" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                       <path className={`${person.risk >= 80 ? 'text-military-critical' : person.risk >= 50 ? 'text-military-warning' : 'text-military-success'} transition-all duration-1000`} strokeDasharray={`${person.risk}, 100`} strokeWidth="4" stroke="currentColor" fill="none" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                     </svg>
                     <div className="absolute flex flex-col items-center">
                       <span className={`text-3xl font-black font-mono ${person.risk >= 80 ? 'text-military-critical' : person.risk >= 50 ? 'text-military-warning' : 'text-military-success'}`}>{person.risk}</span>
                     </div>
                   </div>
                   
                   <div className="flex-1 space-y-4">
                      <div>
                         <div className="flex justify-between text-[10px] tracking-widest font-mono text-military-muted mb-1"><span>Identity Risk</span> <span>+15</span></div>
                         <div className="w-full bg-military-bg h-2 rounded-full overflow-hidden border border-military-green/30"><div className="bg-military-warning h-full w-[15%]"></div></div>
                      </div>
                      <div>
                         <div className="flex justify-between text-[10px] tracking-widest font-mono text-military-muted mb-1"><span>Zone Risk</span> <span>+{(person.risk * 0.4).toFixed(0)}</span></div>
                         <div className="w-full bg-military-bg h-2 rounded-full overflow-hidden border border-military-green/30"><div className="bg-military-critical h-full" style={{width: `${person.risk * 0.4}%`}}></div></div>
                      </div>
                      <div>
                         <div className="flex justify-between text-[10px] tracking-widest font-mono text-military-muted mb-1"><span>Movement Anomaly</span> <span>+{(person.risk * 0.3).toFixed(0)}</span></div>
                         <div className="w-full bg-military-bg h-2 rounded-full overflow-hidden border border-military-green/30"><div className="bg-military-green h-full" style={{width: `${person.risk * 0.3}%`}}></div></div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="bg-military-panel border border-military-green/30 rounded-lg p-5 shadow-[inset_0_0_15px_rgba(0,0,0,0.4)] flex-1">
                <h3 className="text-[10px] font-bold text-military-muted font-mono uppercase tracking-widest border-b border-military-green/30 pb-2 mb-4">Tracking Timeline</h3>
                
                <div className="relative border-l border-military-green/30 ml-3 space-y-6 mt-4">
                  {(person.timeline || []).map((t: any, i: number) => (
                    <div key={i} className="relative pl-6">
                      <div className="absolute w-3 h-3 bg-military-green rounded-full -left-[6.5px] top-1 shadow-[0_0_8px_rgba(85,107,47,0.8)] border-2 border-military-panel"></div>
                      <div className="text-[10px] text-military-green font-mono font-bold mb-1 flex items-center gap-1"><Clock className="w-3 h-3" /> {t.time}</div>
                      <div className="text-[10px] font-mono tracking-widest text-military-text">{t.event}</div>
                    </div>
                  ))}
                  <div className="relative pl-6 opacity-50">
                    <div className="absolute w-3 h-3 bg-military-muted rounded-full -left-[6.5px] top-1 border-2 border-military-panel"></div>
                    <div className="text-[10px] text-military-muted font-mono font-bold mb-1">{person.firstDetected}</div>
                    <div className="text-[10px] font-mono tracking-widest text-military-muted">Target First Acquired</div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
