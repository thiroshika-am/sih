import { useState, useEffect } from 'react';
import { Shield, Play, Pause, RotateCcw, Network, AlertTriangle } from 'lucide-react';
import { useSystem } from '../context/SystemContext';

export const TopBar = () => {
  const { 
    systemStatus, 
    startDemo, 
    pauseDemo, 
    resumeDemo, 
    resetDemo, 
    toggleNetworkSim, 
    triggerFalseAlarm 
  } = useSystem();
  
  const [time, setTime] = useState(new Date());
  const [isPaused, setIsPaused] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePauseResume = () => {
    if (isPaused) {
      resumeDemo();
    } else {
      pauseDemo();
    }
    setIsPaused(!isPaused);
  };

  const handleNetworkToggle = () => {
    const nextState = !isOffline;
    setIsOffline(nextState);
    toggleNetworkSim(nextState);
  };

  const handleReset = () => {
    setIsPaused(false);
    setIsOffline(false);
    resetDemo();
  };

  return (
    <header className="h-16 border-b border-military-green/30 bg-military-bg/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50 shrink-0">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-military-bg rounded-lg border border-military-green/40 text-military-green shadow-[0_0_10px_rgba(85,107,47,0.3)]">
          <Shield className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-[0.2em] text-military-text font-sans">IBVAP</h1>
          <p className="text-[9px] text-military-success font-mono tracking-[0.2em]">AI BORDER SURVEILLANCE COMMAND CENTER</p>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end mr-4 border-r border-military-green/20 pr-6">
          <span className="text-sm font-mono tracking-widest text-military-text">
            {time.toLocaleTimeString('en-US', { hour12: false })}
          </span>
          <span className="text-[10px] font-bold text-military-warning tracking-widest font-mono">SIMULATION MODE</span>
        </div>

        <div className="flex items-center gap-2 mr-4 font-mono">
          <span className="relative flex h-3 w-3">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${systemStatus === 'ONLINE' ? 'bg-military-success' : 'bg-military-critical'}`}></span>
            <span className={`relative inline-flex rounded-full h-3 w-3 ${systemStatus === 'ONLINE' ? 'bg-military-success' : 'bg-military-critical'}`}></span>
          </span>
          <span className="text-[10px] font-bold text-military-muted tracking-widest">SYSTEM: <span className={systemStatus === 'ONLINE' ? 'text-military-success' : 'text-military-critical'}>{systemStatus}</span></span>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={startDemo} className="flex items-center justify-center gap-2 bg-military-green hover:bg-military-success text-military-bg px-3 py-1.5 rounded-md text-[10px] font-bold font-mono tracking-widest transition-all hover:shadow-[0_0_15px_rgba(95,140,69,0.5)]">
            <Play className="w-3 h-3" /> START DEMO
          </button>
          
          <button onClick={handlePauseResume} className="flex items-center justify-center gap-2 bg-military-bg hover:bg-military-panel border border-military-green/50 text-military-green px-3 py-1.5 rounded-md text-[10px] font-bold font-mono tracking-widest transition-all">
            {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />} 
            {isPaused ? 'RESUME' : 'PAUSE'}
          </button>
          
          <button onClick={handleReset} className="flex items-center justify-center gap-2 bg-military-bg hover:bg-military-panel border border-military-green/50 text-military-green px-3 py-1.5 rounded-md text-[10px] font-bold font-mono tracking-widest transition-all">
            <RotateCcw className="w-3 h-3" /> RESET
          </button>

          <button onClick={handleNetworkToggle} className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-[10px] font-bold font-mono tracking-widest transition-all border ${isOffline ? 'bg-military-warning/10 text-military-warning border-military-warning/50 hover:bg-military-warning/20 hover:shadow-[0_0_10px_rgba(197,155,58,0.2)]' : 'bg-military-bg text-military-green border-military-green/50 hover:bg-military-panel'}`}>
            <Network className="w-3 h-3" /> {isOffline ? 'NETWORK OFFLINE' : 'NETWORK SIM'}
          </button>

          <button onClick={triggerFalseAlarm} className="flex items-center justify-center gap-2 bg-military-critical/10 hover:bg-military-critical/20 hover:shadow-[0_0_10px_rgba(182,58,50,0.2)] border border-military-critical/30 text-military-critical px-3 py-1.5 rounded-md text-[10px] font-bold font-mono tracking-widest transition-all ml-2">
            <AlertTriangle className="w-3 h-3" /> FALSE ALARM
          </button>
          
          <div className="w-px h-6 bg-military-green/20 mx-2"></div>
          
          <button onClick={() => {
            localStorage.removeItem('ibvap_auth');
            window.location.href = '/login';
          }} className="flex items-center justify-center gap-2 bg-military-bg hover:bg-military-critical/10 border border-military-critical/30 hover:border-military-critical/50 text-military-critical px-3 py-1.5 rounded-md text-[10px] font-bold font-mono tracking-widest transition-all">
            LOGOUT
          </button>
        </div>
      </div>
    </header>
  );
};
