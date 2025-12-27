import React from 'react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleSidebar: () => void;
  userEmail?: string;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  language, 
  setLanguage, 
  toggleSidebar, 
  userEmail,
  onLogout 
}) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
        >
          <i className="fa-solid fa-bars text-xl"></i>
        </button>
        <h2 className="hidden md:block text-lg font-semibold text-gray-700">
          {language === Language.MYANMAR ? 'မင်္ဂလာပါ 👋' : 'Welcome back 👋'}
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Language Switcher */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setLanguage(Language.ENGLISH)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              language === Language.ENGLISH 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            ENG
          </button>
          <button
            onClick={() => setLanguage(Language.MYANMAR)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all font-burmese ${
              language === Language.MYANMAR 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            မြန်မာ
          </button>
        </div>

        {/* Notifications */}
        <button className="p-2 text-gray-400 hover:text-gray-600 relative">
          <i className="fa-regular fa-bell"></i>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* User Profile */}
        <div className="relative group">
          <button className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold border border-primary-200">
              {userEmail ? userEmail[0].toUpperCase() : 'U'}
            </div>
            <i className="fa-solid fa-chevron-down text-xs text-gray-400"></i>
          </button>
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 hidden group-hover:block py-1 z-50">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-xs font-medium text-gray-900 truncate">{userEmail}</p>
            </div>
            <button 
              onClick={onLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
