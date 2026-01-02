import React, { useMemo, useState, useRef } from 'react';
import { calculateStage, calculateStageProgress } from '../../utils/cocoon/stageCalculator';
import SealedCocoon from './stages/SealedCocoon';
import EarlyStirring from './stages/EarlyStirring';
import BreakingThrough from './stages/BreakingThrough';
import Emergence from './stages/Emergence';
import WingUnfurling from './stages/WingUnfurling';
import FirstFlight from './stages/FirstFlight';
import MajesticButterfly from './stages/MajesticButterfly';
import styles from '../../styles/cocoon/base.module.css';
import TransformationCanvas from './TransformationCanvas';
import { useUser } from '../../context/UserContext';
import { useStory } from '../../context/StoryContext';

const STAGE_DESCRIPTIONS = {
    1: { title: "Mühürlü Başlangıç", text: "Her yolculuk sessiz bir karar ile başlar. Kozan şu an mühürlü, içindeki 'Öz' birikmeyi bekliyor." },
    2: { title: "İlk Kıvılcım", text: "İçeride bir şeyler hareket ediyor. Deneyimlerin kozanı titretmeye ve ışığını sızdırmaya başladı." },
    3: { title: "Kabuğu Kırmak", text: "Artık sığmıyorsun. Zorluklar çatlıyor, içindeki ışık her yarıktan fışkırıyor." },
    4: { title: "Varoluşun Ortaya Çıkışı", text: "Kozandan çıktın. Henüz yeni ve hassassın ama artık özgürsün." },
    5: { title: "Kanatların Açılışı", text: "Kanatların kurumaya ve güçlenmeye başladı. Renklerin hayat buluyor." },
    6: { title: "İlk Kanat Çırpış", text: "Yerden kesilme vakti. Gücünü test et ve havalan." },
    7: { title: "Görkemli Dönüşüm", text: "Sen artık bir kelebeksin. Işığınla başkalarına da ilham ol." }
};

const CocoonStage = ({ totalOz, onStageChange }) => {
    const { user } = useUser();
    const { savedStories } = useStory();
    const lastStory = savedStories?.[0];
    const themeColor = lastStory?.themeColor || '#9333EA';

    const stage = useMemo(() => calculateStage(totalOz), [totalOz]);
    const progress = useMemo(() => calculateStageProgress(totalOz), [totalOz]);
    const stageInfo = STAGE_DESCRIPTIONS[stage];

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
            {/* Crystalline Background Elements */}
            <div className={styles.caustics} />
            <div className={styles.prismaticEffect} />

            {/* High-Fidelity Crystal Shard Particles */}
            <TransformationCanvas
                color={themeColor}
                intensity={stage / 2}
                active={true}
            />

            <div
                className={styles.cocoonWrapper}
                style={{
                    transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                }}
            >
                {renderStage()}
            </div>

            {/* Glassmorphism Navigation Card */}
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-3xl overflow-hidden animate-fade-in" style={{
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                zIndex: 10
            }}>
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-xl text-white tracking-tight">{stageInfo?.title}</h3>
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Metamorfosis</span>
                        <span className="text-sm font-mono text-primary-400">
                            {Math.round(progress)}%
                        </span>
                    </div>
                </div>

                <p className="text-sm text-white/60 mb-5 leading-relaxed font-light">
                    {stageInfo?.text}
                </p>

                {/* Modern Segmented Progress Bar */}
                <div className="flex gap-1 h-1.5 w-full">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-full flex-1 rounded-full transition-all duration-700"
                            style={{
                                background: (i / 12) * 100 < progress
                                    ? `linear-gradient(to bottom, ${themeColor}, ${themeColor}dd)`
                                    : 'rgba(255, 255, 255, 0.05)',
                                boxShadow: (i / 12) * 100 < progress
                                    ? `0 0 10px ${themeColor}44`
                                    : 'none'
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CocoonStage;
