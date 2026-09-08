import { useEffect, useState } from 'react';
import { wsService } from '../services/websocket';
import { ScanFace, CheckCircle2, XCircle, Clock, Map, Compass } from 'lucide-react';

export const ReIdPanel = () => {
  const [match, setMatch] = useState<any>(null);

  useEffect(() => {
    const unsub = wsService.subscribe('reid_match', (data) => {
      setMatch(data);
      // Auto-clear after 10 seconds for demo
      setTimeout(() => setMatch(null), 10000);
    });

    const unsubReset = wsService.subscribe('reset', () => setMatch(null));

    return () => {
      unsub();
      unsubReset();
    };
  }, []);

  if (!match) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-slate-600 border border-slate-800 border-dashed rounded-lg bg-slate-900/30 min-h-[200px]">
        <ScanFace className="w-8 h-8 mb-2 opacity-50" />
        <p className="text-xs uppercase tracking-widest font-semibold">WAITING FOR RE-ID MATCH</p>
      </div>
    );
  }

  const isConfirmed = match.status === 'CONFIRMED';
  const color = isConfirmed ? 'emerald' : 'red';

  return (
    <div className={`p-4 rounded-lg border bg-${color}-500/5 border-${color}-500/30 flex flex-col h-full relative overflow-hidden transition-all shadow-[0_0_20px_rgba(var(--color-${color}-500),0.05)]`}>
      {/* Background decoration */}
      <div className="absolute -right-4 -bottom-4 opacity-10">
         <ScanFace className={`w-32 h-32 text-${color}-500`} />
      </div>

      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className={`text-sm font-bold text-${color}-400 flex items-center gap-2`}>
          <ScanFace className="w-4 h-4" /> CROSS-CAMERA RE-ID
        </h3>
        <span className={`text-[10px] font-black tracking-widest px-2 py-1 rounded bg-${color}-500/20 text-${color}-400`}>
          {match.status}
        </span>
      </div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="text-center">
          <div className="text-xs text-slate-400 mb-1 font-mono">FROM</div>
          <div className="bg-slate-800 px-3 py-1 rounded text-sm font-bold font-mono text-slate-200 border border-slate-700">{match.from_camera}</div>
        </div>
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="h-0.5 w-full bg-slate-700 relative">
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-950 px-2 text-xs font-bold font-mono text-${color}-400`}>
              {((match.confidence || 0) * 100).toFixed(0)}%
            </div>
            {/* Animated arrow */}
            <div className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-${color}-400 rotate-45 transition-all duration-1000 ${isConfirmed ? 'left-3/4' : 'left-1/2'}`}></div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-slate-400 mb-1 font-mono">TO</div>
          <div className="bg-slate-800 px-3 py-1 rounded text-sm font-bold font-mono text-slate-200 border border-slate-700">{match.to_camera}</div>
        </div>
      </div>

      <div className="space-y-2 relative z-10">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 border-b border-slate-800 pb-1">Space-Time Gating Validation</p>
        
        <div className="flex items-center justify-between bg-slate-900/80 p-2 rounded border border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-300">
             <Clock className="w-3 h-3 text-blue-400" /> Time Delta
          </div>
          {match.validity?.time === 'VALID' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-red-500" />}
        </div>
        
        <div className="flex items-center justify-between bg-slate-900/80 p-2 rounded border border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-300">
             <Map className="w-3 h-3 text-blue-400" /> Spatial Transition
          </div>
          {match.validity?.spatial === 'VALID' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-red-500" />}
        </div>

        <div className="flex items-center justify-between bg-slate-900/80 p-2 rounded border border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-300">
             <Compass className="w-3 h-3 text-blue-400" /> Directional Vector
          </div>
          {match.validity?.direction === 'VALID' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-red-500" />}
        </div>
      </div>

      {!isConfirmed && match.reason && (
        <div className="mt-4 p-2 bg-red-500/10 border border-red-500/20 rounded relative z-10">
           <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">Rejection Reason</p>
           <p className="text-xs text-slate-300">{match.reason}</p>
        </div>
      )}
    </div>
  );
};
