import React, { useState, useEffect, useRef } from 'react';
import './KozaLoader.css';

const KozaLoader = ({ size = 'medium', className = '', message, fullScreen = false, interactive = false }) => {
    const scale = size === 'small' ? 0.5 : size === 'large' ? 1.5 : 1;
    const dimension = 64 * scale;
    const containerRef = useRef(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (!interactive || !containerRef.current) return;

        const handleMouseMove = (e) => {
            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = (e.clientX - centerX) / rect.width;
            const deltaY = (e.clientY - centerY) / rect.height;

            setRotation({
                x: deltaY * 15, // Max 15deg rotation
                y: deltaX * 15
            });
        };

        const handleMouseLeave = () => {
            setRotation({ x: 0, y: 0 });
            setIsHovered(false);
        };

        const container = containerRef.current;
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [interactive]);

    const containerStyle = interactive ? {
        transform: `perspective(1000px) rotateX(${-rotation.x}deg) rotateY(${rotation.y}deg) scale(${isHovered ? 1.05 : 1})`,
        transition: 'transform 0.1s ease-out, filter 0.3s ease',
        filter: isHovered ? 'drop-shadow(0 20px 40px rgba(33, 158, 188, 0.3))' : 'none',
        cursor: 'pointer'
    } : {};

    const loaderContent = (
        <div
            ref={interactive ? containerRef : null}
            className={`koza-loader-wrapper flex flex-col items-center justify-center ${className}`}
            style={containerStyle}
            onMouseEnter={() => interactive && setIsHovered(true)}
            onMouseLeave={() => interactive && setIsHovered(false)}
        >
            <div className="koza-loader-container">
                <svg height="0" width="0" viewBox="0 0 64 64" className="absolute">
                    <defs>
                        <linearGradient id="grad-k" x1="0" y1="62" x2="0" y2="2" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#023047"></stop>
                            <stop stopColor="#219EBC" offset="1"></stop>
                        </linearGradient>

                        <linearGradient id="grad-o" x1="0" y1="64" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FFB703"></stop>
                            <stop stopColor="#FB8500" offset="1"></stop>
                            <animateTransform
                                attributeName="gradientTransform"
                                type="rotate"
                                values="0 32 32;-270 32 32;-270 32 32;-540 32 32;-540 32 32;-810 32 32;-810 32 32;-1080 32 32;-1080 32 32"
                                dur="8s"
                                keyTimes="0; 0.125; 0.25; 0.375; 0.5; 0.625; 0.75; 0.875; 1"
                                repeatCount="indefinite"
                            />
                        </linearGradient>

                        <linearGradient id="grad-z" x1="0" y1="62" x2="0" y2="2" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#8ECAE6"></stop>
                            <stop stopColor="#219EBC" offset="1"></stop>
                        </linearGradient>

                        <linearGradient id="grad-a" x1="0" y1="62" x2="0" y2="2" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#FB8500"></stop>
                            <stop stopColor="#023047" offset="1"></stop>
                        </linearGradient>
                    </defs>
                </svg>

                {/* Letter K */}
                <svg viewBox="0 0 64 64" height={dimension} width={dimension} className="inline-block">
                    <path
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="8"
                        stroke="url(#grad-k)"
                        d="M 52,4 L 12,32 M 12,4 V 60 M 12,32 L 52,60"
                        className="dash"
                        pathLength="360"
                    ></path>
                </svg>

                {/* Letter O */}
                <svg viewBox="0 0 64 64" height={dimension} width={dimension} className="inline-block">
                    <path
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="10"
                        stroke="url(#grad-o)"
                        d="M 32 32 m 0 -27 a 27 27 0 1 1 0 54 a 27 27 0 1 1 0 -54"
                        className="spin"
                        pathLength="360"
                    ></path>
                </svg>

                {/* Letter Z */}
                <svg viewBox="0 0 64 64" height={dimension} width={dimension} className="inline-block">
                    <path
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="8"
                        stroke="url(#grad-z)"
                        d="M 12,12 H 52 L 12,52 H 52"
                        className="dash"
                        pathLength="360"
                    ></path>
                </svg>

                {/* Letter A */}
                <svg viewBox="0 0 64 64" height={dimension} width={dimension} className="inline-block">
                    <path
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="8"
                        stroke="url(#grad-a)"
                        d="M 12,60 L 32,4 L 52,60 M 20,40 H 44"
                        className="dash"
                        pathLength="360"
                    ></path>
                </svg>
            </div>
            {message && (
                <p className="mt-4 text-center text-primary-600 font-medium animate-pulse">
                    {message}
                </p>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-3xl">
                {loaderContent}
            </div>
        );
    }

    return loaderContent;
};

export default KozaLoader;
