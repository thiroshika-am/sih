import { useState, useEffect } from 'react';
import { wsService } from '../services/websocket';
import { AlertOctagon, ShieldAlert, Cpu, Network } from 'lucide-react';

export const RiskEngine = () => {
  const [riskData, setRiskData] = useState<any>(null);

  useEffect(() => {
    const unsubRisk = wsService.subscribe('risk_update', (data) => {
      setRiskData(data);
    });

    return () => unsubRisk();
  }, []);

  const riskThresholds = [
    { label: 'LOW', min: 0, max: 29, color: 'text-military-success', bg: 'bg-military-success/20', border: 'border-military-success/50' },
    { label: 'MEDIUM', min: 30, max: 59, color: 'text-military-green', bg: 'bg-military-green/20', border: 'border-military-green/50' },
    { label: 'HIGH', min: 60, max: 79, color: 'text-military-warning', bg: 'bg-military-warning/20', border: 'border-military-warning/50' },
    { label: 'CRITICAL', min: 80, max: 100, color: 'text-military-critical', bg: 'bg-military-critical/20', border: 'border-military-critical/50' }
  ];

  const currentThreshold = riskData ? riskThresholds.find(t => riskData.risk_score >= t.min && riskData.risk_score <= t.max) : riskThresholds[0];

  return (
    <div className="flex flex-col h-full p-4 gap-4 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 bg-military-panel border border-military-green/30 p-4 rounded-lg shrink-0 shadow-lg shadow-black/20">
        <div className="p-2 bg-military-warning/10 rounded-md border border-military-warning/30">
          <AlertOctagon className="w-6 h-6 text-military-warning" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-military-text tracking-wide">Risk & Decision Engine</h1>
          <p className="text-[10px] text-military-muted font-mono tracking-widest uppercase">Explainable AI Risk Scoring</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        
        {/* Active Risk Score Display */}
        <div className="col-span-5 flex flex-col gap-4 min-h-0">
           <div className={`flex-1 bg-military-panel border ${currentThreshold?.border || 'border-military-green/30'} rounded-lg p-6 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500`}>
              
              {currentThreshold?.label === 'CRITICAL' && (
                <div className="absolute inset-0 bg-military-critical/5 animate-pulse pointer-events-none"></div>
              )}

              <h2 className="text-[10px] font-bold text-military-muted uppercase tracking-widest absolute top-4 left-4 font-mono">Active Assessment</h2>
              
              <div className="relative w-48 h-48 mb-6 mt-4">
                 <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                   {/* Background circle */}
                   <path className="text-military-green/20" strokeWidth="2" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                   {/* Progress circle */}
                   <path 
                      className={`${currentThreshold?.color || 'text-military-muted'} transition-all duration-1000`} 
                      strokeDasharray={`${riskData?.risk_score || 0}, 100`} 
                      strokeWidth="2.5" 
                      stroke="currentColor" 
                      fill="none" 
                      strokeLinecap="round" 
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                   />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-6xl font-black font-mono tracking-tighter ${currentThreshold?.color || 'text-military-muted'}`}>
                      {riskData?.risk_score || 0}
                    </span>
                    <span className="text-[10px] text-military-muted font-bold uppercase tracking-widest mt-1">/ 100 SCORE</span>
                 </div>
              </div>

              <div className={`px-6 py-2 rounded text-lg font-black tracking-widest uppercase ${currentThreshold?.bg} ${currentThreshold?.color} ${currentThreshold?.border} border shadow-lg`}>
                 {currentThreshold?.label || 'AWAITING DATA'}
              </div>

              {riskData && riskData.risk_score >= 80 && (
                 <div className="mt-8 flex items-center gap-2 text-military-critical bg-military-critical/10 px-4 py-2 border border-military-critical/30 rounded animate-bounce">
                    <ShieldAlert className="w-5 h-5" />
                    <span className="text-sm font-bold tracking-widest uppercase">High Priority Alert Generated</span>
                 </div>
              )}
           </div>
        </div>

        {/* Explainability & Factors */}
        <div className="col-span-7 flex flex-col gap-4 min-h-0">
           <div className="bg-military-panel border border-military-green/30 rounded-lg p-6 shadow-[inset_0_0_15px_rgba(0,0,0,0.4)] flex-1 overflow-y-auto">
              <div className="flex justify-between items-center mb-6 border-b border-military-green/30 pb-4">
                 <h2 className="text-[10px] font-bold text-military-text uppercase tracking-widest flex items-center gap-2 font-mono">
                   <Cpu className="w-4 h-4 text-military-muted" /> Factor Analysis
                 </h2>
                 <span className="text-[10px] font-mono font-bold tracking-widest text-military-muted">Target ID: {riskData?.incident_id || 'NONE'}</span>
              </div>

              {!riskData ? (
                <div className="h-48 flex flex-col items-center justify-center text-military-muted">
                  <Network className="w-12 h-12 mb-3 opacity-20" />
                  <p className="font-mono text-[10px] uppercase tracking-widest font-bold">Waiting for incident data stream...</p>
                </div>
              ) : (
                <div className="space-y-4">
                   <div className="grid grid-cols-12 gap-4 text-[10px] font-bold text-military-muted uppercase tracking-widest pb-2 border-b border-military-green/20 font-mono">
                     <div className="col-span-6">Configured Factor</div>
                     <div className="col-span-4">Contribution</div>
                     <div className="col-span-2 text-right">Weight</div>
                   </div>

                   {riskData.factors?.map((f: any, i: number) => (
                     <div key={i} className="grid grid-cols-12 gap-4 items-center animate-in slide-in-from-right-4" style={{ animationDelay: `${i * 100}ms` }}>
                       <div className="col-span-6 text-[10px] font-mono tracking-widest text-military-text font-bold">{f.name}</div>
                       <div className="col-span-4">
                         <div className="w-full bg-military-bg h-2 rounded-full overflow-hidden border border-military-green/30">
                           <div className="bg-military-warning h-full rounded-full shadow-[0_0_5px_rgba(197,155,58,0.8)]" style={{ width: `${Math.min((f.weight / 40) * 100, 100)}%` }}></div>
                         </div>
                       </div>
                       <div className="col-span-2 text-right text-xs font-mono text-military-warning font-bold">+{f.weight}</div>
                     </div>
                   ))}

                   <div className="mt-8 pt-4 border-t border-military-green/30">
                      <div className="flex justify-between items-center text-military-text">
                         <span className="text-[10px] font-bold uppercase tracking-widest font-mono">Calculated Total</span>
                         <span className="text-2xl font-black font-mono text-military-warning">{riskData.risk_score}</span>
                      </div>
                   </div>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};
