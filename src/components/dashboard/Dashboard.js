import React from 'react';
import '../../App.css';

function Dashboard({ onSelectMode }) {

    return (
        <div className="clouds-dashboard">

            <div className="cloud-btn float-1" onClick={() => onSelectMode('interview')} style={{ backgroundImage: "url('/nube.png')" }}>
                <span className="cloud-icon">💬</span>
                <div className="cloud-title">Entrevista</div>
                <div className="cloud-desc">Chat Texto</div>
            </div>

            <div className="cloud-btn float-3" onClick={() => onSelectMode('voice')} style={{ backgroundImage: "url('/nube.png')" }}>
                <span className="cloud-icon">🎙️</span>
                <div className="cloud-title">Modo Voz</div>
                <div className="cloud-desc">Hablar en vivo</div>
            </div>

            <div className="cloud-btn float-2" onClick={() => onSelectMode('cv-fix')} style={{ backgroundImage: "url('/nube.png')" }}>
                <span className="cloud-icon">✨</span>
                <div className="cloud-title">Mejorar CV</div>
                <div className="cloud-desc">Revisión IA</div>
            </div>

            <div className="cloud-btn float-4" onClick={() => onSelectMode('jobs')} style={{ backgroundImage: "url('/nube.png')" }}>
                <span className="cloud-icon">📂</span>
                <div className="cloud-title">Ofertas</div>
                <div className="cloud-desc">Gestión</div>
            </div>

            <div className="cloud-btn float-1" onClick={() => onSelectMode('create-cv')} style={{ backgroundImage: "url('/nube.png')" }}>
                <span className="cloud-icon">📝</span>
                <div className="cloud-title">Editor CV</div>
                <div className="cloud-desc">Nuevo (Hi-Fi)</div>
            </div>
        </div>
    );
}

export default Dashboard;
