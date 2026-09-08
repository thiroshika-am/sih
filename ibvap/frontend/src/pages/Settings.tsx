import { Settings as SettingsIcon, Save, Server, Shield, Database, Bell } from 'lucide-react';

export const Settings = () => {
  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="flex items-center gap-3 mb-6">
        <SettingsIcon className="w-8 h-8 text-blue-400" />
        <div>
          <h1 className="text-2xl font-bold text-slate-100 tracking-wider">SYSTEM SETTINGS</h1>
          <p className="text-sm text-slate-400">Configure IBVAP platform parameters</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl">
        {/* Core Configuration */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <Server className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-semibold text-slate-200">AI Inference Engine</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">DETECTION MODEL</label>
              <select className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none">
                <option>YOLOv8x - High Accuracy</option>
                <option>YOLOv8m - Balanced</option>
                <option>YOLOv8n - High Performance</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">TRACKING ALGORITHM</label>
              <select className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none">
                <option>ByteTrack</option>
                <option>DeepSORT</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">GPU ACCELERATION</label>
              <div className="flex items-center gap-3 mt-2">
                <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                  <div className="w-3 h-3 bg-white rounded-full absolute top-1 right-1"></div>
                </div>
                <span className="text-sm text-slate-300">TensorRT Enabled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Thresholds */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-semibold text-slate-200">Risk Thresholds</h2>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs font-medium text-slate-400">CRITICAL ALERT SCORE</label>
                <span className="text-xs font-bold text-red-400">80</span>
              </div>
              <input type="range" min="0" max="100" defaultValue="80" className="w-full accent-red-500 bg-slate-800 h-1 rounded-lg appearance-none cursor-pointer" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-xs font-medium text-slate-400">HIGH RISK SCORE</label>
                <span className="text-xs font-bold text-amber-400">60</span>
              </div>
              <input type="range" min="0" max="100" defaultValue="60" className="w-full accent-amber-500 bg-slate-800 h-1 rounded-lg appearance-none cursor-pointer" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1 mt-4">DEFAULT BEHAVIOR MULTIPLIER</label>
              <input type="number" defaultValue="1.5" step="0.1" className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-slate-200 focus:border-amber-500 outline-none" />
            </div>
          </div>
        </div>

        {/* Database & Storage */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-semibold text-slate-200">Data Retention</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">EVIDENCE RETENTION (DAYS)</label>
              <input type="number" defaultValue="30" className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-slate-200 focus:border-purple-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">METADATA RETENTION (DAYS)</label>
              <input type="number" defaultValue="90" className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-sm text-slate-200 focus:border-purple-500 outline-none" />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-semibold text-slate-200">Alert Routing</h2>
          </div>
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4 bg-slate-950 border-slate-700 rounded text-emerald-500 focus:ring-emerald-500" />
              <span className="text-sm text-slate-300">Push to Command Center UI</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4 bg-slate-950 border-slate-700 rounded text-emerald-500 focus:ring-emerald-500" />
              <span className="text-sm text-slate-300">SMS / Mobile Notification (Officers)</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4 bg-slate-950 border-slate-700 rounded text-emerald-500 focus:ring-emerald-500" />
              <span className="text-sm text-slate-300">Email Daily Digest</span>
            </label>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end max-w-5xl">
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded shadow-[0_0_15px_rgba(59,130,246,0.3)] font-semibold transition-all">
          <Save className="w-4 h-4" />
          SAVE CONFIGURATION
        </button>
      </div>
    </div>
  );
};
