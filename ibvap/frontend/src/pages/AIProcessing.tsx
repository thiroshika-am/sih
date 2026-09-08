import { useEffect, useState } from 'react';
import { wsService } from '../services/websocket';
import { useSystem } from '../context/SystemContext';
import { Cpu, Image as ImageIcon, BoxSelect, Route, ScanFace, BrainCircuit, Activity, ShieldAlert, CheckSquare } from 'lucide-react';

const PIPELINE_STAGES = [
  { id: 'input', label: 'FRAME INPUT', icon: ImageIcon, time: '2ms' },
  { id: 'preprocess', label: 'PREPROCESSING', icon: Cpu, time: '4ms' },
  { id: 'yolo', label: 'YOLO DETECTION', icon: BoxSelect, time: '18ms' },
  { id: 'track', label: 'OBJECT TRACKING', icon: Route, time: '6ms' },
  { id: 'extract', label: 'FEATURE EXTRACT', icon: ScanFace, time: '12ms' },
  { id: 'verify', label: 'IDENTITY VERIFY', icon: CheckSquare, time: '15ms' },
  { id: 'context', label: 'CONTEXT ANALYSIS', icon: BrainCircuit, time: '8ms' },
  { id: 'risk', label: 'RISK ENGINE', icon: Activity, time: '3ms' },
  { id: 'decision', label: 'DECISION', icon: ShieldAlert, time: '1ms' }
];

export const AIProcessing = () => {
  const { fps } = useSystem();
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [stats, setStats] = useState({
    persons: 0,
    vehicles: 0,
    inferenceTime: '42ms',
    trackingIds: [] as string[]
  });

  useEffect(() => {
    const unsubDet = wsService.subscribe('detection', (data) => {
      // Simulate pipeline animation
      let currentStage = 0;
      setActiveStage(PIPELINE_STAGES[0].id);
      
      setStats(s => ({
         ...s,
         persons: Math.max(1, s.persons),
         trackingIds: [...new Set([...s.trackingIds, `P-${data.person_id.split('-')[1] || data.person_id}`])].slice(-5),
         inferenceTime: `${38 + Math.floor(Math.random() * 10)}ms`
      }));

      const interval = setInterval(() => {
        currentStage++;
        if (currentStage >= PIPELINE_STAGES.length) {
          clearInterval(interval);
          setTimeout(() => setActiveStage(null), 500);
        } else {
          setActiveStage(PIPELINE_STAGES[currentStage].id);
        }
      }, 150);

      return () => clearInterval(interval);
    });

    return () => unsubDet();
  }, []);

  return (
    <div className="flex flex-col h-full p-4 gap-4 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-4 rounded-lg shrink-0 shadow-lg shadow-black/20">
        <div className="p-2 bg-purple-500/10 rounded-md border border-purple-500/30">
          <Cpu className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-100 tracking-wide">AI Processing Pipeline</h1>
          <p className="text-xs text-slate-400 font-mono tracking-widest uppercase">Deep Learning Inference Telemetry</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        
        {/* Technical Stats */}
        <div className="col-span-3 flex flex-col gap-4 min-h-0">
           <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 shadow-lg flex flex-col gap-4">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 border-b border-slate-800 pb-2">Current Frame Metadata</h2>
              
              <div className="flex justify-between items-center bg-slate-950 p-2 rounded border border-slate-800">
                 <span className="text-[10px] text-slate-400 font-mono uppercase">Resolution</span>
                 <span className="text-xs font-bold text-slate-200 font-mono">1920 × 1080</span>
              </div>
              <div className="flex justify-between items-center bg-slate-950 p-2 rounded border border-slate-800">
                 <span className="text-[10px] text-slate-400 font-mono uppercase">Total Inference</span>
                 <span className="text-xs font-bold text-emerald-400 font-mono">{stats.inferenceTime}</span>
              </div>
              <div className="flex justify-between items-center bg-slate-950 p-2 rounded border border-slate-800">
                 <span className="text-[10px] text-slate-400 font-mono uppercase">System FPS</span>
                 <span className="text-xs font-bold text-emerald-400 font-mono">{fps}</span>
              </div>
              <div className="flex justify-between items-center bg-slate-950 p-2 rounded border border-slate-800">
                 <span className="text-[10px] text-slate-400 font-mono uppercase">Persons Detected</span>
                 <span className="text-xs font-bold text-blue-400 font-mono">{stats.persons}</span>
              </div>
              <div className="flex justify-between items-center bg-slate-950 p-2 rounded border border-slate-800">
                 <span className="text-[10px] text-slate-400 font-mono uppercase">Vehicles Detected</span>
                 <span className="text-xs font-bold text-blue-400 font-mono">{stats.vehicles}</span>
              </div>
              
              <div className="mt-2 flex flex-col gap-2">
                 <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Active Tracking IDs</span>
                 <div className="flex flex-wrap gap-1">
                    {stats.trackingIds.length > 0 ? stats.trackingIds.map(id => (
                       <span key={id} className="text-[10px] font-mono bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded border border-blue-500/30">
                          {id}
                       </span>
                    )) : (
                       <span className="text-xs text-slate-600 font-mono">None</span>
                    )}
                 </div>
              </div>
           </div>
        </div>

        {/* Pipeline Visualization */}
        <div className="col-span-9 bg-slate-900 border border-slate-800 rounded-lg p-6 shadow-lg flex flex-col relative overflow-hidden">
           <div className="cctv-noise pointer-events-none opacity-10"></div>
           <h2 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-8 relative z-10">Real-Time Inference Flow</h2>
           
           <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto w-full relative z-10">
             
             {/* Pipeline Steps Grid */}
             <div className="grid grid-cols-3 gap-y-12 gap-x-8 relative">
                
                {/* Connecting lines between nodes (mocked structurally) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ strokeDasharray: "4,4" }}>
                   {/* We won't draw exact lines in standard CSS easily without complex calc, 
                       so we rely on the visual proximity in the grid, but could add generic lines if needed. */}
                </svg>

                {PIPELINE_STAGES.map((stage, index) => {
                  const Icon = stage.icon;
                  const isActive = activeStage === stage.id;
                  const isPast = activeStage && PIPELINE_STAGES.findIndex(s => s.id === activeStage) > index;
                  
                  return (
                    <div key={stage.id} className="flex flex-col items-center gap-3 relative z-10">
                       <div className={`
                         w-16 h-16 rounded-xl border-2 flex items-center justify-center transition-all duration-300
                         ${isActive ? 'bg-purple-500/20 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.5)] scale-110' : 
                           isPast ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 
                           'bg-slate-950 border-slate-800 text-slate-600'}
                       `}>
                         <Icon className={`w-8 h-8 ${isActive ? 'text-purple-400 animate-pulse' : ''}`} />
                       </div>
                       
                       <div className="text-center">
                          <div className={`text-[10px] font-bold tracking-widest uppercase ${isActive ? 'text-purple-300' : isPast ? 'text-slate-300' : 'text-slate-500'}`}>
                            {stage.label}
                          </div>
                          <div className={`text-[9px] font-mono mt-1 ${isActive ? 'text-purple-400/80' : 'text-slate-600'}`}>
                            {stage.time}
                          </div>
                       </div>
                    </div>
                  );
                })}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};
