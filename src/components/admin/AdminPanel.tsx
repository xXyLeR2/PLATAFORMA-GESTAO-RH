import React, { useState } from 'react';
import { Settings, Users, FileText, BarChart3, Calendar, Brain, Award } from 'lucide-react';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<'overview' | 'surveys' | 'users' | 'reports'>('overview');

  const systemStats = [
    { label: 'Total de Usuários', value: 120, icon: Users, color: 'bg-blue-500' },
    { label: 'Pesquisas Ativas', value: 3, icon: FileText, color: 'bg-green-500' },
    { label: 'PDIs Criados', value: 156, icon: BarChart3, color: 'bg-purple-500' },
    { label: 'Avaliações Pendentes', value: 24, icon: Award, color: 'bg-orange-500' }
  ];

  const recentActivity = [
    { user: 'Ana Silva', action: 'Completou pesquisa de clima', time: '2h atrás' },
    { user: 'João Santos', action: 'Atualizou PDI', time: '4h atrás' },
    { user: 'Maria Costa', action: 'Finalizou teste DISC', time: '1 dia atrás' },
    { user: 'Carlos Lima', action: 'Agendou reunião de feedback', time: '2 dias atrás' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Settings className="w-8 h-8 text-gray-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Painel Administrativo</h1>
            <p className="text-gray-600">Gerencie usuários, pesquisas e configurações da plataforma</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Visão Geral' },
            { id: 'surveys', label: 'Gerenciar Pesquisas' },
            { id: 'users', label: 'Usuários' },
            { id: 'reports', label: 'Relatórios' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-gray-500 text-gray-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {systemStats.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-4">
                  <div className={`p-3 ${stat.color} rounded-lg`}>
                    <stat.icon size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Atividade Recente</h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <span className="font-medium text-gray-900">{activity.user}</span>
                    <span className="text-gray-600 ml-2">{activity.action}</span>
                  </div>
                  <span className="text-gray-500 text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-left">
              <FileText className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Nova Pesquisa</h3>
              <p className="text-gray-600 text-sm">Criar pesquisa de clima ou experiência</p>
            </button>

            <button className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors text-left">
              <Users className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Gerenciar Usuários</h3>
              <p className="text-gray-600 text-sm">Adicionar ou editar colaboradores</p>
            </button>

            <button className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors text-left">
              <BarChart3 className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Relatórios</h3>
              <p className="text-gray-600 text-sm">Gerar relatórios consolidados</p>
            </button>
          </div>
        </div>
      )}

      {/* Surveys Management Tab */}
      {activeTab === 'surveys' && (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Gerenciamento de Pesquisas</h3>
          <p className="text-gray-600 mb-4">
            Configure e gerencie pesquisas de clima, experiência e avaliações
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Configurar Pesquisas
          </button>
        </div>
      )}

      {/* Users Management Tab */}
      {activeTab === 'users' && (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Gerenciamento de Usuários</h3>
          <p className="text-gray-600 mb-4">
            Adicione, edite e gerencie permissões dos usuários da plataforma
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Gerenciar Usuários
          </button>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Relatórios e Analytics</h3>
          <p className="text-gray-600 mb-4">
            Gere relatórios detalhados sobre cultura, desempenho e engajamento
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Gerar Relatórios
          </button>
        </div>
      )}
    </div>
  );
}