import React, { useState } from 'react';
import Sidebar from './navigation/Sidebar';
import Header from './navigation/Header';
import DashboardOverview from './dashboard/DashboardOverview';
import ClimateResearch from './research/ClimateResearch';
import PDISection from './pdi/PDISection';
import ExperienceResearch from './research/ExperienceResearch';
import UserProfile from './profile/UserProfile';
import SchedulingSystem from './scheduling/SchedulingSystem';
import BehavioralTests from './tests/BehavioralTests';
import PerformanceEvaluation from './evaluation/PerformanceEvaluation';
import CultureManagement from './culture/CultureManagement';
import AdminPanel from './admin/AdminPanel';

export type NavigationItem = 
  | 'dashboard' 
  | 'climate' 
  | 'pdi' 
  | 'experience' 
  | 'profile' 
  | 'scheduling' 
  | 'tests' 
  | 'evaluation' 
  | 'culture'
  | 'admin';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<NavigationItem>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'climate':
        return <ClimateResearch />;
      case 'pdi':
        return <PDISection />;
      case 'experience':
        return <ExperienceResearch />;
      case 'profile':
        return <UserProfile />;
      case 'scheduling':
        return <SchedulingSystem />;
      case 'tests':
        return <BehavioralTests />;
      case 'evaluation':
        return <PerformanceEvaluation />;
      case 'culture':
        return <CultureManagement />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}