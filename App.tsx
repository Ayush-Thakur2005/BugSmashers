import React, { useEffect, useState } from 'react';
import { Activity, Video } from 'lucide-react';
import { Avatar } from './components/Avatar';
import { ChatInterface } from './components/ChatInterface';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { TelemedicineModal } from './components/TelemedicineModal';
import { useExamStore } from './store/examStore';
import { supabase } from './lib/supabase';

function App() {
  const { examComplete } = useExamStore();
  const [session, setSession] = useState(null);
  const [showTelemedicine, setShowTelemedicine] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Activity className="h-8 w-8 text-blue-600 animate-pulse" />
            <h1 className="ml-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Virtual Medical Examiner
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowTelemedicine(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/50"
            >
              <Video size={20} />
              <span>Consult Doctor</span>
            </button>
            <button
              onClick={() => supabase.auth.signOut()}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-[1.02]">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Medical Assessment
              </h2>
              <Avatar />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-[1.02]">
              <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Consultation Chat
              </h2>
              <ChatInterface />
            </div>
          </div>
        </div>

        {examComplete && (
          <div className="mt-8">
            <Dashboard />
          </div>
        )}
      </main>

      <footer className="bg-white/80 backdrop-blur-lg mt-8 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">
            Disclaimer: This is a prototype medical assessment tool. 
            Not intended for actual medical diagnosis.
          </p>
        </div>
      </footer>

      <TelemedicineModal
        isOpen={showTelemedicine}
        onClose={() => setShowTelemedicine(false)}
      />
    </div>
  );
}

export default App;
