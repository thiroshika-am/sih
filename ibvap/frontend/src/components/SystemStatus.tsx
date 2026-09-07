import React from 'react';
import { Cpu, Network, Database, HardDrive, Wifi } from 'lucide-react';

interface SystemStatusProps {
  fps: number;
  network: string;
  queue: number;
}

export const SystemStatus: React.FC<SystemStatusProps> = ({ fps, network, queue }) => {
  const isOffline = network === 'OFFLINE';

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
        <Cpu className="w-4 h-4 text-purple-400" />
        <h2 className="text-xs font-bold text-slate-300 uppercase tracking-widest">System Status</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-3 flex-1">
        <div className="bg-slate-950 p-3 rounded-md border border-slate-800 flex flex-col justify-between">
          <p className="text-[10px] text-slate-500 font-bold tracking-widest flex items-center gap-1">
             EDGE NODE
          </p>
          <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             <span className="text-sm font-mono text-emerald-400">ONLINE</span>
          </div>
        </div>

        <div className="bg-slate-950 p-3 rounded-md border border-slate-800 flex flex-col justify-between">
          <p className="text-[10px] text-slate-500 font-bold tracking-widest flex items-center gap-1">
             PROCESSING
          </p>
          <div className="text-sm font-mono text-slate-300">EDGE</div>
        </div>

        <div className="bg-slate-950 p-3 rounded-md border border-slate-800 flex flex-col justify-between col-span-2">
          <p className="text-[10px] text-slate-500 font-bold tracking-widest flex items-center gap-1 mb-1">
             <HardDrive className="w-3 h-3" /> GPU
          </p>
          <div className="flex items-center justify-between">
             <span className="text-sm font-mono text-slate-300">SIMULATED / AVAILABLE</span>
             <span className="text-xs text-emerald-400 font-mono border border-emerald-500/30 bg-emerald-500/10 px-1 rounded">{fps} FPS</span>
          </div>
        </div>

        <div className={`bg-slate-950 p-3 rounded-md border flex flex-col justify-between transition-colors ${isOffline ? 'border-amber-500/50' : 'border-slate-800'}`}>
          <p className="text-[10px] text-slate-500 font-bold tracking-widest flex items-center gap-1">
            <Wifi className="w-3 h-3" /> NETWORK
          </p>
          <div className="flex items-center gap-2">
             <span className={`w-2 h-2 rounded-full ${isOffline ? 'bg-amber-500' : 'bg-green-500'}`}></span>
             <span className={`text-sm font-mono ${isOffline ? 'text-amber-400' : 'text-emerald-400'}`}>{network}</span>
          </div>
        </div>

        <div className={`bg-slate-950 p-3 rounded-md border flex flex-col justify-between ${queue > 0 ? 'border-amber-500/50 bg-amber-500/5' : 'border-slate-800'}`}>
          <p className="text-[10px] text-slate-500 font-bold tracking-widest flex items-center gap-1">
            <Network className="w-3 h-3" /> EVENT QUEUE
          </p>
          <div className="flex items-center gap-2">
             <span className={`text-sm font-mono ${queue > 0 ? 'text-amber-400' : 'text-slate-300'}`}>{queue}</span>
             {queue > 0 && <span className="text-[9px] text-amber-500 font-bold animate-pulse">BUFFERING</span>}
          </div>
        </div>
      </div>
    </div>
  );
};
