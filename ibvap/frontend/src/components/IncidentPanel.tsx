import { useEffect, useState } from 'react';
import { wsService } from '../services/websocket';
import { ShieldAlert, Crosshair, MapPin, Activity } from 'lucide-react';

export const IncidentPanel = () => {
  const [incident, setIncident] = useState<any>(null);

  useEffect(() => {
    const unsubRisk = wsService.subscribe('risk_update', (data) => {
      setIncident((prev: any) => ({
        ...prev,
        id: data.incident_id,
        risk_score: data.risk_score,
        factors: data.factors
      }));
    });

    const unsubPred = wsService.subscribe('prediction', (data) => {
      setIncident((prev: any) => ({
        ...prev,
        predicted_zone: data.predicted_zone,
        probability: data.probability
      }));
    });

    const unsubAlert = wsService.subscribe('high_risk_alert', () => {
       setIncident((prev: any) => ({ ...prev, is_alert: true }));
    });

    const unsubReset = wsService.subscribe('reset', () => setIncident(null));

    return () => {
      unsubRisk();
      unsubPred();
      unsubAlert();
      unsubReset();
    };
  }, []);

  if (!incident) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-slate-600 border border-slate-800 border-dashed rounded-lg bg-slate-900/30">
        <ShieldAlert className="w-8 h-8 mb-2 opacity-50" />
        <p className="text-xs uppercase tracking-widest font-semibold">NO ACTIVE INCIDENTS</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full gap-4 transition-all duration-500`}>
      {/* Main Incident Card */}
      <div className={`p-5 rounded-lg border shadow-xl relative overflow-hidden transition-all duration-500 ${incident.is_alert ? 'bg-red-950/40 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.3)]' : 'bg-slate-800/40 border-slate-700'}`}>
        
        {incident.is_alert && (
          <>
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,1)]"></div>
            <div className="absolute inset-0 bg-red-500/5 animate-[pulse_2s_ease-in-out_infinite] pointer-events-none mix-blend-screen"></div>
          </>
        )}

        <div className="flex justify-between items-start mb-6 relative z-10">
          <div>
            <h3 className={`text-xl font-black font-mono tracking-wider ${incident.is_alert ? 'text-red-400' : 'text-slate-200'}`}>
              {incident.id || 'INC-1047'}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest ${incident.is_alert ? 'bg-red-500 text-white animate-pulse' : 'bg-amber-500 text-slate-900'}`}>
                {incident.is_alert ? 'HIGH RISK INCIDENT' : 'TRACKING'}
              </span>
            </div>
          </div>
          
          {/* Circular Risk Gauge */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
              <path className="text-slate-700" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className={`${incident.is_alert ? 'text-red-500' : 'text-amber-500'} transition-all duration-1000`} strokeDasharray={`${incident.risk_score || 0}, 100`} strokeWidth="3" stroke="currentColor" fill="none" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className={`text-lg font-bold font-mono ${incident.is_alert ? 'text-red-400' : 'text-amber-400'}`}>{incident.risk_score || 0}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
           <div className="bg-slate-900/50 p-2 rounded border border-slate-800">
             <div className="text-[10px] text-slate-500 font-bold tracking-widest mb-1 flex items-center gap-1"><Crosshair className="w-3 h-3"/> TRACK ID</div>
             <div className="text-sm font-mono text-blue-400 font-semibold">P-001</div>
           </div>
           <div className="bg-slate-900/50 p-2 rounded border border-slate-800">
             <div className="text-[10px] text-slate-500 font-bold tracking-widest mb-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> CURRENT LOC</div>
             <div className="text-sm font-mono text-emerald-400 font-semibold truncate">RESTRICTED-ZONE</div>
           </div>
        </div>

        {/* Explainable Risk Score */}
        {incident.factors && (
          <div className="mb-2 relative z-10">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 border-b border-slate-700 pb-1">Explainable Risk Factors (Demo Model)</p>
            <div className="space-y-3">
              {incident.factors.map((f: any, i: number) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{f.name}</span>
                    <span className="text-slate-400 font-mono">+{f.weight}</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(f.weight / 100) * 100 * 2}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Prediction Card */}
      {incident.predicted_zone && (
        <div className="p-4 rounded-lg bg-blue-950/40 border border-blue-500/30 relative overflow-hidden group shadow-[0_0_20px_rgba(59,130,246,0.1)] backdrop-blur-sm">
          <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-colors duration-700"></div>
          
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59, 130, 246, 0.05) 3px, rgba(59, 130, 246, 0.05) 3px)' }}></div>
          
          <h3 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4" /> NEXT-ZONE PREDICTION
          </h3>
          
          <div className="flex items-center justify-between">
             <div className="flex flex-col items-center">
                <span className="text-[10px] text-slate-500 mb-1">CURRENT</span>
                <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-300">RESTRICTED-ZONE</span>
             </div>
             
             <div className="flex flex-col items-center px-4">
                <span className="text-blue-400 font-mono font-bold text-lg mb-1">{((incident.probability || 0) * 100).toFixed(0)}%</span>
                <div className="w-16 h-0.5 bg-slate-700 relative">
                   <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-blue-400 rotate-45"></div>
                   <div className="absolute inset-0 bg-blue-400/50 w-full animate-pulse"></div>
                </div>
             </div>

             <div className="flex flex-col items-center">
                <span className="text-[10px] text-blue-400 font-bold mb-1">PREDICTED</span>
                <span className="text-xs font-mono bg-blue-500/20 px-2 py-1 rounded text-blue-400 border border-blue-500/30">{incident.predicted_zone}</span>
             </div>
          </div>
          
          <div className="mt-4 text-[9px] text-slate-500 text-center uppercase tracking-widest">Model Prediction — Not Certainty</div>
        </div>
      )}
    </div>
  );
};
