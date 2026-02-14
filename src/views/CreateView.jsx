import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { generateStorybook } from '../services/geminiService';
import { Sparkles, BookOpen } from 'lucide-react';
import GalaxyLoader from '../components/galaxy/GalaxyLoader';
import GalaxyCard from '../components/galaxy/GalaxyCard';
import MessageBox from '../components/input/MessageBox';

const CreateView = () => {
    const { activeStory, setActiveStory, isProcessing, setIsProcessing, setCurrentView, awardXP, saveStory } = useApp();
    const [stage, setStage] = useState('');

    const handleGenerate = async () => {
        if (!activeStory.trim() || isProcessing) return;

        setIsProcessing(true);
        setStage('Hikaye oluşturuluyor...');

        try {
            const result = await generateStorybook(activeStory);

            const story = {
                type: 'story',
                title: result.pages?.[0]?.title || 'Dönüşüm Hikayesi',
                content: activeStory,
                pages: result.pages || [],
                themeColor: result.themeColor || '#9333EA',
                visualMood: result.visualMood || 'Magical Shimmer'
            };

            saveStory(story);
            awardXP(500, 'Hikaye oluşturuldu');
            setCurrentView({ type: 'story', data: story });
            setActiveStory('');
        } catch (error) {
            console.error('Generation failed:', error);
            setStage('');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-medium mb-4">
                    <Sparkles size={16} />
                    AI Destekli Hikaye Oluşturma
                </div>
                <h1 className="text-4xl font-bold mb-3 text-balance">
                    Deneyimini Hikayeye Dönüştür
                </h1>
                <p className="text-neutral-600 text-lg text-balance">
                    Yaşadığın zorluğu anlat, AI ile güçlendirici bir hikayeye dönüştür
                </p>
            </div>

            <MessageBox
                value={activeStory}
                onChange={(val) => {
                    setActiveStory(val);
                }}
                onSend={handleGenerate}
                placeholder="Başına gelen bir zorbalık olayını anlat..."
                disabled={isProcessing}
            />

            {isProcessing && (
                <div className="mt-6 flex flex-col items-center gap-4">
                    <GalaxyLoader size="medium" />
                    <span className="text-primary-600 font-bold animate-pulse text-sm">{stage}</span>
                </div>
            )}

            <button
                onClick={handleGenerate}
                disabled={!activeStory.trim() || isProcessing}
                className="mt-4 w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
                <BookOpen size={20} />
                {isProcessing ? 'Oluşturuluyor...' : 'Hikaye Oluştur'}
            </button>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <GalaxyCard title="5" subtitle="Sayfa Hikaye" emoji="📖" />
                <GalaxyCard title="AI" subtitle="Destekli" emoji="🤖" />
                <GalaxyCard title="500" subtitle="XP Kazanç" emoji="💎" />
            </div>
        </div>
    );
};

export default CreateView;
