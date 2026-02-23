'use client';
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
            <GalaxyStat icon={BookOpen} label="Stories Created" value={user?.storiesCreated || 0} />
            <GalaxyStat icon={GamepadIcon} label="Games Created" value={user?.gamesCreated || 0} />
            <GalaxyStat icon={HeadphonesIcon} label="Audiobooks Created" value={Math.floor((user?.storiesCreated || 0) * 0.4)} />
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
        setStage('Metamorphosis beginning...');

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
            awardXP(500, creationMode === 'story' ? 'Story created' : 'Game created');
            addToast('success', 'Success!', creationMode === 'story' ? 'Story created' : 'Game created');
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
            <CreateHeader />

            <div className="max-w-2xl mx-auto">
                {!analysisResult ? (
                    <div className="space-y-8">
                        <div className="flex justify-center">
                            <GalaxyTabs
                                activeTab={creationMode}
                                onChange={setCreationMode}
                                tabs={[
                                    { id: 'story', label: 'Story', icon: BookOpen },
                                    { id: 'game', label: 'Game', icon: Gamepad2 }
                                ]}
                            />
                        </div>

                        <div className="animate-slide-up">
                            <GalaxyTextarea
                                value={activeStory}
                                onChange={setActiveStory}
                                placeholder={creationMode === 'story' ? "Tell a moment you struggled with, let it become a story..." : "Tell a challenge, let it become an overcoming game..."}
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
                                    {creationMode === 'story' ? 'Transform to Story' : 'Transform to Game'}
                                </GalaxyButton>
                            </div>
                        </div>

                        {error && isAdmin && (
                            <GalaxyAlert type="error" title="Input Error">
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
                        subtitle={analysisResult.type === 'story' ? 'Story Complete' : 'Game Ready'}
                        emoji={analysisResult.type === 'story' ? '📖' : '🎮'}
                    >
                        <p className="text-neutral-500 text-lg mb-10">
                            {analysisResult.type === 'story'
                                ? 'Your experience is now a morale-boosting story.'
                                : 'Your challenge is now an exciting game.'}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <GalaxyButton onClick={viewResult}>
                                {analysisResult.type === 'story' ? 'Read the Story' : 'Play the Game'}
                            </GalaxyButton>
                            <GalaxyButton
                                onClick={() => {
                                    setAnalysisResult(null);
                                    setActiveStory('');
                                }}
                                variant="secondary"
                            >
                                Create New
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
