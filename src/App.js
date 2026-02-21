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
import Tutorial from './components/common/Tutorial';
import AuthModal from './components/common/AuthModal';
import ProfileModal from './components/common/ProfileModal';
import UpgradePlan from './components/common/UpgradePlan';
import { AuthProvider, useAuth } from './context/AuthContext';

function App() {
  const [step, setStep] = useState('dashboard');
  const [interviewMode, setInterviewMode] = useState('chat'); // 'chat' or 'voice'
  const [isGuest, setIsGuest] = useState(false); // New Guest State

  // Global Selection State
  const [activeOffer, setActiveOffer] = useState(null);
  const [activeCVId, setActiveCVId] = useState(null); // Track selected CV

  // Tutorial & Theme State
  const [runTutorial, setRunTutorial] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // New Dark Mode State
  const [showAuthModal, setShowAuthModal] = useState(false); // Auth Modal State
  const [showProfileModal, setShowProfileModal] = useState(false); // Profile Modal State
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' or 'register'

  const openAuthModal = (mode = 'login') => {
    setAuthModalMode(mode);
    setShowAuthModal(true);
  };

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
    } else if (mode === 'upgrade') {
      setStep('upgrade');
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
      <div className={`app-wrapper ${isDarkMode ? 'dark-mode' : ''}`} style={{ minHeight: '100vh', width: '100%' }}>

        {/* Auth Modal overlay for Login/Register */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode={authModalMode}
        />

        <Tutorial run={runTutorial} onFinish={() => setRunTutorial(false)} />
        <div className="sky-container">
          {/* Background Clouds */}
          <div className="bg-cloud c1"></div>
          <div className="bg-cloud c2"></div>

          {/* Moon for Night Mode */}
          <div className={`moon ${isDarkMode ? 'visible' : ''}`}></div>

          {/* Flying Dove / Bat */}
          <div className={`flying-dove ${isDarkMode ? 'bat' : ''}`} style={{
            '--bg-1': isDarkMode ? "url('/mur1.png')" : "url('/volando1.png')",
            '--bg-2': isDarkMode ? "url('/mur2.png')" : "url('/volando2.png')",
            '--bg-3': isDarkMode ? "url('/mur3.png')" : "none"
          }}></div>
        </div>

        {/* Navbar moved outside of constrained app-content to span full width */}
        <Navbar
          onNavigate={handleSelectMode}
          onStartTutorial={() => {
            setStep('dashboard'); // Ensure we are on dashboard for the tutorial
            setRunTutorial(true);
          }}
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          onOpenAuth={openAuthModal}
          onOpenProfile={() => setShowProfileModal(true)}
          isGuest={isGuest}
        />

        <div className="app-content">

          {step === 'dashboard' && (
            <DashboardWrapper
              onSelectMode={handleSelectMode}
              isGuest={isGuest}
              onGuestLogin={handleGuestLogin}
              onOpenAuth={openAuthModal}
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

          {step === 'upgrade' && (
            <UpgradePlan onBack={goDashboard} />
          )}

        </div>
      </div>
    </AuthProvider>
  );
}

// Helper to decide view based on Auth
function DashboardWrapper({ onSelectMode, isGuest, onGuestLogin, onOpenAuth }) {
  const { currentUser } = useAuth();

  // If Logged In OR Guest -> Show Dashboard
  if (currentUser || isGuest) {
    return <Dashboard onSelectMode={onSelectMode} />;
  }

  // Otherwise -> Show Landing
  return <LandingPage onLogin={onGuestLogin} onOpenAuth={onOpenAuth} />;
}

export default App;