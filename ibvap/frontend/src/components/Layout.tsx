import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export const Layout = () => {
  return (
    <div className="h-screen w-screen bg-military-bg text-military-text flex flex-col font-sans overflow-hidden selection:bg-military-green selection:text-white">
      <TopBar />
      <div className="flex-1 flex min-h-0">
        <Sidebar />
        <main className="flex-1 min-w-0 overflow-y-auto relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
