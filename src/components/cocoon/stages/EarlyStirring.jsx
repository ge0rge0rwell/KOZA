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

    const [surfaceCracks] = useState(() => Array.from({ length: 12 }).map(() => ({
        top: Math.random() * 80 + 10,
        left: Math.random() * 80 + 10,
        width: Math.random() * 40 + 20,
        height: 1,
        rotation: Math.random() * 360,
        delay: Math.random() * 2
    })));

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* The Stirring Vessel */}
            <div className={styles.cocoonVessel} style={{ transform: `scale(${1 + progress / 500})` }}>
                <div className={styles.frostedSilk} />
                <div className={styles.internalGlow} style={{
                    opacity: 0.4 + progress / 200,
                    transform: 'scale(1.2)'
                }} />
                <div className={styles.prismaticEffect} style={{ opacity: 0.3 }} />

                {/* Physical Surface Cracks */}
                {surfaceCracks.map((crack, i) => (
                    <div
                        key={i}
                        className={styles.surfaceCrack}
                        style={{
                            top: `${crack.top}%`,
                            left: `${crack.left}%`,
                            width: `${crack.width}px`,
                            height: `${crack.height}px`,
                            transform: `rotate(${crack.rotation}deg)`,
                            opacity: progress > 10 ? (progress / 100) * 0.7 : 0,
                            animation: progress > 20 ? `${styles.crackSurge} 0.5s forwards` : 'none',
                            animationDelay: `${crack.delay}s`
                        }}
                    />
                ))}
            </div>

            {/* Orbiting shards representing the 'cracking' energy */}
            {Array.from({ length: 5 }).map((_, i) => (
                <div
                    key={i}
                    className={`${styles.crystalShard} ${styles['shard-tri']}`}
                    style={{
                        width: '30px',
                        height: '30px',
                        top: `${40 + Math.sin(i + progress / 20) * 15}%`,
                        left: `${45 + Math.cos(i + progress / 20) * 15}%`,
                        opacity: 0.4,
                        transform: `rotate(${i * 72 + progress}deg) scale(0.5)`,
                    }}
                />
            ))}
        </div>
    );
};

export default EarlyStirring;
