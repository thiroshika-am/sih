import React, { createContext, useContext, useEffect, useState } from 'react';
import { wsService } from '../services/websocket';

interface SystemState {
  systemStatus: string;
  network: string;
  fps: number;
  queue: number;
  kpis: {
    cameras: number;
    activeTracks: number;
    activeIncidents: number;
    highRisk: number;
    eventsToday: number;
  };
  startDemo: () => Promise<void>;
  pauseDemo: () => Promise<void>;
  resumeDemo: () => Promise<void>;
  resetDemo: () => Promise<void>;
  toggleNetworkSim: (offline: boolean) => Promise<void>;
  triggerFalseAlarm: () => Promise<void>;
}

const SystemContext = createContext<SystemState | undefined>(undefined);

export const SystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [network, setNetwork] = useState('ONLINE');
  const [fps, setFps] = useState(30);
  const [queue, setQueue] = useState(0);

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

    const unsubAlert = wsService.subscribe('high_risk_alert', () => {
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

  const startDemo = async () => fetch('http://localhost:8000/api/v1/demo/start', { method: 'POST' }).then(() => {});
  const pauseDemo = async () => fetch('http://localhost:8000/api/v1/demo/pause', { method: 'POST' }).then(() => {});
  const resumeDemo = async () => fetch('http://localhost:8000/api/v1/demo/resume', { method: 'POST' }).then(() => {});
  const resetDemo = async () => fetch('http://localhost:8000/api/v1/demo/reset', { method: 'POST' }).then(() => {});
  const toggleNetworkSim = async (offline: boolean) => fetch(`http://localhost:8000/api/v1/demo/network?offline=${offline}`, { method: 'POST' }).then(() => {});
  const triggerFalseAlarm = async () => fetch('http://localhost:8000/api/v1/demo/false_alarm', { method: 'POST' }).then(() => {});

  const value = {
    systemStatus: network,
    network,
    fps,
    queue,
    kpis,
    startDemo,
    pauseDemo,
    resumeDemo,
    resetDemo,
    toggleNetworkSim,
    triggerFalseAlarm
  };

  return <SystemContext.Provider value={value}>{children}</SystemContext.Provider>;
};

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (context === undefined) {
    throw new Error('useSystem must be used within a SystemProvider');
  }
  return context;
};
