import React, { useMemo } from 'react';
import LightBeams from '../particles/LightBeams';
import CocoonFragments from '../particles/CocoonFragments';
import styles from '../../../styles/cocoon/base.module.css';

const BreakingThrough = ({ progress }) => {
    // Persistent-like fragment logic
    const fragments = useMemo(() => {
        return Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            angle: (i / 20) * Math.PI * 2,
            distance: Math.random() * 50 + 20,
            rotation: Math.random() * 360,
            size: Math.random() * 10 + 5,
            speed: Math.random() * 2 + 1,
            type: i % 3 === 0 ? 'shard-tri' : (i % 3 === 1 ? 'shard-quad' : 'shard-hex')
        }));
    }, []);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Physical Shell Fragments pulling away */}
            <div className="relative w-full h-full flex items-center justify-center">
                {/* Core Light source */}
                <div className="absolute w-48 h-64 bg-white blur-3xl opacity-60 animate-pulse" />

                {/* Left Fragment */}
                <div className={`${styles.cocoonVessel} absolute transition-transform duration-500 ease-out`} style={{
                    clipPath: 'polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)',
                    transform: `translateX(-${progress / 4}%) rotateY(-${progress / 3}deg) scale(${1 - progress / 400})`,
                    boxShadow: 'none',
                    borderRight: '2px solid rgba(255,255,255,0.8)'
                }}>
                    <div className={styles.frostedSilk} />
                    <div className={styles.prismaticEffect} />
                </div>

                {/* Right Fragment */}
                <div className={`${styles.cocoonVessel} absolute transition-transform duration-500 ease-out`} style={{
                    clipPath: 'polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)',
                    transform: `translateX(${progress / 4}%) rotateY(${progress / 3}deg) scale(${1 - progress / 400})`,
                    boxShadow: 'none',
                    borderLeft: '2px solid rgba(255,255,255,0.8)'
                }}>
                    <div className={styles.frostedSilk} />
                    <div className={styles.prismaticEffect} />
                </div>
            </div>

            {/* Intense internal light pouring from the gap - Volumetric Creaks */}
            <div className="absolute w-2 h-full bg-white blur-xl" style={{
                opacity: progress / 100,
                transform: `scaleX(${progress * 5}) rotate(${(progress - 50) * 0.2}deg)`,
                boxShadow: '0 0 100px 20px rgba(255,255,255,0.4)'
            }} />

            {/* Flying physical shards with physics-based translation */}
            {fragments.map((fragment) => {
                const outwardForce = progress > 30 ? (progress - 30) * fragment.speed : 0;
                const x = Math.cos(fragment.angle) * outwardForce;
                const y = Math.sin(fragment.angle) * outwardForce;
                const rot = fragment.rotation + outwardForce;

                return (
                    <div
                        key={fragment.id}
                        className={`${styles.crystalShard} ${styles[fragment.type]}`}
                        style={{
                            width: `${fragment.size}px`,
                            height: `${fragment.size}px`,
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rot}deg)`,
                            opacity: progress > 10 ? Math.min((progress - 10) / 40, 0.9) : 0,
                            background: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid white'
                        }}
                    />
                );
            })}
        </div>
    );
};

export default BreakingThrough;
