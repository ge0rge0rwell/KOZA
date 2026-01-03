import React from 'react';
import './GalaxyCard.css';

const GalaxyCard = ({ children, className = '', title, subtitle, emoji }) => {
    return (
        <div className={`galaxy-card-container ${className}`}>
            <div className="galaxy-card">
                <div className="galaxy-card-content">
                    {title && <div className="galaxy-card-title">{title}</div>}
                    {subtitle && <div className="galaxy-card-subtitle">{subtitle}</div>}

                    <div className="galaxy-card-body">
                        {children}
                    </div>
                </div>

                {emoji && <div className="galaxy-card-emoji">{emoji}</div>}
                <div className="galaxy-card-shine"></div>
                <div className="galaxy-card-dots orange-dots"></div>
                <div className="galaxy-card-dots pink-dots"></div>
            </div>
        </div>
    );
};

export default GalaxyCard;
