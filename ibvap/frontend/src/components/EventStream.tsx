import { useEffect, useState } from 'react';
import { wsService } from '../services/websocket';
import { Activity, Bell, Eye, ShieldAlert, Zap } from 'lucide-react';

interface EventLog {
  id: number;
  time: string;
  type: string;
  source: string;
  message: string;
  severity: 'info' | 'warning' | 'alert';
}

export const EventStream = () => {
  const [events, setEvents] = useState<EventLog[]>([]);

  useEffect(() => {
    let idCounter = 0;
    
    const addEvent = (type: string, source: string, message: string, severity: 'info' | 'warning' | 'alert' = 'info') => {
      setEvents(prev => [{
        id: ++idCounter,
        time: new Date().toLocaleTimeString('en-US', { hour12: false }),
        type,
        source,
        message,
        severity
      }, ...prev].slice(0, 50));
    };

    const unsubDet = wsService.subscribe('detection', (data) => {
      addEvent('PERSON DETECTED', data.camera_id, `P-${data.person_id.split('-')[1] || data.person_id}`, 'info');
    });

    const unsubTrack = wsService.subscribe('track', (data) => {
      addEvent('TRACK CREATED', 'SYSTEM', `Person ${data.person_id}`, 'info');
    });

    const unsubReid = wsService.subscribe('reid_match', (data) => {
      addEvent(
        data.status === 'CONFIRMED' ? 'RE-ID MATCH' : 'MATCH REJECTED',
        data.to_camera,
        data.status === 'CONFIRMED' ? `${((data.confidence || 0) * 100).toFixed(0)}% Confidence` : 'Space-Time Invalid',
        data.status === 'CONFIRMED' ? 'info' : 'warning'
      );
    });

    const unsubRisk = wsService.subscribe('risk_update', (data) => {
      addEvent('RISK ENGINE', 'INCIDENT', `${data.risk_score}/100 HIGH`, 'alert');
    });

    const unsubPred = wsService.subscribe('prediction', (data) => {
      addEvent('PREDICTION', 'AI MODEL', `${data.predicted_zone} ${((data.probability || 0) * 100).toFixed(0)}%`, 'warning');
    });

    const unsubAlert = wsService.subscribe('high_risk_alert', () => {
      addEvent('ALERT', 'COMMAND', `HIGH-RISK INCIDENT`, 'alert');
    });
    
    const unsubSys = wsService.subscribe('system_event', (data) => {
       if (data.message.includes('SYNCING') || data.message.includes('SYNC COMPLETE')) {
          addEvent('SYSTEM', 'NETWORK', data.message, 'warning');
       }
    });

    const unsubReset = wsService.subscribe('reset', () => setEvents([]));

    return () => {
      unsubDet(); unsubTrack(); unsubReid(); unsubRisk(); unsubPred(); unsubAlert(); unsubSys(); unsubReset();
    };
  }, []);

  const getIcon = (type: string) => {
    if (type.includes('DETECT') || type.includes('TRACK')) return <Eye className="w-3 h-3" />;
    if (type.includes('MATCH')) return <Activity className="w-3 h-3" />;
    if (type.includes('RISK') || type.includes('ALERT')) return <ShieldAlert className="w-3 h-3" />;
    return <Zap className="w-3 h-3" />;
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
      <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center gap-2">
        <Bell className="w-4 h-4 text-slate-400" />
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Live Event Stream</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-slate-700">
        {events.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-600 text-xs font-mono uppercase">
            Awaiting Events...
          </div>
        ) : (
          events.map((evt) => (
            <div key={evt.id} className={`p-2 rounded border-l-2 text-xs font-mono grid grid-cols-[65px_1fr] gap-2 animate-in slide-in-from-top-4 fade-in duration-300 shadow-sm ${
              evt.severity === 'alert' ? 'bg-red-950/40 border-red-500 text-red-200 shadow-[0_0_10px_rgba(239,68,68,0.2)]' :
              evt.severity === 'warning' ? 'bg-amber-950/40 border-amber-500 text-amber-200' :
              'bg-slate-900/60 border-emerald-500 text-slate-300 shadow-[0_0_5px_rgba(16,185,129,0.1)]'
            }`}>
              <div className="text-slate-500 mt-0.5 opacity-70">{evt.time}</div>
              <div>
                <div className="flex flex-col">
                  <span className={`font-bold flex items-center gap-1 ${evt.severity === 'alert' ? 'text-red-400 animate-pulse' : evt.severity === 'warning' ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {getIcon(evt.type)} [{evt.source}]
                  </span>
                  <span className="font-semibold tracking-wide">{evt.type}</span>
                  <span className="opacity-80 mt-0.5 font-light">&gt;&gt; {evt.message}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
