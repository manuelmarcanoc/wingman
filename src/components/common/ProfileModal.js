import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Image as ImageIcon, X } from 'lucide-react';

function ProfileModal({ isOpen, onClose }) {
    const { currentUser, updateUserProfile } = useAuth();

    const [name, setName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && currentUser) {
            setName(currentUser.displayName || '');
            setPhotoURL(currentUser.photoURL || '');
            setError('');
        }
    }, [isOpen, currentUser]);

    if (!isOpen || !currentUser) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (!name.trim()) throw new Error("El nombre no puede estar vacío.");
            await updateUserProfile(name, photoURL);
            onClose();
        } catch (err) {
            console.error(err);
            setError(err.message);
        }
        setLoading(false);
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(5px)',
            display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10000
        }}>
            <div style={{
                background: 'white', borderRadius: '20px', padding: '40px',
                width: '100%', maxWidth: '400px', position: 'relative',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                textAlign: 'center'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute', top: '15px', right: '15px',
                        background: 'none', border: 'none', cursor: 'pointer', color: '#64748b'
                    }}
                >
                    <X size={24} />
                </button>

                <h2 style={{ fontFamily: "'VT323', monospace", fontSize: '2.5rem', marginTop: 0, color: '#1e3a8a' }}>
                    AJUSTES DE PERFIL
                </h2>

                {error && <div style={{ background: '#fee2e2', color: '#b91c1c', padding: '10px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem' }}>{error}</div>}

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <img
                        src={photoURL || 'https://api.dicebear.com/7.x/pixel-art/svg?seed=' + (currentUser.email || 'guest')}
                        alt="Preview"
                        style={{ width: '80px', height: '80px', borderRadius: '50%', border: '4px solid #e2e8f0', objectFit: 'cover' }}
                        onError={(e) => { e.target.src = 'https://api.dicebear.com/7.x/pixel-art/svg?seed=error'; }} // Fallback for invalid URLs
                    />
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                    <div style={{ position: 'relative' }}>
                        <User size={20} color="#94a3b8" style={{ position: 'absolute', top: '15px', left: '15px' }} />
                        <input
                            type="text"
                            placeholder="Tu Nombre"
                            value={name} onChange={(e) => setName(e.target.value)}
                            style={{ paddingLeft: '45px', width: '100%', margin: 0 }}
                            required
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <ImageIcon size={20} color="#94a3b8" style={{ position: 'absolute', top: '15px', left: '15px' }} />
                        <input
                            type="text"
                            placeholder="URL de la Foto (Opcional)"
                            value={photoURL} onChange={(e) => setPhotoURL(e.target.value)}
                            style={{ paddingLeft: '45px', width: '100%', margin: 0 }}
                        />
                    </div>

                    <p style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'left', margin: '0' }}>
                        * Recomendamos pegar un enlace web de imagen directo que termine en .jpg, .png...
                    </p>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-pixel"
                        style={{ marginTop: '10px' }}
                    >
                        {loading ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                </form>

            </div>
        </div>
    );
}

export default ProfileModal;
