import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <SystemProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
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
  );
}

export default App;
