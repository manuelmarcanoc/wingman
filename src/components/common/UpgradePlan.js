import React, { useState } from 'react';

function UpgradePlan({ onBack }) {
    const [isAnnual, setIsAnnual] = useState(false);

    const price = isAnnual ? '99' : '10';
    const period = isAnnual ? '/año' : '/mes';

    const handleSubscribe = () => {
        alert("¡Integración con Stripe próximamente!\nDisfrutarás de Entrevistas por Voz y Optimización de LinkedIn con IA.");
    };

    return (
        <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', color: 'white' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
                <button
                    onClick={onBack}
                    className="btn-back"
                    style={{ position: 'static', margin: 0, transform: 'none' }}
                >
                    ⬅ Volver
                </button>
                <h2 style={{
                    flex: 1,
                    textAlign: 'center',
                    margin: 0,
                    fontSize: '2.5rem',
                    fontFamily: "'VT323', monospace",
                    textShadow: '2px 2px 0px rgba(0,0,0,0.2)'
                }}>
                    POTENCIA TU BÚSQUEDA
                </h2>
            </div>

            {/* Billing Toggle */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', marginBottom: '50px' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: !isAnnual ? 'bold' : 'normal' }}>Mensual</span>

                {/* Toggle Switch */}
                <div
                    onClick={() => setIsAnnual(!isAnnual)}
                    style={{
                        width: '60px',
                        height: '30px',
                        background: isAnnual ? '#f59e0b' : '#3b82f6',
                        borderRadius: '15px',
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'background 0.3s'
                    }}
                >
                    <div style={{
                        width: '24px',
                        height: '24px',
                        background: 'white',
                        borderRadius: '50%',
                        position: 'absolute',
                        top: '3px',
                        left: isAnnual ? '33px' : '3px',
                        transition: 'left 0.3s',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                    }} />
                </div>

                <span style={{ fontSize: '1.2rem', fontWeight: isAnnual ? 'bold' : 'normal', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    Anual
                    <span style={{ background: '#22c55e', color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: 'bold' }}>Ahorra 15%</span>
                </span>
            </div>

            {/* Pricing Cards */}
            <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>

                {/* Free Tier */}
                <div style={{
                    flex: '1',
                    minWidth: '300px',
                    maxWidth: '400px',
                    background: 'rgba(255,255,255,0.85)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255,255,255,0.5)',
                    borderRadius: '20px',
                    padding: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    color: '#1e293b'
                }}>
                    <h3 style={{ fontSize: '1.8rem', margin: '0 0 10px 0', color: '#475569' }}>Plan Piloto</h3>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' }}>0€ <span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#64748b' }}>/siempre</span></div>

                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px 0', flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <li>✅ Gestor de CVs Básico</li>
                        <li>✅ Entrevista con IA (Solo Texto)</li>
                        <li>✅ Plantillas Estándar</li>
                        <li style={{ color: '#94a3b8' }}>❌ Entrevistas de Voz Realistas</li>
                        <li style={{ color: '#94a3b8' }}>❌ Plantillas Premium</li>
                        <li style={{ color: '#94a3b8' }}>❌ Análisis de perfil LinkedIn</li>
                    </ul>

                    <button disabled style={{
                        background: '#e2e8f0',
                        color: '#64748b',
                        border: '2px solid #cbd5e1',
                        padding: '15px',
                        borderRadius: '10px',
                        fontFamily: "'VT323', monospace",
                        fontSize: '1.5rem',
                        opacity: 0.8,
                        cursor: 'not-allowed'
                    }}>
                        TU PLAN ACTUAL
                    </button>
                </div>

                {/* Pro Tier */}
                <div style={{
                    flex: '1',
                    minWidth: '300px',
                    maxWidth: '400px',
                    background: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 100%)',
                    border: '3px solid #f59e0b',
                    borderRadius: '20px',
                    padding: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    transform: 'scale(1.05)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '-15px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: '#f59e0b',
                        color: 'black',
                        padding: '5px 15px',
                        borderRadius: '20px',
                        fontWeight: 'bold',
                        fontSize: '0.9rem'
                    }}>RECOMENDADO</div>

                    <h3 style={{ fontSize: '1.8rem', margin: '0 0 10px 0', color: '#fbbf24' }}>Plan Wingman <span style={{ fontSize: '1rem' }}>PRO</span></h3>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px', color: 'white' }}>{price}€ <span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#cbd5e1' }}>{period}</span></div>

                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 30px 0', flex: 1, display: 'flex', flexDirection: 'column', gap: '15px', color: '#f8fafc' }}>
                        <li>🚀 <strong>TODO</strong> lo del plan Piloto</li>
                        <li>🎤 <strong>Simulador de Voz Realista:</strong> Entrénate hablando por micrófono.</li>
                        <li>🎨 <strong>Plantillas Ultra-Premium</strong> ilimitadas.</li>
                        <li>💼 <strong>Auditoría LinkedIn IA:</strong> Conecta tu cuenta y generaremos los textos perfectos para tu perfil basados en tu CV.</li>
                    </ul>

                    <button
                        onClick={handleSubscribe}
                        style={{
                            background: '#f59e0b',
                            color: 'black',
                            border: 'none',
                            borderBottom: '4px solid #b45309',
                            padding: '15px',
                            borderRadius: '10px',
                            fontFamily: "'VT323', monospace",
                            fontSize: '1.8rem',
                            cursor: 'pointer',
                            transition: 'transform 0.1s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.filter = 'brightness(1.1)'}
                        onMouseLeave={e => e.currentTarget.style.filter = 'brightness(1)'}
                        onMouseDown={e => { e.currentTarget.style.transform = 'translateY(4px)'; e.currentTarget.style.borderBottomWidth = '0px'; }}
                        onMouseUp={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderBottomWidth = '4px'; }}
                    >
                        MEJORAR AHORA
                    </button>
                </div>

            </div>
        </div>
    );
}

export default UpgradePlan;
