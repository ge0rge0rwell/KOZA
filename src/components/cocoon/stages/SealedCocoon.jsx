import React from 'react';
import styles from '../../../styles/cocoon/base.module.css';

const SealedCocoon = ({ progress }) => {
    return (
        <div className="flex items-center justify-center w-full h-full">
            {/* The Core Seed Crystal */}
            <div className={styles.seedShard}>
                <div className={styles.prismaticEffect} />
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
            </div>

            {/* Ambient Pulsing Shadow */}
            <div className="absolute w-32 h-8 bg-black/40 blur-xl rounded-full bottom-20 animate-pulse" />
        </div>
    );
};

export default SealedCocoon;
