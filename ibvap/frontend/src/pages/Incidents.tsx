import { useState, useEffect } from 'react';
import { wsService } from '../services/websocket';
import { Siren, Search, Filter, ShieldAlert, CheckCircle2, AlertTriangle, Eye } from 'lucide-react';

export const Incidents = () => {
  const [incidents, setIncidents] = useState<any[]>([]);

  useEffect(() => {
    // In a real app we would fetch the list from the backend.
    // For demo, we just accumulate the incidents from WS or mock some.
    setIncidents([
      { id: 'INC-1045', time: '01:14 AM', camera: 'CAM-02', location: 'ZONE-B', personId: 'P-089', risk: 45, level: 'MEDIUM', reason: 'Unusual Movement', status: 'RESOLVED' },
      { id: 'INC-1046', time: '02:05 AM', camera: 'CAM-05', location: 'SENSITIVE-ZONE', personId: 'P-092', risk: 72, level: 'HIGH', reason: 'Restricted Area Entry', status: 'ACKNOWLEDGED' },
    ]);

    const unsubRisk = wsService.subscribe('risk_update', (data) => {
      if (data.risk_score >= 60) {
         setIncidents(prev => {
            const exists = prev.find(i => i.id === data.incident_id);
            if (exists) {
               return prev.map(i => i.id === data.incident_id ? { ...i, risk: data.risk_score, level: data.risk_score >= 80 ? 'CRITICAL' : 'HIGH' } : i);
            }
            return [{
               id: data.incident_id,
               time: new Date().toLocaleTimeString('en-US', { hour12: false }),
               camera: 'CAM-04',
               location: 'RESTRICTED-ZONE',
               personId: 'P-104',
               risk: data.risk_score,
               level: data.risk_score >= 80 ? 'CRITICAL' : 'HIGH',
               reason: 'Multiple Risk Factors',
               status: 'NEW'
            }, ...prev];
         });
      }
    });

    return () => unsubRisk();
  }, []);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'bg-military-critical/20 text-military-critical border-military-critical/50';
      case 'HIGH': return 'bg-military-warning/20 text-military-warning border-military-warning/50';
      case 'MEDIUM': return 'bg-military-green/20 text-military-green border-military-green/50';
      default: return 'bg-military-bg text-military-text border-military-green/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'NEW': return <AlertTriangle className="w-4 h-4 text-military-warning" />;
      case 'UNDER REVIEW': return <Search className="w-4 h-4 text-military-green" />;
      case 'ACKNOWLEDGED': return <ShieldAlert className="w-4 h-4 text-military-muted" />;
      case 'RESOLVED': return <CheckCircle2 className="w-4 h-4 text-military-success" />;
      default: return <AlertTriangle className="w-4 h-4 text-military-muted" />;
    }
  };

  return (
    <div className="flex flex-col h-full p-4 gap-4 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 bg-military-panel border border-military-green/30 p-4 rounded-lg shrink-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.4)]">
        <div className="p-2 bg-military-critical/10 rounded-md border border-military-critical/30">
          <Siren className="w-6 h-6 text-military-critical" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-military-text tracking-wide">Incident Management</h1>
          <p className="text-[10px] text-military-muted font-mono tracking-widest uppercase">Threat Resolution & Logging</p>
        </div>
      </div>

      <div className="flex-1 bg-military-panel border border-military-green/30 rounded-lg shadow-[inset_0_0_15px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden min-h-0">
        <div className="p-4 border-b border-military-green/30 flex justify-between items-center bg-military-bg">
           <div className="flex gap-2">
             <div className="relative">
               <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-military-muted" />
               <input type="text" placeholder="Search Incident ID..." className="bg-military-panel border border-military-green/30 rounded text-sm text-military-text pl-9 pr-3 py-1.5 focus:outline-none focus:border-military-success w-64" />
             </div>
             <button className="flex items-center gap-2 bg-military-panel hover:bg-military-green/20 border border-military-green/30 text-military-text px-3 py-1.5 rounded text-[10px] font-bold tracking-widest uppercase transition-colors">
               <Filter className="w-4 h-4" /> Filter
             </button>
           </div>
           
           <div className="flex gap-4 text-xs font-mono">
              <span className="text-military-critical font-bold">{incidents.filter(i => i.level === 'CRITICAL').length} CRITICAL</span>
              <span className="text-military-warning font-bold">{incidents.filter(i => i.status === 'NEW').length} NEW</span>
           </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-military-bg/50 sticky top-0 z-10 backdrop-blur-sm">
              <tr>
                <th className="p-4 text-[10px] font-bold text-military-muted tracking-widest uppercase border-b border-military-green/30">Incident ID</th>
                <th className="p-4 text-[10px] font-bold text-military-muted tracking-widest uppercase border-b border-military-green/30">Time</th>
                <th className="p-4 text-[10px] font-bold text-military-muted tracking-widest uppercase border-b border-military-green/30">Location</th>
                <th className="p-4 text-[10px] font-bold text-military-muted tracking-widest uppercase border-b border-military-green/30">Target ID</th>
                <th className="p-4 text-[10px] font-bold text-military-muted tracking-widest uppercase border-b border-military-green/30">Threat Level</th>
                <th className="p-4 text-[10px] font-bold text-military-muted tracking-widest uppercase border-b border-military-green/30">Status</th>
                <th className="p-4 text-[10px] font-bold text-military-muted tracking-widest uppercase border-b border-military-green/30 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((incident) => (
                <tr key={incident.id} className="border-b border-military-green/30 hover:bg-military-green/10 transition-colors group">
                  <td className="p-4 text-sm font-mono font-bold text-military-text">{incident.id}</td>
                  <td className="p-4 text-sm text-military-muted font-mono">{incident.time}</td>
                  <td className="p-4 text-sm text-military-text">
                    <span className="block font-mono">{incident.camera}</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-military-muted">{incident.location}</span>
                  </td>
                  <td className="p-4 text-sm font-mono text-military-green">{incident.personId}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-widest uppercase border ${getLevelColor(incident.level)}`}>
                      {incident.level} ({incident.risk})
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(incident.status)}
                      <span className="text-[10px] font-bold text-military-text tracking-wider uppercase">{incident.status}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 bg-military-bg hover:bg-military-green/20 text-military-text rounded border border-military-green/30 transition-colors group-hover:border-military-green/50 group-hover:text-military-success">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
