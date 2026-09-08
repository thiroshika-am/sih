import { useState, useEffect } from 'react';

export const SecurityStatus = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-sm mt-8 p-4 border border-military-green/20 bg-military-bg/50 rounded-lg">
      <h3 className="text-[10px] font-mono text-military-muted mb-4 tracking-widest border-b border-military-green/20 pb-2">
        SECURITY STATUS
      </h3>
      
      <div className="grid grid-cols-2 gap-y-4 gap-x-2 font-mono text-[10px]">
        <StatusRow label="AUTHENTICATION SERVICE" value="ONLINE" />
        <StatusRow label="SESSION ENCRYPTION" value="ACTIVE" />
        <StatusRow label="EDGE NODE" value="CONNECTED" />
        <StatusRow label="NETWORK" value="SECURE" />
        
        <div className="col-span-2 mt-2 pt-2 border-t border-military-green/20 grid grid-cols-2 gap-2 text-[9px] text-military-muted">
          <div className="flex flex-col gap-1">
            <span>SESSION: SEC-2026-{Math.floor(Math.random() * 9000) + 1000}</span>
            <span>NODE: EDGE-01</span>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <span>PROTOCOL: SECURE</span>
            <span>SYSTEM: IBVAP v1.0</span>
            <span className="text-military-text mt-1">{time.toISOString().replace('T', ' ').substring(0, 19)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex flex-col gap-1">
    <span className="text-military-muted">{label}</span>
    <span className="text-military-success flex items-center gap-1">
      <div className="w-1.5 h-1.5 rounded-full bg-military-success animate-pulse"></div>
      {value}
    </span>
  </div>
);
