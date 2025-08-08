import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Bell, Search } from 'lucide-react';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Pesquisar..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
              <Bell size={20} />
            </button>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </div>

          {user && (
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-medium text-gray-900 text-sm">{user.name}</p>
                <p className="text-gray-600 text-xs">{user.department}</p>
              </div>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {user.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}