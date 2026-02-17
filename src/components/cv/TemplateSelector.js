import React from 'react';

const templates = [
    { id: 'modern', name: 'Moderno', color: '#3b82f6', icon: '📄' },
    { id: 'minimalist', name: 'Minimalista', color: '#10b981', icon: '📝' },
    { id: 'pixel', name: 'Pixel Art', color: '#f97316', icon: '👾' },
    { id: 'executive', name: 'Ejecutivo', color: '#1e40af', icon: '👔' },
    { id: 'creative', name: 'Creativo', color: '#06b6d4', icon: '🎨' },
];

function TemplateSelector({ selectedTemplate, onSelect }) {
    return (
        <div style={{
            display: 'flex',
            gap: '15px',
            background: '#f8fafc',
            padding: '15px',
            borderRadius: '15px',
            marginBottom: '20px',
            overflowX: 'auto'
        }}>
            {templates.map(tpl => (
                <div
                    key={tpl.id}
                    onClick={() => onSelect(tpl.id)}
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
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        transform: selectedTemplate === tpl.id ? 'scale(1.05)' : 'scale(1)',
                        boxShadow: selectedTemplate === tpl.id ? `0 5px 15px ${tpl.color}40` : 'none'
                    }}
                >
                    <span style={{ fontSize: '2rem' }}>{tpl.icon}</span>
                    <span style={{
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        color: selectedTemplate === tpl.id ? tpl.color : '#64748b',
                        marginTop: '5px'
                    }}>
                        {tpl.name}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default TemplateSelector;
