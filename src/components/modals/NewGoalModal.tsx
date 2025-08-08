import React, { useState } from 'react';
import Modal from './Modal';

interface NewGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (goalData: any) => void;
}

export default function NewGoalModal({ isOpen, onClose, onSubmit }: NewGoalModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Técnico',
    deadline: '',
    actions: [''],
    priority: 'medium'
  });

  const categories = [
    'Técnico',
    'Comportamental',
    'Liderança',
    'Comunicação',
    'Gestão',
    'Inovação'
  ];

  const priorities = [
    { value: 'high', label: 'Alta', color: 'text-red-600' },
    { value: 'medium', label: 'Média', color: 'text-yellow-600' },
    { value: 'low', label: 'Baixa', color: 'text-green-600' }
  ];

  const addAction = () => {
    setFormData(prev => ({
      ...prev,
      actions: [...prev.actions, '']
    }));
  };

  const updateAction = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      actions: prev.actions.map((action, i) => i === index ? value : action)
    }));
  };

  const removeAction = (index: number) => {
    setFormData(prev => ({
      ...prev,
      actions: prev.actions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: Date.now().toString(),
      status: 'planned',
      progress: 0,
      createdAt: new Date().toISOString(),
      actions: formData.actions.filter(action => action.trim() !== '').map((action, index) => ({
        id: (index + 1).toString(),
        title: action,
        completed: false
      })),
      managerComments: []
    });
    onClose();
    // Reset form
    setFormData({
      title: '',
      description: '',
      category: 'Técnico',
      deadline: '',
      actions: [''],
      priority: 'medium'
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Novo Objetivo PDI" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Título do Objetivo
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Ex: Desenvolver habilidades em React"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            rows={3}
            placeholder="Descreva detalhadamente o que você pretende alcançar..."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prioridade
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            >
              {priorities.map(priority => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prazo
            </label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Ações para Alcançar o Objetivo
            </label>
            <button
              type="button"
              onClick={addAction}
              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              + Adicionar Ação
            </button>
          </div>
          <div className="space-y-2">
            {formData.actions.map((action, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={action}
                  onChange={(e) => updateAction(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder={`Ação ${index + 1}`}
                />
                {formData.actions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAction(index)}
                    className="px-3 py-2 text-red-600 hover:text-red-700"
                  >
                    Remover
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

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
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Criar Objetivo
          </button>
        </div>
      </form>
    </Modal>
  );
}