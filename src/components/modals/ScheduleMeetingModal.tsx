import React, { useState } from 'react';
import Modal from './Modal';
import { Calendar, Clock, Users, Video, MapPin } from 'lucide-react';

interface ScheduleMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (meetingData: any) => void;
}

export default function ScheduleMeetingModal({ isOpen, onClose, onSubmit }: ScheduleMeetingModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'feedback',
    date: '',
    time: '',
    duration: '30',
    location: 'Google Meet',
    attendees: [''],
    description: '',
    recurring: false,
    reminder: '15'
  });

  const meetingTypes = [
    { value: 'feedback', label: 'Feedback 1:1', icon: Users },
    { value: 'pdi', label: 'Revisão de PDI', icon: Calendar },
    { value: 'evaluation', label: 'Avaliação de Desempenho', icon: Clock },
    { value: 'team', label: 'Reunião de Equipe', icon: Users },
    { value: 'other', label: 'Outro', icon: Calendar }
  ];

  const durations = [
    { value: '15', label: '15 minutos' },
    { value: '30', label: '30 minutos' },
    { value: '45', label: '45 minutos' },
    { value: '60', label: '1 hora' },
    { value: '90', label: '1h 30min' },
    { value: '120', label: '2 horas' }
  ];

  const locations = [
    'Google Meet',
    'Zoom',
    'Microsoft Teams',
    'Sala de Reuniões 1',
    'Sala de Reuniões 2',
    'Sala de Reuniões 3',
    'Presencial - Escritório',
    'Outro'
  ];

  const addAttendee = () => {
    setFormData(prev => ({
      ...prev,
      attendees: [...prev.attendees, '']
    }));
  };

  const updateAttendee = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      attendees: prev.attendees.map((attendee, i) => i === index ? value : attendee)
    }));
  };

  const removeAttendee = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attendees: prev.attendees.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      id: Date.now().toString(),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      attendees: formData.attendees.filter(attendee => attendee.trim() !== '')
    });
    onClose();
    // Reset form
    setFormData({
      title: '',
      type: 'feedback',
      date: '',
      time: '',
      duration: '30',
      location: 'Google Meet',
      attendees: [''],
      description: '',
      recurring: false,
      reminder: '15'
    });
  };

  const selectedType = meetingTypes.find(type => type.value === formData.type);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Agendar Reunião" size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título da Reunião
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex: Feedback 1:1 - Janeiro"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Reunião
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {meetingTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Horário
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duração
            </label>
            <select
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {durations.map(duration => (
                <option key={duration.value} value={duration.value}>
                  {duration.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Local/Plataforma
          </label>
          <select
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {locations.map(location => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Participantes
            </label>
            <button
              type="button"
              onClick={addAttendee}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              + Adicionar Participante
            </button>
          </div>
          <div className="space-y-2">
            {formData.attendees.map((attendee, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="email"
                  value={attendee}
                  onChange={(e) => updateAttendee(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="email@empresa.com"
                />
                {formData.attendees.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAttendee(index)}
                    className="px-3 py-2 text-red-600 hover:text-red-700"
                  >
                    Remover
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descrição/Agenda
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
            placeholder="Descreva a agenda ou objetivos da reunião..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="recurring"
              checked={formData.recurring}
              onChange={(e) => setFormData(prev => ({ ...prev, recurring: e.target.checked }))}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="recurring" className="ml-2 block text-sm text-gray-700">
              Reunião recorrente
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lembrete (minutos antes)
            </label>
            <select
              value={formData.reminder}
              onChange={(e) => setFormData(prev => ({ ...prev, reminder: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="5">5 minutos</option>
              <option value="15">15 minutos</option>
              <option value="30">30 minutos</option>
              <option value="60">1 hora</option>
              <option value="1440">1 dia</option>
            </select>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            {formData.location.includes('Meet') ? <Video size={16} className="text-blue-600" /> : 
             formData.location.includes('Sala') ? <MapPin size={16} className="text-blue-600" /> :
             <Calendar size={16} className="text-blue-600" />}
            <span className="text-sm font-medium text-blue-900">Integração com Google Agenda</span>
          </div>
          <p className="text-sm text-blue-800">
            Esta reunião será automaticamente sincronizada com sua agenda do Google e dos participantes.
          </p>
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
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Agendar Reunião
          </button>
        </div>
      </form>
    </Modal>
  );
}