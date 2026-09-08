import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, ChevronRight, AlertCircle, Radio } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [operatorId, setOperatorId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [status, setStatus] = useState<'IDLE' | 'AUTHENTICATING' | 'VERIFIED' | 'ERROR'>('IDLE');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!operatorId || !password) {
      setStatus('ERROR');
      return;
    }
    
    // Start fake auth sequence
    setStatus('AUTHENTICATING');
    
    setTimeout(() => {
      // For demo purposes, we accept any credentials
      // In a real app we would check credentials here
      setStatus('VERIFIED');
      
      setTimeout(() => {
        login();
        navigate('/');
      }, 1500);
      
    }, 1500);
  };

  return (
    <div className="w-full max-w-sm bg-military-panel border border-military-green/30 p-8 rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 border-b border-military-green/20 pb-6">
        <div className="p-3 bg-military-bg rounded-lg border border-military-green/40 text-military-green">
          <Shield className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-widest text-military-text font-sans">IBVAP</h2>
          <p className="text-[10px] font-mono tracking-widest text-military-success">SECURE COMMAND ACCESS</p>
        </div>
      </div>
      
      <div className="mb-8">
        <p className="text-xs font-mono tracking-widest text-military-warning mb-2 flex items-center gap-2">
          <AlertCircle className="w-3 h-3" /> AUTHORIZED PERSONNEL ONLY
        </p>
        <p className="text-xs text-military-muted font-sans leading-relaxed">
          Authenticate to access the AI Border Surveillance Command Center.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        
        {/* Operator ID */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-mono tracking-widest text-military-text">OPERATOR ID</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-4 w-4 text-military-muted" />
            </div>
            <input
              type="text"
              value={operatorId}
              onChange={(e) => setOperatorId(e.target.value)}
              className="w-full bg-military-bg border border-military-green/30 text-military-text text-sm rounded-md pl-10 pr-4 py-2.5 focus:outline-none focus:border-military-green focus:ring-1 focus:ring-military-green transition-all placeholder:text-military-muted/50 font-mono"
              placeholder="Enter operator ID"
              disabled={status === 'AUTHENTICATING' || status === 'VERIFIED'}
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-mono tracking-widest text-military-text">PASSWORD</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-4 w-4 text-military-muted" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-military-bg border border-military-green/30 text-military-text text-sm rounded-md pl-10 pr-10 py-2.5 focus:outline-none focus:border-military-green focus:ring-1 focus:ring-military-green transition-all placeholder:text-military-muted/50 font-mono tracking-widest"
              placeholder="••••••••"
              disabled={status === 'AUTHENTICATING' || status === 'VERIFIED'}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-military-muted hover:text-military-text transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              <span className="text-[10px] font-mono">{showPassword ? 'HIDE' : 'SHOW'}</span>
            </button>
          </div>
        </div>
        
        {/* Error State */}
        {status === 'ERROR' && (
          <div className="bg-military-critical/10 border border-military-critical/30 p-3 rounded flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-military-critical shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-military-critical tracking-wider">ACCESS DENIED</span>
              <span className="text-[10px] font-mono text-military-critical/80">INVALID OPERATOR CREDENTIALS</span>
            </div>
          </div>
        )}

        {/* Success Transition Overlay */}
        {status === 'VERIFIED' && (
          <div className="absolute inset-0 bg-military-panel/95 backdrop-blur z-10 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
            <Shield className="w-12 h-12 text-military-success mb-4 animate-bounce" />
            <div className="flex flex-col gap-4 font-mono text-xs w-full">
              <div className="flex items-center gap-2 text-military-muted">
                <ChevronRight className="w-4 h-4 text-military-success" />
                <span>ACCESS REQUEST</span>
              </div>
              <div className="flex items-center gap-2 text-military-text">
                <ChevronRight className="w-4 h-4 text-military-success" />
                <span>IDENTITY VERIFIED</span>
              </div>
              <div className="flex items-center gap-2 text-military-success font-bold text-sm bg-military-success/10 p-2 rounded border border-military-success/30">
                <Lock className="w-4 h-4" />
                <span>ACCESS GRANTED</span>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'AUTHENTICATING' || status === 'VERIFIED'}
          className={`mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-md font-bold tracking-widest text-xs transition-all ${
            status === 'AUTHENTICATING'
              ? 'bg-military-bg border border-military-green/50 text-military-green cursor-wait'
              : 'bg-military-green text-military-bg hover:bg-military-success hover:shadow-[0_0_15px_rgba(95,140,69,0.5)]'
          }`}
        >
          {status === 'AUTHENTICATING' ? (
            <>
              <div className="w-3 h-3 rounded-full border-2 border-military-green border-t-transparent animate-spin"></div>
              AUTHENTICATING...
            </>
          ) : (
            'AUTHENTICATE & ENTER'
          )}
        </button>
        
        {/* Footer info */}
        <div className="flex justify-between items-center mt-4 text-[9px] font-mono text-military-muted border-t border-military-green/10 pt-4">
          <span className="flex items-center gap-1"><Lock className="w-2.5 h-2.5" /> ENCRYPTED SESSION</span>
          <span className="flex items-center gap-1"><Radio className="w-2.5 h-2.5" /> SECURE EDGE CONNECTION</span>
        </div>
        
      </form>
    </div>
  );
};
