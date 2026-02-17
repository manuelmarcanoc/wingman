import React from 'react';
import { useAuth } from '../../context/AuthContext';

function Navbar({ onNavigate }) {
    const { currentUser, loginWithGoogle, logout } = useAuth();

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px 30px',
            background: 'transparent', // Let the sky show through
            position: 'relative',
            zIndex: 1000,
            marginBottom: '60px'
        }}>
            {/* Logo Area - Pixel Style */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }} onClick={() => onNavigate('dashboard')}>
                <img
                    src="/paloma.gif"
                    alt="Logo"
                    style={{
                        height: '60px',
                        filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.2))'
                    }}
                />
                <h1 style={{
                    margin: 0,
                    fontSize: '2.5rem',
                    fontFamily: "'VT323', monospace",
                    color: 'white',
                    textShadow: '4px 4px 0px #1e3a8a',
                    letterSpacing: '3px'
                }}>
                    WINGMAN
                </h1>
            </div>

            {/* Simulated Desktop Links (Hidden on small screens if we had responsive, but simple for now) */}
            <div style={{ display: 'flex', gap: '30px' }}>
                {['INICIO', 'OFERTAS'].map(link => (
                    <span
                        key={link}
                        onClick={() => link === 'INICIO' ? onNavigate('dashboard') : link === 'OFERTAS' ? onNavigate('jobs') : alert('Próximamente')}
                        style={{
                            cursor: 'pointer',
                            color: 'white',
                            fontFamily: "'VT323', monospace",
                            fontSize: '1.5rem',
                            textShadow: '2px 2px 0px rgba(0,0,0,0.2)',
                            borderBottom: '2px solid transparent'
                        }}
                        onMouseEnter={e => e.target.style.borderBottom = '2px solid white'}
                        onMouseLeave={e => e.target.style.borderBottom = 'transparent'}
                    >
                        {link}
                    </span>
                ))}
            </div>

            {/* Auth Area - Retro Buttons */}
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>


                {currentUser ? (
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '15px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        padding: '5px 15px',
                        borderRadius: '15px',
                        border: '2px solid white',
                        backdropFilter: 'blur(5px)'
                    }}>
                        <button
                            onClick={() => alert("🚀 PLAN WINGMAN GOLD 🚀\n\n- Entrevistas Ilimitadas\n- Análisis de CV Avanzado\n- +20 Plantillas Premium\n\n¡Próximamente!")}
                            style={{
                                background: 'linear-gradient(45deg, #facc15, #ca8a04)',
                                border: 'none',
                                borderBottom: '4px solid #854d0e',
                                color: '#422006',
                                padding: '5px 15px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontFamily: "'VT323', monospace",
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                boxShadow: '0 0 10px rgba(250, 204, 21, 0.5)',
                                animation: 'pulse 2s infinite',
                                marginRight: '10px'
                            }}
                        >
                            ⚡ MEJORAR PLAN
                        </button>

                        <img
                            src={currentUser.photoURL}
                            alt="User"
                            style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid white' }}
                        />
                        <span style={{
                            fontSize: '1.2rem',
                            color: 'white',
                            fontFamily: "'VT323', monospace",
                            textShadow: '1px 1px 0px rgba(0,0,0,0.5)'
                        }}>
                            {currentUser.displayName.split(' ')[0]}
                        </span>
                        <button
                            onClick={logout}
                            style={{
                                background: '#ef4444',
                                border: 'none',
                                borderBottom: '4px solid #b91c1c',
                                color: 'white',
                                cursor: 'pointer',
                                fontFamily: "'VT323', monospace",
                                fontSize: '1.2rem',
                                padding: '5px 10px',
                                borderRadius: '8px'
                            }}
                        >
                            SALIR
                        </button>
                    </div>
                ) : (
                    <>
                        <button
                            onClick={loginWithGoogle}
                            style={{
                                background: 'white',
                                border: 'none',
                                borderBottom: '4px solid #cbd5e1',
                                color: '#333',
                                padding: '10px 20px',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                fontFamily: "'VT323', monospace",
                                fontSize: '1.5rem',
                                textTransform: 'uppercase'
                            }}
                        >
                            Login
                        </button>
                        <button
                            onClick={loginWithGoogle}
                            style={{
                                background: '#f97316',
                                border: 'none',
                                borderBottom: '4px solid #c2410c',
                                color: 'white',
                                padding: '10px 20px',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                fontFamily: "'VT323', monospace",
                                fontSize: '1.5rem',
                                textTransform: 'uppercase'
                            }}
                        >
                            Registro
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
