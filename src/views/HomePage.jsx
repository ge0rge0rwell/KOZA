'use client';
import React, { useState, memo, useCallback, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Zap, Heart, Shield } from 'lucide-react';
import TransformationCanvas from '../components/cocoon/TransformationCanvas';
import KozaLoader from '../components/ui/KozaLoader';
import LoginForm from '../components/auth/LoginForm';


const FeatureCard = memo(({ icon: Icon, title, description, colorClass }) => (
    <div className={`p-8 bg-white/80 backdrop-blur-md rounded-3xl border border-neutral-100 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1 will-change-transform ${colorClass}`}>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 
            ${colorClass.includes('secondary') ? 'bg-secondary-400/10 text-secondary-600' :
                colorClass.includes('primary-900') ? 'bg-primary-900/5 text-primary-900' :
                    'bg-primary-500/10 text-primary-600'}`}>
            <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold mb-3 italic">{title}</h3>
        <p className="text-neutral-500 text-sm leading-relaxed font-medium">{description}</p>
    </div>
));

const HeroSection = memo(({ onStart }) => (
    <div className="text-center mb-16 animate-fade-in-up flex flex-col items-center">
        <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight tracking-tighter text-neutral-900 italic">
            <span className="block">Zorbalık Seni Yıkmamalı</span>
            <span className="bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-500 bg-clip-text text-transparent">Güçlendirmeli</span>
        </h1>

        <div className="w-full max-w-5xl relative mb-12 animate-float will-change-transform">
            <div className="relative h-[180px] flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-radial-gradient(circle at 50% 50%, rgba(33, 158, 188, 0.1) 0%, transparent 70%)" />
                <div className="scale-110 md:scale-125 transform-gpu">
                    <KozaLoader size="large" interactive />
                </div>
            </div>
        </div>

        <p className="text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto font-bold leading-relaxed mb-12 opacity-80">
            Zorbalığa karşı verdiğin mücadelede yalnız değilsin. <br className="hidden md:block" />
            Kozandan çık, hikayeni yeniden yaz ve dönüşümün gücünü keşfet.
        </p>

        <button
            onClick={onStart}
            className="group relative flex items-center justify-center gap-3 px-12 py-5 bg-neutral-900 text-white rounded-full font-black transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-neutral-900/20 cursor-pointer overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-secondary-500/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative z-10 uppercase tracking-widest">Yolculuğa Başla</span>
            <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
        </button>
    </div>
));

const HomePage = () => {
    const { isAdmin } = useAuth();
    const [showLogin, setShowLogin] = useState(false);
    const [error, setError] = useState(null);

    const toggleLogin = useCallback(() => setShowLogin(prev => !prev), []);
    const closeLogin = useCallback(() => setShowLogin(false), []);

    const features = useMemo(() => [
        { icon: Zap, title: "Hikayeler", description: "Olumsuzlukları güce dönüştüren her gün yeni bir hikaye.", colorClass: "hover:border-secondary-500" },
        { icon: Heart, title: "Topluluk", description: "Seninle aynı yoldan geçen binlerce kişiyle beraber.", colorClass: "hover:border-primary-500" },
        { icon: Shield, title: "Güven", description: "Verilerin uçtan uca şifreli ve tamamen güvende.", colorClass: "hover:border-primary-900" }
    ], []);

    return (
        <div className="min-h-screen bg-[#FDFDFD] text-[#1A1A1A] font-sans selection:bg-primary-100 selection:text-primary-900 overflow-x-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 z-0 opacity-40 will-change-opacity pointer-events-none">
                <TransformationCanvas color="#219EBC" intensity={0.08} active={!showLogin} />
                <div className="absolute inset-0 bg-radial-gradient(circle at 50% 50%, rgba(142, 202, 230, 0.15) 0%, transparent 80%)" />
            </div>

            {/* Login Overlay */}
            {showLogin && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-white/10 backdrop-blur-md animate-fade-in px-4"
                    onClick={closeLogin}
                >
                    <div onClick={(e) => e.stopPropagation()} className="will-change-transform scale-110">
                        <LoginForm onClose={closeLogin} />
                    </div>
                </div>
            )}

            <div className="h-20" />

            <main className="relative z-10 pt-16 pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center min-h-screen">

                <HeroSection onStart={toggleLogin} />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-20 mt-16 w-full">
                    {features.map((f, i) => <FeatureCard key={i} {...f} />)}
                </div>
            </main>

            {error && isAdmin && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white text-neutral-900 px-8 py-4 rounded-2xl shadow-2xl z-[100] animate-slide-up flex items-center gap-4 border border-red-50 will-change-transform">
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                    <span className="font-black text-sm uppercase tracking-tighter">Sistem:</span>
                    <span className="font-bold text-sm">{error}</span>
                    <button onClick={() => setError(null)} className="ml-4 text-neutral-400 hover:text-neutral-900 font-bold">✕</button>
                </div>
            )}

            <footer className="py-24 border-t border-neutral-100 relative z-10 bg-neutral-50/20">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="flex items-center gap-4 text-neutral-300 text-[10px] font-black tracking-[0.4em] uppercase opacity-50">
                        KOZA DESIGN SYSTEMS // SCALE HARDENED // 2026
                    </div>
                    <div className="flex items-center gap-10 text-neutral-400 text-[10px] font-black tracking-[0.2em] uppercase">
                        <a href="#" className="hover:text-primary-600 transition-colors">Privacy</a>
                        <a href="#" className="hover:text-primary-600 transition-colors">Terms</a>
                        <a href="#" className="hover:text-primary-600 transition-colors">Security</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default memo(HomePage);
