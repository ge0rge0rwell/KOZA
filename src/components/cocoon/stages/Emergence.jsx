import React from 'react';
import MagicDust from '../particles/MagicDust';
import styles from '../../../styles/cocoon/base.module.css';

const Emergence = ({ progress }) => {
    const wingBudScale = Math.min(progress / 100, 1);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* The Geometric Ghost form */}
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
                            opacity: 0.4 + (progress / 200),
                            transform: `rotate(${i * 30 + (100 - progress)}deg)`,
                            border: '1px solid rgba(0, 242, 254, 0.3)',
                            background: 'rgba(0, 242, 254, 0.05)'
                        }}
                    />
                ))}
            </div>

            {/* Expansion ripples */}
            <div className="absolute w-64 h-64 border border-primary-500/20 rounded-full animate-ping" />
        </div>
    );
};

export default Emergence;
