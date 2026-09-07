import React, { useState, useEffect } from 'react';
import { Shield, Play, Pause, RotateCcw, Network, AlertTriangle } from 'lucide-react';

interface TopBarProps {
  systemStatus: string;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onNetworkSim: (offline: boolean) => void;
  onFalseAlarm: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  systemStatus,
  onStart,
  onPause,
  onResume,
  onReset,
  onNetworkSim,
  onFalseAlarm
}) => {
  const [time, setTime] = useState(new Date());
  const [isPaused, setIsPaused] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePauseResume = () => {
    if (isPaused) {
      onResume();
    } else {
      onPause();
    }
    setIsPaused(!isPaused);
  };

  const handleNetworkToggle = () => {
    const nextState = !isOffline;
    setIsOffline(nextState);
    onNetworkSim(nextState);
  };

  const handleReset = () => {
    setIsPaused(false);
    setIsOffline(false);
    onReset();
  };

  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <Shield className="w-8 h-8 text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
        <div>
          <h1 className="text-xl font-black tracking-wider text-slate-100 drop-shadow-sm">IBVAP</h1>
          <p className="text-[10px] text-blue-400 font-semibold tracking-[0.2em] uppercase">AI BORDER SURVEILLANCE COMMAND CENTER</p>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end mr-4 border-r border-slate-800 pr-6">
          <span className="text-sm font-mono text-slate-300">
            {time.toLocaleTimeString('en-US', { hour12: false })}
          </span>
          <span className="text-[10px] font-bold text-amber-500 tracking-widest uppercase">SIMULATION MODE</span>
        </div>

        <div className="flex items-center gap-2 mr-4">
          <span className="relative flex h-3 w-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${systemStatus === 'ONLINE' ? 'bg-green-400' : 'bg-red-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${systemStatus === 'ONLINE' ? 'bg-green-500' : 'bg-red-500'}`}></span>
          </span>
          <span className="text-xs font-bold text-slate-300 tracking-wider">SYSTEM: {systemStatus}</span>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={onStart} className="flex items-center gap-1 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/50 text-blue-400 px-3 py-1.5 rounded text-xs font-bold transition-all hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <Play className="w-3 h-3" /> START DEMO
          </button>
          
          <button onClick={handlePauseResume} className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 px-3 py-1.5 rounded text-xs font-bold transition-colors">
            {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />} 
            {isPaused ? 'RESUME' : 'PAUSE'}
          </button>
          
          <button onClick={handleReset} className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 px-3 py-1.5 rounded text-xs font-bold transition-colors">
            <RotateCcw className="w-3 h-3" /> RESET
          </button>

          <button onClick={handleNetworkToggle} className={`flex items-center gap-1 px-3 py-1.5 rounded text-xs font-bold transition-all border ${isOffline ? 'bg-amber-500/20 text-amber-500 border-amber-500/50 hover:bg-amber-500/30' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'}`}>
            <Network className="w-3 h-3" /> {isOffline ? 'NETWORK OFFLINE' : 'NETWORK SIM'}
          </button>

          <button onClick={onFalseAlarm} className="flex items-center gap-1 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 text-purple-400 px-3 py-1.5 rounded text-xs font-bold transition-all ml-2">
            <AlertTriangle className="w-3 h-3" /> FALSE ALARM
          </button>
        </div>
      </div>
    </header>
  );
};
