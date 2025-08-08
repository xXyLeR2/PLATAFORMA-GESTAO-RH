import React, { useState } from 'react';
import { MessageSquare, Plus, Users, TrendingUp, Calendar } from 'lucide-react';
import NewSurveyModal from '../modals/NewSurveyModal';

export default function ExperienceResearch() {
  const [activeTab, setActiveTab] = useState<'overview' | 'surveys' | 'journey'>('overview');
  const [showNewSurveyModal, setShowNewSurveyModal] = useState(false);

  const journeyMoments = [
    {
      id: '1',
      name: 'Onboarding',
      description: 'Primeira semana do colaborador',
      timing: 'Dia 7',
      responses: 45,
      avgScore: 8.7,
      color: 'bg-green-500'
    },
    {
      id: '2', 
      name: '90 Dias',
      description: 'Avaliação após período de adaptação',
      timing: '3 meses',
      responses: 38,
      avgScore: 8.2,
      color: 'bg-blue-500'
    },
    {
      id: '3',
      name: 'Aniversário',
      description: 'Pesquisa anual de experiência',
      timing: '1 ano',
      responses: 120,
      avgScore: 7.9,
      color: 'bg-purple-500'
    },
    {
      id: '4',
      name: 'Offboarding',
      description: 'Pesquisa de saída',
      timing: 'Saída',
      responses: 8,
      avgScore: 7.4,
      color: 'bg-orange-500'
    }
  ];

  const recentSurveys = [
    {
      id: '1',
      employee: 'Ana Silva',
      type: 'Onboarding',
      date: '2024-01-20',
      score: 9.2,
      status: 'completed'
    },
    {
      id: '2',
      employee: 'João Santos',
      type: '90 Dias',
      date: '2024-01-18',
      score: 8.5,
      status: 'completed'
    },
    {
      id: '3',
      employee: 'Maria Costa',
      type: 'Offboarding',
      date: '2024-01-15',
      score: 7.0,
      status: 'completed'
    }
  ];

  const handleNewSurvey = (surveyData: any) => {
    console.log('Nova pesquisa de experiência criada:', surveyData);
    // Aqui você adicionaria a lógica para salvar a pesquisa
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-8 h-8 text-green-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Experiência do Colaborador</h1>
            <p className="text-gray-600">Acompanhe a jornada e momentos-chave dos colaboradores</p>
          </div>
        </div>
        <button 
          onClick={() => setShowNewSurveyModal(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={20} />
          Nova Pesquisa
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Visão Geral' },
            { id: 'surveys', label: 'Pesquisas Recentes' },
            { id: 'journey', label: 'Jornada do Colaborador' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-green-500 text-green-600'
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
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">211</p>
                  <p className="text-gray-600 text-sm">Total de Respostas</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">8.1</p>
                  <p className="text-gray-600 text-sm">Experiência Média</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">4</p>
                  <p className="text-gray-600 text-sm">Momentos Mapeados</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">15</p>
                  <p className="text-gray-600 text-sm">Pesquisas Este Mês</p>
                </div>
              </div>
            </div>
          </div>

          {/* Journey Moments Overview */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-6">Momentos da Jornada</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {journeyMoments.map((moment) => (
                <div key={moment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-3 h-3 rounded-full ${moment.color}`}></div>
                    <h4 className="font-medium text-gray-900">{moment.name}</h4>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{moment.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Respostas:</span>
                      <span className="text-gray-900 font-medium">{moment.responses}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Média:</span>
                      <span className="text-gray-900 font-medium">{moment.avgScore}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recent Surveys Tab */}
      {activeTab === 'surveys' && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Pesquisas Recentes</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Colaborador
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pontuação
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentSurveys.map((survey) => (
                    <tr key={survey.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{survey.employee}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                          {survey.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {survey.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{survey.score}</span>
                          <div className={`w-2 h-2 rounded-full ${
                            survey.score >= 8 ? 'bg-green-500' : 
                            survey.score >= 6 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                          Concluída
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                          Ver Detalhes
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Journey Tab */}
      {activeTab === 'journey' && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-6">Mapa da Jornada do Colaborador</h3>
          
          {/* Journey Timeline */}
          <div className="relative">
            <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
            <div className="space-y-8">
              {journeyMoments.map((moment, index) => (
                <div key={moment.id} className="relative flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full ${moment.color} flex items-center justify-center relative z-10`}>
                    <span className="text-white font-medium text-sm">{index + 1}</span>
                  </div>
                  <div className="flex-1 bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{moment.name}</h4>
                        <p className="text-gray-600 text-sm">{moment.description}</p>
                        <p className="text-gray-500 text-xs mt-1">Timing: {moment.timing}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">{moment.avgScore}</div>
                        <div className="text-xs text-gray-600">{moment.responses} respostas</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${moment.color.replace('bg-', 'bg-')} transition-all duration-300`}
                          style={{ width: `${(moment.avgScore / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <NewSurveyModal
        isOpen={showNewSurveyModal}
        onClose={() => setShowNewSurveyModal(false)}
        onSubmit={handleNewSurvey}
        type="experience"
      />
    </div>
  );
}