import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User, Mail, Building, Calendar, Target, BarChart3, Brain, Award } from 'lucide-react';

export default function UserProfile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'pdi' | 'surveys' | 'tests' | 'evaluations'>('overview');

  const profileData = {
    joinDate: '2022-03-15',
    manager: 'Carlos Santos',
    team: 'Desenvolvimento Frontend',
    goals: [
      { title: 'Desenvolver habilidades em React', progress: 65, status: 'in_progress' },
      { title: 'Melhorar comunicação', progress: 20, status: 'planned' }
    ],
    surveys: [
      { name: 'Pesquisa de Clima Q1', date: '2024-01-15', score: 8.4 },
      { name: 'Experiência 90 dias', date: '2023-06-20', score: 9.2 }
    ],
    tests: [
      { name: 'DISC', result: 'Dominante/Influente', date: '2023-12-10' },
      { name: 'Cultura Organizacional', result: '87% Aderência', date: '2024-01-05' }
    ],
    evaluations: [
      { period: 'Q4 2023', score: 8.7, type: '360°' },
      { period: 'Q3 2023', score: 8.2, type: 'Autoavaliação' }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-2xl">
              {user?.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
            </span>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
            <p className="text-gray-600">{user?.position}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Building size={14} />
                {user?.department}
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                Na empresa desde {profileData.joinDate}
              </div>
              <div className="flex items-center gap-1">
                <User size={14} />
                Gerente: {profileData.manager}
              </div>
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Editar Perfil
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Visão Geral', icon: User },
            { id: 'pdi', label: 'PDI', icon: Target },
            { id: 'surveys', label: 'Pesquisas', icon: BarChart3 },
            { id: 'tests', label: 'Testes', icon: Brain },
            { id: 'evaluations', label: 'Avaliações', icon: Award }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Stats */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Resumo de Atividades</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{profileData.goals.length}</div>
                <div className="text-sm text-gray-600">Objetivos PDI</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{profileData.surveys.length}</div>
                <div className="text-sm text-gray-600">Pesquisas</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{profileData.tests.length}</div>
                <div className="text-sm text-gray-600">Testes</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{profileData.evaluations.length}</div>
                <div className="text-sm text-gray-600">Avaliações</div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Atividade Recente</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-green-100 rounded-lg">
                  <BarChart3 size={16} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">Pesquisa de Clima Q1</p>
                  <p className="text-gray-600 text-xs">Concluída • Pontuação: 8.4</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Target size={16} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">PDI Atualizado</p>
                  <p className="text-gray-600 text-xs">Progresso em React: 65%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PDI Tab */}
      {activeTab === 'pdi' && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Objetivos de Desenvolvimento</h3>
          <div className="space-y-4">
            {profileData.goals.map((goal, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium text-gray-900">{goal.title}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    goal.status === 'in_progress' 
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {goal.status === 'in_progress' ? 'Em andamento' : 'Planejado'}
                  </span>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Progresso</span>
                    <span className="text-gray-900">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Surveys Tab */}
      {activeTab === 'surveys' && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibent text-gray-900 mb-4">Histórico de Pesquisas</h3>
          <div className="space-y-4">
            {profileData.surveys.map((survey, index) => (
              <div key={index} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{survey.name}</h4>
                  <p className="text-gray-600 text-sm">{survey.date}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">{survey.score}</div>
                  <div className="text-xs text-gray-600">Pontuação</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tests Tab */}
      {activeTab === 'tests' && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Resultados de Testes</h3>
          <div className="space-y-4">
            {profileData.tests.map((test, index) => (
              <div key={index} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{test.name}</h4>
                  <p className="text-gray-600 text-sm">{test.date}</p>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">{test.result}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Evaluations Tab */}
      {activeTab === 'evaluations' && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Histórico de Avaliações</h3>
          <div className="space-y-4">
            {profileData.evaluations.map((evaluation, index) => (
              <div key={index} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{evaluation.period}</h4>
                  <p className="text-gray-600 text-sm">{evaluation.type}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-gray-900">{evaluation.score}</div>
                  <div className="text-xs text-gray-600">Pontuação</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}