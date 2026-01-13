import React, { useEffect, useRef } from 'react';

const CosmicAura = () => {
    const auraRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = e.clientX;
            const y = e.clientY;

            // Update global CSS variables for coordinated optics
            document.documentElement.style.setProperty('--mouse-x', `${x}px`);
            document.documentElement.style.setProperty('--mouse-y', `${y}px`);

            if (auraRef.current) {
                auraRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            <div className="cosmic-aura" ref={auraRef} style={{ left: 0, top: 0, position: 'fixed', transform: 'translate3d(-50%, -50%, 0)' }} />
            <div className="grain-texture" />
        </>
    );
};

export default CosmicAura;
