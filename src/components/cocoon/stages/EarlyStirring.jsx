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
        <div className={styles.earlyStirring}>
            {/* Silk texture */}
            <div className={styles.silkTexture} />

            {/* Cracks appearing */}
            {cracks.map((crack, index) => (
                <div
                    key={index}
                    className={styles.crack}
                    style={{
                        left: crack.left,
                        right: crack.right,
                        transform: `rotate(${crack.rotation}deg)`,
                        animationDelay: `${crack.delay}s`,
                        opacity: 0.4 + (progress / 200) // Base opacity + progress boost
                    }}
                />
            ))}

            {/* Sparkle particles emanating from cracks */}
            {progress > 30 && <SparkleParticles count={Math.floor(progress / 5)} />}
        </div>
    );
};

export default EarlyStirring;
