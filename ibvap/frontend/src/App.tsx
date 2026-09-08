import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { LiveSurveillance } from './pages/LiveSurveillance';
import { AIProcessing } from './pages/AIProcessing';
import { PersonIntelligence } from './pages/PersonIntelligence';
import { RiskEngine } from './pages/RiskEngine';
import { BorderMapPage } from './pages/BorderMapPage';
import { Incidents } from './pages/Incidents';
import { Evidence } from './pages/Evidence';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { SystemProvider } from './context/SystemContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <SystemProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="surveillance" element={<LiveSurveillance />} />
              <Route path="ai" element={<AIProcessing />} />
              <Route path="intelligence" element={<PersonIntelligence />} />
              <Route path="risk" element={<RiskEngine />} />
              <Route path="map" element={<BorderMapPage />} />
              <Route path="incidents" element={<Incidents />} />
              <Route path="evidence" element={<Evidence />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SystemProvider>
    </AuthProvider>
  );
}

export default App;
