import React from 'react';
import MagicDust from '../particles/MagicDust';
import styles from '../../../styles/cocoon/base.module.css';

const Emergence = ({ progress }) => {
    const wingBudScale = Math.min(progress / 100, 1);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* The Fading Vessel Outline */}
            <div className={styles.cocoonVessel} style={{
                opacity: 0.2,
                transform: 'scale(1.1) rotateY(10deg)',
                borderStyle: 'dashed'
            }}>
                <div className={styles.frostedSilk} />
            </div>

            {/* The Geometric Ghost form assembling */}
            <div className="relative w-48 h-64">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div
                        key={i}
                        className={`${styles.crystalShard} ${i % 2 === 0 ? styles['shard-tri'] : styles['shard-quad']}`}
                        style={{
                            width: '60px',
                            height: '80px',
                            top: `${20 + (i * 5)}%`,
                            left: `${20 + (Math.sin(i) * 20)}%`,
                            opacity: 0.3 + (progress / 200),
                            transform: `rotate(${i * 30 + (100 - progress)}deg)`,
                        }}
                    />
                ))}
            </div>

            {/* Soul Pulse */}
            <div className="absolute w-32 h-32 bg-primary-400/20 blur-3xl animate-pulse" />
        </div>
    );
};

export default Emergence;
