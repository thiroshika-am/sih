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
    { label: 'CAMERAS', value: cameras < 10 ? `0${cameras}` : cameras, color: 'text-emerald-400' },
    { label: 'ACTIVE TRACKS', value: activeTracks < 10 ? `0${activeTracks}` : activeTracks, color: 'text-blue-400' },
    { label: 'ACTIVE INCIDENTS', value: activeIncidents < 10 ? `0${activeIncidents}` : activeIncidents, color: 'text-amber-400' },
    { label: 'HIGH RISK', value: highRisk < 10 ? `0${highRisk}` : highRisk, color: highRisk > 0 ? 'text-red-500 font-bold' : 'text-slate-400' },
    { label: 'EVENTS TODAY', value: eventsToday, color: 'text-purple-400' },
    { label: 'FPS', value: fps, color: 'text-slate-300' },
  ];

  return (
    <div className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-start gap-12 shadow-md">
      {kpis.map((kpi, i) => (
        <div key={i} className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-500 tracking-wider mb-0.5">{kpi.label}</span>
          <span className={`text-xl font-mono leading-none ${kpi.color}`}>{kpi.value}</span>
        </div>
      ))}
    </div>
  );
};
