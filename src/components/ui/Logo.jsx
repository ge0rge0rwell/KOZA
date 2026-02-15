import React, { memo } from 'react';

const Logo = ({ className = "", size = "md" }) => {
    const sizeClasses = {
        sm: "text-xl",
        md: "text-2xl",
        lg: "text-4xl",
        xl: "text-5xl"
    };

    const svgSize = size === 'sm' ? 'w-6 h-6' : size === 'md' ? 'w-8 h-8' : 'w-12 h-12';

    return (
        <div className={`font-black tracking-tighter select-none flex items-center gap-2 ${className} will-change-transform`}>
            <div className="relative flex items-center justify-center">
                <svg
                    className={`${svgSize} drop-shadow-sm`}
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Simplified Cocoon Path */}
                    <path
                        d="M50 20C35 20 25 35 25 50C25 65 35 80 50 80C65 80 75 65 75 50C75 35 65 20 50 20Z"
                        className="fill-primary-500/10 stroke-primary-600/40"
                        strokeWidth="3"
                    />
                    {/* Inner Core */}
                    <path
                        d="M50 30C40 30 32 38 32 50C32 62 40 70 50 70C60 70 68 62 68 50C68 38 60 30 50 30Z"
                        className="fill-primary-500/20"
                    />
                    {/* Pulse Dot */}
                    <circle
                        cx="50"
                        cy="50"
                        r="8"
                        className="fill-primary-500 animate-pulse-subtle will-change-[opacity,transform]"
                    />
                </svg>
            </div>
            <span className={`${sizeClasses[size]} bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent italic`}>
                KOZA
            </span>
        </div>
    );
};

export default memo(Logo);
