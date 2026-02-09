import React from 'react';
import '../../styles/ValoButton.css';

const ValoButton = ({ children, onClick, className = '', icon, isActive }) => {
    return (
        <button
            className={`valo-button ${className}`}
            onClick={onClick}
        >
            <span className="valo-button_lg">
                <span
                    className="valo-button_sl"
                    style={isActive ? { width: 'calc(100% + 15px)' } : {}}
                ></span>
                {icon && <span className="relative z-10">{icon}</span>}
                <span className="valo-button_text">{children}</span>
            </span>
        </button>
    );
};

export default ValoButton;
