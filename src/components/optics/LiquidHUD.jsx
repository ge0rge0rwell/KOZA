import React, { useState, useEffect } from 'react';
import StatusWaveform from './StatusWaveform';

const LiquidHUD = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            setScrollProgress(currentScroll / totalScroll);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[100] hidden lg:flex flex-col items-center gap-4 animate-fade-in pointer-events-none">
            {/* Scroll Indicator Orb */}
            <div className="relative w-1.5 h-32 bg-neutral-200/50 rounded-full overflow-hidden backdrop-blur-md">
                <div
                    className="absolute top-0 left-0 w-full bg-primary-500 rounded-full transition-all duration-300 ease-out"
                    style={{ height: `${scrollProgress * 100}%` }}
                >
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary-500 rounded-full blur-[4px]" />
                </div>
            </div>

            {/* Micro-label */}
            <div className="rotate-90 origin-center text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-8 mb-12">
                Transcendent <span className="text-primary-500">Optics</span>
            </div>

            <StatusWaveform />
        </div>
    );
};

export default LiquidHUD;
