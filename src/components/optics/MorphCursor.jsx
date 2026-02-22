'use client';
import React, { useEffect, useState, useRef } from 'react';

const MorphCursor = () => {
    const cursorRef = useRef(null);
    const auraRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX: x, clientY: y } = e;

            // Update global CSS variables for coordinated optics
            document.documentElement.style.setProperty('--mouse-x', `${x}px`);
            document.documentElement.style.setProperty('--mouse-y', `${y}px`);

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            }
            if (auraRef.current) {
                auraRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            }

            const target = e.target;
            const isClickable = target.closest('button, a, input, select, textarea, [role="button"]');
            setIsHovering(!!isClickable);
        };

        const handleMouseDown = () => setIsMouseDown(true);
        const handleMouseUp = () => setIsMouseDown(false);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <>
            {/* Global Grain Texture */}
            <div className="grain-texture" />

            {/* Cosmic Aura (Inherited and attached to cursor) */}
            <div
                ref={auraRef}
                className="cosmic-aura"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    transform: 'translate3d(-50%, -50%, 0)',
                    pointerEvents: 'none',
                    zIndex: 9998
                }}
            />

            {/* Morphing Physical Cursor */}
            <div
                ref={cursorRef}
                className={`fixed top-0 left-0 pointer-events-none z-[10001] transition-all duration-300 ease-out flex items-center justify-center
                    ${isHovering ? 'w-20 h-10 rounded-xl bg-primary-500/10' : 'w-4 h-4 rounded-full bg-primary-600'}
                    ${isMouseDown ? 'scale-75 opacity-50' : 'scale-100 opacity-100'}
                `}
                style={{
                    transform: 'translate3d(-50%, -50%, 0)',
                    border: isHovering ? '1.5px solid rgba(var(--color-primary-rgb), 0.3)' : 'none',
                    backdropFilter: isHovering ? 'blur(4px)' : 'none'
                }}
            >
                {isHovering && <div className="w-1 h-1 rounded-full bg-primary-600 animate-pulse" />}
            </div>

            <style>{`
                body, * {
                    cursor: none !important;
                }
                @media (max-width: 1024px) {
                    .fixed.top-0.left-0.pointer-events-none { display: none; }
                    body, * { cursor: auto !important; }
                }
            `}</style>
        </>
    );
};

export default MorphCursor;
