import React from 'react';

interface KPIBarProps {
  cameras: number;
  activeTracks: number;
  activeIncidents: number;
  highRisk: number;
  eventsToday: number;
  fps: number;
}

export const KPIBar: React.FC<KPIBarProps> = ({
  cameras,
  activeTracks,
  activeIncidents,
  highRisk,
  eventsToday,
  fps
}) => {
  const kpis = [
    { label: 'CAMERAS', value: cameras < 10 ? `0${cameras}` : cameras, color: 'text-military-success drop-shadow-[0_0_8px_rgba(95,140,69,0.3)]' },
    { label: 'ACTIVE TRACKS', value: activeTracks < 10 ? `0${activeTracks}` : activeTracks, color: 'text-military-green drop-shadow-[0_0_8px_rgba(85,107,47,0.3)]' },
    { label: 'ACTIVE INCIDENTS', value: activeIncidents < 10 ? `0${activeIncidents}` : activeIncidents, color: 'text-military-warning drop-shadow-[0_0_8px_rgba(197,155,58,0.3)]' },
    { label: 'HIGH RISK', value: highRisk < 10 ? `0${highRisk}` : highRisk, color: highRisk > 0 ? 'text-military-critical font-bold drop-shadow-[0_0_8px_rgba(182,58,50,0.5)]' : 'text-military-muted' },
    { label: 'EVENTS TODAY', value: eventsToday, color: 'text-military-olive drop-shadow-[0_0_8px_rgba(75,83,32,0.3)]' },
    { label: 'FPS', value: fps, color: 'text-military-text' },
  ];

  return (
    <div className="bg-military-panel border-b border-military-green/30 px-6 py-3 flex items-center justify-start gap-12 shadow-md">
      {kpis.map((kpi, i) => (
        <div key={i} className="flex flex-col">
          <span className="text-[10px] font-bold text-military-muted tracking-widest mb-0.5 font-mono">{kpi.label}</span>
          <span className={`text-xl font-mono leading-none ${kpi.color}`}>{kpi.value}</span>
        </div>
      ))}
    </div>
  );
};
