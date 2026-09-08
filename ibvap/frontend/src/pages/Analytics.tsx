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
  { value: 12450, name: 'Total Detections', fill: '#3b82f6' },
  { value: 830, name: 'Persons Tracked', fill: '#10b981' },
  { value: 145, name: 'Risk Evaluated', fill: '#f59e0b' },
  { value: 12, name: 'High-Risk Alerts', fill: '#ef4444' }
];

export const Analytics = () => {
  return (
    <div className="flex flex-col h-full p-4 gap-4 animate-in fade-in duration-500 overflow-y-auto">
      <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-4 rounded-lg shrink-0 shadow-lg shadow-black/20">
        <div className="p-2 bg-pink-500/10 rounded-md border border-pink-500/30">
          <BarChart3 className="w-6 h-6 text-pink-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-100 tracking-wide">System Analytics</h1>
          <p className="text-xs text-slate-400 font-mono tracking-widest uppercase">Performance & Threat Insights</p>
        </div>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-5 gap-4 shrink-0">
         {[
           { label: 'Total Detections', value: '12,450', color: 'text-blue-400' },
           { label: 'Unique Persons', value: '830', color: 'text-emerald-400' },
           { label: 'Alerts Generated', value: '12', color: 'text-amber-400' },
           { label: 'High-Risk Events', value: '3', color: 'text-red-400' },
           { label: 'Avg Inference Latency', value: '42ms', color: 'text-purple-400' }
         ].map((k, i) => (
           <div key={i} className="bg-slate-900 border border-slate-800 p-4 rounded-lg shadow-lg flex flex-col justify-center">
             <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{k.label}</div>
             <div className={`text-2xl font-black font-mono ${k.color}`}>{k.value}</div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-12 gap-4 min-h-[300px]">
        {/* Detection Timeline */}
        <div className="col-span-8 bg-slate-900 border border-slate-800 p-4 rounded-lg shadow-lg flex flex-col">
           <h2 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
             <LineChartIcon className="w-4 h-4 text-slate-500" /> Detection Volume vs Alerts
           </h2>
           <div className="flex-1 min-h-0">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorDet" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorAlert" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="time" stroke="#475569" fontSize={10} tickMargin={10} />
                  <YAxis stroke="#475569" fontSize={10} />
                  <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '4px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="detections" stroke="#3b82f6" fillOpacity={1} fill="url(#colorDet)" />
                  <Area type="monotone" dataKey="alerts" stroke="#ef4444" fillOpacity={1} fill="url(#colorAlert)" />
                </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Funnel */}
        <div className="col-span-4 bg-slate-900 border border-slate-800 p-4 rounded-lg shadow-lg flex flex-col">
           <h2 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
             <Activity className="w-4 h-4 text-slate-500" /> AI Pipeline Funnel
           </h2>
           <div className="flex-1 min-h-0">
             <ResponsiveContainer width="100%" height="100%">
               <FunnelChart>
                 <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '4px', fontSize: '12px' }} />
                 <Funnel dataKey="value" data={funnelData} isAnimationActive>
                   <LabelList position="right" fill="#cbd5e1" stroke="none" dataKey="name" fontSize={10} />
                 </Funnel>
               </FunnelChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 min-h-[250px]">
        {/* Events by Zone */}
        <div className="col-span-6 bg-slate-900 border border-slate-800 p-4 rounded-lg shadow-lg flex flex-col">
           <h2 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2 mb-4 border-b border-slate-800 pb-2">
             <PieChartIcon className="w-4 h-4 text-slate-500" /> Activity by Zone
           </h2>
           <div className="flex-1 min-h-0">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={zoneData} layout="vertical" margin={{ top: 0, right: 0, left: 10, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                 <XAxis type="number" stroke="#475569" fontSize={10} />
                 <YAxis dataKey="name" type="category" stroke="#475569" fontSize={10} width={100} />
                 <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '4px', fontSize: '12px' }} cursor={{fill: '#1e293b'}} />
                 <Bar dataKey="events" fill="#10b981" radius={[0, 4, 4, 0]} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
        
        {/* Empty Placeholder for future metrics */}
        <div className="col-span-6 bg-slate-900 border border-slate-800 border-dashed p-4 rounded-lg shadow-lg flex flex-col items-center justify-center text-slate-600">
           <p className="font-mono text-xs uppercase tracking-widest">More metrics can be added here</p>
        </div>
      </div>

    </div>
  );
};
