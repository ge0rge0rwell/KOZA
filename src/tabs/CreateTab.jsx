import React, { useState, useMemo, useCallback, memo } from 'react';
import { useUser } from '../context/UserContext';
import { useStory } from '../context/StoryContext';
import { useUI } from '../context/UIContext';
import { useAuth } from '../context/AuthContext';
import { NarrativeDomain } from '../domain/narrativeDomain';
import { SAFETY_DISCLAIMER } from '../utils/safety';
import { Sparkles, BookOpen, Gamepad2, AlertCircle, Zap, Star, GamepadIcon, HeadphonesIcon } from 'lucide-react';

import GalaxyContainer from '../components/galaxy/GalaxyContainer';
import GalaxyTabs from '../components/galaxy/GalaxyTabs';
import GalaxyTextarea from '../components/galaxy/GalaxyTextarea';
import GalaxyButton from '../components/galaxy/GalaxyButton';
import GalaxyAlert from '../components/galaxy/GalaxyAlert';
import GalaxyCard from '../components/galaxy/GalaxyCard';
import GalaxyGrid from '../components/galaxy/GalaxyGrid';
import GalaxyStat from '../components/galaxy/GalaxyStat';
import KozaLoader from '../components/ui/KozaLoader';

// Memoized Sub-Components for Scale
const CreateHeader = memo(() => (
    <div className="text-center mb-16 px-4">
        <div className="galaxy-badge primary mb-6 group cursor-default">
            <Sparkles size={14} className="group-hover:rotate-12 transition-liquid" />
            <span>AI-Powered Metamorphosis</span>
        </div>
        <h1 className="text-5xl font-black mb-4 tracking-tighter italic text-shimmer">
            Transform Experience
        </h1>
        <p className="text-neutral-500 text-lg font-medium max-w-xl mx-auto leading-relaxed">
            Turn your challenges into empowering stories and immersive games.
        </p>
    </div>
));

const StatsSection = memo(({ user }) => (
    <div className="mt-20">
        <GalaxyGrid cols={3}>
            <GalaxyStat icon={BookOpen} label="Oluşturulan Hikayeler" value={user?.storiesCreated || 0} />
            <GalaxyStat icon={GamepadIcon} label="Oluşturulan Oyunlar" value={user?.gamesCreated || 0} />
            <GalaxyStat icon={HeadphonesIcon} label="Oluşturulan Sesli Kitaplar" value={Math.floor((user?.storiesCreated || 0) * 0.4)} />
        </GalaxyGrid>
    </div>
));

const CreateTab = () => {
    const { user, awardXP } = useUser();
    const {
        activeStory, setActiveStory,
        isProcessing, setIsProcessing,
        analysisResult, setAnalysisResult,
        saveStory
    } = useStory();
    const { setCurrentView, addToast } = useUI();
    const { isAdmin } = useAuth();

    const [stage, setStage] = useState('');
    const [error, setError] = useState(null);
    const [creationMode, setCreationMode] = useState('story');

    const handleGenerate = useCallback(async () => {
        if (!activeStory.trim() || isProcessing) return;
        setError(null);
        setIsProcessing(true);
        setStage('Metamorfoz başlıyor...');

        try {
            const result = await NarrativeDomain.processNarrativeRequest(activeStory, creationMode);
            if (result.isSafetyTriggered) {
                setError(result.message);
                if (isAdmin) addToast('warning', 'Güvenlik Uyarısı', 'Girişin güvenlik filtrelerimize takıldı.');
                return;
            }

            const { data } = result;
            setAnalysisResult({ type: creationMode, category: data.title, data });
            saveStory(data);
            awardXP(500, creationMode === 'story' ? 'Hikaye oluşturuldu' : 'Oyun oluşturuldu');
            addToast('success', 'Başarılı!', creationMode === 'story' ? 'Hikaye oluşturuldu' : 'Oyun oluşturuldu');
        } catch (error) {
            console.error('Generation failed:', error);
            setError(error.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
            if (isAdmin) addToast('error', 'Hata', error.message || 'Oluşturma başarısız oldu');
        } finally {
            setIsProcessing(false);
            setStage('');
        }
    }, [activeStory, creationMode, isProcessing, isAdmin, setIsProcessing, setAnalysisResult, saveStory, awardXP, addToast]);

    const viewResult = useCallback(() => {
        if (analysisResult) {
            setCurrentView({ type: analysisResult.type, data: analysisResult.data });
            setActiveStory('');
            setAnalysisResult(null);
        }
    }, [analysisResult, setCurrentView, setActiveStory, setAnalysisResult]);

    return (
        <GalaxyContainer className="py-8">
            <CreateHeader />

            <div className="max-w-2xl mx-auto">
                {!analysisResult ? (
                    <div className="space-y-8">
                        <div className="flex justify-center">
                            <GalaxyTabs
                                activeTab={creationMode}
                                onChange={setCreationMode}
                                tabs={[
                                    { id: 'story', label: 'Hikaye', icon: BookOpen },
                                    { id: 'game', label: 'Oyun', icon: Gamepad2 }
                                ]}
                            />
                        </div>

                        <div className="animate-slide-up">
                            <GalaxyTextarea
                                value={activeStory}
                                onChange={setActiveStory}
                                placeholder={creationMode === 'story' ? "Zorlandığın bir anı anlat, hikaye olsun..." : "Bir zorluğu anlat, üstesinden gelme oyunu olsun..."}
                                disabled={isProcessing}
                                minHeight="150px"
                            />

                            <div className="mt-6 flex justify-end">
                                <GalaxyButton
                                    onClick={handleGenerate}
                                    disabled={!activeStory.trim() || isProcessing}
                                    icon={Sparkles}
                                    variant="magic"
                                >
                                    {creationMode === 'story' ? 'Hikayeye Dönüştür' : 'Oyuna Dönüştür'}
                                </GalaxyButton>
                            </div>
                        </div>

                        {error && isAdmin && (
                            <GalaxyAlert type="error" title="Giriş Hatası">
                                {error}
                            </GalaxyAlert>
                        )}

                        {isProcessing && (
                            <div className="mt-12 animate-fade-in flex flex-col items-center gap-4">
                                <KozaLoader size="large" message={stage} />
                            </div>
                        )}

                        <div className="mt-8 p-4 bg-neutral-50/50 rounded-xl border border-neutral-100/50 text-center">
                            <p className="text-xs text-neutral-400 font-medium italic">
                                🔔 {SAFETY_DISCLAIMER}
                            </p>
                        </div>
                    </div>
                ) : (
                    <GalaxyCard
                        className="text-center"
                        title={analysisResult.category}
                        subtitle={analysisResult.type === 'story' ? 'Hikaye Tamamlandı' : 'Oyun Hazır'}
                        emoji={analysisResult.type === 'story' ? '📖' : '🎮'}
                    >
                        <p className="text-neutral-500 text-lg mb-10">
                            {analysisResult.type === 'story'
                                ? 'Deneyimin artık moral verici bir hikaye.'
                                : 'Zorluğun artık heyecanlı bir oyun.'}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <GalaxyButton onClick={viewResult}>
                                {analysisResult.type === 'story' ? 'Hikayeyi Oku' : 'Oyunu Oyna'}
                            </GalaxyButton>
                            <GalaxyButton
                                onClick={() => {
                                    setAnalysisResult(null);
                                    setActiveStory('');
                                }}
                                variant="secondary"
                            >
                                Yeni Oluştur
                            </GalaxyButton>
                        </div>
                    </GalaxyCard>
                )}
            </div>

            <StatsSection user={user} />
        </GalaxyContainer>
    );
};

export default memo(CreateTab);
