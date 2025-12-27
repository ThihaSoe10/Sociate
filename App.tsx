import React, { useState, useEffect } from 'react';
import { AuthForm } from './components/AuthForm';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardContent } from './components/DashboardContent';
import { AICaptionGenerator } from './components/AICaptionGenerator';
import { Language, ViewState } from './types';
import { supabase } from './services/supabaseService';

const App: React.FC = () => {
  const [session, setSession] = useState<{ user: { email: string } } | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email) {
        setSession({ user: { email: session.user.email } });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.email) {
        setSession({ user: { email: session.user.email } });
      } else {
        setSession(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLoginSuccess = (email: string) => {
    setSession({ user: { email } });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  if (!session) {
    return <AuthForm onSuccess={handleLoginSuccess} />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardContent language={language} />;
      case 'create':
        return <AICaptionGenerator language={language} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 py-20">
            <i className="fa-solid fa-person-digging text-4xl mb-4"></i>
            <p className="text-lg">Work in progress</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar 
        currentView={currentView}
        setCurrentView={setCurrentView}
        language={language}
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header 
          language={language}
          setLanguage={setLanguage}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          userEmail={session.user.email}
          onLogout={handleLogout}
        />
        
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;