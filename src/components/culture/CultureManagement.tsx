import React, { useState } from 'react';
import { Heart, Target, Users, TrendingUp, Star } from 'lucide-react';

export default function CultureManagement() {
  const [activeTab, setActiveTab] = useState<'values' | 'assessment' | 'insights' | 'actions'>('values');

  const companyValues = [
    {
      id: 'innovation',
      name: 'Inovação',
      description: 'Buscamos constantemente novas formas de criar valor e impactar positivamente nossos clientes',
      icon: Target,
      color: 'bg-blue-500',
      behaviors: [
        'Questiona o status quo',
        'Propõe soluções criativas',
        'Experimenta novas tecnologias',
        'Aprende com falhas'
      ],
      myScore: 92,
      companyAvg: 78
    },
    {
      id: 'collaboration',
      name: 'Colaboração',
      description: 'Acreditamos que juntos somos mais fortes e que a diversidade nos torna melhores',
      icon: Users,
      color: 'bg-green-500',
      behaviors: [
        'Compartilha conhecimento',
        'Apoia colegas',
        'Trabalha em equipe',
        'Celebra sucessos coletivos'
      ],
      myScore: 85,
      companyAvg: 82
    },
    {
      id: 'transparency',
      name: 'Transparência',
      description: 'Comunicamos de forma clara, honesta e aberta em todas nossas interações',
      icon: Heart,
      color: 'bg-purple-500',
      behaviors: [
        'Comunica claramente',
        'Dá feedback honesto',
        'Compartilha informações',
        'Assume responsabilidades'
      ],
      myScore: 78,
      companyAvg: 75
    },
    {
      id: 'excellence',
      name: 'Excelência',
      description: 'Comprometemo-nos com a qualidade em tudo que fazemos e na superação de expectativas',
      icon: Star,
      color: 'bg-orange-500',
      behaviors: [
        'Busca alta qualidade',
        'Melhora continuamente',
        'Cumpre compromissos',
        'Supera expectativas'
      ],
      myScore: 90,
      companyAvg: 80
    }
  ];

  const culturalInsights = [
    {
      type: 'strength',
      title: 'Forte em Inovação',
      description: 'Sua pontuação em inovação está 14 pontos acima da média da empresa',
      icon: TrendingUp,
      color: 'text-green-600 bg-green-50'
    },
    {
      type: 'opportunity',
      title: 'Oportunidade em Transparência',
      description: 'Área com maior potencial de desenvolvimento para você',
      icon: Target,
      color: 'text-orange-600 bg-orange-50'
    },
    {
      type: 'alignment',
      title: 'Bem Alinhado',
      description: 'Sua aderência cultural geral está acima da média (87% vs 79%)',
      icon: Heart,
      color: 'text-blue-600 bg-blue-50'
    }
  ];

  const developmentActions = [
    {
      value: 'Transparência',
      action: 'Participar de workshop de comunicação assertiva',
      timeline: '2 semanas',
      priority: 'alta'
    },
    {
      value: 'Colaboração',
      action: 'Mentorear um júnior da equipe',
      timeline: '1 mês',
      priority: 'média'
    },
    {
      value: 'Excelência',
      action: 'Liderar projeto de melhoria de processos',
      timeline: '3 meses',
      priority: 'baixa'
    }
  ];

  const overallScore = Math.round(companyValues.reduce((acc, val) => acc + val.myScore, 0) / companyValues.length);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Heart className="w-8 h-8 text-red-500" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Cultura Organizacional</h1>
            <p className="text-gray-600">Conheça nossos valores e acompanhe seu alinhamento cultural</p>
          </div>
        </div>
      </div>

      {/* Overall Score */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Sua Aderência Cultural</h2>
            <p className="opacity-90">Baseada nas avaliações e comportamentos demonstrados</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{overallScore}%</div>
            <div className="text-sm opacity-90">vs 79% média da empresa</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'values', label: 'Nossos Valores' },
            { id: 'assessment', label: 'Minha Avaliação' },
            { id: 'insights', label: 'Insights' },
            { id: 'actions', label: 'Plano de Ação' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Values Tab */}
      {activeTab === 'values' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {companyValues.map((value) => (
            <div key={value.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 ${value.color} rounded-lg`}>
                  <value.icon size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{value.name}</h3>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{value.description}</p>
              
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Comportamentos Esperados:</h4>
                <ul className="space-y-1">
                  {value.behaviors.map((behavior, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      {behavior}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Assessment Tab */}
      {activeTab === 'assessment' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-6">Aderência por Valor</h3>
            <div className="space-y-6">
              {companyValues.map((value) => (
                <div key={value.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 ${value.color} rounded-lg`}>
                      <value.icon size={20} className="text-white" />
                    </div>
                    <h4 className="font-medium text-gray-900">{value.name}</h4>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-blue-600">Sua Pontuação</span>
                        <span className="font-medium text-blue-600">{value.myScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${value.myScore}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Média da Empresa</span>
                        <span className="font-medium text-gray-600">{value.companyAvg}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gray-400 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${value.companyAvg}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-center">
                    <span className={`text-sm font-medium ${
                      value.myScore > value.companyAvg ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {value.myScore > value.companyAvg 
                        ? `+${value.myScore - value.companyAvg} pontos acima da média`
                        : `${value.companyAvg - value.myScore} pontos abaixo da média`
                      }
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Insights Tab */}
      {activeTab === 'insights' && (
        <div className="space-y-4">
          {culturalInsights.map((insight, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${insight.color}`}>
                  <insight.icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{insight.title}</h3>
                  <p className="text-gray-600">{insight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Actions Tab */}
      {activeTab === 'actions' && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-6">Plano de Desenvolvimento Cultural</h3>
            <div className="space-y-4">
              {developmentActions.map((action, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h4 className="font-medium text-gray-900">{action.value}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        action.priority === 'alta' 
                          ? 'bg-red-100 text-red-800'
                          : action.priority === 'média'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {action.priority} prioridade
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">{action.timeline}</span>
                  </div>
                  <p className="text-gray-700 mb-3">{action.action}</p>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Iniciar Ação
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}