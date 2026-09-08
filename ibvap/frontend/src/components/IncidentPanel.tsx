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
      <div className="flex-1 flex flex-col items-center justify-center text-military-muted border border-military-green/30 border-dashed rounded-lg bg-military-panel">
        <ShieldAlert className="w-8 h-8 mb-2 opacity-50" />
        <p className="text-[10px] uppercase tracking-widest font-bold font-mono">NO ACTIVE INCIDENTS</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full gap-4 transition-all duration-500`}>
      {/* Main Incident Card */}
      <div className={`p-5 rounded-lg border shadow-xl relative overflow-hidden transition-all duration-500 ${incident.is_alert ? 'bg-military-critical/10 border-military-critical/50 shadow-[0_0_30px_rgba(182,58,50,0.3)]' : 'bg-military-panel border-military-green/30'}`}>
        
        {incident.is_alert && (
          <>
            <div className="absolute top-0 left-0 w-full h-1 bg-military-critical animate-pulse shadow-[0_0_10px_rgba(182,58,50,1)]"></div>
            <div className="absolute inset-0 bg-military-critical/5 animate-[pulse_2s_ease-in-out_infinite] pointer-events-none mix-blend-screen"></div>
          </>
        )}

        <div className="flex justify-between items-start mb-6 relative z-10">
          <div>
            <h3 className={`text-xl font-black font-mono tracking-wider ${incident.is_alert ? 'text-military-critical' : 'text-military-text'}`}>
              {incident.id || 'INC-1047'}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest font-mono ${incident.is_alert ? 'bg-military-critical text-military-bg animate-pulse' : 'bg-military-warning text-military-bg'}`}>
                {incident.is_alert ? 'HIGH RISK INCIDENT' : 'TRACKING'}
              </span>
            </div>
          </div>
          
          {/* Circular Risk Gauge */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
              <path className="text-military-green/20" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              <path className={`${incident.is_alert ? 'text-military-critical' : 'text-military-warning'} transition-all duration-1000`} strokeDasharray={`${incident.risk_score || 0}, 100`} strokeWidth="3" stroke="currentColor" fill="none" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className={`text-lg font-bold font-mono ${incident.is_alert ? 'text-military-critical' : 'text-military-warning'}`}>{incident.risk_score || 0}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
           <div className="bg-military-bg p-2 rounded border border-military-green/30">
             <div className="text-[10px] text-military-muted font-bold tracking-widest font-mono mb-1 flex items-center gap-1"><Crosshair className="w-3 h-3"/> TRACK ID</div>
             <div className="text-sm font-mono text-military-green font-semibold">P-001</div>
           </div>
           <div className="bg-military-bg p-2 rounded border border-military-green/30">
             <div className="text-[10px] text-military-muted font-bold tracking-widest font-mono mb-1 flex items-center gap-1"><MapPin className="w-3 h-3"/> CURRENT LOC</div>
             <div className="text-sm font-mono text-military-success font-semibold truncate">RESTRICTED-ZONE</div>
           </div>
        </div>

        {/* Explainable Risk Score */}
        {incident.factors && (
          <div className="mb-2 relative z-10">
            <p className="text-[10px] font-bold text-military-muted font-mono uppercase tracking-widest mb-3 border-b border-military-green/20 pb-1">Explainable Risk Factors (Demo Model)</p>
            <div className="space-y-3">
              {incident.factors.map((f: any, i: number) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex justify-between text-[10px] font-mono tracking-wider">
                    <span className="text-military-text font-bold">{f.name}</span>
                    <span className="text-military-warning font-bold">+{f.weight}</span>
                  </div>
                  <div className="w-full bg-military-green/20 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-military-warning h-full rounded-full shadow-[0_0_5px_rgba(197,155,58,0.8)]" style={{ width: `${(f.weight / 100) * 100 * 2}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Prediction Card */}
      {incident.predicted_zone && (
        <div className="p-4 rounded-lg bg-military-bg border border-military-green/30 relative overflow-hidden group shadow-[0_0_20px_rgba(85,107,47,0.1)] backdrop-blur-sm mt-2">
          <div className="absolute right-0 top-0 w-32 h-32 bg-military-green/10 rounded-full blur-2xl group-hover:bg-military-green/20 transition-colors duration-700"></div>
          
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(85, 107, 47, 0.05) 3px, rgba(85, 107, 47, 0.05) 3px)' }}></div>
          
          <h3 className="text-[10px] font-bold text-military-green font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4" /> NEXT-ZONE PREDICTION
          </h3>
          
          <div className="flex items-center justify-between">
             <div className="flex flex-col items-center">
                <span className="text-[10px] text-military-muted font-bold tracking-widest font-mono mb-1">CURRENT</span>
                <span className="text-xs font-mono bg-military-panel px-2 py-1 rounded text-military-text border border-military-green/20">RESTRICTED-ZONE</span>
             </div>
             
             <div className="flex flex-col items-center px-4">
                <span className="text-military-green font-mono font-bold text-lg mb-1">{((incident.probability || 0) * 100).toFixed(0)}%</span>
                <div className="w-16 h-0.5 bg-military-green/30 relative">
                   <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-military-green rotate-45"></div>
                   <div className="absolute inset-0 bg-military-green/50 w-full animate-pulse"></div>
                </div>
             </div>

             <div className="flex flex-col items-center">
                <span className="text-[10px] text-military-green font-bold tracking-widest font-mono mb-1">PREDICTED</span>
                <span className="text-xs font-mono bg-military-green/10 px-2 py-1 rounded text-military-green border border-military-green/30">{incident.predicted_zone}</span>
             </div>
          </div>
          
          <div className="mt-4 text-[9px] text-military-muted font-mono font-bold text-center uppercase tracking-widest">Model Prediction — Not Certainty</div>
        </div>
      )}
    </div>
  );
};
