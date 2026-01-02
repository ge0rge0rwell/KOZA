import React, { useMemo } from 'react';
import LightBeams from '../particles/LightBeams';
import CocoonFragments from '../particles/CocoonFragments';
import styles from '../../../styles/cocoon/base.module.css';

const BreakingThrough = ({ progress }) => {
    const fragmentCount = useMemo(() => Math.floor(progress / 4), [progress]);
    const beamCount = useMemo(() => Math.min(Math.floor(progress / 15), 7), [progress]);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Igniting Core */}
            <div className={styles.seedShard} style={{
                boxShadow: `0 0 ${40 + progress}px #00f2fe`,
                background: `rgba(255, 255, 255, ${0.1 + progress / 200})`
            }}>
                <div className={styles.prismaticEffect} style={{ opacity: 0.8 }} />
            </div>

            {/* High-intensity light streaks */}
            {Array.from({ length: 8 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute bg-white/20 blur-sm"
                    style={{
                        width: '2px',
                        height: '200px',
                        transform: `rotate(${i * 45}deg) translateY(-50%)`,
                        opacity: (progress / 100) * (Math.random() * 0.5 + 0.5),
                        transition: 'opacity 0.2s'
                    }}
                />
            ))}
        </div>
    );
};

export default BreakingThrough;
