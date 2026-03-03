import React, { memo } from 'react';

const CosmicRank = memo(({ rank = "Koza Yolcusu", level = 1 }) => {
    // Rank-based color schemes
    const schemes = {
        1: { primary: '#9333EA', secondary: '#F472B6', label: 'Tırtıl' },
        2: { primary: '#3B82F6', secondary: '#2DD4BF', label: 'Koza' },
        3: { primary: '#F59E0B', secondary: '#EF4444', label: 'Kelebek' },
        4: { primary: '#10B981', secondary: '#6366F1', label: 'Anka' }
    };

    const scheme = schemes[Math.min(level, 4)] || schemes[1];

    return (
        <div className="relative w-48 h-48 flex items-center justify-center group">
            {/* Nebula Background Effect */}
            <div
                className="absolute inset-0 rounded-full opacity-20 blur-3xl animate-pulse-slow"
                style={{ background: `radial-gradient(circle, ${scheme.primary}, ${scheme.secondary})` }}
            />

            {/* Decorative SVG Rings */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                <circle
                    cx="96" cy="96" r="88"
                    fill="none"
                    stroke="url(#rankGradient)"
                    strokeWidth="1"
                    strokeDasharray="10 20"
                    className="opacity-30"
                />
                <defs>
                    <linearGradient id="rankGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={scheme.primary} />
                        <stop offset="100%" stopColor={scheme.secondary} />
                    </linearGradient>
                </defs>
            </svg>

            {/* Main Rank Shield */}
            <div className="relative z-10 w-32 h-32 rounded-full bg-white/10 backdrop-blur-2xl border border-white/20 flex flex-col items-center justify-center shadow-2xl transition-transform duration-500 group-hover:scale-110">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

                <div
                    className="text-3xl font-black mb-1 filter drop-shadow-lg"
                    style={{ color: scheme.primary }}
                >
                    {level}
                </div>

                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400">
                    {scheme.label}
                </div>

                {/* Floating Particles (using simple CSS) */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/20 rounded-full blur-sm animate-bounce" />
                <div className="absolute -bottom-4 -left-2 w-3 h-3 bg-white/10 rounded-full blur-sm animate-pulse" />
            </div>

            {/* Outer Floating Label */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-neutral-900 text-white text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest shadow-xl border border-white/10">
                {rank}
            </div>
        </div>
    );
});

export default CosmicRank;
