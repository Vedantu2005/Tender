import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { AIChatAssistant } from './components/AIChatAssistant';
import { ProtectedRoute } from './components/ProtectedRoute';

import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { AIMatching } from './pages/AIMatching';
import { Dashboard } from './pages/Dashboard';
import { TenderExplorer } from './pages/TenderExplorer';
import { TenderDetails } from './pages/TenderDetails';
import { KeywordIntelligence } from './pages/KeywordIntelligence';
import { AlertCenter } from './pages/AlertCenter';
import { ReportsAnalytics } from './pages/ReportsAnalytics';
import { PortalMonitoring } from './pages/PortalMonitoring';
import { UserManagement } from './pages/UserManagement';
import { Settings } from './pages/Settings';

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="app-container">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {isSidebarOpen && (
        <div 
          className="show-mobile"
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 35,
            backdropFilter: 'blur(2px)'
          }}
        />
      )}

      <div className="main-content">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
      <AIChatAssistant />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="explorer" element={<TenderExplorer />} />
            <Route path="tender/:id" element={<TenderDetails />} />
            <Route path="insights" element={<AIMatching />} />
            <Route path="keywords" element={<KeywordIntelligence />} />
            <Route path="alerts" element={<AlertCenter />} />
            <Route path="saved" element={<TenderExplorer />} />
            <Route path="reports" element={<ReportsAnalytics />} />
            <Route path="monitoring" element={<PortalMonitoring />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
