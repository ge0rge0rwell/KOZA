import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Cloud, ArrowRight, Loader2, AlertCircle, ShieldCheck, Heart, Zap } from 'lucide-react';
import TransformationCanvas from '../components/cocoon/TransformationCanvas';

const HomePage = () => {
    const { signInWithGoogle, firebaseEnabled } = useAuth();
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

    return (
        <div className="min-h-screen bg-neutral-950 text-white relative overflow-hidden font-sans">
            {/* Immersive Background */}
            <TransformationCanvas color="#9333EA" intensity={0.8} />
            <div className="absolute inset-0 bg-radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 80%) pointer-events-none" />

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 bg-neutral-950/20 backdrop-blur-md border-b border-white/5 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-primary-500/20">
                            K
                        </div>
                        <span className="text-xl font-bold tracking-tighter italic">KOZA</span>
                    </div>
                    {firebaseEnabled && (
                        <button
                            onClick={handleSignIn}
                            disabled={isSigningIn}
                            className="text-sm font-semibold hover:text-primary-400 transition-colors tracking-widest uppercase opacity-70 hover:opacity-100"
                        >
                            {isSigningIn ? 'BAĞLANILIYOR...' : 'GİRİŞ YAP'}
                        </button>
                    )}
                </div>
            </header>

            {/* Hero Section */}
            <main className="relative z-10 pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 text-primary-200 rounded-full text-sm font-medium mb-10 animate-fade-in shadow-2xl">
                    <Sparkles size={16} className="text-primary-400" />
                    <span>KOZA Teorisi: Acıyı Güce Dönüştür</span>
                </div>

                <h1 className="text-6xl sm:text-8xl font-black mb-8 text-center leading-[0.9] tracking-tighter animate-slide-up">
                    KENDİNİ <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-purple-400 to-pink-400">
                        YENİDEN İNŞA ET
                    </span>
                </h1>

                <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto text-center leading-relaxed font-serif italic animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    "Kozanın içindeki karanlık, uçuşun başladığı rahimdir." <br />
                    Yaşadığın zorlukları AI rehberliğinde metamorfoz hikayelerine dönüştür.
                </p>

                {firebaseEnabled ? (
                    <div className="animate-slide-up space-y-6 flex flex-col items-center" style={{ animationDelay: '0.2s' }}>
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 max-w-md mx-auto backdrop-blur-md">
                                <AlertCircle size={20} />
                                <span className="text-sm font-medium">{error}</span>
                            </div>
                        )}

                        <button
                            onClick={handleSignIn}
                            disabled={isSigningIn}
                            className="group relative flex items-center gap-4 px-10 py-5 bg-white text-black rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSigningIn ? (
                                <>
                                    <Loader2 size={24} className="animate-spin" />
                                    Bağlanılıyor...
                                </>
                            ) : (
                                <>
                                    <svg width="24" height="24" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Google ile Metamorfoza Başla
                                    <ArrowRight className="opacity-0 group-hover:translate-x-2 group-hover:opacity-100 transition-all" size={24} />
                                </>
                            )}
                        </button>

                        <div className="flex items-center gap-2 text-neutral-500 text-sm opacity-60">
                            <Cloud size={16} />
                            <span>Verileriniz güvenli bulut alanıyla senkronize edilecek</span>
                        </div>
                    </div>
                ) : (
                    <div className="p-8 bg-amber-500/10 border border-amber-500/20 rounded-3xl max-w-md mx-auto backdrop-blur-md text-center">
                        <AlertCircle size={32} className="mx-auto mb-4 text-amber-500" />
                        <p className="text-amber-200 font-medium">
                            Sistem şu an bakımda. Lütfen yapılandırmayı kontrol edin.
                        </p>
                    </div>
                )}
            </main>

            {/* Features Spotlight */}
            <section className="relative z-10 py-32 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all group">
                        <div className="w-14 h-14 bg-primary-500/20 rounded-2xl flex items-center justify-center mb-6 text-primary-400 group-hover:scale-110 transition-transform">
                            <Zap size={28} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Anlık Dönüşüm</h3>
                        <p className="text-neutral-400 leading-relaxed">Zorba deneyimlerini Gemini AI ile saniyeler içinde mitsel kanatlara dönüştürün.</p>
                    </div>
                    <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all group">
                        <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform">
                            <Heart size={28} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Empati Odaklı</h3>
                        <p className="text-neutral-400 leading-relaxed">Kendinizi suçlamak yerine, içsel kozanızın koruyucu gücünü keşfedin.</p>
                    </div>
                    <div className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all group">
                        <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                            <ShieldCheck size={28} />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Güvenilir Alan</h3>
                        <p className="text-neutral-400 leading-relaxed">Firebase şifrelemesi ile verileriniz sadece sizinle ve iyileşme yolculuğunuzla kalır.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-12 border-t border-white/5 text-center">
                <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-6">
                    <div className="flex items-center gap-2 opacity-30">
                        <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center text-black font-bold text-[10px]">K</div>
                        <span className="text-xs font-bold tracking-widest uppercase">KOZA Theory</span>
                    </div>
                    <p className="text-neutral-600 text-xs">© 2024 KOZA METAMORPHOSIS ENGINE. TRANSFORM YOUR TRAUMA.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
