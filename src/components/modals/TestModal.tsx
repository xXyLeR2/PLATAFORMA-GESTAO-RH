import React, { useState } from 'react';
import Modal from './Modal';
import { Brain, Users, Target, CheckCircle } from 'lucide-react';

interface TestModalProps {
  isOpen: boolean;
  onClose: () => void;
  testType: 'disc' | 'culture' | 'leadership' | null;
  onComplete: (results: any) => void;
}

const testQuestions = {
  disc: [
    {
      id: 1,
      question: "Em situações de trabalho, eu tendo a ser:",
      options: [
        { text: "Direto e focado em resultados", type: "D" },
        { text: "Entusiástico e sociável", type: "I" },
        { text: "Paciente e colaborativo", type: "S" },
        { text: "Preciso e detalhista", type: "C" }
      ]
    },
    {
      id: 2,
      question: "Quando enfrento desafios, eu:",
      options: [
        { text: "Tomo decisões rápidas e assumo riscos", type: "D" },
        { text: "Busco apoio da equipe e mantenho otimismo", type: "I" },
        { text: "Analiso cuidadosamente antes de agir", type: "S" },
        { text: "Pesquiso todas as opções disponíveis", type: "C" }
      ]
    },
    {
      id: 3,
      question: "Em reuniões, eu geralmente:",
      options: [
        { text: "Lidero a discussão e tomo decisões", type: "D" },
        { text: "Contribuo com ideias e energizo o grupo", type: "I" },
        { text: "Escuto atentamente e apoio consensos", type: "S" },
        { text: "Faço perguntas detalhadas e analiso dados", type: "C" }
      ]
    },
    {
      id: 4,
      question: "Meu estilo de comunicação é:",
      options: [
        { text: "Direto e objetivo", type: "D" },
        { text: "Expressivo e persuasivo", type: "I" },
        { text: "Calmo e diplomático", type: "S" },
        { text: "Preciso e factual", type: "C" }
      ]
    },
    {
      id: 5,
      question: "Quando trabalho em equipe, eu:",
      options: [
        { text: "Assumo a liderança naturalmente", type: "D" },
        { text: "Motivo e inspiro os outros", type: "I" },
        { text: "Apoio e colaboro harmoniosamente", type: "S" },
        { text: "Garanto qualidade e precisão", type: "C" }
      ]
    }
  ],
  culture: [
    {
      id: 1,
      question: "Eu me sinto confortável propondo ideias inovadoras, mesmo que sejam arriscadas:",
      options: [
        { text: "Concordo totalmente", score: 5 },
        { text: "Concordo", score: 4 },
        { text: "Neutro", score: 3 },
        { text: "Discordo", score: 2 },
        { text: "Discordo totalmente", score: 1 }
      ]
    },
    {
      id: 2,
      question: "Colaboro ativamente com colegas de diferentes áreas:",
      options: [
        { text: "Sempre", score: 5 },
        { text: "Frequentemente", score: 4 },
        { text: "Às vezes", score: 3 },
        { text: "Raramente", score: 2 },
        { text: "Nunca", score: 1 }
      ]
    },
    {
      id: 3,
      question: "Comunico informações importantes de forma clara e transparente:",
      options: [
        { text: "Sempre", score: 5 },
        { text: "Frequentemente", score: 4 },
        { text: "Às vezes", score: 3 },
        { text: "Raramente", score: 2 },
        { text: "Nunca", score: 1 }
      ]
    },
    {
      id: 4,
      question: "Busco constantemente melhorar a qualidade do meu trabalho:",
      options: [
        { text: "Sempre", score: 5 },
        { text: "Frequentemente", score: 4 },
        { text: "Às vezes", score: 3 },
        { text: "Raramente", score: 2 },
        { text: "Nunca", score: 1 }
      ]
    },
    {
      id: 5,
      question: "Me sinto alinhado com os valores da empresa:",
      options: [
        { text: "Completamente", score: 5 },
        { text: "Muito", score: 4 },
        { text: "Moderadamente", score: 3 },
        { text: "Pouco", score: 2 },
        { text: "Nada", score: 1 }
      ]
    }
  ],
  leadership: [
    {
      id: 1,
      question: "Quando lidero uma equipe, eu prefiro:",
      options: [
        { text: "Dar diretrizes claras e acompanhar de perto", score: 4 },
        { text: "Definir objetivos e dar autonomia", score: 5 },
        { text: "Trabalhar junto com a equipe", score: 3 },
        { text: "Deixar a equipe se autogerir", score: 2 }
      ]
    },
    {
      id: 2,
      question: "Em situações de conflito, eu:",
      options: [
        { text: "Mediei buscando soluções para todos", score: 5 },
        { text: "Tomo decisões rápidas para resolver", score: 4 },
        { text: "Escuto todas as partes antes de agir", score: 3 },
        { text: "Evito me envolver diretamente", score: 2 }
      ]
    },
    {
      id: 3,
      question: "Para motivar minha equipe, eu:",
      options: [
        { text: "Reconheço conquistas publicamente", score: 5 },
        { text: "Estabeleço metas desafiadoras", score: 4 },
        { text: "Ofereço suporte e desenvolvimento", score: 4 },
        { text: "Confio que se motivem sozinhos", score: 2 }
      ]
    }
  ]
};

