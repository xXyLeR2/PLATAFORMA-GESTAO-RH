import React, { useState } from 'react';
import { Brain, PieChart, Users, Target, TrendingUp } from 'lucide-react';
import TestModal from '../modals/TestModal';

export default function BehavioralTests() {
  const [activeTab, setActiveTab] = useState<'available' | 'results' | 'comparison'>('available');
  const [showTestModal, setShowTestModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState<'disc' | 'culture' | 'leadership' | null>(null);
  const [testResults, setTestResults] = useState

  const availableTests = [
    {
      id: 'disc',
      name: 'DISC',
      description: 'Avalie seu perfil comportamental baseado nos estilos Dominante, Influente, Estável e Consciente',
      duration: '15-20 min',
      questions: 28,
      icon: Users,
      color: 'bg-blue-500',
      status: 'completed'
    },
    {
      id: 'culture',
      name: 'Alinhamento Cultural',
      description: 'Meça sua aderência aos valores e cultura organizacional da empresa',
      duration: '10-15 min',
      questions: 20,
      icon: Target,
      color: 'bg-purple-500',
      status: 'available'
    },
    {
      id: 'leadership',
      name: 'Perfil de Liderança',
      description: 'Identifique seu estilo de liderança e áreas de desenvolvimento',
      duration: '20-25 min',
      questions: 32,
      icon: TrendingUp,
      color: 'bg-green-500',
      status: 'available'
    }
  ];

    {
      id; 'disc',
      name; 'DISC',
      date; '2024-01-10',
      result; {
        primaryType; 'Dominante/Influente',
        scores; {
          'Dominante'; 85,
          'Influente'; 75,
          'Estável'; 45,
          'Consciente'; 60
        },
        description: 'Você tem um perfil orientado para resultados com habilidades sociais desenvolvidas.'
      }
    },
    {
      id: 'culture',
      name: 'Alinhamento Cultural',
      date; '2024-01-05',
      result; {
        overall: 87,
        breakdown: {
          'Inovação': 92,
          'Colaboração': 85,
          'Transparência': 78,
          'Excelência': 90
        },
        description: 'Forte alinhamento com os valores organizacionais, especialmente em Inovação e Excelência.'
      }
    }
  ]);

  const companyAverages = {
    disc: {
      'Dominante': 65,
      'Influente': 70,
      'Estável': 60,
      'Consciente': 68
    },
    culture: {
      'Inovação': 78,
      'Colaboração': 82,
      'Transparência': 75,
      'Excelência': 80
    }
  };

  const handleStartTest = (testId: 'disc' | 'culture' | 'leadership') => {
    setSelectedTest(testId);
    setShowTestModal(true);
  };

  const handleTestComplete = (results: any) => {
    setTestResults(prev => {
      const existingIndex = prev.findIndex(result => result.id === results.type);
      if (existingIndex >= 0) {
        // Update existing result
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          date: new Date().toISOString().split('T')[0],
          result: results
        };
        return updated;
      } else {
        // Add new result
        return [...prev, {
          id: results.type,
          name: results.type === 'disc' ? 'DISC' : results.type === 'culture' ? 'Alinhamento Cultural' : 'Perfil de Liderança',
          date: new Date().toISOString().split('T')[0],
          result: results
        }];
      }
    });
    setShowTestModal(false);
    setSelectedTest(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Brain className="w-8 h-8 text-purple-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Testes Comportamentais</h1>
            <p className="text-gray-600">Descubra seu perfil e alinhamento cultural</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'available', label: 'Testes Disponíveis' },
            { id: 'results', label: 'Meus Resultados' },
            { id: 'comparison', label: 'Comparação' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Available Tests Tab */}
      {activeTab === 'available' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableTests.map((test) => (
            <div key={test.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 ${test.color} rounded-lg`}>
                  <test.icon size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{test.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{test.duration}</span>
                    <span>{test.questions} questões</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{test.description}</p>
              
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  testResults.some(result => result.id === test.id)
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {testResults.some(result => result.id === test.id) ? 'Concluído' : 'Disponível'}
                </span>
                <button
                  onClick={() => {
                    if (testResults.some(result => result.id === test.id)) {
                      setActiveTab('results');
                    } else {
                      handleStartTest(test.id as 'disc' | 'culture' | 'leadership');
                    }
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    testResults.some(result => result.id === test.id)
                      ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {testResults.some(result => result.id === test.id) ? 'Ver Resultado' : 'Iniciar Teste'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Results Tab */}
      {activeTab === 'results' && (
        <div className="space-y-6">
          {testResults.map((result) => (
            <div key={result.id} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{result.name}</h3>
                  <p className="text-gray-600 text-sm">Realizado em {result.date}</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Baixar Relatório
                </button>
              </div>

              {/* DISC Results */}
              {result.id === 'disc' && (
                <div>
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">Perfil Principal</h4>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-xl font-bold text-blue-900">{result.result.primaryType}</div>
                      <p className="text-blue-800 text-sm mt-1">{result.result.description}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Detalhamento por Perfil</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(result.result.scores).map(([type, score]) => (
                        <div key={type} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-gray-900">{type}</span>
                            <span className="text-lg font-bold text-gray-900">{score}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${score}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Culture Results */}
              {result.id === 'culture' && (
                <div>
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">Aderência Geral</h4>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-xl font-bold text-purple-900">{result.result.overall}%</div>
                      <p className="text-purple-800 text-sm mt-1">{result.result.description}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-4">Aderência por Valor</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(result.result.breakdown).map(([value, score]) => (
                        <div key={value} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-gray-900">{value}</span>
                            <span className="text-lg font-bold text-gray-900">{score}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${score}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Comparison Tab */}
      {activeTab === 'comparison' && (
        <div className="space-y-6">
          {/* DISC Comparison */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <PieChart size={20} />
              DISC - Comparação com a Média da Empresa
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(companyAverages.disc).map(([type, companyAvg]) => {
                const myScore = testResults.find(r => r.id === 'disc')?.result.scores[type] || 0;
                return (
                  <div key={type} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">{type}</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-blue-600">Você</span>
                          <span className="font-medium text-blue-600">{myScore}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${myScore}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Média da Empresa</span>
                          <span className="font-medium text-gray-600">{companyAvg}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gray-400 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${companyAvg}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Culture Comparison */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Target size={20} />
              Cultura - Comparação com a Média da Empresa
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(companyAverages.culture).map(([value, companyAvg]) => {
                const myScore = testResults.find(r => r.id === 'culture')?.result.breakdown[value] || 0;
                return (
                  <div key={value} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">{value}</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-purple-600">Você</span>
                          <span className="font-medium text-purple-600">{myScore}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${myScore}%` }}
                          ></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">Média da Empresa</span>
                          <span className="font-medium text-gray-600">{companyAvg}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gray-400 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${companyAvg}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <TestModal
        isOpen={showTestModal}
        onClose={() => {
          setShowTestModal(false);
          setSelectedTest(null);
        }}
        testType={selectedTest}
        onComplete={handleTestComplete}
      />
    </div>
  );
}
