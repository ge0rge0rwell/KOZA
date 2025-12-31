import React, { useMemo, useState, useRef } from 'react';
import { calculateStage, calculateStageProgress, STAGE_DESCRIPTIONS } from '../../utils/cocoon/stageCalculator';
import SealedCocoon from './stages/SealedCocoon';
import EarlyStirring from './stages/EarlyStirring';
import BreakingThrough from './stages/BreakingThrough';
import Emergence from './stages/Emergence';
import WingUnfurling from './stages/WingUnfurling';
import FirstFlight from './stages/FirstFlight';
import MajesticButterfly from './stages/MajesticButterfly';
import styles from '../../styles/cocoon/base.module.css';

const CocoonStage = ({ totalOz, onStageChange }) => {
    const stage = useMemo(() => calculateStage(totalOz), [totalOz]);
    const progress = useMemo(() => calculateStageProgress(totalOz), [totalOz]);
    const description = STAGE_DESCRIPTIONS[stage];
    
    // Parallax Tilt State
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    // Notify parent of stage changes
    React.useEffect(() => {
        if (onStageChange) {
            onStageChange(stage, progress);
        }
    }, [stage, progress, onStageChange]);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const rotateX = ((mouseY - centerY) / (rect.height / 2)) * -10; // Max 10deg rotation
        const rotateY = ((mouseX - centerX) / (rect.width / 2)) * 10;

        setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotation({ x: 0, y: 0 }); // Reset on leave
    };

    const renderStage = () => {
        const commonProps = { progress, key: stage }; // Key triggers remount animation
        
        switch (stage) {
            case 1: return <SealedCocoon {...commonProps} />;
            case 2: return <EarlyStirring {...commonProps} />;
            case 3: return <BreakingThrough {...commonProps} />;
            case 4: return <Emergence {...commonProps} />;
            case 5: return <WingUnfurling {...commonProps} />;
            case 6: return <FirstFlight {...commonProps} />;
            case 7: return <MajesticButterfly {...commonProps} />;
            default: return <SealedCocoon {...commonProps} />;
        }
    };

    return (
        <div 
            ref={containerRef}
            className={styles.cocoonContainer}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div 
                className={styles.cocoonWrapper}
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                }}
            >
                {renderStage()}
                
                {/* Global Atmosphere/Glass Effect Overlay */}
                <div style={{
                    position: 'absolute',
                    inset: -20,
                    background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 60%)',
                    pointerEvents: 'none',
                    borderRadius: '50%',
                    filter: 'blur(20px)',
                    zIndex: -1
                }} />
            </div>

            {/* Stage Description - Floating Card */}
            <div style={{
                position: 'absolute',
                bottom: '-80px',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                width: '120%',
                backdropFilter: 'blur(8px)',
                background: 'rgba(255,255,255,0.6)',
                padding: '12px',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.4)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                opacity: 0,
                animation: 'fadeScaleIn 0.8s 0.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards'
            }}>
                <p style={{
                    fontSize: '15px',
                    color: '#4B5563',
                    fontWeight: 600,
                    margin: 0,
                    letterSpacing: '-0.01em'
                }}>
                    {description}
                </p>
                <div style={{
                    marginTop: '8px',
                    height: '6px',
                    background: 'rgba(0,0,0,0.05)',
                    borderRadius: '99px',
                    overflow: 'hidden',
                    maxWidth: '80%',
                    margin: '8px auto 0'
                }}>
                    <div style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, #9333ea, #c084fc, #e879f9)',
                        backgroundSize: '200% 100%',
                        width: `${progress}%`,
                        transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                        borderRadius: '99px',
                        animation: 'shimmer 2s infinite linear'
                    }} />
                </div>
            </div>
        </div>
    );
};

export default CocoonStage;
