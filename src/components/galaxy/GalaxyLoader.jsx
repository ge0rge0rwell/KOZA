import React from 'react';
import './GalaxyLoader.css';

const GalaxyLoader = ({ size = 'medium', color, message, className = '' }) => {
    return (
        <div className="flex flex-col items-center">
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <filter id="liquid-goo">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -15" result="goo" />
                    <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                </filter>
            </svg>
            <div className={`galaxy-loader-container ${size} ${className}`} style={{ '--loader-color': color }}>
                <div className="galaxy-spinner" />
            </div>
            {message && <p className="galaxy-loader-msg">{message}</p>}
        </div>
    );
};

export default GalaxyLoader;
