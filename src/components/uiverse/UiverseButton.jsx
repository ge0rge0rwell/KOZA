import React from 'react';
import './UiverseButton.css';

const UiverseButton = ({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`uiverse-button ${variant} ${className}`}
        >
            <span className="button-content">{children}</span>
        </button>
    );
};

export default UiverseButton;
