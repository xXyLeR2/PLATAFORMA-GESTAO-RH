import React from 'react';
import { Clock, CheckCircle, AlertCircle, Calendar } from 'lucide-react';

export default function RecentActivity() {
  const activities = [
    {
      type: 'completion',
      icon: CheckCircle,
      color: 'text-green-600',
      title: 'Pesquisa de Clima Q1',
      description: 'Completada por você',
      time: '2 horas atrás'
    },
    {
      type: 'reminder',
      icon: AlertCircle,
      color: 'text-orange-600',
      title: 'PDI - Revisar objetivos',
      description: 'Pendente desde ontem',
      time: '1 dia atrás'
    },
    {
      type: 'meeting',
      icon: Calendar,
      color: 'text-blue-600',
      title: 'Feedback 1:1 agendado',
      description: 'Com Carlos Santos',
      time: 'Amanhã às 14h'
    },
    {
      type: 'completion',
      icon: CheckCircle,
      color: 'text-green-600',
      title: 'Teste Comportamental',
      description: 'Resultado disponível',
      time: '3 dias atrás'
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Atividade Recente</h3>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={`p-1.5 rounded-full ${activity.color} bg-opacity-10`}>
              <activity.icon size={16} className={activity.color} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 text-sm">{activity.title}</p>
              <p className="text-gray-600 text-xs">{activity.description}</p>
              <div className="flex items-center gap-1 mt-1">
                <Clock size={12} className="text-gray-400" />
                <span className="text-gray-400 text-xs">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 pt-4 border-t border-gray-100 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
        Ver todas as atividades
      </button>
    </div>
  );
}