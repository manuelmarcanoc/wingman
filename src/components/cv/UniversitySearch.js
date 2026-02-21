import React, { useState, useEffect, useRef } from 'react';

const UniversitySearch = ({ value, onChange, placeholder, style }) => {
    // Initialize local state from prop
    const [query, setQuery] = useState(value || '');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef(null);

    // Sync local state when prop changes (e.g. from parent re-render or initial load)
    useEffect(() => {
        setQuery(value || '');
    }, [value]);

    // Handle clicks outside to close suggestions
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    // Fetch Universities with Debounce
    useEffect(() => {
        const fetchUniversities = async () => {
            if (!query || query.length < 3) {
                setSuggestions([]);
                return;
            }

            try {
                const response = await fetch(`http://universities.hipolabs.com/search?name=${encodeURIComponent(query)}`);
                const data = await response.json();
                // Limit to 5 and avoid duplicates if possible, though API might return many
                setSuggestions(data.slice(0, 5));
            } catch (error) {
                console.error("Error fetching universities:", error);
            }
        };

        const timeoutId = setTimeout(() => {
            // Only fetch if suggestions are shown (user typing) and query isn't empty
            if (showSuggestions && query) {
                fetchUniversities();
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query, showSuggestions]);

    const handleSelect = (uni) => {
        // 1. Determine Logo URL
        const website = uni.web_pages && uni.web_pages[0];
        let logoUrl = null;

        if (website) {
            try {
                const domain = new URL(website).hostname;
                logoUrl = `https://logo.clearbit.com/${domain}`;
            } catch (e) {
                console.warn("Could not parse domain for logo:", website);
            }
        }

        // 2. Update Local State (Visual feedback)
        setQuery(uni.name);
        setShowSuggestions(false);

        // 3. Propagate to Parent
        // We pass the name and the logo
        if (onChange) {
            onChange({ name: uni.name, logo: logoUrl });
        }
    };

    const handleInputChange = (e) => {
        const val = e.target.value;
        setQuery(val);
        setShowSuggestions(true);

        // Propagate changes as text-only for now (logo becomes null/undefined if typing manual)
        if (onChange) {
            onChange({ name: val, logo: null });
        }
    };

    return (
        <div ref={wrapperRef} style={{ position: 'relative' }}>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onFocus={() => setShowSuggestions(true)}
                placeholder={placeholder}
                style={style}
            />
            {showSuggestions && suggestions.length > 0 && (
                <ul style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    background: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    zIndex: 1000,
                    maxHeight: '200px',
                    overflowY: 'auto',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                    {suggestions.map((uni, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(uni)}
                            style={{
                                padding: '10px',
                                cursor: 'pointer',
                                borderBottom: index < suggestions.length - 1 ? '1px solid #eee' : 'none',
                                fontSize: '0.9rem',
                                color: '#333'
                            }}
                            onMouseEnter={(e) => e.target.style.background = '#f0f9ff'}
                            onMouseLeave={(e) => e.target.style.background = 'white'}
                        >
                            <b>{uni.name}</b>
                            {uni.country && <span style={{ fontSize: '0.8rem', color: '#666', marginLeft: '5px' }}>({uni.country})</span>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UniversitySearch;
