import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Cloud, ArrowRight, Loader2, AlertCircle, ShieldCheck, Heart, Zap } from 'lucide-react';
import TransformationCanvas from '../components/cocoon/TransformationCanvas';
import GalaxyLoader from '../components/galaxy/GalaxyLoader';

const HomePage = () => {
    const { signInWithGoogle, firebaseEnabled } = useAuth();
    const [step, setStep] = useState('landing'); // 'landing', 'get-started', 'sign-in'
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [error, setError] = useState(null);

    const handleSignIn = async () => {
        setIsSigningIn(true);
        setError(null);
        const result = await signInWithGoogle();
        if (!result.success) {
            setError(result.error);
        }
        setIsSigningIn(false);
    };

    const renderLanding = () => (
        <div className="flex flex-col items-center text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 backdrop-blur-xl border border-neutral-200 text-primary-700 rounded-full text-sm font-medium mb-10 shadow-sm">
                <Sparkles size={16} className="text-primary-600" />
                <span>KOZA.AI'a hoş geldin!</span>
            </div>

            <h1 className="text-6xl sm:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
                ZORBALIĞA <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400">
                    KARŞI ÇIK!
                </span>
            </h1>

            <p className="text-xl text-neutral-600 mb-12 max-w-2xl leading-relaxed font-serif italic">
                Yaşadığın zorluklar seni güçlendirmek için birer fırsat, <br />
                KOZA ile zorbalığa karşı çıkmak için ilk adımını at.
            </p>

            <button
                onClick={() => setStep('get-started')}
                className="group relative flex items-center gap-4 px-12 py-6 bg-neutral-900 text-white rounded-2xl font-bold text-2xl hover:scale-105 transition-all shadow-xl active:scale-95"
            >
                Yolculuğuna Başla
                <ArrowRight className="group-hover:translate-x-2 transition-transform" size={28} />
            </button>
        </div>
    );

    const renderGetStarted = () => (
        <div className="flex flex-col items-center animate-slide-up">
            <h2 className="text-4xl font-bold mb-12 text-center">KOZA.AI ÖZELLİKLERİ</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 w-full max-w-5xl">
                <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200 backdrop-blur-md">
                    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-6 text-primary-600">
                        <Zap size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Hikayeler</h3>
                    <p className="text-neutral-600 text-sm">Yaşadığın olumsuzlukları moral verici hikayelere çevirerek seni güçlendiren yapay zeka</p>
                </div>
                <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200 backdrop-blur-md">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6 text-purple-600">
                        <Heart size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Öz Birikimi</h3>
                    <p className="text-neutral-600 text-sm">Her deneyimden 'Öz' kazanarak içsel kozanı büyüt ve kanatlan.</p>
                </div>
                <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200 backdrop-blur-md">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                        <ShieldCheck size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Çoklu Cihaz Senkronizasyonu</h3>
                    <p className="text-neutral-600 text-sm">Uygulamayı birden fazla cihazda verilerini kaybetmeden kullan..</p>
                </div>
            </div>

            <button
                onClick={() => setStep('sign-in')}
                className="group flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-primary-600 to-purple-600 text-neutral-900 rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-xl active:scale-95"
            >
                HAZIRIM, DEVAM E
                <ArrowRight size={24} />
            </button>

            <button
                onClick={() => setStep('landing')}
                className="mt-6 text-neutral-500 hover:text-neutral-900 transition-colors text-sm font-medium"
            >
                GERİ GİT
            </button>
        </div>
    );

    const renderSignIn = () => (
        <div className="flex flex-col items-center text-center animate-fade-in">
            <div className="w-20 h-20 bg-primary-500/10 rounded-3xl flex items-center justify-center mb-8 text-primary-400 border border-primary-500/20">
                <ShieldCheck size={40} />
            </div>

            <h2 className="text-4xl font-bold mb-4">Giriş Yap</h2>
            <p className="text-neutral-400 mb-10 max-w-md">
                Uygulamayı kullanmak için giriş yap
            </p>

            {firebaseEnabled ? (
                <div className="space-y-6 flex flex-col items-center">
                    {error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-600 mb-6">
                            <AlertCircle size={20} />
                            <span className="text-sm font-medium">{error}</span>
                        </div>
                    )}

                    <button
                        onClick={handleSignIn}
                        disabled={isSigningIn}
                        className="group relative flex items-center justify-center gap-4 px-10 py-5 bg-neutral-900 text-white rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed min-w-[300px]"
                    >
                        {isSigningIn ? (
                            <GalaxyLoader message="Giriş Yapılyor" />
                        ) : (
                            <>
                                <svg width="24" height="24" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                GOOGLE GİRİŞİ
                            </>
                        )}
                    </button>

                    <div className="flex items-center gap-2 text-neutral-500 text-xs">
                        <Cloud size={14} />
                        <span>Verileriniz bu uygulamaya başka bir cihazda giriş yaptığınızda da eşitlenecek</span>
                    </div>

                    <button
                        onClick={() => setStep('get-started')}
                        className="mt-4 text-neutral-500 hover:text-neutral-900 transition-colors text-sm font-medium"
                    >
                        GERİ GİT
                    </button>
                </div>
            ) : (
                <div className="p-8 bg-amber-500/10 border border-amber-500/20 rounded-3xl max-w-md mx-auto backdrop-blur-md">
                    <AlertCircle size={32} className="mx-auto mb-4 text-amber-500" />
                    <p className="text-amber-200 font-medium text-sm">
                        Sistem yapılandırması eksik veya yanlış.
                    </p>
                </div>
            )}
        </div>
    );

    return (
        <div className="min-h-screen bg-white text-neutral-900 relative overflow-hidden font-sans">
            {/* Immersive Background */}
            <TransformationCanvas color="#9333EA" intensity={0.4} />
            <div className="absolute inset-0 bg-radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.05) 0%, transparent 80%) pointer-events-none" />

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-neutral-200 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-neutral-900">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-purple-700 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-primary-500/20">
                            K
                        </div>
                        <span className="text-xl font-bold tracking-tighter italic">KOZA</span>
                    </div>
                </div>
            </header>

            {/* Main Content Step Switcher */}
            <main className="relative z-10 pt-40 pb-20 px-6 max-w-7xl mx-auto min-h-[80vh] flex flex-col items-center justify-center">
                {step === 'landing' && renderLanding()}
                {step === 'get-started' && renderGetStarted()}
                {step === 'sign-in' && renderSignIn()}
            </main>

            {/* Features Spotlight */}
            <section className="relative z-10 py-32 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-10 rounded-[2.5rem] bg-neutral-50 border border-neutral-200 hover:bg-neutral-100/50 transition-all group shadow-sm">
                        <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-6 text-primary-600 group-hover:scale-110 transition-transform">
                            <Zap size={28} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-neutral-900">Yapay Zeka Entegrasyonu</h3>
                        <p className="text-neutral-600 leading-relaxed">Yapay zeka entegrasyonu sayesinde birebir kendiniz için üretilmiş hikayeleri okuyun.</p>
                    </div>
                    <div className="p-10 rounded-[2.5rem] bg-neutral-5x0 border border-neutral-200 hover:bg-neutral-100/50 transition-all group shadow-sm">
                        <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 text-purple-600 group-hover:scale-110 transition-transform">
                            <Heart size={28} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-neutral-900">Akademi ve Eğitim Modülleri</h3>
                        <p className="text-neutral-600 leading-relaxed">Akademi ve Eğitim Modülleri sayesinde zorbalığa karşı koymak için ipuçları ve eğitimler alın.</p>
                    </div>
                    <div className="p-10 rounded-[2.5rem] bg-neutral-50 border border-neutral-200 hover:bg-neutral-100/50 transition-all group shadow-sm">
                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                            <ShieldCheck size={28} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-neutral-900">Güvenebileceğiniz Bir Alan</h3>
                        <p className="text-neutral-600 leading-relaxed">Tek yönlü senkronizasyonu ve gelişmiş bulut şifrelemesi sayesinde verileriniz sadece sizde kalır.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-12 border-t border-white/5 text-center">
                <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-6">
                    <div className="flex items-center gap-2 opacity-30">
                        <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center text-black font-bold text-[10px]">K</div>
                        <span className="text-xs font-bold tracking-widest uppercase">KOZA</span>
                    </div>
                    <p className="text-neutral-600 text-xs">© 2026 KOZA </p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
