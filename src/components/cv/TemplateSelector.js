import React from 'react';

const templates = [
    // Free Templates
    { id: 'modern', name: 'Moderno', color: '#3b82f6', icon: '📄', isPro: false },
    { id: 'minimalist', name: 'Minimalista', color: '#10b981', icon: '📝', isPro: false },
    { id: 'pixel', name: 'Pixel Art', color: '#f97316', icon: '👾', isPro: false },
    { id: 'executive', name: 'Ejecutivo', color: '#1e40af', icon: '👔', isPro: false },
    { id: 'creative', name: 'Creativo', color: '#06b6d4', icon: '🎨', isPro: false },

    // Pro Templates
    { id: 'pro-editorial', name: 'Editorial', color: '#475569', icon: '📸', isPro: true },
    { id: 'pro-dark', name: 'Oscuro', color: '#1e293b', icon: '🦇', isPro: true },
    { id: 'pro-border', name: 'Vanguardia', color: '#6366f1', icon: '🟦', isPro: true },
    { id: 'pro-y2k', name: 'Y2K Win98', color: '#d946ef', icon: '💾', isPro: true },
];

function TemplateSelector({ selectedTemplate, onSelect }) {
    // Para la demo, el usuario ha pedido dejar las plantillas gratis por ahora.
    const userIsPro = true;

    const handleSelect = (tpl) => {
        // La lógica se mantiene pero userIsPro ahora es true para todos
        onSelect(tpl.id);
    };

    return (
        <div className="template-selector-container" style={{
            display: 'flex',
            gap: '15px',
            background: '#f8fafc',
            padding: '15px',
            borderRadius: '15px',
            marginBottom: '20px',
            overflowX: 'auto',
            alignItems: 'center'
        }}>
            {templates.map(tpl => {
                const isLocked = tpl.isPro && !userIsPro;
                return (
                    <div
                        key={tpl.id}
                        onClick={() => handleSelect(tpl)}
                        style={{
                            minWidth: '100px',
                            height: '100px',
                            background: selectedTemplate === tpl.id ? 'white' : 'transparent',
                            border: `3px solid ${selectedTemplate === tpl.id ? tpl.color : '#e2e8f0'}`,
                            borderRadius: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: isLocked ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s',
                            transform: selectedTemplate === tpl.id ? 'scale(1.05)' : 'scale(1)',
                            boxShadow: selectedTemplate === tpl.id ? `0 5px 15px ${tpl.color}40` : 'none',
                            position: 'relative',
                            opacity: isLocked ? 0.7 : 1
                        }}
                    >
                        {tpl.isPro && (
                            <div style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                background: '#f59e0b',
                                color: 'white',
                                fontSize: '0.6rem',
                                fontWeight: 'bold',
                                padding: '2px 6px',
                                borderRadius: '10px',
                                border: '2px solid white',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                            }}>
                                PRO
                            </div>
                        )}

                        <span style={{ fontSize: '2rem', filter: isLocked ? 'grayscale(100%)' : 'none' }}>{tpl.icon}</span>
                        <span style={{
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            color: selectedTemplate === tpl.id ? tpl.color : '#64748b',
                            marginTop: '5px'
                        }}>
                            {tpl.name}
                        </span>

                        {isLocked && (
                            <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.4)', borderRadius: '8px' }}></div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default TemplateSelector;
