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
      case 'CRITICAL': return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'HIGH': return 'bg-amber-500/20 text-amber-400 border-amber-500/50';
      case 'MEDIUM': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      default: return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'NEW': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'UNDER REVIEW': return <Search className="w-4 h-4 text-blue-500" />;
      case 'ACKNOWLEDGED': return <ShieldAlert className="w-4 h-4 text-purple-500" />;
      case 'RESOLVED': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="flex flex-col h-full p-4 gap-4 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-4 rounded-lg shrink-0 shadow-lg shadow-black/20">
        <div className="p-2 bg-red-500/10 rounded-md border border-red-500/30">
          <Siren className="w-6 h-6 text-red-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-100 tracking-wide">Incident Management</h1>
          <p className="text-xs text-slate-400 font-mono tracking-widest uppercase">Threat Resolution & Logging</p>
        </div>
      </div>

      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-lg shadow-lg flex flex-col overflow-hidden min-h-0">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
           <div className="flex gap-2">
             <div className="relative">
               <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
               <input type="text" placeholder="Search Incident ID..." className="bg-slate-900 border border-slate-700 rounded text-sm text-slate-200 pl-9 pr-3 py-1.5 focus:outline-none focus:border-blue-500 w-64" />
             </div>
             <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 px-3 py-1.5 rounded text-sm transition-colors">
               <Filter className="w-4 h-4" /> Filter
             </button>
           </div>
           
           <div className="flex gap-4 text-xs font-mono">
              <span className="text-red-400 font-bold">{incidents.filter(i => i.level === 'CRITICAL').length} CRITICAL</span>
              <span className="text-amber-400 font-bold">{incidents.filter(i => i.status === 'NEW').length} NEW</span>
           </div>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-950/50 sticky top-0 z-10 backdrop-blur-sm">
              <tr>
                <th className="p-4 text-[10px] font-bold text-slate-500 tracking-widest uppercase border-b border-slate-800">Incident ID</th>
                <th className="p-4 text-[10px] font-bold text-slate-500 tracking-widest uppercase border-b border-slate-800">Time</th>
                <th className="p-4 text-[10px] font-bold text-slate-500 tracking-widest uppercase border-b border-slate-800">Location</th>
                <th className="p-4 text-[10px] font-bold text-slate-500 tracking-widest uppercase border-b border-slate-800">Target ID</th>
                <th className="p-4 text-[10px] font-bold text-slate-500 tracking-widest uppercase border-b border-slate-800">Threat Level</th>
                <th className="p-4 text-[10px] font-bold text-slate-500 tracking-widest uppercase border-b border-slate-800">Status</th>
                <th className="p-4 text-[10px] font-bold text-slate-500 tracking-widest uppercase border-b border-slate-800 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((incident) => (
                <tr key={incident.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors group">
                  <td className="p-4 text-sm font-mono font-bold text-slate-200">{incident.id}</td>
                  <td className="p-4 text-sm text-slate-400 font-mono">{incident.time}</td>
                  <td className="p-4 text-sm text-slate-300">
                    <span className="block font-mono">{incident.camera}</span>
                    <span className="text-xs text-slate-500">{incident.location}</span>
                  </td>
                  <td className="p-4 text-sm font-mono text-blue-400">{incident.personId}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-widest uppercase border ${getLevelColor(incident.level)}`}>
                      {incident.level} ({incident.risk})
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(incident.status)}
                      <span className="text-xs font-bold text-slate-300 tracking-wider">{incident.status}</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors group-hover:border-blue-500/50 group-hover:text-blue-400">
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
