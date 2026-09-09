import { Cpu, Network, HardDrive, Wifi, Activity } from 'lucide-react';

interface SystemStatusProps {
  fps: number;
  network: string;
  queue: number;
}

export const SystemStatus = ({ fps, network, queue }: SystemStatusProps) => {
  const isOffline = network === 'OFFLINE';

  return (
    <div className="bg-military-panel/80 backdrop-blur-md border border-military-green/40 rounded-xl p-5 h-full flex flex-col shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden group">
      {/* Decorative gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-military-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="flex items-center gap-3 mb-5 border-b border-military-green/30 pb-3 relative z-10">
        <div className="p-2 bg-military-green/10 rounded-lg border border-military-green/20 shadow-[inset_0_0_10px_rgba(85,107,47,0.2)]">
          <Cpu className="w-4 h-4 text-military-success" />
        </div>
        <h2 className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-military-text to-military-muted uppercase tracking-[0.2em] font-mono">System Status</h2>
        
        {/* Live indicator */}
        <div className="ml-auto flex items-center gap-2 px-2.5 py-1 bg-military-success/10 rounded-full border border-military-success/20 shadow-[0_0_10px_rgba(95,140,69,0.1)]">
          <span className="w-1.5 h-1.5 rounded-full bg-military-success animate-pulse shadow-[0_0_8px_rgba(95,140,69,1)]"></span>
          <span className="text-[9px] text-military-success font-mono font-bold tracking-wider">LIVE</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 flex-1 relative z-10">
        <div className="bg-gradient-to-b from-military-bg/80 to-military-bg/40 backdrop-blur-sm p-4 rounded-xl border border-military-green/20 flex flex-col justify-between hover:border-military-green/50 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(85,107,47,0.15)] hover:-translate-y-0.5 group/card">
          <p className="text-[10px] text-military-muted font-bold tracking-[0.15em] flex items-center gap-2 mb-2">
             <Activity className="w-3 h-3 group-hover/card:text-military-success transition-colors" /> EDGE NODE
          </p>
          <div className="flex items-center gap-3">
             <div className="relative flex items-center justify-center">
               <span className="absolute w-3 h-3 rounded-full bg-military-success opacity-50 animate-ping"></span>
               <span className="relative w-2 h-2 rounded-full bg-military-success shadow-[0_0_8px_rgba(95,140,69,1)]"></span>
             </div>
             <span className="text-sm font-mono text-military-success font-semibold tracking-wider">ONLINE</span>
          </div>
        </div>

        <div className="bg-gradient-to-b from-military-bg/80 to-military-bg/40 backdrop-blur-sm p-4 rounded-xl border border-military-green/20 flex flex-col justify-between hover:border-military-green/50 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(85,107,47,0.15)] hover:-translate-y-0.5 group/card">
          <p className="text-[10px] text-military-muted font-bold tracking-[0.15em] flex items-center gap-2 mb-2">
             <Cpu className="w-3 h-3 group-hover/card:text-military-text transition-colors" /> PROCESSING
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono text-military-text font-semibold tracking-wider">EDGE</span>
          </div>
        </div>

        <div className="bg-gradient-to-b from-military-bg/80 to-military-bg/40 backdrop-blur-sm p-4 rounded-xl border border-military-green/20 flex flex-col justify-between col-span-2 hover:border-military-green/50 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(85,107,47,0.15)] hover:-translate-y-0.5 group/card">
          <p className="text-[10px] text-military-muted font-bold tracking-[0.15em] flex items-center gap-2 mb-2">
             <HardDrive className="w-3 h-3 group-hover/card:text-military-text transition-colors" /> GPU ACCELERATION
          </p>
          <div className="flex items-center justify-between mt-1">
             <div className="flex items-center gap-2">
               <div className="px-2 py-1 bg-military-panel/80 rounded border border-military-green/30 shadow-inner">
                 <span className="text-xs font-mono text-military-text">SIMULATED</span>
               </div>
               <span className="text-military-muted/50 text-xs">/</span>
               <span className="text-xs font-mono text-military-muted">AVAILABLE</span>
             </div>
             <div className="flex flex-col items-end">
               <span className="text-sm text-military-success font-mono font-bold border border-military-success/40 bg-military-success/10 px-2.5 py-1 rounded-lg shadow-[0_0_15px_rgba(95,140,69,0.15)] group-hover/card:shadow-[0_0_20px_rgba(95,140,69,0.25)] transition-all">
                 {fps} FPS
               </span>
             </div>
          </div>
        </div>

        <div className={`bg-gradient-to-b from-military-bg/80 to-military-bg/40 backdrop-blur-sm p-4 rounded-xl border flex flex-col justify-between transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 group/card ${isOffline ? 'border-military-warning/50 hover:border-military-warning' : 'border-military-green/20 hover:border-military-green/50'}`}>
          <p className="text-[10px] text-military-muted font-bold tracking-[0.15em] flex items-center gap-2 mb-2">
            <Wifi className={`w-3 h-3 ${isOffline ? 'group-hover/card:text-military-warning' : 'group-hover/card:text-military-success'} transition-colors`} /> NETWORK
          </p>
          <div className="flex items-center gap-3">
             <span className={`w-2 h-2 rounded-full ${isOffline ? 'bg-military-warning shadow-[0_0_8px_rgba(197,155,58,1)]' : 'bg-military-success shadow-[0_0_8px_rgba(95,140,69,1)]'}`}></span>
             <span className={`text-sm font-mono font-semibold tracking-wider ${isOffline ? 'text-military-warning' : 'text-military-success'}`}>{network}</span>
          </div>
        </div>

        <div className={`bg-gradient-to-b from-military-bg/80 to-military-bg/40 backdrop-blur-sm p-4 rounded-xl border flex flex-col justify-between transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 group/card ${queue > 0 ? 'border-military-warning/50 bg-military-warning/5 hover:border-military-warning' : 'border-military-green/20 hover:border-military-green/50'}`}>
          <p className="text-[10px] text-military-muted font-bold tracking-[0.15em] flex items-center gap-2 mb-2">
            <Network className={`w-3 h-3 ${queue > 0 ? 'group-hover/card:text-military-warning' : 'group-hover/card:text-military-text'} transition-colors`} /> EVENT QUEUE
          </p>
          <div className="flex items-center gap-3">
             <span className={`text-sm font-mono font-semibold ${queue > 0 ? 'text-military-warning' : 'text-military-text'}`}>{queue}</span>
             {queue > 0 && (
               <div className="flex items-center gap-1.5 px-2 py-0.5 bg-military-warning/10 border border-military-warning/30 rounded-md">
                 <span className="w-1.5 h-1.5 rounded-full bg-military-warning animate-pulse"></span>
                 <span className="text-[9px] text-military-warning font-bold tracking-widest uppercase">Buffering</span>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

