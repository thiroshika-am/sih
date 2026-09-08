import { Cpu, Network, HardDrive, Wifi } from 'lucide-react';

interface SystemStatusProps {
  fps: number;
  network: string;
  queue: number;
}

export const SystemStatus = ({ fps, network, queue }: SystemStatusProps) => {
  const isOffline = network === 'OFFLINE';

  return (
    <div className="bg-military-panel border border-military-green/30 rounded-lg p-4 h-full flex flex-col shadow-[inset_0_0_15px_rgba(0,0,0,0.4)]">
      <div className="flex items-center gap-2 mb-4 border-b border-military-green/30 pb-2">
        <Cpu className="w-4 h-4 text-military-green" />
        <h2 className="text-[10px] font-bold text-military-text uppercase tracking-widest font-mono">System Status</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-3 flex-1">
        <div className="bg-military-bg p-3 rounded-md border border-military-green/30 flex flex-col justify-between">
          <p className="text-[10px] text-military-muted font-bold tracking-widest flex items-center gap-1">
             EDGE NODE
          </p>
          <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-military-success animate-pulse shadow-[0_0_5px_rgba(95,140,69,0.8)]"></span>
             <span className="text-sm font-mono text-military-success">ONLINE</span>
          </div>
        </div>

        <div className="bg-military-bg p-3 rounded-md border border-military-green/30 flex flex-col justify-between">
          <p className="text-[10px] text-military-muted font-bold tracking-widest flex items-center gap-1">
             PROCESSING
          </p>
          <div className="text-sm font-mono text-military-text">EDGE</div>
        </div>

        <div className="bg-military-bg p-3 rounded-md border border-military-green/30 flex flex-col justify-between col-span-2">
          <p className="text-[10px] text-military-muted font-bold tracking-widest flex items-center gap-1 mb-1">
             <HardDrive className="w-3 h-3" /> GPU
          </p>
          <div className="flex items-center justify-between">
             <span className="text-sm font-mono text-military-text">SIMULATED / AVAILABLE</span>
             <span className="text-xs text-military-success font-mono border border-military-success/30 bg-military-success/10 px-1 rounded">{fps} FPS</span>
          </div>
        </div>

        <div className={`bg-military-bg p-3 rounded-md border flex flex-col justify-between transition-colors ${isOffline ? 'border-military-warning/50' : 'border-military-green/30'}`}>
          <p className="text-[10px] text-military-muted font-bold tracking-widest flex items-center gap-1">
            <Wifi className="w-3 h-3" /> NETWORK
          </p>
          <div className="flex items-center gap-2">
             <span className={`w-2 h-2 rounded-full ${isOffline ? 'bg-military-warning shadow-[0_0_5px_rgba(197,155,58,0.8)]' : 'bg-military-success shadow-[0_0_5px_rgba(95,140,69,0.8)]'}`}></span>
             <span className={`text-sm font-mono ${isOffline ? 'text-military-warning' : 'text-military-success'}`}>{network}</span>
          </div>
        </div>

        <div className={`bg-military-bg p-3 rounded-md border flex flex-col justify-between ${queue > 0 ? 'border-military-warning/50 bg-military-warning/10' : 'border-military-green/30'}`}>
          <p className="text-[10px] text-military-muted font-bold tracking-widest flex items-center gap-1">
            <Network className="w-3 h-3" /> EVENT QUEUE
          </p>
          <div className="flex items-center gap-2">
             <span className={`text-sm font-mono ${queue > 0 ? 'text-military-warning' : 'text-military-text'}`}>{queue}</span>
             {queue > 0 && <span className="text-[9px] text-military-warning font-bold animate-pulse">BUFFERING</span>}
          </div>
        </div>
      </div>
    </div>
  );
};
