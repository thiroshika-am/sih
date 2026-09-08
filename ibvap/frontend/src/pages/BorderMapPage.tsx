import { Map as MapIcon, Crosshair, Users, ShieldAlert, Radio } from 'lucide-react';
import { BorderMap } from '../components/BorderMap';

export const BorderMapPage = () => {
  return (
    <div className="flex flex-col h-full p-4 gap-4 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-4 rounded-lg shrink-0 shadow-lg shadow-black/20">
        <div className="p-2 bg-emerald-500/10 rounded-md border border-emerald-500/30">
          <MapIcon className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-100 tracking-wide">Operational Map</h1>
          <p className="text-xs text-slate-400 font-mono tracking-widest uppercase">Live Geospacial Intelligence</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        <div className="col-span-9 bg-slate-900 border border-slate-800 rounded-lg p-2 relative overflow-hidden flex flex-col shadow-lg">
          <BorderMap />
        </div>
        
        <div className="col-span-3 flex flex-col gap-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 shadow-lg flex flex-col gap-4">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2">Map Layers</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input type="checkbox" defaultChecked className="accent-emerald-500" />
                <Crosshair className="w-4 h-4 text-emerald-400" /> CCTV Coverage
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input type="checkbox" defaultChecked className="accent-blue-500" />
                <Users className="w-4 h-4 text-blue-400" /> Active Tracking
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input type="checkbox" defaultChecked className="accent-red-500" />
                <ShieldAlert className="w-4 h-4 text-red-400" /> High-Risk Zones
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-300">
                <input type="checkbox" className="accent-amber-500" />
                <Radio className="w-4 h-4 text-amber-400" /> Edge Node Status
              </label>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 shadow-lg flex-1">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2 mb-4">Sector Status</h2>
            <div className="space-y-3">
              {[
                { name: 'ZONE-A', status: 'SECURE', color: 'text-emerald-400' },
                { name: 'ZONE-B', status: 'MONITORING', color: 'text-blue-400' },
                { name: 'ZONE-C', status: 'SECURE', color: 'text-emerald-400' },
                { name: 'RESTRICTED-ZONE', status: 'ELEVATED', color: 'text-amber-400' },
                { name: 'SENSITIVE-ZONE', status: 'SECURE', color: 'text-emerald-400' },
              ].map(zone => (
                <div key={zone.name} className="flex justify-between items-center text-xs font-mono p-2 bg-slate-950 rounded border border-slate-800">
                  <span className="text-slate-300">{zone.name}</span>
                  <span className={`${zone.color} font-bold`}>{zone.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
