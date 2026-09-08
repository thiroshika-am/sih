import { FolderSearch, Download, Play, Image as ImageIcon, FileText, Share2 } from 'lucide-react';

export const Evidence = () => {
  return (
    <div className="flex flex-col h-full p-4 gap-4 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 bg-military-panel border border-military-green/30 p-4 rounded-lg shrink-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.4)]">
        <div className="p-2 bg-military-muted/10 rounded-md border border-military-muted/30">
          <FolderSearch className="w-6 h-6 text-military-muted" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-military-text tracking-wide">Evidence Center</h1>
          <p className="text-[10px] text-military-muted font-mono tracking-widest uppercase">Secure Forensics Vault</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        {/* Evidence List */}
        <div className="col-span-4 bg-military-panel border border-military-green/30 rounded-lg shadow-[inset_0_0_15px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden">
          <div className="p-4 border-b border-military-green/30 flex justify-between items-center bg-military-bg">
             <h2 className="text-[10px] font-bold text-military-text uppercase tracking-widest font-mono">Evidence Packages</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
             {[
               { id: 'EVD-9932', inc: 'INC-1045', type: 'VIDEO', time: '01:14 AM' },
               { id: 'EVD-9933', inc: 'INC-1045', type: 'SNAPSHOT', time: '01:14 AM' },
               { id: 'EVD-9934', inc: 'INC-1046', type: 'VIDEO', time: '02:05 AM' },
               { id: 'EVD-9935', inc: 'INC-1046', type: 'REPORT', time: '02:06 AM' }
             ].map((e, i) => (
               <div key={i} className={`p-3 rounded border cursor-pointer transition-colors ${i === 2 ? 'bg-military-green/10 border-military-green/50' : 'bg-military-bg border-military-green/30 hover:border-military-green/60'}`}>
                 <div className="flex justify-between items-start mb-2">
                    <span className={`text-sm font-bold font-mono ${i === 2 ? 'text-military-green' : 'text-military-text'}`}>{e.id}</span>
                    <span className="text-[10px] text-military-muted font-mono">{e.time}</span>
                 </div>
                 <div className="flex justify-between items-center">
                    <span className="text-[10px] text-military-muted uppercase tracking-widest flex items-center gap-1 font-mono">
                      {e.type === 'VIDEO' ? <Play className="w-3 h-3"/> : e.type === 'SNAPSHOT' ? <ImageIcon className="w-3 h-3"/> : <FileText className="w-3 h-3"/>}
                      {e.type}
                    </span>
                    <span className="text-[10px] font-mono text-military-muted border border-military-green/30 px-1 rounded font-bold">{e.inc}</span>
                 </div>
               </div>
             ))}
          </div>
        </div>

        {/* Evidence Viewer */}
        <div className="col-span-8 bg-military-panel border border-military-green/30 rounded-lg shadow-[inset_0_0_15px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden">
           <div className="p-4 border-b border-military-green/30 flex justify-between items-center bg-military-bg">
             <div className="flex items-center gap-4">
                <h2 className="text-lg font-bold font-mono text-military-text tracking-wider">EVD-9934</h2>
                <span className="bg-military-critical/20 text-military-critical border border-military-critical/50 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase">CRITICAL INCIDENT</span>
             </div>
             <div className="flex gap-2">
                <button className="p-2 bg-military-panel hover:bg-military-green/20 text-military-text rounded border border-military-green/30 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="flex items-center gap-2 bg-military-green/20 hover:bg-military-green/40 text-military-text border border-military-green/50 px-3 py-1.5 rounded text-[10px] font-bold tracking-widest transition-colors shadow-[0_0_15px_rgba(85,107,47,0.4)] uppercase">
                  <Download className="w-4 h-4 text-military-green" /> Export Package
                </button>
             </div>
           </div>
           
           <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
             
             {/* Media Viewer Mock */}
             <div className="w-full aspect-video bg-black rounded-lg border border-military-green/30 relative overflow-hidden flex items-center justify-center group shadow-2xl">
                <div className="absolute top-4 left-4 bg-black/80 text-military-text px-2 py-1 rounded text-[10px] font-mono border border-military-muted/30 z-10">
                   CAM-05 | SENSITIVE-ZONE | PLAYBACK
                </div>
                <div className="absolute inset-0 cctv-noise opacity-20 pointer-events-none"></div>
                <button className="w-16 h-16 bg-military-green/80 hover:bg-military-green text-military-bg rounded-full flex items-center justify-center transition-transform hover:scale-110 z-10 shadow-[0_0_30px_rgba(85,107,47,0.8)]">
                   <Play className="w-8 h-8 ml-1" />
                </button>
                
                {/* Simulated Bounding Box */}
                <div className="absolute top-1/3 left-1/2 w-32 h-64 border-2 border-military-critical/50 bg-military-critical/10 pointer-events-none">
                   <div className="absolute -top-6 left-0 bg-military-critical text-military-bg text-[10px] font-mono font-bold px-1 py-0.5">TARGET P-092</div>
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
                <div className="bg-military-bg p-4 rounded border border-military-green/30">
                   <h3 className="text-[10px] font-bold text-military-muted font-mono uppercase tracking-widest mb-4 border-b border-military-green/30 pb-2">Event Metadata</h3>
                   <table className="w-full text-sm font-mono text-military-text">
                      <tbody>
                         <tr className="border-b border-military-green/20"><td className="py-2 text-[10px] uppercase font-bold text-military-muted">Timestamp</td><td className="py-2 text-right">02:05:14 AM</td></tr>
                         <tr className="border-b border-military-green/20"><td className="py-2 text-[10px] uppercase font-bold text-military-muted">Source Camera</td><td className="py-2 text-right">CAM-05</td></tr>
                         <tr className="border-b border-military-green/20"><td className="py-2 text-[10px] uppercase font-bold text-military-muted">Location</td><td className="py-2 text-right text-military-success">SENSITIVE-ZONE</td></tr>
                         <tr className="border-b border-military-green/20"><td className="py-2 text-[10px] uppercase font-bold text-military-muted">Target ID</td><td className="py-2 text-right text-military-green">P-092</td></tr>
                         <tr><td className="py-2 text-[10px] uppercase font-bold text-military-muted">Max Risk Score</td><td className="py-2 text-right text-military-critical font-bold">72</td></tr>
                      </tbody>
                   </table>
                </div>

                <div className="bg-military-bg p-4 rounded border border-military-green/30 flex flex-col">
                   <h3 className="text-[10px] font-bold text-military-muted font-mono uppercase tracking-widest mb-4 border-b border-military-green/30 pb-2">Chain of Custody</h3>
                   <div className="flex-1 space-y-4">
                      <div className="flex gap-3 text-[10px] font-mono tracking-widest uppercase">
                         <div className="w-2 h-2 mt-1 rounded-full bg-military-success shrink-0"></div>
                         <div>
                           <div className="text-military-text font-bold">Auto-captured by System</div>
                           <div className="text-[10px] text-military-muted font-mono">02:05:15 AM - SHA256 Validated</div>
                         </div>
                      </div>
                      <div className="flex gap-3 text-[10px] font-mono tracking-widest uppercase">
                         <div className="w-2 h-2 mt-1 rounded-full bg-military-green shrink-0"></div>
                         <div>
                           <div className="text-military-text font-bold">Reviewed by Operator 04</div>
                           <div className="text-[10px] text-military-muted font-mono">02:08:22 AM - Added note</div>
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
