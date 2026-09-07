import React, { useEffect, useState } from 'react';
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
    { id: 'ZONE-A', x: '15%', y: '25%' },
    { id: 'ZONE-B', x: '45%', y: '25%' },
    { id: 'ZONE-C', x: '75%', y: '25%' },
    { id: 'RESTRICTED-ZONE', x: '75%', y: '70%' },
    { id: 'SENSITIVE-ZONE', x: '45%', y: '80%' },
  ];

  return (
    <div className="relative w-full h-full bg-slate-950 rounded border border-slate-800 overflow-hidden p-4">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <path d="M 15% 25% L 45% 25% L 75% 25% L 75% 70% L 45% 80%" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" />
      </svg>

      {zones.map(z => (
        <div 
          key={z.id}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-colors duration-500
            ${activeZone === z.id ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-slate-800'} 
            rounded-md px-3 py-1.5 border ${activeZone === z.id ? 'border-emerald-400' : 'border-slate-700'}`}
          style={{ left: z.x, top: z.y, zIndex: 10 }}
        >
          <span className={`text-xs font-bold ${activeZone === z.id ? 'text-slate-900' : 'text-slate-400'}`}>
            {z.id}
          </span>
        </div>
      ))}
    </div>
  );
};
