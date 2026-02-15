import React, { useState, useCallback, memo } from 'react';
import { useStory } from '../context/StoryContext';
import { useUI } from '../context/UIContext';
import { useUser } from '../context/UserContext';
import { NarrativeDomain } from '../domain/narrativeDomain';
import { SAFETY_DISCLAIMER } from '../utils/safety';
import { Sparkles, BookOpen } from 'lucide-react';
import KozaLoader from '../components/ui/KozaLoader';
import GalaxyTextarea from '../components/galaxy/GalaxyTextarea';
import GalaxyButton from '../components/galaxy/GalaxyButton';
import GalaxyCard from '../components/galaxy/GalaxyCard';

const CreateView = () => {
    const { activeStory, setActiveStory, isProcessing, setIsProcessing, saveStory } = useStory();
    const { setCurrentView, addToast } = useUI();
    const { awardXP } = useUser();

    const [stage, setStage] = useState('');

    const handleGenerate = useCallback(async () => {
        if (!activeStory.trim() || isProcessing) return;

        setIsProcessing(true);
        setStage('Metamorfoz başlıyor...');

        try {
            const result = await NarrativeDomain.processNarrativeRequest(activeStory, 'story');

            if (result.isSafetyTriggered) {
                addToast('warning', 'Güvenlik', result.message);
                return;
            }

            saveStory(result.data);
            awardXP(500, 'Hikaye oluşturuldu');
            setCurrentView({ type: 'story', data: result.data });
            setActiveStory('');
            addToast('success', 'Başarılı', 'Hikayeniz oluşturuldu!');
        } catch (error) {
            console.error('Generation failed:', error);
            addToast('error', 'Hata', 'Oluşturma başarısız oldu.');
        } finally {
            setIsProcessing(false);
            setStage('');
        }
    }, [activeStory, isProcessing, setIsProcessing, saveStory, awardXP, setCurrentView, setActiveStory, addToast]);

    return (
        <div className="max-w-2xl mx-auto px-4 py-20 animate-fade-in">
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                    <Sparkles size={14} className="animate-pulse" />
                    AI-Powered Metamorphosis
                </div>
                <h1 className="text-5xl font-black mb-4 tracking-tighter italic">
                    Transform Experience
                </h1>
                <p className="text-neutral-500 font-medium text-lg text-balance">
                    Yaşadığın zorluğu anlat, AI ile güçlendirici bir hikayeye dönüştür
                </p>
            </div>

            <div className="space-y-6">
                <GalaxyTextarea
                    value={activeStory}
                    onChange={setActiveStory}
                    placeholder="Başına gelen bir zorbalık olayını anlat..."
                    disabled={isProcessing}
                    minHeight="180px"
                />

                <div className="flex justify-end">
                    <GalaxyButton
                        onClick={handleGenerate}
                        disabled={!activeStory.trim() || isProcessing}
                        variant="magic"
                        icon={BookOpen}
                    >
                        {isProcessing ? 'Oluşturuluyor...' : 'Hikaye Oluştur'}
                    </GalaxyButton>
                </div>
            </div>

            {isProcessing && (
                <div className="mt-12 flex flex-col items-center gap-4 animate-fade-in">
                    <KozaLoader size="medium" message={stage} />
                </div>
            )}

            <div className="mt-8 p-4 bg-neutral-50/50 rounded-xl border border-neutral-100 text-center">
                <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">
                    ⚠️ {SAFETY_DISCLAIMER}
                </p>
            </div>

            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <GalaxyCard title="5" subtitle="Sayfa Hikaye" emoji="📖" />
                <GalaxyCard title="AI" subtitle="Destekli" emoji="🤖" />
                <GalaxyCard title="500" subtitle="XP Kazanç" emoji="💎" />
            </div>
        </div>
    );
};

export default memo(CreateView);
