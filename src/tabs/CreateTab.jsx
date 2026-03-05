'use client';
import React, { useState, useMemo, useCallback, memo } from 'react';
import { useUser } from '../context/UserContext';
import { useStory } from '../context/StoryContext';
import { useUI } from '../context/UIContext';
import { useAuth } from '../context/AuthContext';
import { NarrativeDomain } from '../domain/narrativeDomain';
import { SAFETY_DISCLAIMER } from '../utils/safety';
import { Sparkles, BookOpen, Gamepad2, AlertCircle, Zap, Star, GamepadIcon, HeadphonesIcon, BarChart3 } from 'lucide-react';

import { ClarityService } from '../services/ClarityService';
import GalaxyContainer from '../components/galaxy/GalaxyContainer';
import GalaxyTabs from '../components/galaxy/GalaxyTabs';
import GalaxyTextarea from '../components/galaxy/GalaxyTextarea';
import GalaxyButton from '../components/galaxy/GalaxyButton';
import GalaxyAlert from '../components/galaxy/GalaxyAlert';
import GalaxyCard from '../components/galaxy/GalaxyCard';
import GalaxyStat from '../components/galaxy/GalaxyStat';
import { GalaxyBox, GalaxyFlex, GalaxyStack, GalaxyGrid, GalaxyCenter } from '../components/galaxy/GalaxyLayout';
import KozaLoader from '../components/ui/KozaLoader';

// Memoized Sub-Components for Scale
const StatsSection = memo(({ user }) => {
    const entropyScore = ClarityService.getEntropyReductionScore(user);

    return (
        <GalaxyStack spacing={12} className="mt-20 border-t border-neutral-200 pt-12">
            <GalaxyGrid templateColumns="repeat(3, 1fr)" gap={6}>
                <GalaxyStat icon={BookOpen} label="Tamamlanan Hikayeler" value={user?.storiesCreated || 0} />
                <GalaxyStat icon={Zap} label="Gelişim Puanı" value={user?.xp || 0} />
                <GalaxyStat icon={BarChart3} label="Dönüşüm Oranı" value={`${entropyScore}%`} />
            </GalaxyGrid>
        </GalaxyStack>
    );
});

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
        setStage('Hikayeniz işleniyor...');

        try {
            const result = await NarrativeDomain.processNarrativeRequest(activeStory, creationMode);
            if (result.isSafetyTriggered) {
                setError(result.message);
                if (isAdmin) addToast('warning', 'Safety Warning', 'Your input was flagged by our safety filters.');
                return;
            }

            const { data } = result;
            setAnalysisResult({ type: creationMode, category: data.title, data });
            saveStory(data);

            const clarityGain = ClarityService.calculateClarityGain(activeStory, data);
            awardXP(clarityGain, creationMode === 'story' ? 'Hikaye tamamlandı' : 'Oyun oluşturuldu');
            addToast('success', 'Gelişim Kaydedildi', `+${clarityGain} Gelişim Puanı`);
        } catch (error) {
            console.error('Generation failed:', error);
            setError(error.message || 'An error occurred. Please try again.');
            if (isAdmin) addToast('error', 'Error', error.message || 'Creation failed');
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
            <GalaxyStack spacing={8} className="max-w-2xl mx-auto">
                {!analysisResult ? (
                    <GalaxyStack spacing={8}>
                        <GalaxyCenter>
                            <GalaxyTabs
                                activeTab={creationMode}
                                onChange={setCreationMode}
                                tabs={[
                                    { id: 'story', label: 'Hikaye Modu', icon: BookOpen },
                                    { id: 'game', label: 'Oyun Modu', icon: Gamepad2 }
                                ]}
                            />
                        </GalaxyCenter>

                        <GalaxyStack spacing={6} className="animate-slide-up">
                            <GalaxyTextarea
                                value={activeStory}
                                onChange={setActiveStory}
                                placeholder={creationMode === 'story' ? "Yaşadıklarınızı anlatın, birlikte dönüştürelim..." : "Karşılaştığınız engelleri yazın, bir oyuna çevirelim..."}
                                disabled={isProcessing}
                                minHeight="150px"
                            />

                            <GalaxyFlex justify="end">
                                <GalaxyButton
                                    onClick={handleGenerate}
                                    disabled={!activeStory.trim() || isProcessing}
                                    icon={Sparkles}
                                    variant="magic"
                                >
                                    {creationMode === 'story' ? 'Hikayeyi Oluştur' : 'Oyunu Başlat'}
                                </GalaxyButton>
                            </GalaxyFlex>
                        </GalaxyStack>

                        {error && isAdmin && (
                            <GalaxyAlert type="error" title="Giriş Hatası">
                                {error}
                            </GalaxyAlert>
                        )}

                        {isProcessing && (
                            <GalaxyCenter className="mt-12 animate-fade-in">
                                <KozaLoader size="large" message={stage} />
                            </GalaxyCenter>
                        )}

                        <div className="mt-8 p-4 bg-neutral-50/50 rounded-xl border border-neutral-100/50 text-center">
                            <p className="text-xs text-neutral-400 font-medium italic">
                                🔔 {SAFETY_DISCLAIMER}
                            </p>
                        </div>
                    </GalaxyStack>
                ) : (
                    <GalaxyCard
                        className="text-center"
                        title={analysisResult.category}
                        subtitle={analysisResult.type === 'story' ? 'Hikaye Hazır' : 'Oyun Hazır'}
                        emoji={analysisResult.type === 'story' ? '📖' : '🎮'}
                    >
                        <p className="text-neutral-500 text-lg mb-10">
                            {analysisResult.type === 'story'
                                ? 'Deneyiminiz artık moral verici bir hikaye.'
                                : 'Zorluğunuz artık heyecan verici bir oyun.'}
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
                                Yeni Hikaye Yaz
                            </GalaxyButton>
                        </div>
                    </GalaxyCard>
                )}
            </GalaxyStack>

            <StatsSection user={user} />
        </GalaxyContainer>
    );
};

export default memo(CreateTab);
