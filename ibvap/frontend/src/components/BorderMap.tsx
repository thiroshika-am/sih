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
    <div className="relative w-full h-full bg-military-bg rounded-lg border border-military-green/30 overflow-hidden p-4 shadow-inner group">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#4B5320 1px, transparent 1px), linear-gradient(90deg, #4B5320 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {/* Radar Scan Effect */}
      <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] rounded-full bg-[conic-gradient(from_0deg,transparent_70%,rgba(95,140,69,0.1)_100%)] animate-[spin_4s_linear_infinite] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ transformOrigin: 'center' }}></div>

      {/* Connection Lines Mesh */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <path d="M 15% 25% L 45% 25% L 75% 25% L 75% 70% L 45% 80% L 15% 25%" fill="none" stroke="rgba(75, 83, 32, 0.5)" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M 45% 25% L 45% 80%" fill="none" stroke="rgba(75, 83, 32, 0.5)" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d="M 15% 25% L 45% 80%" fill="none" stroke="rgba(75, 83, 32, 0.3)" strokeWidth="1" />
        <path d="M 75% 25% L 45% 80%" fill="none" stroke="rgba(75, 83, 32, 0.3)" strokeWidth="1" />
      </svg>

      {/* Zones */}
      {zones.map(z => {
        const isActive = activeZone === z.id;
        let colorClass = 'border-military-green/30 bg-military-panel/80 text-military-muted shadow-none';
        
        if (isActive) {
           colorClass = 'border-military-success bg-military-success/20 text-military-success shadow-[0_0_20px_rgba(95,140,69,0.4)] scale-110 z-20';
        } else if (z.status === 'elevated') {
           colorClass = 'border-military-warning/50 bg-military-warning/10 text-military-warning/80 shadow-[0_0_10px_rgba(197,155,58,0.1)]';
        } else if (z.status === 'monitoring') {
           colorClass = 'border-military-green/50 bg-military-green/10 text-military-green/80';
        }

        return (
          <div 
            key={z.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 backdrop-blur-md rounded-md px-4 py-2 border ${colorClass}`}
            style={{ left: z.x, top: z.y, zIndex: isActive ? 20 : 10 }}
          >
            {isActive && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-military-success rounded-full animate-ping"></span>
            )}
            <span className="text-xs font-mono font-bold tracking-wider">
              {z.id}
            </span>
          </div>
        );
      })}

      {/* Overlay gradient to darken edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(8,12,8,0.8)_100%)] pointer-events-none z-30"></div>
    </div>
  );
};
