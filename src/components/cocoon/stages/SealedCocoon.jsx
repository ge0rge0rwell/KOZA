import React from 'react';
import styles from '../../../styles/cocoon/base.module.css';

const SealedCocoon = ({ progress }) => {
    return (
        <div className={styles.sealedCocoon}>
            {/* Silk texture overlay */}
            <div className={styles.silkTexture} />

            {/* Subtle internal glow based on progress */}
            {/* Dynamic glow intensity based on progress */}
            <div
                className={styles.innerGlow}
                style={{ opacity: 0.3 + (progress * 0.005) }}
            />
        </div>
    );
};

export default SealedCocoon;
