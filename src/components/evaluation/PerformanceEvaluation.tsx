import React, { useState } from 'react';
import { Award, Users, Grid3X3, FileText, Clock } from 'lucide-react';
import EvaluationModal from '../modals/EvaluationModal';

export default function PerformanceEvaluation() {
  const [activeTab, setActiveTab] = useState<'overview' | 'evaluations' | 'ninebox' | 'history'>('overview');
  const [showEvaluationModal, setShowEvaluationModal] = useState(false);
  const [selectedEvaluationType, setSelectedEvaluationType] = useState<'self' | '360' | 'manager' | null>(null);
  const [currentEvaluations, setCurrentEvaluations] = useState([
    {
      id: '1',
      period: 'Q1 2024',
      type: '360°',
      status: 'in_progress',
      dueDate: '2024-02-15',
      progress: {
        selfEvaluation: true,
        managerEvaluation: false,
        peerEvaluations: 2,
        totalPeers: 3
      }
    },
    {
      id: '2',
      period: 'Anual 2023',
      type: 'Autoavaliação',
      status: 'pending',
      dueDate: '2024-01-30',
      progress: {
        selfEvaluation: false,
        managerEvaluation: false,
        peerEvaluations: 0,
        totalPeers: 0
      }
    }
  ]);

  const evaluationHistory = [
    {
      period: 'Q4 2023',
      type: '360°',
      finalScore: 8.7,
      status: 'completed',
      date: '2023-12-15',
      feedback: 'Excelente performance em liderança técnica e colaboração em equipe.'
    },
    {
      period: 'Q3 2023',
      type: 'Autoavaliação',
      finalScore: 8.2,
      status: 'completed',
      date: '2023-09-20',
      feedback: 'Demonstrou crescimento significativo em comunicação e gestão de projetos.'
    }
  ];

  const handleStartEvaluation = (type: 'self' | '360' | 'manager') => {
    setSelectedEvaluationType(type);
    setShowEvaluationModal(true);
  };

  const handleEvaluationSubmit = (evaluationData: any) => {
    console.log('Avaliação submetida:', evaluationData);
    // Aqui você atualizaria o progresso da avaliação
    setCurrentEvaluations(prev => 
      prev.map(eval => {
        if (eval.id === '1') { // Assumindo que estamos atualizando a primeira avaliação
          const updatedProgress = { ...eval.progress };
          if (evaluationData.type === 'self') {
            updatedProgress.selfEvaluation = true;
          } else if (evaluationData.type === 'manager') {
            updatedProgress.managerEvaluation = true;
          }
          return { ...eval, progress: updatedProgress };
        }
        return eval;
      })
    );
  };

  const nineBoxData = {
    performance: 8.7, // High
    potential: 8.2,   // High
    position: 'Star Player',
    description: 'Alto desempenho e alto potencial - candidato a posições de liderança',
    color: 'bg-green-500'
  };

  const competencies = [
    { name: 'Liderança Técnica', selfScore: 8, managerScore: 9, peerAvg: 8.5 },
    { name: 'Comunicação', selfScore: 7, managerScore: 7, peerAvg: 8 },
    { name: 'Colaboração', selfScore: 9, managerScore: 8, peerAvg: 9 },
    { name: 'Inovação', selfScore: 8, managerScore: 8, peerAvg: 8 },
    { name: 'Orientação a Resultados', selfScore: 9, managerScore: 9, peerAvg: 8.5 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Award className="w-8 h-8 text-orange-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Avaliação de Desempenho</h1>
            <p className="text-gray-600">Acompanhe suas avaliações e desenvolvimento</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Visão Geral' },
            { id: 'evaluations', label: 'Avaliações Ativas' },
            { id: 'ninebox', label: '9-Box' },
            { id: 'history', label: 'Histórico' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
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
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-50 rounded-lg">
                  <Award className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">8.7</p>
                  <p className="text-gray-600 text-sm">Última Avaliação</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                  <p className="text-gray-600 text-sm">Avaliações Ativas</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Grid3X3 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">Star</p>
                  <p className="text-gray-600 text-sm">9-Box Position</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">7</p>
                  <p className="text-gray-600 text-sm">Dias até prazo</p>
                </div>
              </div>
            </div>
          </div>

          {/* Current Performance */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-6">Desempenho Atual - Competências</h3>
            <div className="space-y-4">
              {competencies.map((comp, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">{comp.name}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-blue-600">Autoavaliação</span>
                        <span className="font-medium">{comp.selfScore}/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${comp.selfScore * 10}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-green-600">Avaliação Gestor</span>
                        <span className="font-medium">{comp.managerScore}/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${comp.managerScore * 10}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-purple-600">Média dos Pares</span>
                        <span className="font-medium">{comp.peerAvg}/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${comp.peerAvg * 10}%` }}
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

      {/* Active Evaluations Tab */}
      {activeTab === 'evaluations' && (
        <div className="space-y-4">
          {currentEvaluations.map((evaluation) => (
            <div key={evaluation.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{evaluation.period}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm text-gray-600">{evaluation.type}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      evaluation.status === 'in_progress' 
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {evaluation.status === 'in_progress' ? 'Em Andamento' : 'Pendente'}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Prazo</p>
                  <p className="font-medium text-gray-900">{evaluation.dueDate}</p>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-3">Progresso</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${
                      evaluation.progress.selfEvaluation ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                    <span className="text-sm text-gray-700">Autoavaliação</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${
                      evaluation.progress.managerEvaluation ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                    <span className="text-sm text-gray-700">Avaliação do Gestor</span>
                  </div>
                  {evaluation.type === '360°' && (
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${
                        evaluation.progress.peerEvaluations === evaluation.progress.totalPeers ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                      <span className="text-sm text-gray-700">
                        Avaliação dos Pares ({evaluation.progress.peerEvaluations}/{evaluation.progress.totalPeers})
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => handleStartEvaluation('self')}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Continuar Avaliação
                </button>
                <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Ver Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 9-Box Tab */}
      {activeTab === 'ninebox' && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-6">Matriz 9-Box - Posicionamento</h3>
          
          {/* Current Position */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
              <div className="flex items-center gap-4 mb-3">
                <div className={`w-12 h-12 ${nineBoxData.color} rounded-full flex items-center justify-center`}>
                  <Award size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{nineBoxData.position}</h4>
                  <p className="text-gray-700">{nineBoxData.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 mt-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Performance</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${nineBoxData.performance * 10}%` }}
                      ></div>
                    </div>
                    <span className="font-medium text-gray-900">{nineBoxData.performance}/10</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Potencial</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${nineBoxData.potential * 10}%` }}
                      ></div>
                    </div>
                    <span className="font-medium text-gray-900">{nineBoxData.potential}/10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 9-Box Matrix Visualization */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-4">Matriz de Posicionamento</h4>
            <div className="grid grid-cols-3 gap-2 max-w-md">
              {[
                { position: 'Future Leader', color: 'bg-green-400', active: false },
                { position: 'Star Player', color: 'bg-green-500', active: true },
                { position: 'Top Performer', color: 'bg-green-600', active: false },
                { position: 'Potential Gem', color: 'bg-yellow-400', active: false },
                { position: 'Core Player', color: 'bg-yellow-500', active: false },
                { position: 'Consistent', color: 'bg-yellow-600', active: false },
                { position: 'Question Mark', color: 'bg-red-400', active: false },
                { position: 'Consistent', color: 'bg-red-500', active: false },
                { position: 'Poor Performer', color: 'bg-red-600', active: false }
              ].map((box, index) => (
                <div
                  key={index}
                  className={`${box.color} ${box.active ? 'ring-4 ring-blue-500' : ''} p-3 rounded text-center text-white text-xs font-medium h-16 flex items-center justify-center`}
                >
                  {box.position}
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between text-xs text-gray-600">
              <span>← Baixo Potencial</span>
              <span>Alto Potencial →</span>
            </div>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {evaluationHistory.map((evaluation, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{evaluation.period}</h3>
                  <p className="text-sm text-gray-600">{evaluation.type}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{evaluation.finalScore}</div>
                  <div className="text-xs text-gray-600">{evaluation.date}</div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Feedback Final</h4>
                <p className="text-gray-700 text-sm">{evaluation.feedback}</p>
              </div>
              <button className="mt-4 text-blue-600 hover:text-blue-900 text-sm font-medium">
                Ver Relatório Completo
              </button>
            </div>
          ))}
        </div>
      )}

      <EvaluationModal
        isOpen={showEvaluationModal}
        onClose={() => {
          setShowEvaluationModal(false);
          setSelectedEvaluationType(null);
        }}
        evaluationType={selectedEvaluationType}
        onSubmit={handleEvaluationSubmit}
      />
    </div>
  );
}