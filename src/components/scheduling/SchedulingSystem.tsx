import React, { useState } from 'react';
import { Calendar, Clock, Plus, Users, Video, MapPin } from 'lucide-react';
import ScheduleMeetingModal from '../modals/ScheduleMeetingModal';

export default function SchedulingSystem() {
  const [activeTab, setActiveTab] = useState<'calendar' | 'schedule' | 'meetings'>('calendar');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [upcomingMeetings, setUpcomingMeetings] = useState([

    {
      id: '1',
      title: 'Feedback 1:1',
      type: 'feedback',
      attendees: ['Carlos Santos'],
      date: '2024-01-25',
      time: '14:00',
      duration: '30min',
      location: 'Google Meet',
      status: 'confirmed'
    },
    {
      id: '2',
      title: 'Revisão de PDI',
      type: 'pdi',
      attendees: ['Ana Silva', 'Carlos Santos'],
      date: '2024-01-30',
      time: '10:00',
      duration: '45min',
      location: 'Sala de Reuniões 1',
      status: 'pending'
    }
  ]);

  const availableSlots = [
    { date: '2024-01-26', time: '09:00' },
    { date: '2024-01-26', time: '11:00' },
    { date: '2024-01-26', time: '15:00' },
    { date: '2024-01-27', time: '10:00' },
    { date: '2024-01-27', time: '14:00' },
  ];

  const meetingTypes = [
    {
      id: 'feedback',
      name: 'Feedback 1:1',
      description: 'Sessão de feedback individual',
      duration: '30min',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      id: 'pdi',
      name: 'Revisão de PDI',
      description: 'Acompanhamento do desenvolvimento',
      duration: '45min',
      icon: Calendar,
      color: 'bg-purple-500'
    },
    {
      id: 'evaluation',
      name: 'Avaliação de Desempenho',
      description: 'Sessão de avaliação formal',
      duration: '60min',
      icon: Clock,
      color: 'bg-green-500'
    }
  ];

  const handleScheduleMeeting = (meetingData: any) => {
    setUpcomingMeetings(prev => [...prev, meetingData]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Agendamentos</h1>
            <p className="text-gray-600">Gerencie reuniões e sessões de desenvolvimento</p>
          </div>
        </div>
        <button 
          onClick={() => setShowScheduleModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={20} />
          Agendar Reunião
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'calendar', label: 'Calendário' },
            { id: 'schedule', label: 'Agendar' },
            { id: 'meetings', label: 'Minhas Reuniões' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Calendar Tab */}
      {activeTab === 'calendar' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-900">Janeiro 2024</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-gray-600 hover:text-gray-900">←</button>
                <button className="px-3 py-1 text-gray-600 hover:text-gray-900">→</button>
              </div>
            </div>
            
            {/* Simple Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }, (_, i) => {
                const day = i - 2; // Adjust for calendar start
                const hasEvent = day === 25 || day === 30;
                return (
                  <div
                    key={i}
                    className={`p-2 text-center text-sm h-12 flex items-center justify-center relative ${
                      day > 0 && day <= 31
                        ? 'text-gray-900 hover:bg-blue-50 cursor-pointer rounded'
                        : 'text-gray-300'
                    }`}
                  >
                    {day > 0 && day <= 31 ? day : ''}
                    {hasEvent && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Meetings */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Próximas Reuniões</h3>
            <div className="space-y-3">
              {upcomingMeetings.map((meeting) => (
                <div key={meeting.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={14} className="text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">{meeting.title}</span>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <div>{meeting.date} às {meeting.time}</div>
                    <div>{meeting.duration} • {meeting.location}</div>
                  </div>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium mt-2 ${
                    meeting.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {meeting.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Schedule Tab */}
      {activeTab === 'schedule' && (
        <div className="space-y-6">
          {/* Meeting Types */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Tipos de Reunião</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {meetingTypes.map((type) => (
                <div key={type.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 ${type.color} rounded-lg`}>
                      <type.icon size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{type.name}</h4>
                      <p className="text-sm text-gray-600">{type.duration}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Available Slots */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">Horários Disponíveis</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {availableSlots.map((slot, index) => (
                <button
                  key={index}
                  className="p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
                >
                  <div className="font-medium text-gray-900 text-sm">{slot.date}</div>
                  <div className="text-gray-600 text-xs">{slot.time}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Google Calendar Integration Simulation */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Calendar size={20} className="text-white" />
              </div>
              <h3 className="font-semibold text-gray-900">Integração com Google Agenda</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Conecte sua conta do Google para sincronizar automaticamente os agendamentos
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Conectar Google Agenda
            </button>
          </div>
        </div>
      )}

      {/* Meetings Tab */}
      {activeTab === 'meetings' && (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Minhas Reuniões</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${
                      meeting.type === 'feedback' ? 'bg-blue-100 text-blue-600' :
                      meeting.type === 'pdi' ? 'bg-purple-100 text-purple-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      <Users size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{meeting.title}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {meeting.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          {meeting.time}
                        </div>
                        <div className="flex items-center gap-1">
                          {meeting.location.includes('Meet') ? <Video size={14} /> : <MapPin size={14} />}
                          {meeting.location}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        {meeting.attendees.map((attendee, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            {attendee}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      meeting.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {meeting.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                    </span>
                    <button className="text-blue-600 hover:text-blue-900 text-sm font-medium ml-2">
                      Editar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ScheduleMeetingModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        onSubmit={handleScheduleMeeting}
      />
    </div>
  );
}