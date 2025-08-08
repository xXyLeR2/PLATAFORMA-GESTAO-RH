import React, { useState } from 'react';
import { BarChart3, Plus, Filter, Download, Users, TrendingUp } from 'lucide-react';
import NewSurveyModal from '../modals/NewSurveyModal';

export default function ClimateResearch() {
  const [activeTab, setActiveTab] = useState<'overview' | 'surveys' | 'results'>('overview');
  const [showNewSurveyModal, setShowNewSurveyModal] = useState(false);
  const [surveys, setSurveys] = useState([

    {
      id: '1',
      title: 'Pesquisa de Clima Q1 2024',
      status: 'active',
      responses: 89,
      totalEmployees: 120,
      endDate: '2024-01-31',
      categories: ['Liderança', 'Ambiente', 'Crescimento', 'Reconhecimento']
    },
    {
      id: '2',
      title: 'Avaliação Pós-Mudanças',
      status: 'draft',
      responses: 0,
      totalEmployees: 120,
      endDate: '2024-02-15',
      categories: ['Adaptação', 'Comunicação', 'Suporte']
    }
  ]);

  const results = [
    { category: 'Satisfação Geral', score: 8.4, trend: '+0.3', positive: true },
    { category: 'Liderança', score: 7.9, trend: '+0.5', positive: true },
    { category: 'Ambiente de Trabalho', score: 8.7, trend: '-0.1', positive: false },
    { category: 'Oportunidades de Crescimento', score: 7.2, trend: '+0.8', positive: true },
    { category: 'Reconhecimento', score: 7.6, trend: '+0.2', positive: true }
  ];

  const handleNewSurvey = (surveyData: any) => {
    setSurveys(prev => [...prev, {
      ...surveyData,
      id: Date.now().toString(),
      responses: 0,
      totalEmployees: 120
    }]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pesquisa de Clima</h1>
            <p className="text-gray-600">Monitore e melhore o ambiente organizacional</p>
          </div>
        </div>
        <button 
          onClick={() => setShowNewSurveyModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
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
            { id: 'surveys', label: 'Pesquisas' },
            { id: 'results', label: 'Resultados' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">89</p>
                  <p className="text-gray-600 text-sm">Respostas Recebidas</p>
                  <p className="text-green-600 text-xs">74% de participação</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">8.4</p>
                  <p className="text-gray-600 text-sm">Satisfação Média</p>
                  <p className="text-green-600 text-xs">+0.3 vs trimestre anterior</p>
                </div>
              </div>
            </div>

            {/* Results Summary */}
            <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Resultados por Categoria</h3>
              <div className="space-y-4">
                {results.map((result, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{result.category}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-semibold text-gray-900">{result.score}</span>
                      <span className={`text-sm font-medium ${
                        result.positive ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {result.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Active Survey */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Pesquisa Ativa</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-gray-900">Pesquisa de Clima Q1 2024</p>
                <p className="text-sm text-gray-600">Termina em 15 dias</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progresso</span>
                  <span className="text-gray-900">89/120</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '74%' }}></div>
                </div>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                Ver Detalhes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Surveys Tab */}
      {activeTab === 'surveys' && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-gray-400" />
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option>Todas as pesquisas</option>
                  <option>Ativas</option>
                  <option>Finalizadas</option>
                  <option>Rascunhos</option>
                </select>
              </div>
            </div>
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-3 py-2 border border-gray-300 rounded-lg text-sm transition-colors">
              <Download size={16} />
              Exportar
            </button>
          </div>

          <div className="grid gap-4">
            {surveys.map((survey) => (
              <div key={survey.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-900">{survey.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      survey.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {survey.status === 'active' ? 'Ativa' : 'Rascunho'}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Termina em</p>
                    <p className="text-sm font-medium text-gray-900">{survey.endDate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Respostas</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {survey.responses}/{survey.totalEmployees}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Participação</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {Math.round((survey.responses / survey.totalEmployees) * 100)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Categorias</p>
                    <p className="text-sm text-gray-900">{survey.categories.length} categorias</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {survey.categories.map((category, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {category}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                    Ver Resultados
                  </button>
                  <button className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors">
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results Tab */}
      {activeTab === 'results' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Análise Detalhada</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((result, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-900">{result.category}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-gray-900">{result.score}</span>
                      <span className={`text-sm font-medium ${
                        result.positive ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {result.trend}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(result.score / 10) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600">Baseado em 89 respostas</p>
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
        type="climate"
      />
    </div>
  );
}