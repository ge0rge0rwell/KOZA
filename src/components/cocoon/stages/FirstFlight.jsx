import React from 'react';
import ButterflyTrail from '../particles/ButterflyTrail';
import styles from '../../../styles/cocoon/base.module.css';

const FirstFlight = ({ progress }) => {
    return (
        <div className="relative w-full h-full flex items-center justify-center animate-bounce duration-[3000ms]">
            <div className="relative w-48 h-48">
                {/* Crystalline Wings Flapping */}
                <div className={styles.crystalWing} style={{ left: '0', transformOrigin: 'right center', animation: 'flapLeft 1s ease-in-out infinite' }} />
                <div className={styles.crystalWing} style={{ right: '0', transformOrigin: 'left center', animation: 'flapRight 1s ease-in-out infinite' }} />

                {/* Central Prism */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-16 bg-white/50 blur-[2px] rounded-full" />
            </div>

            {/* Prismatic trail */}
            {Array.from({ length: 10 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute bg-white/30 w-1 h-1 rounded-full animate-ping"
                    style={{
                        top: `${80 + i * 5}%`,
                        left: `${45 + Math.random() * 10}%`,
                        animationDelay: `${i * 0.1}s`
                    }}
                />
            ))}
        </div>
    );
};

export default FirstFlight;
