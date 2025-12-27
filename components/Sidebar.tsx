import React from 'react';
import { NavItem, ViewState, Language } from '../types';

interface SidebarProps {
  currentView: ViewState;
  setCurrentView: (view: ViewState) => void;
  language: Language;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label_en: 'Dashboard', label_mm: 'ဒက်ရှ်ဘုတ်', icon: 'fa-chart-pie' },
  { id: 'create', label_en: 'AI Writer', label_mm: 'AI စာရေးသူ', icon: 'fa-pen-nib' },
  { id: 'calendar', label_en: 'Schedule', label_mm: 'အချိန်ဇယား', icon: 'fa-calendar-days' },
  { id: 'analytics', label_en: 'Analytics', label_mm: 'သုံးသပ်ချက်', icon: 'fa-chart-line' },
  { id: 'settings', label_en: 'Settings', label_mm: 'ဆက်တင်များ', icon: 'fa-cog' },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentView, 
  setCurrentView, 
  language, 
  isOpen,
  toggleSidebar
}) => {
  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-20 lg:hidden transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleSidebar}
      />

      {/* Sidebar Content */}
      <div className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} flex flex-col`}>
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="text-xl font-bold text-primary-600 flex items-center gap-2">
            <i className="fa-solid fa-rocket"></i>
            <span>MyanSocial AI</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id as ViewState);
                if (window.innerWidth < 1024) toggleSidebar();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-150 ${
                currentView === item.id 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <i className={`fa-solid ${item.icon} w-5 text-center`}></i>
              <span className={language === Language.MYANMAR ? 'font-burmese' : ''}>
                {language === Language.MYANMAR ? item.label_mm : item.label_en}
              </span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl p-4 text-white shadow-lg">
            <h4 className="font-semibold text-sm mb-1">
              {language === Language.MYANMAR ? 'ပရိုသို့ မြှင့်တင်ပါ' : 'Upgrade to Pro'}
            </h4>
            <p className="text-xs text-primary-100 mb-3">
              {language === Language.MYANMAR ? 'အကန့်အသတ်မရှိ AI ဖန်တီးမှုများ ရယူပါ။' : 'Get unlimited AI generations.'}
            </p>
            <button className="w-full bg-white text-primary-600 text-xs font-bold py-2 rounded-lg hover:bg-primary-50 transition-colors">
              {language === Language.MYANMAR ? 'အခုပဲ ဝယ်ယူမယ်' : 'Upgrade Now'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
