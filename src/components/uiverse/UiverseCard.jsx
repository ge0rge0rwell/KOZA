import React from 'react';
import './UiverseCard.css';

const UiverseCard = ({ children, className = '', onClick }) => {
    return (
        <div className={`uiverse-card ${className}`} onClick={onClick}>
            <div className="card-shine" />
            <div className="card-content">
                {children}
            </div>
        </div>
    );
};

export default UiverseCard;
