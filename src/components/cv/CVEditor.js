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
        <div className="cv-editor-container" style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
            {/* Header Toolbar */}
            <div style={{ padding: '10px', background: '#333', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={onBack} style={{ background: 'transparent', border: '1px solid white', color: 'white', cursor: 'pointer' }}>⬅ Volver</button>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input
                        value={cvName}
                        onChange={(e) => setCvName(e.target.value)}
                        style={{
                            background: '#444', border: 'none', color: 'white', padding: '5px', borderRadius: '4px',
                            fontWeight: 'bold', textAlign: 'center'
                        }}
                    />
                </div>
                <button onClick={handleSave} style={{ background: '#4ade80', color: '#000', border: 'none', padding: '5px 15px', cursor: 'pointer', fontWeight: 'bold' }}>GUARDAR</button>
                <button onClick={() => window.print()} style={{ background: '#f97316', color: 'white', border: 'none', padding: '5px 15px', cursor: 'pointer', fontWeight: 'bold' }}>DESCARGAR PDF</button>
            </div>

            {/* Main Split View */}
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                {/* Left: Form Sidebar */}
                <div style={{ width: '40%', minWidth: '350px', borderRight: '2px solid #ddd', overflowY: 'auto', background: '#f8fafc', padding: '10px' }}>
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

                {/* Right: Preview */}
                <div style={{ flex: 1, background: '#e2e8f0', padding: '20px', overflowY: 'auto', display: 'flex', justifyContent: 'center' }}>
                    <CVPreview data={cvData} template={cvData.template || 'modern'} />
                </div>
            </div>
        </div>
    );
}

export default CVEditor;
