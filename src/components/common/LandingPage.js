import React from 'react';
import { useAuth } from '../../context/AuthContext';

function LandingPage({ onLogin }) {
    const { loginWithGoogle } = useAuth();

    return (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#1e293b' }}>
            {/* HERO SECTION */}
            <div style={{ marginBottom: '60px', animation: 'fadeIn 1s ease-in' }}>
                <h1 style={{
                    fontFamily: "'VT323', monospace",
                    fontSize: '5rem',
                    margin: '0 0 20px 0',
                    color: '#1e3a8a',
                    textShadow: '4px 4px 0px rgba(255,255,255,0.5)'
                }}>
                    TU COPILOTO DE CARRERA
                </h1>
                <p style={{ fontSize: '1.5rem', maxWidth: '800px', margin: '0 auto 40px auto', lineHeight: '1.6' }}>
                    Olvídate de los CVs aburridos.
                    <br />
                    <strong>Wingman</strong> te ayuda a crear currículums de alto impacto,
                    practicar entrevistas con IA y conseguir el trabajo de tus sueños.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                    <button
                        onClick={loginWithGoogle}
                        style={{
                            background: '#f97316',
                            color: 'white',
                            border: 'none',
                            borderBottom: '6px solid #c2410c',
                            padding: '20px 50px',
                            fontSize: '2rem',
                            fontFamily: "'VT323', monospace",
                            borderRadius: '15px',
                            cursor: 'pointer',
                            transition: 'transform 0.1s',
                            boxShadow: '0 10px 20px rgba(249, 115, 22, 0.3)'
                        }}
                        onMouseDown={e => {
                            e.currentTarget.style.transform = 'translateY(4px)';
                            e.currentTarget.style.borderBottomWidth = '2px';
                        }}
                        onMouseUp={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderBottomWidth = '6px';
                        }}
                    >
                        ¡EMPEZAR AHORA! 🚀
                    </button>

                    <button
                        onClick={onLogin} // Reusing onLogin prop for Guest Mode trigger (we'll pass handleGuest from App)
                        style={{
                            background: 'transparent',
                            border: 'none',
                            textDecoration: 'underline',
                            color: '#64748b',
                            cursor: 'pointer',
                            fontSize: '1.2rem',
                            fontFamily: "'VT323', monospace"
                        }}
                    >
                        o probar sin cuenta (Modo Invitado)
                    </button>
                </div>
            </div>

            {/* FEATURES GRID */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '40px',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <FeatureCard
                    icon="📝"
                    title="Editor Pixel-Perfect"
                    desc="Crea CVs visuales con plantillas modernas y edición en tiempo real."
                />
                <FeatureCard
                    icon="🤖"
                    title="Entrevistas IA"
                    desc="Practica con nuestro reclutador virtual. Te escucha, te responde y te evalúa."
                />
                <FeatureCard
                    icon="☁️"
                    title="Siempre en la Nube"
                    desc="Tus datos seguros y accesibles desde cualquier lugar con tu cuenta de Google."
                />
            </div>

            {/* TESTIMONIAL / SOCIAL PROOF (Visual Filler) */}
            <div style={{ marginTop: '80px', padding: '40px', background: 'rgba(255,255,255,0.6)', borderRadius: '30px', backdropFilter: 'blur(5px)' }}>
                <h3 style={{ fontFamily: "'VT323', monospace", fontSize: '2.5rem', marginBottom: '20px' }}>LO QUE DICEN NUESTROS PILOTOS</h3>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Testimonial user="Ana G." role="Frontend Dev" text="¡Conseguí el trabajo! La IA me ayudó a pulir mis respuestas." />
                    <Testimonial user="Carlos M." role="UX Designer" text="El editor es súper intuitivo. Mis CVs nunca se vieron tan bien." />
                </div>
            </div>
        </div>
    );
}

function FeatureCard({ icon, title, desc }) {
    return (
        <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
            border: '4px solid #e2e8f0',
            textAlign: 'left',
            transition: 'transform 0.3s'
        }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-10px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>{icon}</div>
            <h3 style={{ fontFamily: "'VT323', monospace", fontSize: '2rem', color: '#3b82f6', margin: '0 0 10px 0' }}>{title}</h3>
            <p style={{ fontSize: '1.1rem', color: '#64748b' }}>{desc}</p>
        </div>
    );
}

function Testimonial({ user, role, text }) {
    return (
        <div style={{ background: 'white', padding: '20px', borderRadius: '15px', maxWidth: '300px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
            <p style={{ fontStyle: 'italic', marginBottom: '15px' }}>"{text}"</p>
            <div style={{ fontWeight: 'bold' }}>{user}</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{role}</div>
        </div>
    );
}

export default LandingPage;
