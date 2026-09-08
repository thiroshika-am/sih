import { FolderSearch, Download, Play, Image as ImageIcon, FileText, Share2 } from 'lucide-react';

export const Evidence = () => {
  return (
    <div className="flex flex-col h-full p-4 gap-4 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-4 rounded-lg shrink-0 shadow-lg shadow-black/20">
        <div className="p-2 bg-indigo-500/10 rounded-md border border-indigo-500/30">
          <FolderSearch className="w-6 h-6 text-indigo-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-100 tracking-wide">Evidence Center</h1>
          <p className="text-xs text-slate-400 font-mono tracking-widest uppercase">Secure Forensics Vault</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        {/* Evidence List */}
        <div className="col-span-4 bg-slate-900 border border-slate-800 rounded-lg shadow-lg flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
             <h2 className="text-xs font-bold text-slate-300 uppercase tracking-widest">Evidence Packages</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
             {[
               { id: 'EVD-9932', inc: 'INC-1045', type: 'VIDEO', time: '01:14 AM' },
               { id: 'EVD-9933', inc: 'INC-1045', type: 'SNAPSHOT', time: '01:14 AM' },
               { id: 'EVD-9934', inc: 'INC-1046', type: 'VIDEO', time: '02:05 AM' },
               { id: 'EVD-9935', inc: 'INC-1046', type: 'REPORT', time: '02:06 AM' }
             ].map((e, i) => (
               <div key={i} className={`p-3 rounded border cursor-pointer transition-colors ${i === 2 ? 'bg-indigo-500/10 border-indigo-500/50' : 'bg-slate-950 border-slate-800 hover:border-slate-600'}`}>
                 <div className="flex justify-between items-start mb-2">
                    <span className={`text-sm font-bold font-mono ${i === 2 ? 'text-indigo-400' : 'text-slate-200'}`}>{e.id}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{e.time}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-1">
                      {e.type === 'VIDEO' ? <Play className="w-3 h-3"/> : e.type === 'SNAPSHOT' ? <ImageIcon className="w-3 h-3"/> : <FileText className="w-3 h-3"/>}
                      {e.type}
                    </span>
                    <span className="text-xs font-mono text-slate-500 border border-slate-700 px-1 rounded">{e.inc}</span>
                 </div>
               </div>
             ))}
          </div>
        </div>

        {/* Evidence Viewer */}
        <div className="col-span-8 bg-slate-900 border border-slate-800 rounded-lg shadow-lg flex flex-col overflow-hidden">
           <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950">
             <div className="flex items-center gap-4">
                <h2 className="text-lg font-bold font-mono text-slate-100 tracking-wider">EVD-9934</h2>
                <span className="bg-red-500/20 text-red-400 border border-red-500/50 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase">CRITICAL INCIDENT</span>
             </div>
             <div className="flex gap-2">
                <button className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded text-sm transition-colors shadow-lg shadow-indigo-500/20">
                  <Download className="w-4 h-4" /> Export Package
                </button>
             </div>
           </div>
           
           <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
             
             {/* Media Viewer Mock */}
             <div className="w-full aspect-video bg-black rounded-lg border border-slate-800 relative overflow-hidden flex items-center justify-center group shadow-2xl">
                <div className="absolute top-4 left-4 bg-black/80 text-white px-2 py-1 rounded text-[10px] font-mono border border-white/10 z-10">
                   CAM-05 | SENSITIVE-ZONE | PLAYBACK
                </div>
                <div className="absolute inset-0 cctv-noise opacity-20 pointer-events-none"></div>
                <button className="w-16 h-16 bg-blue-500/80 hover:bg-blue-500 text-white rounded-full flex items-center justify-center transition-transform hover:scale-110 z-10 shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                   <Play className="w-8 h-8 ml-1" />
                </button>
                
                {/* Simulated Bounding Box */}
                <div className="absolute top-1/3 left-1/2 w-32 h-64 border-2 border-red-500/50 bg-red-500/10 pointer-events-none">
                   <div className="absolute -top-6 left-0 bg-red-500 text-white text-[10px] font-mono font-bold px-1 py-0.5">TARGET P-092</div>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded border border-slate-800">
                   <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2">Event Metadata</h3>
                   <table className="w-full text-sm font-mono text-slate-300">
                      <tbody>
                         <tr className="border-b border-slate-800/50"><td className="py-2 text-slate-500">Timestamp</td><td className="py-2 text-right">02:05:14 AM</td></tr>
                         <tr className="border-b border-slate-800/50"><td className="py-2 text-slate-500">Source Camera</td><td className="py-2 text-right">CAM-05</td></tr>
                         <tr className="border-b border-slate-800/50"><td className="py-2 text-slate-500">Location</td><td className="py-2 text-right text-emerald-400">SENSITIVE-ZONE</td></tr>
                         <tr className="border-b border-slate-800/50"><td className="py-2 text-slate-500">Target ID</td><td className="py-2 text-right text-blue-400">P-092</td></tr>
                         <tr><td className="py-2 text-slate-500">Max Risk Score</td><td className="py-2 text-right text-red-400 font-bold">72</td></tr>
                      </tbody>
                   </table>
                </div>

                <div className="bg-slate-950 p-4 rounded border border-slate-800 flex flex-col">
                   <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-800 pb-2">Chain of Custody</h3>
                   <div className="flex-1 space-y-4">
                      <div className="flex gap-3 text-sm">
                         <div className="w-2 h-2 mt-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                         <div>
                           <div className="text-slate-300">Auto-captured by System</div>
                           <div className="text-[10px] text-slate-500 font-mono">02:05:15 AM - SHA256 Validated</div>
                         </div>
                      </div>
                      <div className="flex gap-3 text-sm">
                         <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 shrink-0"></div>
                         <div>
                           <div className="text-slate-300">Reviewed by Operator 04</div>
                           <div className="text-[10px] text-slate-500 font-mono">02:08:22 AM - Added note</div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
             
           </div>
        </div>
      </div>
    </div>
  );
};
