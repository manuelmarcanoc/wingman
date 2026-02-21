import React, { useState, useEffect } from 'react';

function TalkingAvatar({ isSpeaking, size = '150px' }) {
    const [frame, setFrame] = useState(1);

    useEffect(() => {
        let interval;
        if (isSpeaking) {
            interval = setInterval(() => {
                setFrame(prev => prev === 1 ? 2 : 1);
            }, 250); // Toggle every 250ms for a more natural pace
        } else {
            setFrame(2); // Reset to closed beak (assuming frame 1 is open)
        }

        return () => clearInterval(interval);
    }, [isSpeaking]);

    return (
        <img
            src={`/entrevista${frame}.png`}
            alt="Wingman Avatar"
            style={{
                width: size,
                height: size,
                objectFit: 'contain',
                filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.1))'
            }}
        />
    );
}

export default TalkingAvatar;
