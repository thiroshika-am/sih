import React, { useEffect, useState } from 'react';
import { wsService } from '../services/websocket';
import { Target, Video } from 'lucide-react';

export const CameraGrid = () => {
  const [cameras, setCameras] = useState([
    { id: 'CAM-01', zone: 'ZONE-A', status: 'ONLINE', detection: null as any, animClass: 'animate-cam1' },
    { id: 'CAM-02', zone: 'ZONE-B', status: 'ONLINE', detection: null as any, animClass: 'animate-cam2' },
    { id: 'CAM-03', zone: 'ZONE-C', status: 'ONLINE', detection: null as any, animClass: 'animate-cam3' },
    { id: 'CAM-04', zone: 'RESTRICTED-ZONE', status: 'ONLINE', detection: null as any, animClass: 'animate-cam4' },
    { id: 'CAM-05', zone: 'SENSITIVE-ZONE', status: 'ONLINE', detection: null as any, animClass: 'animate-cam5' },
  ]);

  useEffect(() => {
    const unsubDet = wsService.subscribe('detection', (data) => {
      setCameras(prev => prev.map(c => 
        c.id === data.camera_id ? { ...c, detection: data, key: Date.now() } : c
      ));
      
      // Clear detection after some time for demo
      setTimeout(() => {
        setCameras(prev => prev.map(c => 
          c.id === data.camera_id ? { ...c, detection: null } : c
        ));
      }, 4000);
    });

    const unsubReset = wsService.subscribe('reset', () => {
      setCameras(prev => prev.map(c => ({ ...c, detection: null })));
    });

    return () => {
      unsubDet();
      unsubReset();
    };
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3 h-full">
      {cameras.map(cam => (
        <div key={cam.id} className="relative cctv-bg rounded border border-slate-700 overflow-hidden min-h-[220px] shadow-lg shadow-black/50 group">
          <div className="cctv-noise"></div>
          
          <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 rounded text-[10px] text-white font-mono z-10 flex gap-2 items-center border border-white/10 backdrop-blur-sm">
            <span className={`w-1.5 h-1.5 rounded-full ${cam.status === 'ONLINE' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
            {cam.id} | {cam.zone}
          </div>
          
          <div className="absolute top-2 right-2 text-[10px] font-mono text-white/50 z-10 bg-black/50 px-1 rounded">
            LIVE {new Date().toISOString().substring(11, 19)}
          </div>

          {cam.detection && (
            <div 
              key={cam.key} 
              className={`absolute z-20 ${cam.animClass}`}
            >
              <div className="relative w-16 h-32 border border-emerald-400 bg-emerald-400/10 shadow-[0_0_10px_rgba(52,211,153,0.3)]">
                {/* Crosshairs */}
                <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-emerald-400"></div>
                <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-emerald-400"></div>
                <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-emerald-400"></div>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-emerald-400"></div>
                
                {/* Trail effect */}
                <div className="absolute top-1/2 left-1/2 w-48 h-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500/20 to-emerald-500/50 -translate-y-1/2 -translate-x-full blur-[1px]"></div>
                
                {/* Metadata */}
                <div className="absolute -bottom-6 left-0 whitespace-nowrap">
                  <div className="bg-black/80 text-emerald-400 text-[9px] font-mono font-bold px-1.5 py-0.5 flex flex-col border border-emerald-500/30">
                    <span className="flex items-center gap-1"><Target className="w-2 h-2"/> PERSON {cam.detection.person_id}</span>
                    <span className="text-emerald-500/80">CONF {((cam.detection.confidence || 0.9) * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Target overlay design */}
          <div className="absolute inset-0 border-[1px] border-white/5 m-4 pointer-events-none opacity-30 flex items-center justify-center">
            <div className="w-8 h-8 border border-white/20 rounded-full flex items-center justify-center">
              <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Empty slot to balance 3x2 grid */}
      <div className="relative bg-slate-900/50 rounded border border-slate-800/50 overflow-hidden min-h-[220px] flex items-center justify-center opacity-50">
         <div className="text-slate-700 flex flex-col items-center gap-2">
            <Video className="w-8 h-8" />
            <span className="text-xs font-mono">CAM-06 (OFFLINE)</span>
         </div>
      </div>
    </div>
  );
};
