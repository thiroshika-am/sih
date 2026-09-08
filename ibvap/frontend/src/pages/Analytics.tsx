import { BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Funnel, FunnelChart, LabelList } from 'recharts';

const timelineData = [
  { time: '00:00', detections: 24, alerts: 0 },
  { time: '04:00', detections: 13, alerts: 0 },
  { time: '08:00', detections: 98, alerts: 2 },
  { time: '12:00', detections: 145, alerts: 5 },
  { time: '16:00', detections: 110, alerts: 1 },
  { time: '20:00', detections: 45, alerts: 0 },
];

const zoneData = [
  { name: 'ZONE-A', events: 120 },
  { name: 'ZONE-B', events: 85 },
  { name: 'ZONE-C', events: 140 },
  { name: 'RESTRICTED', events: 15 },
  { name: 'SENSITIVE', events: 35 },
];

const funnelData = [
  { value: 12450, name: 'Total Detections', fill: '#556B2F' },
  { value: 830, name: 'Persons Tracked', fill: '#8AA158' },
  { value: 145, name: 'Risk Evaluated', fill: '#B8860B' },
  { value: 12, name: 'High-Risk Alerts', fill: '#8B0000' }
];

export const Analytics = () => {
  return (
    <div className="flex flex-col h-full p-4 gap-4 animate-in fade-in duration-500 overflow-y-auto">
      <div className="flex items-center gap-3 bg-military-panel border border-military-green/30 p-4 rounded-lg shrink-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.4)]">
        <div className="p-2 bg-military-green/10 rounded-md border border-military-green/30">
          <BarChart3 className="w-6 h-6 text-military-green" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-military-text tracking-wide">System Analytics</h1>
          <p className="text-[10px] text-military-muted font-mono tracking-widest uppercase">Performance & Threat Insights</p>
        </div>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-5 gap-4 shrink-0">
         {[
           { label: 'Total Detections', value: '12,450', color: 'text-military-success' },
           { label: 'Unique Persons', value: '830', color: 'text-military-green' },
           { label: 'Alerts Generated', value: '12', color: 'text-military-warning' },
           { label: 'High-Risk Events', value: '3', color: 'text-military-critical' },
           { label: 'Avg Inference Latency', value: '42ms', color: 'text-military-muted' }
         ].map((k, i) => (
           <div key={i} className="bg-military-panel border border-military-green/30 p-4 rounded-lg shadow-[inset_0_0_15px_rgba(0,0,0,0.4)] flex flex-col justify-center">
             <div className="text-[10px] font-bold text-military-muted uppercase tracking-widest mb-1">{k.label}</div>
             <div className={`text-2xl font-black font-mono ${k.color}`}>{k.value}</div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-12 gap-4 min-h-[300px]">
        {/* Detection Timeline */}
        <div className="col-span-8 bg-military-panel border border-military-green/30 p-4 rounded-lg shadow-[inset_0_0_15px_rgba(0,0,0,0.4)] flex flex-col">
           <h2 className="text-[10px] font-bold text-military-text uppercase tracking-widest font-mono flex items-center gap-2 mb-4 border-b border-military-green/30 pb-2">
             <LineChartIcon className="w-4 h-4 text-military-muted" /> Detection Volume vs Alerts
           </h2>
           <div className="flex-1 min-h-0">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorDet" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8AA158" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8AA158" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorAlert" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B0000" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8B0000" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(85,107,47,0.3)" vertical={false} />
                  <XAxis dataKey="time" stroke="rgba(85,107,47,0.8)" fontSize={10} tickMargin={10} />
                  <YAxis stroke="rgba(85,107,47,0.8)" fontSize={10} />
                  <RechartsTooltip contentStyle={{ backgroundColor: 'rgb(24,26,24)', borderColor: 'rgba(85,107,47,0.3)', borderRadius: '4px', fontSize: '12px', color: '#E2E8F0' }} />
                  <Area type="monotone" dataKey="detections" stroke="#8AA158" fillOpacity={1} fill="url(#colorDet)" />
                  <Area type="monotone" dataKey="alerts" stroke="#8B0000" fillOpacity={1} fill="url(#colorAlert)" />
                </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Funnel */}
        <div className="col-span-4 bg-military-panel border border-military-green/30 p-4 rounded-lg shadow-[inset_0_0_15px_rgba(0,0,0,0.4)] flex flex-col">
           <h2 className="text-[10px] font-bold text-military-text uppercase tracking-widest font-mono flex items-center gap-2 mb-4 border-b border-military-green/30 pb-2">
             <Activity className="w-4 h-4 text-military-muted" /> AI Pipeline Funnel
           </h2>
           <div className="flex-1 min-h-0">
             <ResponsiveContainer width="100%" height="100%">
               <FunnelChart>
                 <RechartsTooltip contentStyle={{ backgroundColor: 'rgb(24,26,24)', borderColor: 'rgba(85,107,47,0.3)', borderRadius: '4px', fontSize: '12px', color: '#E2E8F0' }} />
                 <Funnel dataKey="value" data={funnelData} isAnimationActive>
                   <LabelList position="right" fill="#A3A8A0" stroke="none" dataKey="name" fontSize={10} />
                 </Funnel>
               </FunnelChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 min-h-[250px]">
        {/* Events by Zone */}
        <div className="col-span-6 bg-military-panel border border-military-green/30 p-4 rounded-lg shadow-[inset_0_0_15px_rgba(0,0,0,0.4)] flex flex-col">
           <h2 className="text-[10px] font-bold text-military-text uppercase tracking-widest font-mono flex items-center gap-2 mb-4 border-b border-military-green/30 pb-2">
             <PieChartIcon className="w-4 h-4 text-military-muted" /> Activity by Zone
           </h2>
           <div className="flex-1 min-h-0">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={zoneData} layout="vertical" margin={{ top: 0, right: 0, left: 10, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="rgba(85,107,47,0.3)" horizontal={false} />
                 <XAxis type="number" stroke="rgba(85,107,47,0.8)" fontSize={10} />
                 <YAxis dataKey="name" type="category" stroke="rgba(85,107,47,0.8)" fontSize={10} width={100} />
                 <RechartsTooltip contentStyle={{ backgroundColor: 'rgb(24,26,24)', borderColor: 'rgba(85,107,47,0.3)', borderRadius: '4px', fontSize: '12px', color: '#E2E8F0' }} cursor={{fill: 'rgba(85,107,47,0.2)'}} />
                 <Bar dataKey="events" fill="#556B2F" radius={[0, 4, 4, 0]} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
        
        {/* Empty Placeholder for future metrics */}
        <div className="col-span-6 bg-military-panel/50 border border-military-green/30 border-dashed p-4 rounded-lg shadow-[inset_0_0_15px_rgba(0,0,0,0.2)] flex flex-col items-center justify-center text-military-muted">
           <p className="font-mono text-[10px] uppercase tracking-widest">More metrics can be added here</p>
        </div>
      </div>

    </div>
  );
};
