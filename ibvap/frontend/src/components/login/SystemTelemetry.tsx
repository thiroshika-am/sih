import React, { useState, useEffect } from 'react';

export const SystemTelemetry = () => {
  const [initStage, setInitStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setInitStage(1), 800);
    const timer2 = setTimeout(() => setInitStage(2), 1600);
    const timer3 = setTimeout(() => setInitStage(3), 2400);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="absolute top-8 left-8 flex flex-col gap-6 font-mono text-xs z-20 pointer-events-none">
      <TelemetryItem 
        label="SYSTEM STATUS" 
        value={initStage >= 1 ? "OPERATIONAL" : "INITIALIZING..."} 
        active={initStage >= 1} 
      />
      <TelemetryItem 
        label="EDGE AI NODE" 
        value={initStage >= 2 ? "ONLINE" : "CONNECTING..."} 
        active={initStage >= 2} 
      />
      <TelemetryItem 
        label="CAMERA NETWORK" 
        value={initStage >= 3 ? "05 / 06 ONLINE" : "SCANNING..."} 
        active={initStage >= 3} 
      />
      <TelemetryItem 
        label="VIDEO STREAM" 
        value={initStage >= 3 ? "ACTIVE" : "STANDBY"} 
        active={initStage >= 3} 
      />
      <TelemetryItem 
        label="INFERENCE ENGINE" 
        value={initStage >= 3 ? "READY" : "LOADING..."} 
        active={initStage >= 3} 
      />
    </div>
  );
};

const TelemetryItem = ({ label, value, active }: { label: string, value: string, active: boolean }) => (
  <div className={`flex flex-col gap-1 transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-50'}`}>
    <span className="text-military-muted tracking-widest">{label}</span>
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${active ? 'bg-military-success animate-pulse' : 'bg-military-warning'}`}></div>
      <span className={`tracking-widest ${active ? 'text-military-success' : 'text-military-warning'}`}>{value}</span>
    </div>
  </div>
);
