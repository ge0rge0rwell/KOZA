import React from 'react';
import styles from '../../../styles/cocoon/base.module.css';

const WingUnfurling = ({ progress }) => {
    const unfurlProgress = Math.min(progress / 100, 1);

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Left Crystal Wing */}
            <div
                className={styles.crystalWing}
                style={{
                    left: '10%',
                    transformOrigin: 'right center',
                    transform: `scale(${0.5 + progress / 200}) rotateY(${(100 - progress)}deg)`
                }}
            >
                <div className={styles.prismaticEffect} />
            </div>

            {/* Right Crystal Wing */}
            <div
                className={styles.crystalWing}
                style={{
                    right: '10%',
                    transformOrigin: 'left center',
                    transform: `scale(${0.5 + progress / 200}) rotateY(${(progress - 100)}deg)`
                }}
            >
                <div className={styles.prismaticEffect} />
            </div>

            {/* Spark of Life */}
            <div className="w-4 h-12 bg-white/40 blur-md rounded-full shadow-[0_0_20px_white]" />
        </div>
    );
};

export default WingUnfurling;
