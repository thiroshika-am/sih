import { Settings as SettingsIcon, Save, Server, Shield, Database, Bell } from 'lucide-react';

export const Settings = () => {
  return (
    <div className="p-6 h-full overflow-y-auto animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-6">
        <SettingsIcon className="w-8 h-8 text-military-green" />
        <div>
          <h1 className="text-2xl font-bold font-mono text-military-text tracking-wider">SYSTEM SETTINGS</h1>
          <p className="text-[10px] text-military-muted font-mono tracking-widest uppercase">Configure IBVAP platform parameters</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl">
        {/* Core Configuration */}
        <div className="bg-military-panel/50 border border-military-green/30 rounded-lg p-5 shadow-[inset_0_0_15px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-2 mb-4">
            <Server className="w-5 h-5 text-military-green" />
            <h2 className="text-lg font-semibold font-mono tracking-wide text-military-text">AI Inference Engine</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono tracking-widest text-military-muted mb-1">DETECTION MODEL</label>
              <select className="w-full bg-military-bg border border-military-green/30 rounded p-2 text-sm font-mono text-military-text focus:border-military-green focus:ring-1 focus:ring-military-green outline-none">
                <option>YOLOv8x - High Accuracy</option>
                <option>YOLOv8m - Balanced</option>
                <option>YOLOv8n - High Performance</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-mono tracking-widest text-military-muted mb-1">TRACKING ALGORITHM</label>
              <select className="w-full bg-military-bg border border-military-green/30 rounded p-2 text-sm font-mono text-military-text focus:border-military-green focus:ring-1 focus:ring-military-green outline-none">
                <option>ByteTrack</option>
                <option>DeepSORT</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-mono tracking-widest text-military-muted mb-1">GPU ACCELERATION</label>
              <div className="flex items-center gap-3 mt-2">
                <div className="w-10 h-5 bg-military-green rounded-full relative cursor-pointer border border-military-green/50">
                  <div className="w-3 h-3 bg-military-bg rounded-full absolute top-1 right-1"></div>
                </div>
                <span className="text-[10px] tracking-widest uppercase font-mono font-bold text-military-text">TensorRT Enabled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Thresholds */}
        <div className="bg-military-panel/50 border border-military-green/30 rounded-lg p-5 shadow-[inset_0_0_15px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-military-warning" />
            <h2 className="text-lg font-semibold font-mono tracking-wide text-military-text">Risk Thresholds</h2>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-[10px] font-mono tracking-widest text-military-muted">CRITICAL ALERT SCORE</label>
                <span className="text-[10px] font-bold font-mono text-military-critical">80</span>
              </div>
              <input type="range" min="0" max="100" defaultValue="80" className="w-full accent-military-critical bg-military-bg h-1 rounded-lg appearance-none cursor-pointer" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-[10px] font-mono tracking-widest text-military-muted">HIGH RISK SCORE</label>
                <span className="text-[10px] font-bold font-mono text-military-warning">60</span>
              </div>
              <input type="range" min="0" max="100" defaultValue="60" className="w-full accent-military-warning bg-military-bg h-1 rounded-lg appearance-none cursor-pointer" />
            </div>
            <div>
              <label className="block text-[10px] font-mono tracking-widest text-military-muted mb-1 mt-4">DEFAULT BEHAVIOR MULTIPLIER</label>
              <input type="number" defaultValue="1.5" step="0.1" className="w-full bg-military-bg border border-military-green/30 rounded p-2 text-sm font-mono text-military-text focus:border-military-warning outline-none" />
            </div>
          </div>
        </div>

        {/* Database & Storage */}
        <div className="bg-military-panel/50 border border-military-green/30 rounded-lg p-5 shadow-[inset_0_0_15px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-military-muted" />
            <h2 className="text-lg font-semibold font-mono tracking-wide text-military-text">Data Retention</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono tracking-widest text-military-muted mb-1">EVIDENCE RETENTION (DAYS)</label>
              <input type="number" defaultValue="30" className="w-full bg-military-bg border border-military-green/30 rounded p-2 text-sm font-mono text-military-text focus:border-military-muted outline-none" />
            </div>
            <div>
              <label className="block text-[10px] font-mono tracking-widest text-military-muted mb-1">METADATA RETENTION (DAYS)</label>
              <input type="number" defaultValue="90" className="w-full bg-military-bg border border-military-green/30 rounded p-2 text-sm font-mono text-military-text focus:border-military-muted outline-none" />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-military-panel/50 border border-military-green/30 rounded-lg p-5 shadow-[inset_0_0_15px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-military-success" />
            <h2 className="text-lg font-semibold font-mono tracking-wide text-military-text">Alert Routing</h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 bg-military-bg border-military-green/30 rounded text-military-success focus:ring-military-success" />
              <span className="text-[10px] font-mono tracking-widest text-military-text uppercase">Push to Command Center UI</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4 bg-military-bg border-military-green/30 rounded text-military-success focus:ring-military-success" />
              <span className="text-[10px] font-mono tracking-widest text-military-text uppercase">SMS / Mobile Notification (Officers)</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4 bg-military-bg border-military-green/30 rounded text-military-success focus:ring-military-success" />
              <span className="text-[10px] font-mono tracking-widest text-military-text uppercase">Email Daily Digest</span>
            </label>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end max-w-5xl">
        <button className="flex items-center gap-2 bg-military-green/20 hover:bg-military-green/40 text-military-text border border-military-green/50 px-6 py-2.5 rounded shadow-[0_0_15px_rgba(85,107,47,0.4)] text-[10px] tracking-widest uppercase font-mono font-bold transition-all">
          <Save className="w-4 h-4 text-military-green" />
          SAVE CONFIGURATION
        </button>
      </div>
    </div>
  );
};
