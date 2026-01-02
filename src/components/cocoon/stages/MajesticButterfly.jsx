import React from 'react';
import CosmicDust from '../particles/CosmicDust';
import AuraParticles from '../particles/AuraParticles';
import styles from '../../../styles/cocoon/base.module.css';

const MajesticButterfly = ({ progress }) => {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* The Majestic Crystal Form */}
            <div className="relative w-64 h-80 animate-pulse duration-[4000ms]">
                {/* Main Wings Layer 1 */}
                <div className={styles.crystalWing} style={{ left: '0', transformOrigin: 'right center', opacity: 0.8 }} />
                <div className={styles.crystalWing} style={{ right: '0', transformOrigin: 'left center', opacity: 0.8 }} />

                {/* Secondary Prismatic Shells */}
                <div className={styles.crystalWing} style={{ left: '0', transformOrigin: 'right center', transform: 'scale(1.1) rotateY(20deg)', opacity: 0.3, filter: 'hue-rotate(90deg)' }} />
                <div className={styles.crystalWing} style={{ right: '0', transformOrigin: 'left center', transform: 'scale(1.1) rotateY(-20deg)', opacity: 0.3, filter: 'hue-rotate(-90deg)' }} />

                {/* The Core Light */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-32 bg-primary-100 blur-xl rounded-full opacity-60" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-24 bg-white blur-sm rounded-full" />
            </div>

            {/* Orbiting Sacred Geometry Sparks */}
            <TransformationCanvas color="#fff" intensity={2} active={true} />
        </div>
    );
};

export default MajesticButterfly;
