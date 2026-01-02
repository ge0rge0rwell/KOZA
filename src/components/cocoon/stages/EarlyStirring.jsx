import React, { useMemo } from 'react';
import SparkleParticles from '../particles/SparkleParticles';
import styles from '../../../styles/cocoon/base.module.css';

const EarlyStirring = ({ progress }) => {
    // Calculate number of cracks based on progress
    const crackCount = useMemo(() => {
        if (progress < 33) return 1;
        if (progress < 66) return 2;
        return 3;
    }, [progress]);

    const cracks = useMemo(() => {
        const positions = [
            { left: '30%', rotation: 15, delay: 0 },
            { left: '50%', rotation: -10, delay: 0.3 },
            { right: '30%', rotation: 20, delay: 0.6 }
        ];
        return positions.slice(0, crackCount);
    }, [crackCount]);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Main Core */}
            <div className={styles.seedShard} style={{ transform: `scale(${1 + progress / 500})` }}>
                <div className={styles.prismaticEffect} />
            </div>

            {/* Orbiting fragments */}
            {Array.from({ length: 5 }).map((_, i) => (
                <div
                    key={i}
                    className={`${styles.crystalShard} ${styles['shard-tri']}`}
                    style={{
                        width: '40px',
                        height: '40px',
                        top: `${40 + Math.sin(i + progress / 20) * 20}%`,
                        left: `${40 + Math.cos(i + progress / 20) * 20}%`,
                        opacity: 0.6,
                        transform: `rotate(${i * 72 + progress}deg) scale(0.6)`,
                        border: '1px solid rgba(255,255,255,0.2)'
                    }}
                />
            ))}
        </div>
    );
};

export default EarlyStirring;
