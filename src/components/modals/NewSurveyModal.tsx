import React, { useState } from 'react';
import Modal from './Modal';
import { Plus, X } from 'lucide-react';

interface NewSurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (surveyData: any) => void;
  type: 'climate' | 'experience';
}

export default function NewSurveyModal({ isOpen, onClose, onSubmit, type }: NewSurveyModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    endDate: '',
    categories: [''],
    questions: [{ text: '', type: 'scale', options: [] }],
    targetAudience: 'all'
  });

  const questionTypes = [
    { value: 'scale', label: 'Escala (1-10)' },
    { value: 'multiple', label: 'Múltipla Escolha' },
    { value: 'text', label: 'Texto Livre' },
    { value: 'yesno', label: 'Sim/Não' }
  ];

  const addCategory = () => {
    setFormData(prev => ({
      ...prev,
      categories: [...prev.categories, '']
    }));
  };

  const updateCategory = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.map((cat, i) => i === index ? value : cat)
    }));
  };

  const removeCategory = (index: number) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== index)
    }));
  };

  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, { text: '', type: 'scale', options: [] }]
    }));
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === index ? { ...q, [field]: value } : q
      )
    }));
  };

  const removeQuestion = (index: number) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      type,
      createdAt: new Date().toISOString(),
      status: 'draft'
    });
    onClose();
    // Reset form
    setFormData({
      title: '',
      description: '',
      endDate: '',
      categories: [''],
      questions: [{ text: '', type: 'scale', options: [] }],
      targetAudience: 'all'
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Nova Pesquisa ${type === 'climate' ? 'de Clima' : 'de Experiência'}`} size="xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título da Pesquisa
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex: Pesquisa de Clima Q1 2024"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data de Encerramento
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="Descreva o objetivo desta pesquisa..."
          />
        </div>

        {/* Categories */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Categorias
            </label>
            <button
              type="button"
              onClick={addCategory}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
            >
              <Plus size={16} />
              Adicionar
            </button>
          </div>
          <div className="space-y-2">
            {formData.categories.map((category, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={category}
                  onChange={(e) => updateCategory(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nome da categoria"
                />
                {formData.categories.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCategory(index)}
                    className="p-2 text-red-600 hover:text-red-700"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Questions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Perguntas
            </label>
            <button
              type="button"
              onClick={addQuestion}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
            >
              <Plus size={16} />
              Adicionar Pergunta
            </button>
          </div>
          <div className="space-y-4">
            {formData.questions.map((question, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Pergunta {index + 1}</span>
                  {formData.questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-2">
                    <input
                      type="text"
                      value={question.text}
                      onChange={(e) => updateQuestion(index, 'text', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Digite a pergunta..."
                    />
                  </div>
                  <div>
                    <select
                      value={question.type}
                      onChange={(e) => updateQuestion(index, 'type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {questionTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Target Audience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Público Alvo
          </label>
          <select
            value={formData.targetAudience}
            onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Todos os colaboradores</option>
            <option value="department">Por departamento</option>
            <option value="role">Por cargo</option>
            <option value="custom">Seleção customizada</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Criar Pesquisa
          </button>
        </div>
      </form>
    </Modal>
  );
}