import React, { useState } from 'react';
import './UiverseButton.css';

const UiverseButton = ({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false }) => {
    const [ripples, setRipples] = useState([]);
    const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });
    const buttonRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!buttonRef.current || disabled) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
        if (dist < 100) {
            const moveX = (e.clientX - centerX) * 0.2;
            const moveY = (e.clientY - centerY) * 0.2;
            setMagneticPos({ x: moveX, y: moveY });
        } else {
            setMagneticPos({ x: 0, y: 0 });
        }
    };

    const handleMouseLeave = () => {
        setMagneticPos({ x: 0, y: 0 });
    };

    const createRipple = (e) => {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const newRipple = {
            id: Date.now(),
            x,
            y,
            size
        };

        setRipples([...ripples, newRipple]);
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 600);

        if (onClick) onClick(e);
    };

    return (
        <button
            ref={buttonRef}
            type={type}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={createRipple}
            disabled={disabled}
            className={`uiverse-button ${variant} ${className}`}
            style={{
                transform: `translate3d(${magneticPos.x}px, ${magneticPos.y}px, 0)`,
                transition: magneticPos.x === 0 ? 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)' : 'none'
            }}
        >
            <span className="ripples">
                {ripples.map(ripple => (
                    <span
                        key={ripple.id}
                        className="ripple"
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                            width: ripple.size,
                            height: ripple.size
                        }}
                    />
                ))}
            </span>
            <span className="button-content">{children}</span>
        </button>
    );
};

export default UiverseButton;
