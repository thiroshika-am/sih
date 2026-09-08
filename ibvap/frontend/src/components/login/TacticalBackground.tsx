import React from 'react';
import { Camera, Radio } from 'lucide-react';

export const TacticalBackground = () => {
  return (
    <div className="relative w-full h-full bg-military-bg overflow-hidden flex flex-col items-center justify-center">
      {/* Background Grid and Noise */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-military-green/30 to-military-bg"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(216,221,200,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(216,221,200,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      {/* Subtle Map SVG */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <svg viewBox="0 0 800 600" className="w-[120%] h-[120%] stroke-military-green fill-none stroke-[0.5]">
          <path d="M 100 200 Q 250 150 400 300 T 700 200" strokeDasharray="5,5" />
          <path d="M 150 350 Q 300 300 450 450 T 750 350" />
          
          {/* Border zones */}
          <rect x="350" y="250" width="100" height="100" className="stroke-military-warning/50 fill-military-warning/5" />
          <text x="360" y="270" className="fill-military-warning/80 text-[10px] font-mono stroke-none">RESTRICTED ZONE</text>
          
          <rect x="150" y="150" width="120" height="80" className="stroke-military-green/50 fill-military-green/5" />
          <text x="160" y="170" className="fill-military-green/80 text-[10px] font-mono stroke-none">SECTOR A</text>

          <rect x="500" y="350" width="150" height="100" className="stroke-military-green/50 fill-military-green/5" />
          <text x="510" y="370" className="fill-military-green/80 text-[10px] font-mono stroke-none">SECTOR B</text>
          
          <rect x="600" y="150" width="120" height="80" className="stroke-military-critical/50 fill-military-critical/5" />
          <text x="610" y="170" className="fill-military-critical/80 text-[10px] font-mono stroke-none">SENSITIVE ZONE</text>
        </svg>
      </div>

      {/* Camera Nodes */}
      <div className="absolute top-[35%] left-[30%] flex flex-col items-center animate-pulse">
        <Camera className="w-4 h-4 text-military-success mb-1" />
        <span className="text-[10px] font-mono text-military-success tracking-wider">CAM-01</span>
      </div>
      <div className="absolute top-[45%] left-[55%] flex flex-col items-center animate-pulse" style={{ animationDelay: '1s' }}>
        <Camera className="w-4 h-4 text-military-success mb-1" />
        <span className="text-[10px] font-mono text-military-success tracking-wider">CAM-02</span>
      </div>
      <div className="absolute top-[65%] left-[25%] flex flex-col items-center animate-pulse" style={{ animationDelay: '2s' }}>
        <Camera className="w-4 h-4 text-military-success mb-1" />
        <span className="text-[10px] font-mono text-military-success tracking-wider">CAM-03</span>
      </div>
      <div className="absolute top-[25%] left-[70%] flex flex-col items-center">
        <Camera className="w-4 h-4 text-military-muted mb-1" />
        <span className="text-[10px] font-mono text-military-muted tracking-wider">CAM-04 (OFFLINE)</span>
      </div>

      {/* Main Title Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center mb-20 drop-shadow-[0_0_15px_rgba(85,107,47,0.5)] animate-in fade-in duration-1000 zoom-in-95">
        <div className="flex items-center justify-center w-24 h-24 rounded-full border border-military-green/50 bg-military-panel/80 backdrop-blur-sm mb-6 shadow-[0_0_30px_rgba(85,107,47,0.3)]">
           <Radio className="w-10 h-10 text-military-text" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-[0.2em] text-white mb-2 font-sans">IBVAP</h1>
        <h2 className="text-lg md:text-xl tracking-[0.3em] text-military-text mb-6 text-center font-medium leading-relaxed">
          AI BORDER SURVEILLANCE<br/>COMMAND CENTER
        </h2>
        <div className="h-[1px] w-64 bg-gradient-to-r from-transparent via-military-green to-transparent mb-6"></div>
        <p className="text-xs md:text-sm font-mono tracking-[0.2em] text-military-muted">INTELLIGENT VIDEO ANALYTICS PLATFORM</p>
      </div>
    </div>
  );
};
