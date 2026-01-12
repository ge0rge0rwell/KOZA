import React from 'react';
import { Sparkles, Target, TrendingUp, Award } from 'lucide-react';

const Onboarding = ({ onComplete }) => {
    const [step, setStep] = React.useState(0);

    const steps = [
        {
            icon: Sparkles,
            title: "KOZA'ya Hoş Geldin",
            description: "Deneyimlerini güçlendirici hikayelere ve oyunlara dönüştür. Her zorluk, bir dönüşüm fırsatıdır.",
            color: "primary"
        },
        {
            icon: Target,
            title: "Hikaye Oluştur",
            description: "Yaşadığın zorluğu anlat, AI destekli araçlarımız onu anlamlı bir hikayeye dönüştürsün.",
            color: "success"
        },
        {
            icon: TrendingUp,
            title: "Gelişimini İzle",
            description: "Her hikaye ve oyun ile XP kazan, seviye atla ve rozetler topla.",
            color: "warning"
        },
        {
            icon: Award,
            title: "Topluluğa Katıl",
            description: "Diğer kullanıcıların dönüşüm hikayelerini keşfet ve kendi deneyimlerini paylaş.",
            color: "error"
        }
    ];

    const currentStep = steps[step];
    const Icon = currentStep.icon;

    const colorMap = {
        primary: 'bg-primary-600',
        success: 'bg-green-600',
        warning: 'bg-amber-600',
        error: 'bg-red-600'
    };

    return (
        <div className="fixed inset-0 bg-neutral-900/10 backdrop-blur-xl z-50 flex items-center justify-center p-4">
            <div className="liquid-glass rounded-[40px] max-w-md w-full p-10 animate-liquid shadow-liquid-deep border-white/40">
                <div className={`w-20 h-20 ${colorMap[currentStep.color]} rounded-3xl flex items-center justify-center text-white mb-8 mx-auto shadow-lg morph-shape`}>
                    <Icon size={40} />
                </div>

                <h2 className="text-3xl font-black text-center mb-4 italic tracking-tighter italic text-shimmer">{currentStep.title}</h2>
                <p className="text-neutral-500 text-center mb-10 leading-relaxed font-medium">{currentStep.description}</p>

                <div className="flex gap-2.5 justify-center mb-10">
                    {steps.map((_, i) => (
                        <div
                            key={i}
                            className={`h-1.5 rounded-full transition-liquid ${i === step ? 'w-10 bg-primary-500' : 'w-1.5 bg-neutral-200'
                                }`}
                        />
                    ))}
                </div>

                <div className="flex gap-4">
                    {step > 0 && (
                        <button
                            onClick={() => setStep(step - 1)}
                            className="px-8 py-4 bg-white/50 backdrop-blur-md rounded-2xl font-bold text-neutral-500 hover:text-neutral-900 transition-liquid border border-white/50"
                        >
                            Geri
                        </button>
                    )}
                    <button
                        onClick={() => {
                            if (step < steps.length - 1) {
                                setStep(step + 1);
                            } else {
                                localStorage.setItem('koza-onboarding-complete', 'true');
                                onComplete();
                            }
                        }}
                        className="flex-1 bg-neutral-900 text-white px-8 py-4 rounded-2xl font-black italic tracking-widest hover:scale-[1.02] active:scale-95 transition-liquid shadow-xl"
                    >
                        {step < steps.length - 1 ? 'DEVAM' : 'BAŞLA'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Onboarding;
