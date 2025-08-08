import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import MetricCard from './MetricCard';
import RecentActivity from './RecentActivity';
import CultureHealth from './CultureHealth';
import { BarChart3, Users, Target, TrendingUp } from 'lucide-react';
import NewSurveyModal from '../modals/NewSurveyModal';
import NewGoalModal from '../modals/NewGoalModal';
import ScheduleMeetingModal from '../modals/ScheduleMeetingModal';

export default function DashboardOverview() {
  const { user } = useAuth();
  const [showNewSurveyModal, setShowNewSurveyModal] = useState(false);
  const [showNewGoalModal, setShowNewGoalModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const metrics = [
    {
      title: 'Satisfação Geral',
      value: '8.4',
      subtitle: 'de 10.0',
      icon: BarChart3,
      color: 'blue',
      trend: { value: '+0.3', positive: true }
    },
    {
      title: 'Participação em Pesquisas',
      value: '92%',
      subtitle: 'dos colaboradores',
      icon: Users,
      color: 'green',
      trend: { value: '+5%', positive: true }
    },
    {
      title: 'PDIs Ativos',
      value: '156',
      subtitle: 'planos em andamento',
      icon: Target,
      color: 'purple',
      trend: { value: '+12', positive: true }
    },
    {
      title: 'Índice Cultural',
      value: '87%',
      subtitle: 'aderência aos valores',
      icon: TrendingUp,
      color: 'orange',
      trend: { value: '+2%', positive: true }
    }
  ];

  const handleNewSurvey = (surveyData: any) => {
    console.log('Nova pesquisa criada:', surveyData);
  };

  const handleNewGoal = (goalData: any) => {
    console.log('Novo objetivo criado:', goalData);
  };

  const handleScheduleMeeting = (meetingData: any) => {
    console.log('Reunião agendada:', meetingData);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Olá, {user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="opacity-90">
              Bem-vindo à sua central de gestão de pessoas e cultura organizacional
            </p>
          </div>
          <div className="text-right opacity-90">
            <p className="text-sm">{new Date().toLocaleDateString('pt-BR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Culture Health - Takes 2 columns */}
        <div className="lg:col-span-2">
          <CultureHealth />
        </div>
        
        {/* Recent Activity */}
        <div>
          <RecentActivity />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setShowNewSurveyModal(true)}
            className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
          >
            <div className="text-blue-600 font-medium mb-1">Nova Pesquisa</div>
            <div className="text-gray-600 text-sm">Criar pesquisa de clima</div>
          </button>
          <button 
            onClick={() => setShowScheduleModal(true)}
            className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors text-left"
          >
            <div className="text-green-600 font-medium mb-1">Agendar Reunião</div>
            <div className="text-gray-600 text-sm">1:1 ou feedback</div>
          </button>
          <button 
            onClick={() => setShowNewGoalModal(true)}
            className="p-4 border-2 border-dashed border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors text-left"
          >
            <div className="text-purple-600 font-medium mb-1">Atualizar PDI</div>
            <div className="text-gray-600 text-sm">Revisar objetivos</div>
          </button>
        </div>
      </div>

      {/* Modals */}
      <NewSurveyModal
        isOpen={showNewSurveyModal}
        onClose={() => setShowNewSurveyModal(false)}
        onSubmit={handleNewSurvey}
        type="climate"
      />

      <NewGoalModal
        isOpen={showNewGoalModal}
        onClose={() => setShowNewGoalModal(false)}
        onSubmit={handleNewGoal}
      />

      <ScheduleMeetingModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        onSubmit={handleScheduleMeeting}
      />
    </div>
  );
}