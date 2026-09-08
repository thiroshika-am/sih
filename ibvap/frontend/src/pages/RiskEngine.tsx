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
    { label: 'LOW', min: 0, max: 29, color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500/50' },
    { label: 'MEDIUM', min: 30, max: 59, color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/50' },
    { label: 'HIGH', min: 60, max: 79, color: 'text-amber-400', bg: 'bg-amber-500/20', border: 'border-amber-500/50' },
    { label: 'CRITICAL', min: 80, max: 100, color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/50' }
  ];

  const currentThreshold = riskData ? riskThresholds.find(t => riskData.risk_score >= t.min && riskData.risk_score <= t.max) : riskThresholds[0];

  return (
    <div className="flex flex-col h-full p-4 gap-4 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-4 rounded-lg shrink-0 shadow-lg shadow-black/20">
        <div className="p-2 bg-amber-500/10 rounded-md border border-amber-500/30">
          <AlertOctagon className="w-6 h-6 text-amber-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-100 tracking-wide">Risk & Decision Engine</h1>
          <p className="text-xs text-slate-400 font-mono tracking-widest uppercase">Explainable AI Risk Scoring</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        
        {/* Active Risk Score Display */}
        <div className="col-span-5 flex flex-col gap-4 min-h-0">
           <div className={`flex-1 bg-slate-900 border ${currentThreshold?.border || 'border-slate-800'} rounded-lg p-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500`}>
              
              {currentThreshold?.label === 'CRITICAL' && (
                <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none"></div>
              )}

              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest absolute top-4 left-4">Active Assessment</h2>
              
              <div className="relative w-48 h-48 mb-6 mt-4">
                 <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                   {/* Background circle */}
                   <path className="text-slate-800" strokeWidth="2" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                   {/* Progress circle */}
                   <path 
                      className={`${currentThreshold?.color || 'text-slate-600'} transition-all duration-1000`} 
                      strokeDasharray={`${riskData?.risk_score || 0}, 100`} 
                      strokeWidth="2.5" 
                      stroke="currentColor" 
                      fill="none" 
                      strokeLinecap="round" 
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                   />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-6xl font-black font-mono tracking-tighter ${currentThreshold?.color || 'text-slate-600'}`}>
                      {riskData?.risk_score || 0}
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">/ 100 SCORE</span>
                 </div>
              </div>

              <div className={`px-6 py-2 rounded text-lg font-black tracking-widest uppercase ${currentThreshold?.bg} ${currentThreshold?.color} ${currentThreshold?.border} border shadow-lg`}>
                 {currentThreshold?.label || 'AWAITING DATA'}
              </div>

              {riskData && riskData.risk_score >= 80 && (
                 <div className="mt-8 flex items-center gap-2 text-red-400 bg-red-500/10 px-4 py-2 border border-red-500/30 rounded animate-bounce">
                    <ShieldAlert className="w-5 h-5" />
                    <span className="text-sm font-bold tracking-widest uppercase">High Priority Alert Generated</span>
                 </div>
              )}
           </div>
        </div>

        {/* Explainability & Factors */}
        <div className="col-span-7 flex flex-col gap-4 min-h-0">
           <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 shadow-lg flex-1 overflow-y-auto">
              <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
                 <h2 className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                   <Cpu className="w-4 h-4 text-slate-500" /> Factor Analysis
                 </h2>
                 <span className="text-xs font-mono text-slate-500">Target ID: {riskData?.incident_id || 'NONE'}</span>
              </div>

              {!riskData ? (
                <div className="h-48 flex flex-col items-center justify-center text-slate-600">
                  <Network className="w-12 h-12 mb-3 opacity-20" />
                  <p className="font-mono text-xs uppercase tracking-widest">Waiting for incident data stream...</p>
                </div>
              ) : (
                <div className="space-y-4">
                   <div className="grid grid-cols-12 gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest pb-2 border-b border-slate-800/50">
                     <div className="col-span-6">Configured Factor</div>
                     <div className="col-span-4">Contribution</div>
                     <div className="col-span-2 text-right">Weight</div>
                   </div>

                   {riskData.factors?.map((f: any, i: number) => (
                     <div key={i} className="grid grid-cols-12 gap-4 items-center animate-in slide-in-from-right-4" style={{ animationDelay: `${i * 100}ms` }}>
                       <div className="col-span-6 text-sm text-slate-300 font-medium">{f.name}</div>
                       <div className="col-span-4">
                         <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                           <div className="bg-amber-500 h-full rounded-full" style={{ width: `${Math.min((f.weight / 40) * 100, 100)}%` }}></div>
                         </div>
                       </div>
                       <div className="col-span-2 text-right text-sm font-mono text-amber-400 font-bold">+{f.weight}</div>
                     </div>
                   ))}

                   <div className="mt-8 pt-4 border-t border-slate-800">
                      <div className="flex justify-between items-center text-slate-300">
                         <span className="text-xs font-bold uppercase tracking-widest">Calculated Total</span>
                         <span className="text-2xl font-black font-mono text-amber-500">{riskData.risk_score}</span>
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
