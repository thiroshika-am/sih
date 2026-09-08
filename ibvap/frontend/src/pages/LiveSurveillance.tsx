import { CameraGrid } from '../components/CameraGrid';
import { useSystem } from '../context/SystemContext';
import { Video, Settings2, Maximize, AlertCircle } from 'lucide-react';

export const LiveSurveillance = () => {
  const { fps, network, kpis } = useSystem();
  
  return (
    <div className="flex flex-col h-full p-4 gap-4 animate-in fade-in duration-500">
      
      {/* Header section */}
      <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-4 rounded-lg shrink-0 shadow-lg shadow-black/20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-md border border-blue-500/30">
            <Video className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-100 tracking-wide">Live Surveillance</h1>
            <p className="text-xs text-slate-400 font-mono tracking-widest uppercase">Multi-Sector Video Feeds</p>
          </div>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-slate-950 px-4 py-2 rounded border border-slate-800 flex flex-col items-end justify-center">
             <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Active Cameras</span>
             <span className="text-lg font-mono font-bold text-slate-200">{kpis.cameras}</span>
          </div>
          <div className="bg-slate-950 px-4 py-2 rounded border border-slate-800 flex flex-col items-end justify-center">
             <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">System FPS</span>
             <span className="text-lg font-mono font-bold text-emerald-400">{fps}</span>
          </div>
          <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded border border-slate-700 flex items-center gap-2 transition-colors">
            <Settings2 className="w-4 h-4" /> <span className="text-xs font-bold">GRID LAYOUT</span>
          </button>
        </div>
      </div>
      
      {/* Main Grid area - Reusing existing CameraGrid but expanding it */}
      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-4 relative overflow-hidden shadow-lg shadow-black/20 min-h-0 flex flex-col">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0"></div>
        
        <div className="flex justify-between items-center mb-4 shrink-0">
          <h2 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            Sector Feeds
          </h2>
          <button className="text-slate-500 hover:text-slate-300">
             <Maximize className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-1 min-h-0">
          {/* We reuse the CameraGrid which already has the mocked AI overlays */}
          <CameraGrid />
        </div>
        
        {network === 'OFFLINE' && (
          <div className="absolute inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center">
             <AlertCircle className="w-16 h-16 text-red-500 mb-4 animate-bounce" />
             <h2 className="text-2xl font-bold text-slate-200 tracking-wider mb-2">NETWORK DISCONNECTED</h2>
             <p className="text-slate-400 font-mono text-sm">Attempting to re-establish connection to Edge Nodes...</p>
          </div>
        )}
      </div>
    </div>
  );
};
