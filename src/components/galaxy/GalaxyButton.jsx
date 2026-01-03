import React from 'react';
import './GalaxyButton.css';

const GalaxyButton = ({ children, onClick, type = 'button', className = '', variant = 'primary', disabled = false }) => {
    return (
        <button
            className={`galaxy-cta ${variant} ${className}`}
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            <span>{children}</span>
            <svg viewBox="0 0 13 10" height="10px" width="15px">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
        </button>
    );
};

export default GalaxyButton;
