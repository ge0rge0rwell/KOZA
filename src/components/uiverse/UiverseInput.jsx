import React from 'react';
import './UiverseInput.css';

const UiverseInput = ({ label, type = 'text', value, onChange, placeholder, className = '', ...props }) => {
    return (
        <div className={`uiverse-input-container ${className}`}>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="uiverse-input"
                {...props}
            />
            {label && <label className="uiverse-label">{label}</label>}
            <div className="input-glow" />
        </div>
    );
};

export default UiverseInput;
