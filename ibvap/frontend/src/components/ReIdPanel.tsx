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
      <div className="flex-1 flex flex-col items-center justify-center text-military-muted border border-military-green/30 border-dashed rounded-lg bg-military-panel min-h-[200px]">
        <ScanFace className="w-8 h-8 mb-2 opacity-50" />
        <p className="text-[10px] uppercase tracking-widest font-bold font-mono">WAITING FOR RE-ID MATCH</p>
      </div>
    );
  }

  const isConfirmed = match.status === 'CONFIRMED';
  const themeColor = isConfirmed ? 'military-success' : 'military-critical';
  const themeShadow = isConfirmed ? '95,140,69' : '182,58,50';

  return (
    <div className={`p-4 rounded-lg border bg-${themeColor}/5 border-${themeColor}/30 flex flex-col h-full relative overflow-hidden transition-all shadow-[0_0_20px_rgba(${themeShadow},0.05)]`}>
      {/* Background decoration */}
      <div className="absolute -right-4 -bottom-4 opacity-10">
         <ScanFace className={`w-32 h-32 text-${themeColor}`} />
      </div>

      <div className="flex items-center justify-between mb-4 relative z-10">
        <h3 className={`text-sm font-bold text-${themeColor} flex items-center gap-2`}>
          <ScanFace className="w-4 h-4" /> CROSS-CAMERA RE-ID
        </h3>
        <span className={`text-[10px] font-black tracking-widest px-2 py-1 rounded bg-${themeColor}/20 text-${themeColor}`}>
          {match.status}
        </span>
      </div>

      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="text-center">
          <div className="text-xs text-military-muted mb-1 font-mono">FROM</div>
          <div className="bg-military-bg px-3 py-1 rounded text-sm font-bold font-mono text-military-text border border-military-green/30">{match.from_camera}</div>
        </div>
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="h-0.5 w-full bg-military-green/30 relative">
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-military-panel px-2 text-xs font-bold font-mono text-${themeColor}`}>
              {((match.confidence || 0) * 100).toFixed(0)}%
            </div>
            {/* Animated arrow */}
            <div className={`absolute top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-${themeColor} rotate-45 transition-all duration-1000 ${isConfirmed ? 'left-3/4' : 'left-1/2'}`}></div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-military-muted mb-1 font-mono">TO</div>
          <div className="bg-military-bg px-3 py-1 rounded text-sm font-bold font-mono text-military-text border border-military-green/30">{match.to_camera}</div>
        </div>
      </div>

      <div className="space-y-2 relative z-10">
        <p className="text-[10px] font-bold text-military-muted font-mono uppercase tracking-widest mb-2 border-b border-military-green/20 pb-1">Space-Time Gating Validation</p>
        
        <div className="flex items-center justify-between bg-military-panel p-2 rounded border border-military-green/30">
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-military-text">
             <Clock className="w-3 h-3 text-military-green" /> TIME DELTA
          </div>
          {match.validity?.time === 'VALID' ? <CheckCircle2 className="w-4 h-4 text-military-success" /> : <XCircle className="w-4 h-4 text-military-critical" />}
        </div>
        
        <div className="flex items-center justify-between bg-military-panel p-2 rounded border border-military-green/30">
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-military-text">
             <Map className="w-3 h-3 text-military-green" /> SPATIAL TRANSITION
          </div>
          {match.validity?.spatial === 'VALID' ? <CheckCircle2 className="w-4 h-4 text-military-success" /> : <XCircle className="w-4 h-4 text-military-critical" />}
        </div>

        <div className="flex items-center justify-between bg-military-panel p-2 rounded border border-military-green/30">
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-military-text">
             <Compass className="w-3 h-3 text-military-green" /> DIRECTIONAL VECTOR
          </div>
          {match.validity?.direction === 'VALID' ? <CheckCircle2 className="w-4 h-4 text-military-success" /> : <XCircle className="w-4 h-4 text-military-critical" />}
        </div>
      </div>

      {!isConfirmed && match.reason && (
        <div className="mt-4 p-2 bg-military-critical/10 border border-military-critical/20 rounded relative z-10">
           <p className="text-[10px] font-bold text-military-critical uppercase tracking-widest mb-1 font-mono">Rejection Reason</p>
           <p className="text-[10px] font-mono text-military-text">{match.reason}</p>
        </div>
      )}
    </div>
  );
};
