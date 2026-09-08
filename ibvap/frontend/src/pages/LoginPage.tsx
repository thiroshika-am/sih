import React from 'react';
import { TacticalBackground } from '../components/login/TacticalBackground';
import { SystemTelemetry } from '../components/login/SystemTelemetry';
import { LoginForm } from '../components/login/LoginForm';
import { SecurityStatus } from '../components/login/SecurityStatus';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row bg-military-bg overflow-hidden text-military-text selection:bg-military-green selection:text-white">
      
      {/* Left Pane - Tactical Environment (60%) */}
      <div className="relative w-full md:w-[60%] h-[40vh] md:h-full border-b md:border-b-0 md:border-r border-military-green/30 bg-military-bg shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] z-0">
        <SystemTelemetry />
        <TacticalBackground />
      </div>

      {/* Right Pane - Authentication Panel (40%) */}
      <div className="relative w-full md:w-[40%] h-[60vh] md:h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-military-bg to-[#050805] z-10">
        
        {/* Subtle right side grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(216,221,200,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(216,221,200,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
        
        <div className="relative z-10 w-full flex flex-col items-center max-w-sm">
          <LoginForm />
          <SecurityStatus />
        </div>
        
      </div>
    </div>
  );
};
