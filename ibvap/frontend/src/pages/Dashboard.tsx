import React, { useEffect, useState } from 'react';
import { wsService } from '../services/websocket';
import { CameraGrid } from '../components/CameraGrid';
import { IncidentPanel } from '../components/IncidentPanel';
import { BorderMap } from '../components/BorderMap';
import { TopBar } from '../components/TopBar';
import { KPIBar } from '../components/KPIBar';
import { ReIdPanel } from '../components/ReIdPanel';
import { EventStream } from '../components/EventStream';
import { SystemStatus } from '../components/SystemStatus';

export const Dashboard = () => {
  const [systemStatus, setSystemStatus] = useState('ONLINE');
  const [network, setNetwork] = useState('ONLINE');
  const [fps, setFps] = useState(30);
  const [queue, setQueue] = useState(0);

  // KPIs
  const [kpis, setKpis] = useState({
    cameras: 5,
    activeTracks: 0,
    activeIncidents: 0,
    highRisk: 0,
    eventsToday: 142
  });

  useEffect(() => {
    wsService.connect();
    
    const unsubHeartbeat = wsService.subscribe('heartbeat', (data) => {
      setFps(data.fps);
      setNetwork(data.network);
      setQueue(data.queue || 0);
    });

    const unsubRisk = wsService.subscribe('risk_update', (data) => {
      setKpis(prev => ({
        ...prev,
        activeIncidents: 1,
        highRisk: data.risk_score >= 80 ? 1 : 0
      }));
    });

    const unsubAlert = wsService.subscribe('high_risk_alert', (data) => {
      setKpis(prev => ({ ...prev, highRisk: 1 }));
    });

    const unsubReset = wsService.subscribe('reset', () => {
      setKpis({ cameras: 5, activeTracks: 0, activeIncidents: 0, highRisk: 0, eventsToday: 142 });
    });

    const unsubTrack = wsService.subscribe('track', () => {
      setKpis(prev => ({ ...prev, activeTracks: 1 }));
    });

    return () => {
      unsubHeartbeat();
      unsubRisk();
      unsubAlert();
      unsubReset();
      unsubTrack();
    };
  }, []);

  const handleStart = async () => {
    await fetch('http://localhost:8000/api/v1/demo/start', { method: 'POST' });
  };

  const handlePause = async () => {
    await fetch('http://localhost:8000/api/v1/demo/pause', { method: 'POST' });
  };

  const handleResume = async () => {
    await fetch('http://localhost:8000/api/v1/demo/resume', { method: 'POST' });
  };

  const handleReset = async () => {
    await fetch('http://localhost:8000/api/v1/demo/reset', { method: 'POST' });
  };

  const handleNetworkSim = async (offline: boolean) => {
    await fetch(`http://localhost:8000/api/v1/demo/network?offline=${offline}`, { method: 'POST' });
  };

  const handleFalseAlarm = async () => {
    await fetch('http://localhost:8000/api/v1/demo/false_alarm', { method: 'POST' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans overflow-hidden max-h-screen">
      <TopBar 
        systemStatus={network} 
        onStart={handleStart}
        onPause={handlePause}
        onResume={handleResume}
        onReset={handleReset}
        onNetworkSim={handleNetworkSim}
        onFalseAlarm={handleFalseAlarm}
      />
      
      <KPIBar 
        cameras={kpis.cameras}
        activeTracks={kpis.activeTracks}
        activeIncidents={kpis.activeIncidents}
        highRisk={kpis.highRisk}
        eventsToday={kpis.eventsToday}
        fps={fps}
      />

      {/* Main Content Grid */}
      <main className="flex-1 p-4 grid grid-cols-12 gap-4 min-h-0">
        
        {/* Left Column (70%) */}
        <div className="col-span-8 flex flex-col gap-4 min-h-0">
          {/* Camera Grid (Top) */}
          <div className="flex-[3] min-h-0">
            <CameraGrid />
          </div>

          {/* Bottom Left Split */}
          <div className="flex-[2] grid grid-cols-2 gap-4 min-h-0">
            {/* Map */}
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 min-h-0 overflow-hidden flex flex-col">
              <h2 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-2 shrink-0">Border Zone Map</h2>
              <div className="flex-1 relative rounded overflow-hidden">
                <BorderMap />
              </div>
            </div>
            {/* Event Stream */}
            <div className="min-h-0 overflow-hidden">
              <EventStream />
            </div>
          </div>
        </div>

        {/* Right Column (30%) */}
        <div className="col-span-4 flex flex-col gap-4 min-h-0">
          {/* Incident Panel */}
          <div className="flex-[4] min-h-0 overflow-hidden flex flex-col">
            <IncidentPanel />
          </div>

          {/* Re-ID Panel */}
          <div className="flex-[3] min-h-0 overflow-hidden">
             <ReIdPanel />
          </div>

          {/* System Status */}
          <div className="flex-[2] min-h-0">
             <SystemStatus fps={fps} network={network} queue={queue} />
          </div>
        </div>
      </main>
    </div>
  );
};
