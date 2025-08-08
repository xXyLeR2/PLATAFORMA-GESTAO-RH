import React, { useState } from 'react';
import Modal from './Modal';
import { Award, Star } from 'lucide-react';

interface EvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  evaluationType: 'self' | '360' | 'manager' | null;
  onSubmit: (evaluation: any) => void;
}

const competencies = [
  {
    id: 'technical',
    name: 'Competência Técnica',
    description: 'Conhecimento e habilidades específicas da função'
  },
  {
    id: 'communication',
    name: 'Comunicação',
    description: 'Capacidade de se expressar e ouvir efetivamente'
  },
  {
    id: 'teamwork',
    name: 'Trabalho em Equipe',
    description: 'Colaboração e relacionamento interpessoal'
  },
  {
    id: 'leadership',
    name: 'Liderança',
    description: 'Capacidade de influenciar e guiar outros'
  },
  {
    id: 'innovation',
    name: 'Inovação',
    description: 'Criatividade e busca por soluções inovadoras'
  },
  {
    id: 'results',
    name: 'Orientação a Resultados',
    description: 'Foco em alcançar objetivos e metas'
  }
];

export default function EvaluationModal({ isOpen, onClose, evaluationType, onSubmit }: EvaluationModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<{[key: string]: number}>({});
  const [comments, setComments] = useState<{[key: string]: string}>({});
  const [overallComment, setOverallComment] = useState('');

  if (!evaluationType) return null;

  const evaluationTypes = {
    self: 'Autoavaliação',
    '360': 'Avaliação 360°',
    manager: 'Avaliação do Gestor'
  };

  const handleScoreChange = (competencyId: string, score: number) => {
    setScores(prev => ({ ...prev, [competencyId]: score }));
  };

  const handleCommentChange = (competencyId: string, comment: string) => {
    setComments(prev => ({ ...prev, [competencyId]: comment }));
  };

  const handleNext = () => {
    if (currentStep < competencies.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - overall comment
      setCurrentStep(competencies.length);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const evaluation = {
      type: evaluationType,
      competencies: competencies.map(comp => ({
        id: comp.id,
        name: comp.name,
        score: scores[comp.id] || 0,
        comment: comments[comp.id] || ''
      })),
      overallComment,
      averageScore: Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length,
      submittedAt: new Date().toISOString()
    };

    onSubmit(evaluation);
    
    // Reset form
    setCurrentStep(0);
    setScores({});
    setComments({});
    setOverallComment('');
    onClose();
  };

  const isLastStep = currentStep === competencies.length;
  const currentCompetency = isLastStep ? null : competencies[currentStep];
  const progress = ((currentStep + 1) / (competencies.length + 1)) * 100;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={evaluationTypes[evaluationType]} size="lg">
      <div className="space-y-6">
        {/* Progress */}
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              {isLastStep ? 'Comentário Final' : `${currentStep + 1} de ${competencies.length} competências`}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-orange-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {!isLastStep ? (
          /* Competency Evaluation */
          <div className="space-y-6">
            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {currentCompetency?.name}
              </h3>
              <p className="text-gray-600">
                {currentCompetency?.description}
              </p>
            </div>

            {/* Rating Scale */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Avalie esta competência de 1 a 10:
              </label>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">Precisa melhorar</span>
                <span className="text-sm text-gray-600">Excelente</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                  <button
                    key={score}
                    onClick={() => handleScoreChange(currentCompetency!.id, score)}
                    className={`w-10 h-10 rounded-full border-2 font-medium transition-colors ${
                      scores[currentCompetency!.id] === score
                        ? 'bg-orange-600 border-orange-600 text-white'
                        : 'border-gray-300 text-gray-700 hover:border-orange-400'
                    }`}
                  >
                    {score}
                  </button>
                ))}
              </div>
            </div>

            {/* Star Rating Visual */}
            <div className="flex justify-center">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className={`${
                      (scores[currentCompetency!.id] || 0) >= star * 2
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comentários (opcional):
              </label>
              <textarea
                value={comments[currentCompetency!.id] || ''}
                onChange={(e) => handleCommentChange(currentCompetency!.id, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                rows={4}
                placeholder="Compartilhe observações específicas sobre esta competência..."
              />
            </div>
          </div>
        ) : (
          /* Final Step - Overall Comment */
          <div className="space-y-6">
            <div className="bg-orange-50 p-6 rounded-lg text-center">
              <Award size={48} className="text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Comentário Final
              </h3>
              <p className="text-gray-600">
                Compartilhe suas impressões gerais sobre o desempenho avaliado
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comentário Geral:
              </label>
              <textarea
                value={overallComment}
                onChange={(e) => setOverallComment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                rows={6}
                placeholder="Descreva pontos fortes, áreas de melhoria e sugestões de desenvolvimento..."
                required
              />
            </div>

            {/* Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Resumo da Avaliação:</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                {competencies.map(comp => (
                  <div key={comp.id} className="flex justify-between">
                    <span className="text-gray-600">{comp.name}:</span>
                    <span className="font-medium">{scores[comp.id] || 0}/10</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex justify-between font-medium">
                  <span>Média Geral:</span>
                  <span className="text-orange-600">
                    {Object.values(scores).length > 0 
                      ? (Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length).toFixed(1)
                      : '0.0'
                    }/10
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-4 border-t border-gray-200">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          
          {isLastStep ? (
            <button
              onClick={handleSubmit}
              disabled={!overallComment.trim()}
              className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Finalizar Avaliação
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!scores[currentCompetency!.id]}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próxima
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}