import { CameraGrid } from '../components/CameraGrid';
import { IncidentPanel } from '../components/IncidentPanel';
import { BorderMap } from '../components/BorderMap';
import { KPIBar } from '../components/KPIBar';
import { ReIdPanel } from '../components/ReIdPanel';
import { EventStream } from '../components/EventStream';
import { SystemStatus } from '../components/SystemStatus';
import { AIPipelineStatus } from '../components/AIPipelineStatus';
import { useSystem } from '../context/SystemContext';

export const Dashboard = () => {
  const { fps, network, queue, kpis } = useSystem();

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <KPIBar 
        cameras={kpis.cameras}
        activeTracks={kpis.activeTracks}
        activeIncidents={kpis.activeIncidents}
        highRisk={kpis.highRisk}
        eventsToday={kpis.eventsToday}
        fps={fps}
      />

      {/* Main Content Grid */}
      <div className="flex-1 p-4 grid grid-cols-12 gap-4 min-h-0">
        
        {/* Left Column: Live Camera Grid (25%) */}
        <div className="col-span-3 min-h-0 bg-military-panel border border-military-green/30 rounded-lg p-2 overflow-y-auto">
          <div className="mb-2">
            <h2 className="text-[10px] font-bold text-military-muted uppercase tracking-widest px-2 font-mono">Live Camera Feeds</h2>
          </div>
          <CameraGrid layout="vertical" />
        </div>

        {/* Center Column: AI Processing & Intelligence (45%) */}
        <div className="col-span-6 flex flex-col gap-4 min-h-0">
          <div className="flex-[3] bg-military-panel border border-military-green/30 rounded-lg p-3 min-h-0 overflow-hidden flex flex-col shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
            <h2 className="text-[10px] font-bold text-military-text uppercase tracking-widest mb-2 shrink-0 font-mono">Border Zone Map</h2>
            <div className="flex-1 relative rounded overflow-hidden border border-military-green/20">
              <BorderMap />
            </div>
          </div>
          <div className="flex-[2] min-h-0 overflow-hidden flex flex-col">
            <EventStream />
          </div>
        </div>

        {/* Right Column: Threat Intelligence / Active Alerts (30%) */}
        <div className="col-span-3 flex flex-col gap-4 min-h-0">
          <div className="flex-[4] min-h-0 overflow-hidden flex flex-col">
            <IncidentPanel />
          </div>
          <div className="flex-[3] min-h-0 overflow-hidden">
             <ReIdPanel />
          </div>
          <div className="flex-[2] min-h-0">
             <SystemStatus fps={fps} network={network} queue={queue} />
          </div>
        </div>
      </div>

      {/* Bottom: AI Pipeline Status */}
      <div className="px-4 pb-4 shrink-0">
        <AIPipelineStatus />
      </div>
    </div>
  );
};

