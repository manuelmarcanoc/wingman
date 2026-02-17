import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { storageService } from '../../services/storage';
import CVPreview from './CVPreview';

function CVManager({ onSelectCV, onBack }) {
    const { currentUser } = useAuth();
    const [cvs, setCvs] = useState([]);

    useEffect(() => {
        const loadCVs = async () => {
            const loadedCvs = await storageService.getCVs(currentUser);
            setCvs(loadedCvs);
        };
        loadCVs();
    }, [currentUser]); // Reload when user changes

    const refreshCVs = async () => {
        const loadedCvs = await storageService.getCVs(currentUser);
        setCvs(loadedCvs);
    };

    const handleCreate = async () => {
        const name = prompt("Nombre para el nuevo CV:", "Mi CV " + (cvs.length + 1));
        if (name) {
            const newId = await storageService.createCV(name, currentUser);
            refreshCVs();
            // Automatically select the new CV
            onSelectCV(newId);
        }
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (window.confirm("¿Seguro que quieres borrar este CV?")) {
            await storageService.deleteCV(id, currentUser);
            refreshCVs();
        }
    };

    return (
        <div className="cv-manager-container" style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header Improved */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '50px',
                borderBottom: '2px solid rgba(255,255,255,0.3)',
                paddingBottom: '20px'
            }}>
                <button
                    onClick={onBack}
                    className="btn-back"
                    style={{ position: 'static', margin: 0, transform: 'none' }}
                >
                    ⬅ Volver
                </button>

                <h2 style={{
                    margin: 0,
                    fontSize: '2.5rem',
                    fontFamily: "'VT323', monospace",
                    color: 'white',
                    textShadow: '2px 2px 0px rgba(0,0,0,0.2)'
                }}>
                    MIS CURRÍCULUMS
                </h2>

                <button
                    onClick={handleCreate}
                    style={{
                        background: '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderBottom: '4px solid #1e40af',
                        padding: '10px 25px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        fontFamily: "'VT323', monospace"
                    }}
                >
                    + CREAR NUEVO
                </button>
            </div>

            {/* Horizontal Scroll of CVs */}
            <div style={{
                display: 'flex',
                overflowX: 'auto',
                gap: '40px',
                padding: '20px 0 60px 0',
                width: '100%',
                scrollBehavior: 'smooth'
            }}>
                {cvs.length === 0 && (
                    <div style={{ width: '100%', textAlign: 'center', color: 'white', padding: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px' }}>
                        No tienes ningún CV guardado. ¡Crea el primero!
                    </div>
                )}

                {cvs.map(cv => (
                    <div
                        key={cv.id}
                        onClick={() => onSelectCV(cv.id)}
                        style={{
                            position: 'relative',
                            height: '450px',
                            width: '300px', // Fixed width for horizontal scroll items
                            flexShrink: 0, // Prevent shrinking
                            borderRadius: '15px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            background: 'transparent',
                            perspective: '1000px'
                        }}
                        className="cv-card-container"
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-10px)';
                            e.currentTarget.querySelector('.preview-overlay').style.opacity = '1';
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.querySelector('.preview-overlay').style.opacity = '0';
                        }}
                    >
                        {/* THE PREVIEW (Scaled Down) */}
                        <div style={{
                            width: '210mm', // A4 width
                            height: '297mm', // A4 height
                            transform: 'scale(0.35)', // Scale down to fit
                            transformOrigin: 'top left',
                            background: 'white',
                            borderRadius: '4px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                            overflow: 'hidden',
                            pointerEvents: 'none', // Prevent interactions with internal elements
                            position: 'absolute',
                            top: 0,
                            left: 0
                        }}>
                            {/* Import CVPreview locally if not imported at top, assumed imported */}
                            <CVPreview data={cv.data} template={cv.data.template || 'modern'} />
                        </div>

                        {/* Hover Overlay & Info */}
                        <div className="preview-overlay" style={{
                            position: 'absolute',
                            top: 0, left: 0,
                            width: '277px',
                            height: '393px',
                            background: 'rgba(30, 58, 138, 0.6)',
                            borderRadius: '4px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0,
                            transition: 'opacity 0.3s',
                            color: 'white',
                            backdropFilter: 'blur(2px)'
                        }}>
                            <span style={{ fontSize: '2rem' }}>✏️</span>
                            <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 'bold' }}>Editar</span>
                        </div>

                        {/* Title Bar below the "paper" */}
                        <div style={{
                            position: 'absolute',
                            top: '400px',
                            left: 0,
                            width: '277px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '5px'
                        }}>
                            <h3 style={{ margin: 0, color: 'white', fontSize: '1.2rem', fontFamily: "'Nunito', sans-serif" }}>{cv.name}</h3>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>
                                    {new Date(cv.lastModified).toLocaleDateString()}
                                </p>
                                <button
                                    onClick={(e) => handleDelete(e, cv.id)}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '1rem',
                                        padding: '5px',
                                        opacity: 0.7,
                                        transition: 'opacity 0.2s'
                                    }}
                                    onMouseEnter={e => e.target.style.opacity = 1}
                                    onMouseLeave={e => e.target.style.opacity = 0.7}
                                    title="Borrar CV"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CVManager;
