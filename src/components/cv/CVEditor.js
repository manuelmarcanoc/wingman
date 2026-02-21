import React, { useState, useEffect } from 'react';
import CVForm from './CVForm';
import CVPreview from './CVPreview';
import TemplateSelector from './TemplateSelector';
import { storageService } from '../../services/storage';
import { useAuth } from '../../context/AuthContext';

function CVEditor({ cvId, onBack }) {
    const { currentUser } = useAuth();
    // Load full CV object (wrapper) or default
    const [cvWrapper, setCvWrapper] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const found = await storageService.getCVById(cvId, currentUser);
            // If not found, look for any default or create empty wrapper
            if (found) {
                setCvWrapper(found);
            } else {
                const all = await storageService.getCVs(currentUser);
                setCvWrapper({ data: all[0]?.data || {} });
            }
            setLoading(false);
        };
        load();
    }, [cvId, currentUser]);

    // We work with the 'data' part, but need 'id' and 'name' for saving
    const [cvData, setCvData] = useState(null);
    const [cvName, setCvName] = useState("Mi CV");

    // Sync state when wrapper loads
    useEffect(() => {
        if (cvWrapper) {
            setCvData(cvWrapper.data || {});
            setCvName(cvWrapper.name || "Mi CV");
        }
    }, [cvWrapper]);

    const handleSave = async () => {
        if (!cvData) return;
        await storageService.saveCV(cvId, cvData, cvName, currentUser);
        alert('CV Guardado correctamente');
    };

    const handleChange = (section, field, value, index = null) => {
        setCvData(prevCoords => {
            // 1. Top-level fields (like 'summary')
            if (!section) {
                return { ...prevCoords, [field]: value };
            }

            // 2. Nested objects (like 'personalInfo')
            // If index is null, we assume we are updating a field in a section object
            if (index === null) {
                const currentSection = prevCoords[section];
                // Only proceed if it's NOT an array (because arrays are handled in case 3)
                if (!Array.isArray(currentSection)) {
                    return {
                        ...prevCoords,
                        [section]: {
                            ...(currentSection || {}), // Create if undefined/null
                            [field]: value
                        }
                    };
                }
            }

            // 3. Arrays (like 'experience' or 'education')
            if (index !== null && Array.isArray(prevCoords[section])) {
                const newArray = [...prevCoords[section]];
                newArray[index] = { ...newArray[index], [field]: value };
                return { ...prevCoords, [section]: newArray };
            }

            return prevCoords;
        });
    };

    const addItem = (section, initialItem) => {
        setCvData(prev => ({
            ...prev,
            [section]: [...(prev[section] || []), initialItem]
        }));
    };

    const removeItem = (section, index) => {
        setCvData(prev => ({
            ...prev,
            [section]: prev[section].filter((_, i) => i !== index)
        }));
    };

    if (loading || !cvData) return <div style={{ padding: 20, color: 'white' }}>Cargando Editor...</div>;

    return (
        <div className="cv-editor-container" style={{
            display: 'flex',
            height: '100vh',
            padding: '20px',
            boxSizing: 'border-box',
            gap: '20px',
            position: 'relative',
            zIndex: 10
        }}>
            {/* Left: Form Sidebar (Floating Window) */}
            <div className="glass-window" style={{
                width: '450px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                flexShrink: 0
            }}>
                {/* Internal Toolbar (Inside Window) */}
                <div style={{ padding: '15px', borderBottom: '2px solid #ddd', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button onClick={onBack} className="btn-pixel btn-pixel-gray" style={{ fontSize: '0.7rem' }}>Volver</button>
                    <button onClick={handleSave} className="btn-pixel btn-pixel-green" style={{ fontSize: '0.7rem', flex: 1 }}>GUARDAR</button>
                    <button onClick={() => window.print()} className="btn-pixel btn-pixel-orange" style={{ fontSize: '0.7rem' }}>PDF</button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 'bold', color: '#666', marginBottom: '5px' }}>Nombre del Proyecto</label>
                        <input
                            value={cvName}
                            onChange={(e) => setCvName(e.target.value)}
                            style={{
                                width: '100%', padding: '10px', border: '2px solid #ddd', borderRadius: '8px',
                                fontWeight: 'bold', boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#333' }}>🎨 Diseño</h3>
                    <TemplateSelector
                        selectedTemplate={cvData.template || 'modern'}
                        onSelect={(tpl) => handleChange(null, 'template', tpl)}
                    />
                    <hr style={{ border: 'none', borderBottom: '1px solid #e2e8f0', margin: '20px 0' }} />

                    <CVForm
                        data={cvData}
                        onChange={handleChange}
                        onAdd={addItem}
                        onRemove={removeItem}
                    />
                </div>
            </div>

            {/* Right: Preview (Floating) */}
            <div className="no-scrollbar" style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                overflowY: 'auto',
                overflowX: 'hidden',
                padding: '20px'
            }}>
                <CVPreview data={cvData} template={cvData.template || 'modern'} />
            </div>
        </div>
    );
}

export default CVEditor;
