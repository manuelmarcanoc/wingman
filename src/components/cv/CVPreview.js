import React from 'react';

function CVPreview({ data, template = 'modern' }) {

    // --- STYLES FOR EACH TEMPLATE ---
    // --- STYLES FOR EACH TEMPLATE ---
    const styles = {
        modern: {
            font: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            bg: 'white',
            headerBorder: '2px solid #333',
            titleColor: '#333',
            accent: '#333'
        },
        minimalist: {
            font: '"Garamond", serif',
            bg: '#fafafa',
            headerBorder: 'none',
            titleColor: '#444',
            accent: '#10b981'
        },
        pixel: {
            font: "'VT323', monospace",
            bg: '#fff1f2',
            headerBorder: '4px solid #000',
            titleColor: '#e11d48',
            accent: '#000'
        },
        executive: {
            font: '"Times New Roman", Times, serif',
            bg: '#fff',
            headerBorder: '1px solid #0f172a',
            titleColor: '#0f172a',
            accent: '#1e40af'
        },
        creative: {
            font: '"Poppins", sans-serif',
            bg: '#f0f9ff',
            headerBorder: 'none',
            titleColor: '#0891b2',
            accent: '#06b6d4'
        }
    };

    const currentStyle = styles[template] || styles.modern;

    return (
        <div className="cv-paper" style={{
            width: '210mm',
            minHeight: '297mm',
            background: currentStyle.bg,
            padding: '40px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            color: '#333',
            fontFamily: currentStyle.font,
            fontSize: template === 'pixel' ? '18px' : '14px',
            lineHeight: '1.5',
            transition: 'all 0.3s ease',
            display: 'flex',
            flexDirection: 'column'
        }}>

            {/* HEADER */}
            <div style={{
                borderBottom: currentStyle.headerBorder,
                paddingBottom: '20px',
                marginBottom: '20px',
                textAlign: template === 'minimalist' ? 'center' : 'left',
                display: 'flex',
                justifyContent: template === 'minimalist' ? 'center' : 'space-between',
                alignItems: 'center',
                flexDirection: template === 'minimalist' ? 'column' : 'row'
            }}>

                <div style={{ flex: 1 }}>
                    <h1 style={{ margin: '0 0 5px 0', fontSize: template === 'pixel' ? '42px' : '28px', textTransform: 'uppercase', letterSpacing: '1px', color: currentStyle.titleColor }}>
                        {data.personalInfo?.name || "TU NOMBRE"}
                    </h1>
                    <h2 style={{ margin: '0 0 15px 0', fontSize: template === 'pixel' ? '24px' : '16px', color: '#666', fontWeight: '400' }}>
                        {data.personalInfo?.title || "TÍTULO PROFESIONAL"}
                    </h2>

                    <div style={{ fontSize: '12px', color: '#555', display: 'flex', gap: '20px', justifyContent: template === 'minimalist' ? 'center' : 'flex-start', flexWrap: 'wrap' }}>
                        <span>📧 {data.personalInfo?.email || "email@ejemplo.com"}</span>
                        <span>📱 {data.personalInfo?.phone || "+34 123 456 789"}</span>
                    </div>
                </div>

                {/* PHOTO */}
                {data.personalInfo?.photo && (
                    <img
                        src={data.personalInfo.photo}
                        alt="Profile"
                        style={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'cover',
                            borderRadius: template === 'pixel' ? '0' : '50%',
                            border: `2px solid ${currentStyle.accent}`,
                            marginLeft: template === 'minimalist' ? '0' : '20px',
                            marginBottom: template === 'minimalist' ? '15px' : '0',
                            order: template === 'minimalist' ? '-1' : '1'
                        }}
                    />
                )}
            </div>

            {/* SUMMARY */}
            {data.summary && (
                <div style={{ marginBottom: '25px' }}>
                    <h3 style={{ borderBottom: `1px solid ${currentStyle.accent}`, paddingBottom: '5px', marginBottom: '10px', fontSize: '14px', textTransform: 'uppercase', color: currentStyle.accent }}>
                        Resumen
                    </h3>
                    <p style={{ margin: 0, color: '#444' }}>{data.summary}</p>
                </div>
            )}

            {/* EXPERIENCE */}
            <div style={{ marginBottom: '25px' }}>
                <h3 style={{ borderBottom: `1px solid ${currentStyle.accent}`, paddingBottom: '5px', marginBottom: '15px', fontSize: '14px', textTransform: 'uppercase', color: currentStyle.accent }}>
                    Experiencia Profesional
                </h3>

                {(!data.experience || data.experience.length === 0) ? (
                    <p style={{ color: '#aaa', fontStyle: 'italic' }}>Añade tu experiencia para verla aquí...</p>
                ) : (
                    data.experience.map((exp, i) => (
                        <div key={i} style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                                <span style={{ fontWeight: 'bold' }}>{exp.role}</span>
                                <span style={{ fontSize: '12px', color: '#666' }}>{exp.years}</span>
                            </div>
                            <div style={{ fontSize: '13px', fontStyle: 'italic', marginBottom: '5px' }}>{exp.company}</div>
                            <p style={{ margin: 0, fontSize: '13px', color: '#444' }}>{exp.description}</p>
                        </div>
                    ))
                )}
            </div>

            {/* EDUCATION */}
            <div style={{ marginBottom: '25px' }}>
                <h3 style={{ borderBottom: `1px solid ${currentStyle.accent}`, paddingBottom: '5px', marginBottom: '15px', fontSize: '14px', textTransform: 'uppercase', color: currentStyle.accent }}>
                    Educación
                </h3>

                {data.education?.map((edu, i) => (
                    <div key={i} style={{ marginBottom: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontWeight: 'bold' }}>{edu.degree}</span>
                            <span style={{ fontSize: '12px', color: '#666' }}>{edu.year}</span>
                        </div>
                        <div style={{ fontSize: '13px' }}>{edu.school}</div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default CVPreview;
