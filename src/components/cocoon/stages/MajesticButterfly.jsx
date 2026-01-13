import React from 'react';
import CosmicDust from '../particles/CosmicDust';
import AuraParticles from '../particles/AuraParticles';
import TransformationCanvas from '../TransformationCanvas';
import styles from '../../../styles/cocoon/base.module.css';

const MajesticButterfly = ({ progress }) => {
    return (
        <div className="relative w-full h-full flex items-center justify-center perspective-1000">
            {/* The Majestic Crystal Form */}
            <div className="relative w-64 h-80 animate-float translate-z-10">
                {/* Main Wings Layer 1 - Deep Flap */}
                <div className={`${styles.crystalWing} absolute left-[-10%] w-[60%] animate-wing-flap-left`}
                    style={{ transformOrigin: 'right center' }} />
                <div className={`${styles.crystalWing} absolute right-[-10%] w-[60%] animate-wing-flap-right`}
                    style={{ transformOrigin: 'left center' }} />

                {/* Secondary Iridescent Layers */}
                <div className={`${styles.crystalWing} absolute left-[-5%] w-[55%] opacity-40 mix-blend-overlay animate-wing-flap-left-delayed`}
                    style={{ transformOrigin: 'right center', filter: 'hue-rotate(45deg)' }} />
                <div className={`${styles.crystalWing} absolute right-[-5%] w-[55%] opacity-40 mix-blend-overlay animate-wing-flap-right-delayed`}
                    style={{ transformOrigin: 'left center', filter: 'hue-rotate(-45deg)' }} />

                {/* Body / Core Core */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-40 bg-white blur-2xl opacity-60 rounded-full" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-32 bg-primary-100/50 blur-md rounded-full" />

                {/* Prismatic Shimmer Overlay */}
                <div className="absolute inset-[-20%] bg-gradient-to-tr from-transparent via-primary-300/10 to-transparent bg-[length:200%_200%] animate-shimmer pointer-events-none" />
            </div>

            {/* Orbiting Sacred Geometry Sparks */}
            <TransformationCanvas color="#fff" intensity={2.5} active={true} />
        </div>
    );
};

export default MajesticButterfly;
