import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Cctv, 
  Cpu, 
  UserSearch, 
  AlertOctagon, 
  Map, 
  Siren, 
  FolderSearch, 
  BarChart3, 
  Settings
} from 'lucide-react';

const navItems = [
  { path: '/', label: 'Mission Control', icon: LayoutDashboard },
  { path: '/surveillance', label: 'Live Surveillance', icon: Cctv },
  { path: '/ai', label: 'AI Processing', icon: Cpu },
  { path: '/intelligence', label: 'Person Intelligence', icon: UserSearch },
  { path: '/risk', label: 'Risk Engine', icon: AlertOctagon },
  { path: '/map', label: 'Border Map', icon: Map },
  { path: '/incidents', label: 'Incidents', icon: Siren },
  { path: '/evidence', label: 'Evidence', icon: FolderSearch },
  { path: '/analytics', label: 'System Analytics', icon: BarChart3 },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-military-bg border-r border-military-green/30 flex flex-col h-full shrink-0 relative z-40">
      <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-2">
        <div className="px-3 mb-4">
          <h2 className="text-[10px] font-bold text-military-muted tracking-widest uppercase font-mono">Modules</h2>
        </div>
        
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all group ${
                  isActive 
                    ? 'bg-military-green/10 text-military-green border border-military-green/30 shadow-[inset_0_0_10px_rgba(85,107,47,0.1)]' 
                    : 'text-military-muted hover:bg-military-panel hover:text-military-text border border-transparent'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-military-green drop-shadow-[0_0_5px_rgba(85,107,47,0.5)]' : 'text-military-muted group-hover:text-military-text'}`} />
                  {item.label}
                  {isActive && (
                    <div className="ml-auto w-1 h-4 bg-military-green rounded-full shadow-[0_0_5px_rgba(85,107,47,0.8)]" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-military-green/30">
        <NavLink
          to="/settings"
          className={({ isActive }) => 
            `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all group ${
              isActive 
                ? 'bg-military-panel text-military-text border border-military-green/30' 
                : 'text-military-muted hover:bg-military-panel hover:text-military-text border border-transparent'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Settings className={`w-5 h-5 ${isActive ? 'text-military-text' : 'text-military-muted group-hover:text-military-text'}`} />
              System Settings
            </>
          )}
        </NavLink>
      </div>
    </aside>
  );
};
