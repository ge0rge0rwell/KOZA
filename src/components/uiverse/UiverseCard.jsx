import React, { useRef } from 'react';
import './UiverseCard.css';

const UiverseCard = ({ children, className = '', onClick }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate rotation based on mouse position relative to center
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (centerY - y) / 15;
        const rotateY = (x - centerX) / 15;

        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
        cardRef.current.style.setProperty('--rotate-x', rotateX);
        cardRef.current.style.setProperty('--rotate-y', rotateY);
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        cardRef.current.style.setProperty('--rotate-x', 0);
        cardRef.current.style.setProperty('--rotate-y', 0);
    };

    return (
        <div
            ref={cardRef}
            className={`uiverse-card-container ${className}`}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="uiverse-card">
                <div className="card-shine" />
                <div className="card-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default UiverseCard;
