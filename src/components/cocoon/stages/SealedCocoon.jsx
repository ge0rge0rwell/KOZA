import React from 'react';
import styles from '../../../styles/cocoon/base.module.css';

const SealedCocoon = ({ progress }) => {
    return (
        <div className="flex items-center justify-center w-full h-full">
            {/* The Visible Silken Vessel */}
            <div className={styles.cocoonVessel}>
                <div className={styles.frostedSilk} />
                <div className={styles.internalGlow} style={{ opacity: 0.3 }} />
                <div className={styles.prismaticEffect} style={{ opacity: 0.2 }} />
            </div>

            {/* Ambient Shadow */}
            <div className="absolute w-32 h-8 bg-black/40 blur-xl rounded-full bottom-20 animate-pulse" />
        </div>
    );
};

export default SealedCocoon;
