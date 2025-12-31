import React from 'react';
import './Loader.css';

const Loader = ({ message }) => {
    return (
        <div className="loader-container">
            <div className="loader">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div className="circle" key={i}>
                        <div className="dot"></div>
                        <div className="outline"></div>
                    </div>
                ))}
            </div>
            {message && (
                <p className="text-neutral-500 font-bold text-sm tracking-widest uppercase animate-pulse">
                    {message}
                </p>
            )}
        </div>
    );
};

export default Loader;
