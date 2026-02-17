import React, { useState } from 'react';
import './App.css';
import { storageService } from './services/storage';

// Component Imports
import Dashboard from './components/dashboard/Dashboard';
import JobBoard from './components/jobs/JobBoard';
import CVManager from './components/cv/CVManager';
import CVEditor from './components/cv/CVEditor';
import InterviewMode from './components/interview/InterviewMode';
import LandingPage from './components/common/LandingPage';
import Navbar from './components/common/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';

function App() {
  const [step, setStep] = useState('dashboard');
  const [interviewMode, setInterviewMode] = useState('chat'); // 'chat' or 'voice'
  const [isGuest, setIsGuest] = useState(false); // New Guest State

  // Global Selection State
  const [activeOffer, setActiveOffer] = useState(null);
  const [activeCVId, setActiveCVId] = useState(null); // Track selected CV

  // Navigation Handlers
  const goDashboard = () => setStep('dashboard');

  const handleSelectMode = (mode) => {
    if (mode === 'jobs') {
      setStep('jobs');
    } else if (mode === 'create-cv') {
      // Step 1: Go to Manager to pick or create
      setStep('cv-manager');
    } else if (mode === 'interview' || mode === 'voice') {
      // Allow entry even without activeOffer (Generic Mode)
      setInterviewMode(mode === 'voice' ? 'voice' : 'chat');
      setStep('interview');
    } else if (mode === 'cv-fix') {
      alert("Función 'Mejorar CV' integrada en el Editor próximamente. Redirigiendo al Gestor...");
      setStep('cv-manager');
    } else if (mode === 'dashboard') {
      setStep('dashboard');
    }
  };

  const handleSelectCV = (cvId) => {
    setActiveCVId(cvId);
    setStep('cv-editor');
  };

  const handleSelectOffer = (offer) => {
    setActiveOffer(offer);
    const proceed = window.confirm(`Oferta seleccionada: ${offer.title}\n¿Quieres empezar la entrevista ahora?`);
    if (proceed) {
      setInterviewMode('chat');
      setStep('interview');
    } else {
      setStep('dashboard');
    }
  };

  const handleGuestLogin = () => {
    setIsGuest(true);
    setStep('dashboard');
  };

  return (
    <AuthProvider>
      <div className="sky-container"><div className="bg-cloud c1"></div><div className="bg-cloud c2"></div></div>

      <div className="app-content">
        {/* Navbar with Guest logic check if needed, mostly redundant as Navbar handles Auth internal state */}
        <Navbar onNavigate={handleSelectMode} />

        {/* Adjust spacing for navbar */}
        <div style={{ padding: '0px' }}></div>

        {step === 'dashboard' && (
          <DashboardWrapper
            onSelectMode={handleSelectMode}
            isGuest={isGuest}
            onGuestLogin={handleGuestLogin}
          />
        )}

        {step === 'jobs' && (
          <JobBoard
            onSelectOffer={handleSelectOffer}
            onBack={goDashboard}
          />
        )}

        {step === 'cv-manager' && (
          <CVManager
            onSelectCV={handleSelectCV}
            onBack={goDashboard}
          />
        )}

        {step === 'cv-editor' && (
          <CVEditor
            cvId={activeCVId}
            onBack={() => setStep('cv-manager')} // Back goes to Manager, not Dashboard
          />
        )}

        {step === 'interview' && (
          <InterviewMode
            cvText={storageService.getCVString()}
            activeOffer={activeOffer}
            onClearOffer={() => setActiveOffer(null)}
            initialMode={interviewMode}
            onBack={goDashboard}
          />
        )}

      </div>
    </AuthProvider>
  );
}

// Helper to decide view based on Auth
function DashboardWrapper({ onSelectMode, isGuest, onGuestLogin }) {
  const { currentUser } = useAuth();

  // If Logged In OR Guest -> Show Dashboard
  if (currentUser || isGuest) {
    return <Dashboard onSelectMode={onSelectMode} />;
  }

  // Otherwise -> Show Landing
  return <LandingPage onLogin={onGuestLogin} />;
}

export default App;