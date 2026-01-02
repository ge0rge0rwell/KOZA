import React, { useMemo } from 'react';
import LightBeams from '../particles/LightBeams';
import CocoonFragments from '../particles/CocoonFragments';
import styles from '../../../styles/cocoon/base.module.css';

const BreakingThrough = ({ progress }) => {
    const fragmentCount = useMemo(() => Math.floor(progress / 4), [progress]);
    const beamCount = useMemo(() => Math.min(Math.floor(progress / 15), 7), [progress]);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Physical Shell Fragments pulling away */}
            <div className="relative w-full h-full flex items-center justify-center">
                {/* Core Light source */}
                <div className="absolute w-32 h-48 bg-white blur-2xl opacity-40 animate-pulse" />

                {/* Left Fragment */}
                <div className={`${styles.cocoonVessel} absolute animate-none`} style={{
                    clipPath: 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)',
                    transform: `translateX(-${progress / 5}%) rotateY(-${progress / 4}deg)`,
                    boxShadow: 'none',
                    borderRight: '2px solid white'
                }}>
                    <div className={styles.frostedSilk} />
                    <div className={styles.prismaticEffect} />
                </div>

                {/* Right Fragment */}
                <div className={`${styles.cocoonVessel} absolute animate-none`} style={{
                    clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)',
                    transform: `translateX(${progress / 5}%) rotateY(${progress / 4}deg)`,
                    boxShadow: 'none',
                    borderLeft: '2px solid white'
                }}>
                    <div className={styles.frostedSilk} />
                    <div className={styles.prismaticEffect} />
                </div>
            </div>

            {/* Intense internal light pouring from the gap */}
            <div className="absolute w-4 h-full bg-white blur-xl" style={{
                opacity: progress / 100,
                transform: `scaleX(${progress / 2})`
            }} />

            {/* Flying physical shards */}
            {Array.from({ length: 15 }).map((_, i) => (
                <div
                    key={i}
                    className={`${styles.crystalShard} ${styles['shard-hex']}`}
                    style={{
                        width: '10px',
                        height: '10px',
                        top: '50%',
                        left: '50%',
                        transform: `translate(${(Math.random() - 0.5) * progress * 2}px, ${(Math.random() - 0.5) * progress * 2}px) rotate(${Math.random() * 360}deg)`,
                        opacity: (progress / 100) * 0.8,
                        background: 'white'
                    }}
                />
            ))}
        </div>
    );
};

export default BreakingThrough;
