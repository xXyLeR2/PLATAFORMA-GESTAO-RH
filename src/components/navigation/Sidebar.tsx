import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  BarChart3, 
  Target, 
  MessageSquare, 
  User, 
  Calendar,
  Brain,
  Award,
  Heart,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import type { NavigationItem } from '../Dashboard';

interface SidebarProps {
  activeSection: NavigationItem;
  onSectionChange: (section: NavigationItem) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({ 
  activeSection, 
  onSectionChange, 
  collapsed, 
  onToggleCollapse 
}: SidebarProps) {
  const { user, logout } = useAuth();

  const menuItems = [
    { id: 'dashboard' as NavigationItem, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'climate' as NavigationItem, label: 'Pesquisa de Clima', icon: BarChart3 },
    { id: 'pdi' as NavigationItem, label: 'PDI', icon: Target },
    { id: 'experience' as NavigationItem, label: 'Experiência', icon: MessageSquare },
    { id: 'profile' as NavigationItem, label: 'Perfil', icon: User },
    { id: 'scheduling' as NavigationItem, label: 'Agendamentos', icon: Calendar },
    { id: 'tests' as NavigationItem, label: 'Testes', icon: Brain },
    { id: 'evaluation' as NavigationItem, label: 'Avaliações', icon: Award },
    { id: 'culture' as NavigationItem, label: 'Cultura', icon: Heart },
  ];

  // Add admin item for HR users
  if (user?.role === 'hr') {
    menuItems.push({ id: 'admin' as NavigationItem, label: 'Administração', icon: Settings });
  }

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} flex flex-col`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <h1 className="text-xl font-bold text-gray-900">PeopleHub</h1>
          )}
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-50 text-blue-600 font-medium' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <item.icon size={20} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-gray-200">
        {!collapsed && user && (
          <div className="mb-3">
            <p className="font-medium text-gray-900 text-sm">{user.name}</p>
            <p className="text-gray-600 text-xs">{user.position}</p>
          </div>
        )}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          title={collapsed ? 'Sair' : undefined}
        >
          <LogOut size={20} />
          {!collapsed && <span>Sair</span>}
        </button>
      </div>
    </div>
  );
}