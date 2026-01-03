import React from 'react';
import './GalaxyLoader.css';

const GalaxyLoader = ({ size = 'medium', color = '#9333ea', className = '' }) => {
    return (
        <div className={`galaxy-loader-container ${size} ${className}`} style={{ '--loader-color': color }}>
            <div className="galaxy-spinner">
                {[...Array(10)].map((_, i) => (
                    <div
                        key={i}
                        style={{
                            '--delay': (i + 1) * 0.1,
                            '--rotation': (i + 1) * 36,
                            '--translation': 150
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default GalaxyLoader;
