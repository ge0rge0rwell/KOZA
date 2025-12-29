import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { generateStorybook } from '../services/geminiService';
import { Sparkles, BookOpen, Loader2 } from 'lucide-react';

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
                title: result[0]?.title || 'Dönüşüm Hikayesi',
                content: activeStory,
                pages: result
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
                    AI Destekli Hikaye Oluşturucu
                </div>
                <h1 className="text-4xl font-bold mb-3 text-balance">
                    Deneyimini Hikayeye Dönüştür
                </h1>
                <p className="text-neutral-600 text-lg text-balance">
                    Yaşadığın zorluğu anlat, AI ile güçlendirici bir hikayeye dönüştür
                </p>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
                <label className="block text-sm font-medium mb-2">
                    Deneyimini Anlat
                </label>
                <textarea
                    value={activeStory}
                    onChange={(e) => setActiveStory(e.target.value)}
                    placeholder="Başına gelen bir zorbalık olayını, seni üzen bir deneyimi ya da aşmak istediğin bir zorluğu anlat..."
                    className="w-full h-48 px-4 py-3 border border-neutral-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    disabled={isProcessing}
                />

                {isProcessing && (
                    <div className="mt-4 flex items-center gap-3 text-sm text-neutral-600">
                        <Loader2 size={16} className="animate-spin" />
                        <span>{stage}</span>
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
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-white rounded-lg border border-neutral-200">
                    <div className="text-2xl font-bold text-primary-600 mb-1">5</div>
                    <div className="text-sm text-neutral-600">Sayfa Hikaye</div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-neutral-200">
                    <div className="text-2xl font-bold text-primary-600 mb-1">AI</div>
                    <div className="text-sm text-neutral-600">Destekli</div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-neutral-200">
                    <div className="text-2xl font-bold text-primary-600 mb-1">500</div>
                    <div className="text-sm text-neutral-600">XP Kazanç</div>
                </div>
            </div>
        </div>
    );
};

export default CreateView;