export default function TestModal({ isOpen, onClose, testType, onComplete }: TestModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!testType) return null;

  const questions = testQuestions[testType];
  const testInfo = {
    disc: { name: 'DISC', icon: Users, description: 'Teste de perfil comportamental' },
    culture: { name: 'Alinhamento Cultural', icon: Target, description: 'Avaliação de aderência cultural' },
    leadership: { name: 'Perfil de Liderança', icon: Brain, description: 'Avaliação de estilo de liderança' }
  };

  const currentTest = testInfo[testType];

  const handleAnswer = (answer: any) => {
    const newAnswers = [...answers, { questionId: questions[currentQuestion].id, answer }];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Test completed, calculate results
      const results = calculateResults(newAnswers);
      setIsCompleted(true);
      onComplete(results);
    }
  };

  const calculateResults = (answers: any[]) => {
    if (testType === 'disc') {
      const scores = { D: 0, I: 0, S: 0, C: 0 };
      answers.forEach(answer => {
        scores[answer.answer.type as keyof typeof scores]++;
      });
      
      const total = Object.values(scores).reduce((a, b) => a + b, 0);
      const percentages = Object.entries(scores).reduce((acc, [key, value]) => {
        acc[key] = Math.round((value / total) * 100);
        return acc;
      }, {} as any);

      const dominant = Object.entries(percentages).sort(([,a], [,b]) => b - a)[0][0];
      const typeNames = {
        D: 'Dominante',
        I: 'Influente', 
        S: 'Estável',
        C: 'Consciente'
      };

      return {
        type: 'disc',
        primaryType: typeNames[dominant as keyof typeof typeNames],
        scores: {
          'Dominante': percentages.D,
          'Influente': percentages.I,
          'Estável': percentages.S,
          'Consciente': percentages.C
        },
        description: `Você tem um perfil ${typeNames[dominant as keyof typeof typeNames].toLowerCase()}, com características de liderança e foco em resultados.`
      };
    } else if (testType === 'culture') {
      const totalScore = answers.reduce((sum, answer) => sum + answer.answer.score, 0);
      const maxScore = answers.length * 5;
      const percentage = Math.round((totalScore / maxScore) * 100);

      return {
        type: 'culture',
        overall: percentage,
        breakdown: {
          'Inovação': Math.min(100, percentage + Math.floor(Math.random() * 10) - 5),
          'Colaboração': Math.min(100, percentage + Math.floor(Math.random() * 10) - 5),
          'Transparência': Math.min(100, percentage + Math.floor(Math.random() * 10) - 5),
          'Excelência': Math.min(100, percentage + Math.floor(Math.random() * 10) - 5)
        },
        description: `Sua aderência cultural é de ${percentage}%, demonstrando ${percentage > 80 ? 'forte' : percentage > 60 ? 'boa' : 'moderada'} alinhamento com os valores organizacionais.`
      };
    } else {
      const totalScore = answers.reduce((sum, answer) => sum + answer.answer.score, 0);
      const maxScore = answers.length * 5;
      const percentage = Math.round((totalScore / maxScore) * 100);

      return {
        type: 'leadership',
        score: percentage,
        style: percentage > 80 ? 'Transformacional' : percentage > 60 ? 'Democrático' : 'Situacional',
        description: `Seu estilo de liderança é ${percentage > 80 ? 'transformacional' : percentage > 60 ? 'democrático' : 'situacional'}, com foco em desenvolvimento de pessoas.`
      };
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  const handleClose = () => {
    resetTest();
    onClose();
  };

  if (isCompleted) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} title="Teste Concluído!" size="lg">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Parabéns! Você concluiu o teste {currentTest.name}
          </h3>
          <p className="text-gray-600 mb-6">
            Seus resultados foram salvos e estão disponíveis na seção de testes.
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Ver Resultados
            </button>
            <button
              onClick={resetTest}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Refazer Teste
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={`Teste ${currentTest.name}`} size="lg">
      <div className="space-y-6">
        {/* Progress */}
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Pergunta {currentQuestion + 1} de {questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {questions[currentQuestion].question}
          </h3>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                  <span className="text-gray-900">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Instruções:</strong> Escolha a opção que melhor descreve seu comportamento natural. 
            Não há respostas certas ou erradas, seja honesto em suas escolhas.
          </p>
        </div>
      </div>
    </Modal>
  );
}