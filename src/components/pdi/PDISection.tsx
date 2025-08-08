import React, { useState } from 'react';
import { Target, Plus, Calendar, CheckCircle, Clock, MessageSquare } from 'lucide-react';
import NewGoalModal from '../modals/NewGoalModal';

export default function PDISection() {
  const [activeTab, setActiveTab] = useState<'my-pdi' | 'team-pdis'>('my-pdi');
  const [showNewGoalModal, setShowNewGoalModal] = useState(false);
  const [myGoals, setMyGoals] = useState([

    {
      id: '1',
      title: 'Desenvolver habilidades em React',
      description: 'Completar curso avançado e aplicar em projetos práticos',
      category: 'Técnico',
      status: 'in_progress',
      progress: 65,
      deadline: '2024-03-15',
      actions: [
        { id: '1', title: 'Completar módulo de Hooks', completed: true },
        { id: '2', title: 'Construir projeto pessoal', completed: true },
        { id: '3', title: 'Aplicar em projeto do trabalho', completed: false }
      ],
      managerComments: [
        {
          id: '1',
          author: 'Carlos Santos',
          comment: 'Excelente progresso! Continue focado na aplicação prática.',
          date: '2024-01-20'
        }
      ]
    },
    {
      id: '2',
      title: 'Melhorar comunicação em apresentações',
      description: 'Participar de workshops e praticar apresentações técnicas',
      category: 'Comportamental',
      status: 'planned',
      progress: 20,
      deadline: '2024-04-30',
      actions: [
        { id: '1', title: 'Inscrever-se no curso de oratória', completed: true },
        { id: '2', title: 'Apresentar para equipe pequena', completed: false },
        { id: '3', title: 'Apresentar para stakeholders', completed: false }
      ],
      managerComments: []
    }
  ]);

  const statusColors = {
    planned: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800'
  };

  const statusLabels = {
    planned: 'Planejado',
    in_progress: 'Em Andamento', 
    completed: 'Concluído'
  };

  const handleNewGoal = (goalData: any) => {
    setMyGoals(prev => [...prev, goalData]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Target className="w-8 h-8 text-purple-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">PDI - Plano de Desenvolvimento</h1>
            <p className="text-gray-600">Acompanhe sua jornada de crescimento profissional</p>
          </div>
        </div>
        <button 
          onClick={() => setShowNewGoalModal(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={20} />
          Novo Objetivo
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('my-pdi')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'my-pdi'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Meu PDI
          </button>
          <button
            onClick={() => setActiveTab('team-pdis')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'team-pdis'
                ? 'border-purple-500 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            PDIs da Equipe
          </button>
        </nav>
      </div>

      {/* My PDI Tab */}
      {activeTab === 'my-pdi' && (
        <div className="space-y-6">
          {/* Progress Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Target className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">2</p>
                  <p className="text-gray-600 text-sm">Objetivos Ativos</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">43%</p>
                  <p className="text-gray-600 text-sm">Progresso Médio</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">1</p>
                  <p className="text-gray-600 text-sm">Meta Este Mês</p>
                </div>
              </div>
            </div>
          </div>

          {/* Goals List */}
          <div className="space-y-4">
            {myGoals.map((goal) => (
              <div key={goal.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[goal.status]}`}>
                        {statusLabels[goal.status]}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {goal.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{goal.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Progresso</span>
                        <span className="text-gray-900 font-medium">{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right ml-4">
                    <div className="flex items-center gap-1 text-gray-600 text-sm">
                      <Calendar size={14} />
                      {goal.deadline}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Ações</h4>
                  <div className="space-y-2">
                    {goal.actions.map((action) => (
                      <div key={action.id} className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          action.completed ? 'bg-green-600' : 'bg-gray-300'
                        }`}>
                          {action.completed && <CheckCircle size={12} className="text-white" />}
                        </div>
                        <span className={`text-sm ${
                          action.completed ? 'text-gray-600 line-through' : 'text-gray-900'
                        }`}>
                          {action.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Manager Comments */}
                {goal.managerComments.length > 0 && (
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <MessageSquare size={16} />
                      Comentários do Gestor
                    </h4>
                    <div className="space-y-2">
                      {goal.managerComments.map((comment) => (
                        <div key={comment.id} className="bg-blue-50 p-3 rounded-lg">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-gray-900 text-sm">{comment.author}</span>
                            <span className="text-gray-600 text-xs">{comment.date}</span>
                          </div>
                          <p className="text-gray-700 text-sm">{comment.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-2 mt-4">
                  <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
                    Atualizar Progresso
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

      {/* Team PDIs Tab (for managers) */}
      {activeTab === 'team-pdis' && (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">PDIs da Equipe</h3>
          <p className="text-gray-600 mb-4">
            Visualize e acompanhe o desenvolvimento dos membros da sua equipe
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Ver PDIs da Equipe
          </button>
        </div>
      )}

      <NewGoalModal
        isOpen={showNewGoalModal}
        onClose={() => setShowNewGoalModal(false)}
        onSubmit={handleNewGoal}
      />
    </div>
  );
}