import { CameraGrid } from '../components/CameraGrid';
import { useSystem } from '../context/SystemContext';
import { Video, Settings2, Maximize, AlertCircle } from 'lucide-react';

export const LiveSurveillance = () => {
  const { fps, network, kpis } = useSystem();
  
  return (
    <div className="flex flex-col h-full p-4 gap-4 animate-in fade-in duration-500">
      
      {/* Header section */}
      <div className="flex justify-between items-center bg-military-panel border border-military-green/30 p-4 rounded-lg shrink-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-military-green/10 rounded-md border border-military-green/30">
            <Video className="w-6 h-6 text-military-green" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-military-text tracking-wide">Live Surveillance</h1>
            <p className="text-[10px] text-military-muted font-mono tracking-widest uppercase">Multi-Sector Video Feeds</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-military-bg px-4 py-2 rounded border border-military-green/30 flex flex-col items-end justify-center">
             <span className="text-[10px] text-military-muted font-bold tracking-widest uppercase">Active Cameras</span>
             <span className="text-lg font-mono font-bold text-military-text">{kpis.cameras}</span>
          </div>
          <div className="bg-military-bg px-4 py-2 rounded border border-military-green/30 flex flex-col items-end justify-center">
             <span className="text-[10px] text-military-muted font-bold tracking-widest uppercase">System FPS</span>
             <span className="text-lg font-mono font-bold text-military-success">{fps}</span>
          </div>
          <button className="bg-military-green/20 hover:bg-military-green/30 text-military-text px-3 py-2 rounded border border-military-green/40 flex items-center gap-2 transition-colors">
            <Settings2 className="w-4 h-4" /> <span className="text-[10px] tracking-widest font-bold">GRID LAYOUT</span>
          </button>
        </div>
      </div>
      
      {/* Main Grid area - Reusing existing CameraGrid but expanding it */}
      <div className="flex-1 bg-military-panel border border-military-green/30 rounded-lg p-4 relative overflow-hidden shadow-[inset_0_0_15px_rgba(0,0,0,0.4)] min-h-0 flex flex-col">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-military-green/0 via-military-green/50 to-military-green/0"></div>
        
        <div className="flex justify-between items-center mb-4 shrink-0">
          <h2 className="text-[10px] font-bold text-military-text uppercase tracking-widest font-mono flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-military-critical animate-pulse shadow-[0_0_5px_rgba(182,58,50,0.8)]"></div>
            Sector Feeds
          </h2>
          <button className="text-military-muted hover:text-military-text">
             <Maximize className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-1 min-h-0">
          {/* We reuse the CameraGrid which already has the mocked AI overlays */}
          <CameraGrid />
        </div>
        
        {network === 'OFFLINE' && (
          <div className="absolute inset-0 z-50 bg-military-bg/80 backdrop-blur-sm flex flex-col items-center justify-center">
             <AlertCircle className="w-16 h-16 text-military-critical mb-4 animate-bounce drop-shadow-[0_0_15px_rgba(182,58,50,0.8)]" />
             <h2 className="text-2xl font-bold font-mono text-military-critical tracking-wider mb-2">NETWORK DISCONNECTED</h2>
             <p className="text-military-muted font-mono text-[10px] tracking-widest uppercase">Attempting to re-establish connection to Edge Nodes...</p>
          </div>
        )}
      </div>
    </div>
  );
};
