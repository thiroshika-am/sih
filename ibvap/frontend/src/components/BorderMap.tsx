import { useState, useEffect } from 'react';
import { wsService } from '../services/websocket';

export const BorderMap = () => {
  const [activeZone, setActiveZone] = useState<string | null>(null);

  useEffect(() => {
    const unsubDet = wsService.subscribe('detection', (data) => {
      setActiveZone(data.zone);
    });

    return () => {
      unsubDet();
    };
  }, []);

  const zones = [
    { id: 'ZONE-A', x: '15%', y: '25%', status: 'secure' },
    { id: 'ZONE-B', x: '45%', y: '25%', status: 'monitoring' },
    { id: 'ZONE-C', x: '75%', y: '25%', status: 'secure' },
    { id: 'RESTRICTED-ZONE', x: '75%', y: '70%', status: 'elevated' },
    { id: 'SENSITIVE-ZONE', x: '45%', y: '80%', status: 'secure' },
  ];

  return (
    <div className="relative w-full h-full bg-slate-950 rounded-lg border border-slate-800 overflow-hidden p-4 shadow-inner group">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* Radar Scan Effect */}
      <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] rounded-full bg-[conic-gradient(from_0deg,transparent_70%,rgba(16,185,129,0.1)_100%)] animate-[spin_4s_linear_infinite] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ transformOrigin: 'center' }}></div>

      {/* Connection Lines Mesh */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <path d="M 15% 25% L 45% 25% L 75% 25% L 75% 70% L 45% 80% L 15% 25%" fill="none" stroke="rgba(51, 65, 85, 0.5)" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M 45% 25% L 45% 80%" fill="none" stroke="rgba(51, 65, 85, 0.5)" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M 15% 25% L 45% 80%" fill="none" stroke="rgba(51, 65, 85, 0.3)" strokeWidth="1" />
        <path d="M 75% 25% L 45% 80%" fill="none" stroke="rgba(51, 65, 85, 0.3)" strokeWidth="1" />
      </svg>

      {/* Zones */}
      {zones.map(z => {
        const isActive = activeZone === z.id;
        let colorClass = 'border-slate-700 bg-slate-900/80 text-slate-400 shadow-none';
        
        if (isActive) {
           colorClass = 'border-emerald-400 bg-emerald-500/20 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-110 z-20';
        } else if (z.status === 'elevated') {
           colorClass = 'border-amber-500/50 bg-amber-500/10 text-amber-400/80 shadow-[0_0_10px_rgba(245,158,11,0.1)]';
        } else if (z.status === 'monitoring') {
           colorClass = 'border-blue-500/50 bg-blue-500/10 text-blue-400/80';
        }

        return (
          <div 
            key={z.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 backdrop-blur-md rounded-md px-4 py-2 border ${colorClass}`}
            style={{ left: z.x, top: z.y, zIndex: isActive ? 20 : 10 }}
          >
            {isActive && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping"></span>
            )}
            <span className="text-xs font-mono font-bold tracking-wider">
              {z.id}
            </span>
          </div>
        );
      })}

      {/* Overlay gradient to darken edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(2,6,23,0.8)_100%)] pointer-events-none z-30"></div>
    </div>
  );
};
