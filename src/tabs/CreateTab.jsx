import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { generateStorybook, generateGame } from '../services/geminiService';
import { validateStoryInput } from '../utils/validation';
import { Sparkles, BookOpen, Gamepad2, AlertCircle, Zap, Star, GamepadIcon, HeadphonesIcon } from 'lucide-react';

// Galaxy Components
import GalaxyButton from '../components/galaxy/GalaxyButton';
import GalaxyCard from '../components/galaxy/GalaxyCard';
import GalaxyLoader from '../components/galaxy/GalaxyLoader'; // Using the existing specialized loader for now, could switch to GalaxySpinner + GalaxyBackdrop
import GalaxyTextarea from '../components/galaxy/GalaxyTextarea';
import GalaxyTabs from '../components/galaxy/GalaxyTabs';
import GalaxyAlert from '../components/galaxy/GalaxyAlert';
import GalaxyGrid from '../components/galaxy/GalaxyGrid';
import GalaxyStat from '../components/galaxy/GalaxyStat';
import GalaxyContainer from '../components/galaxy/GalaxyContainer';

const CreateTab = () => {
    const { activeStory, setActiveStory, isProcessing, setIsProcessing, setCurrentView, awardXP, saveStory, setAnalysisResult, analysisResult, addToast } = useApp();
    const [stage, setStage] = useState('');
    const [error, setError] = useState(null);
    const [creationMode, setCreationMode] = useState('story'); // 'story' or 'game'

    const handleGenerate = async () => {
        if (!activeStory.trim() || isProcessing) return;
        setError(null);

        const validation = validateStoryInput(activeStory);
        if (!validation.isValid) {
            setError(validation.errors[0]);
            return;
        }

        setIsProcessing(true);
        setStage(creationMode === 'story' ? 'Hikayeniz oluşturuluyor....' : 'Oyun tasarlanıyor...');

        try {
            const result = creationMode === 'story'
                ? await generateStorybook(validation.sanitized)
                : await generateGame(validation.sanitized);

            const data = {
                type: creationMode,
                title: creationMode === 'story' ? (result[0]?.title || 'Dönüşüm Hikayesi') : (result.title || 'Dönüşüm Oyunu'),
                content: validation.sanitized,
                [creationMode === 'story' ? 'pages' : 'levels']: creationMode === 'story' ? result : result.levels
            };

            setAnalysisResult({
                type: creationMode,
                category: creationMode === 'story' ? 'Dönüşüm Hikayesi' : 'Dönüşüm Oyunu',
                data
            });

            saveStory(data);
            awardXP(500, creationMode === 'story' ? 'Hikaye oluşturuldu' : 'Oyun oluşturuldu');
            addToast('success', 'Başarılı!', creationMode === 'story' ? 'Hikaye oluşturuldu' : 'Oyun oluşturuldu');
        } catch (error) {
            console.error('Generation failed:', error);
            setError(error.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
            addToast('error', 'Hata', error.message || 'Oluşturma başarısız oldu');
        } finally {
            setIsProcessing(false);
            setStage('');
        }
    };

    const viewResult = () => {
        if (analysisResult) {
            setCurrentView({ type: analysisResult.type, data: analysisResult.data });
            setActiveStory('');
            setAnalysisResult(null);
        }
    };

    return (
        <GalaxyContainer className="py-8">
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

            <div className="max-w-2xl mx-auto">
                {!analysisResult ? (
                    <div className="space-y-8">
                        {/* Mode Toggle */}
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

                        {error && (
                            <GalaxyAlert type="error" title="Giriş Hatası">
                                {error}
                            </GalaxyAlert>
                        )}

                        {isProcessing && (
                            <div className="mt-12 animate-fade-in flex flex-col items-center gap-4">
                                <GalaxyLoader size="large" />
                                <p className="text-primary-600 font-bold animate-pulse">{stage}</p>
                            </div>
                        )}
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

            <div className="mt-20">
                <GalaxyGrid cols={3}>
                    <GalaxyStat  icon={BookOpen} label="Oluşturulan Hikayeler" value={5}  />
                    <GalaxyStat icon={GamepadIcon} label="Oluşturulan Oyunlar" value={5} />
                    <GalaxyStat icon={HeadphonesIcon} label="Oluşturulan Sesli Kitaplar" value={5} />
                </GalaxyGrid>
            </div>
        </GalaxyContainer>
    );
};

export default CreateTab;
