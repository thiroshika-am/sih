import { Map as MapIcon, Crosshair, Users, ShieldAlert, Radio } from 'lucide-react';
import { BorderMap } from '../components/BorderMap';

export const BorderMapPage = () => {
  return (
    <div className="flex flex-col h-full p-4 gap-4 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 bg-military-panel border border-military-green/30 p-4 rounded-lg shrink-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.4)]">
        <div className="p-2 bg-military-success/10 rounded-md border border-military-success/30">
          <MapIcon className="w-6 h-6 text-military-success" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-military-text tracking-wide">Operational Map</h1>
          <p className="text-[10px] text-military-muted font-mono tracking-widest uppercase">Live Geospacial Intelligence</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        <div className="col-span-9 bg-military-panel border border-military-green/30 rounded-lg p-2 relative overflow-hidden flex flex-col shadow-[inset_0_0_15px_rgba(0,0,0,0.4)]">
          <BorderMap />
        </div>
        
        <div className="col-span-3 flex flex-col gap-4 overflow-y-auto">
          <div className="bg-military-panel border border-military-green/30 rounded-lg p-4 shadow-[inset_0_0_15px_rgba(0,0,0,0.4)] flex flex-col gap-4">
            <h2 className="text-[10px] font-bold font-mono text-military-muted uppercase tracking-widest border-b border-military-green/30 pb-2">Map Layers</h2>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-military-text">
                <input type="checkbox" defaultChecked className="accent-military-success" />
                <Crosshair className="w-4 h-4 text-military-success" /> CCTV Coverage
              </label>
              <label className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-military-text">
                <input type="checkbox" defaultChecked className="accent-military-green" />
                <Users className="w-4 h-4 text-military-green" /> Active Tracking
              </label>
              <label className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-military-text">
                <input type="checkbox" defaultChecked className="accent-military-critical" />
                <ShieldAlert className="w-4 h-4 text-military-critical" /> High-Risk Zones
              </label>
              <label className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-military-text">
                <input type="checkbox" className="accent-military-warning" />
                <Radio className="w-4 h-4 text-military-warning" /> Edge Node Status
              </label>
            </div>
          </div>

          <div className="bg-military-panel border border-military-green/30 rounded-lg p-4 shadow-[inset_0_0_15px_rgba(0,0,0,0.4)] flex-1">
            <h2 className="text-[10px] font-bold font-mono text-military-muted uppercase tracking-widest border-b border-military-green/30 pb-2 mb-4">Sector Status</h2>
            <div className="space-y-3">
              {[
                { name: 'ZONE-A', status: 'SECURE', color: 'text-military-success' },
                { name: 'ZONE-B', status: 'MONITORING', color: 'text-military-green' },
                { name: 'ZONE-C', status: 'SECURE', color: 'text-military-success' },
                { name: 'RESTRICTED-ZONE', status: 'ELEVATED', color: 'text-military-warning' },
                { name: 'SENSITIVE-ZONE', status: 'SECURE', color: 'text-military-success' },
              ].map(zone => (
                <div key={zone.name} className="flex justify-between items-center text-[10px] font-mono p-2 bg-military-bg rounded border border-military-green/30">
                  <span className="text-military-text tracking-widest">{zone.name}</span>
                  <span className={`${zone.color} font-bold tracking-widest`}>{zone.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
