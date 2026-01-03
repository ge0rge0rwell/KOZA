import React from 'react';
import './GalaxyInput.css';

const GalaxyInput = ({ label, placeholder, value, onChange, type = 'text', className = '' }) => {
    return (
        <div className={`galaxy-input-container ${className}`}>
            <input
                type={type}
                className="galaxy-input"
                placeholder={placeholder || (label ? `Enter ${label}...` : '')}
                value={value}
                onChange={onChange}
            />
            {label && <label className="galaxy-input-label">{label}</label>}
            <div className="galaxy-input-glow"></div>
        </div>
    );
};

export default GalaxyInput;
