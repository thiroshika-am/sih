import { useEffect, useState } from 'react';
import { wsService } from '../services/websocket';
import { ChevronRight } from 'lucide-react';

const PIPELINE_STAGES = [
  { id: 'video', label: 'VIDEO', time: '2ms' },
  { id: 'detect', label: 'DETECT', time: '18ms' },
  { id: 'track', label: 'TRACK', time: '6ms' },
  { id: 'verify', label: 'VERIFY', time: '15ms' },
  { id: 'analyze', label: 'ANALYZE', time: '8ms' },
  { id: 'score', label: 'SCORE', time: '3ms' },
  { id: 'decide', label: 'DECIDE', time: '1ms' }
];

export const AIPipelineStatus = () => {
  const [activeStage, setActiveStage] = useState<string | null>(null);

  useEffect(() => {
    const unsubDet = wsService.subscribe('detection', () => {
      let currentStage = 0;
      setActiveStage(PIPELINE_STAGES[0].id);
      
      const interval = setInterval(() => {
        currentStage++;
        if (currentStage >= PIPELINE_STAGES.length) {
          clearInterval(interval);
          setTimeout(() => setActiveStage(null), 500);
        } else {
          setActiveStage(PIPELINE_STAGES[currentStage].id);
        }
      }, 100);

      return () => clearInterval(interval);
    });

    return () => unsubDet();
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-3 flex items-center justify-between overflow-x-auto gap-2">
      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest shrink-0 mr-4">
        AI Pipeline Status
      </div>
      
      <div className="flex items-center gap-1 flex-1 min-w-max">
        {PIPELINE_STAGES.map((stage, index) => {
          const isActive = activeStage === stage.id;
          const isPast = activeStage && PIPELINE_STAGES.findIndex(s => s.id === activeStage) > index;
          
          return (
            <div key={stage.id} className="flex items-center gap-1">
              <div className={`flex flex-col items-center justify-center px-4 py-1.5 rounded border transition-all duration-300 min-w-[80px]
                ${isActive ? 'bg-purple-500/20 border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.3)]' : 
                  isPast ? 'bg-emerald-500/10 border-emerald-500/30' : 
                  'bg-slate-950 border-slate-800'}`}>
                <span className={`text-[10px] font-bold tracking-widest ${isActive ? 'text-purple-400' : isPast ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {stage.label}
                </span>
                <span className={`text-[9px] font-mono ${isActive ? 'text-purple-300/70' : 'text-slate-600'}`}>
                  {isActive || isPast ? stage.time : '...'}
                </span>
              </div>
              {index < PIPELINE_STAGES.length - 1 && (
                <ChevronRight className={`w-4 h-4 ${isPast ? 'text-emerald-500/50' : 'text-slate-700'}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
