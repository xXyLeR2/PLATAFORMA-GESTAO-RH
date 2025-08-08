import React from 'react';
import { Heart, Users, Target, TrendingUp } from 'lucide-react';

export default function CultureHealth() {
  const cultureMetrics = [
    { label: 'Inovação', value: 85, color: 'bg-blue-500' },
    { label: 'Colaboração', value: 92, color: 'bg-green-500' },
    { label: 'Transparência', value: 78, color: 'bg-purple-500' },
    { label: 'Excelência', value: 88, color: 'bg-orange-500' }
  ];

  const insights = [
    {
      icon: Users,
      title: 'Engajamento Alto',
      description: '94% dos colaboradores se sentem conectados com a missão da empresa',
      positive: true
    },
    {
      icon: Target,
      title: 'Oportunidade de Melhoria',
      description: 'Transparência na comunicação pode ser fortalecida',
      positive: false
    }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Heart className="w-5 h-5 text-red-500" />
        <h3 className="text-lg font-semibold text-gray-900">Saúde Cultural</h3>
      </div>

      {/* Culture Values Progress */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-4">Aderência aos Valores</h4>
        <div className="space-y-4">
          {cultureMetrics.map((metric, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-700">{metric.label}</span>
                <span className="text-sm font-medium text-gray-900">{metric.value}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`${metric.color} h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${metric.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div>
        <h4 className="font-medium text-gray-900 mb-4">Insights Culturais</h4>
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
              <div className={`p-1.5 rounded-full ${
                insight.positive ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
              }`}>
                <insight.icon size={16} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900 text-sm">{insight.title}</p>
                <p className="text-gray-600 text-xs mt-1">{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}