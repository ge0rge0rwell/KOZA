import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { generateStorybook, generateGame } from '../services/geminiService';
import { Sparkles, BookOpen, Gamepad2, Loader2 } from 'lucide-react';

const CreateTab = () => {
    const { activeStory, setActiveStory, isProcessing, setIsProcessing, setCurrentView, awardXP, saveStory, setAnalysisResult, analysisResult } = useApp();
    const [stage, setStage] = useState('');

    const handleGenerate = async (type) => {
        if (!activeStory.trim() || isProcessing) return;

        setIsProcessing(true);
        setStage(type === 'story' ? 'Hikaye oluşturuluyor...' : 'Oyun tasarlanıyor...');

        try {
            const result = type === 'story'
                ? await generateStorybook(activeStory)
                : await generateGame(activeStory);

            const data = {
                type,
                title: type === 'story' ? (result[0]?.title || 'Dönüşüm Hikayesi') : (result.title || 'Dönüşüm Oyunu'),
                content: activeStory,
                [type === 'story' ? 'pages' : 'levels']: type === 'story' ? result : result.levels
            };

            setAnalysisResult({
                type,
                category: type === 'story' ? 'Dönüşüm Hikayesi' : 'Dönüşüm Oyunu',
                data
            });

            saveStory(data);
            awardXP(500, type === 'story' ? 'Hikaye oluşturuldu' : 'Oyun oluşturuldu');
        } catch (error) {
            console.error('Generation failed:', error);
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
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-medium mb-4">
                    <Sparkles size={16} />
                    AI Destekli Dönüşüm Aracı
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-3">
                    Deneyimini Dönüştür
                </h1>
                <p className="text-neutral-600 text-lg">
                    Yaşadığın zorluğu anlat, hikaye ya da oyuna dönüştür
                </p>
            </div>

            {!analysisResult ? (
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

                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                            onClick={() => handleGenerate('story')}
                            disabled={!activeStory.trim() || isProcessing}
                            className="bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                        >
                            <BookOpen size={20} />
                            Hikaye Oluştur
                        </button>
                        <button
                            onClick={() => handleGenerate('game')}
                            disabled={!activeStory.trim() || isProcessing}
                            className="bg-neutral-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                        >
                            <Gamepad2 size={20} />
                            Oyun Oluştur
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm">
                    <div className="text-center mb-6">
                        <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 ${analysisResult.type === 'story' ? 'bg-primary-100 text-primary-600' : 'bg-neutral-100 text-neutral-800'
                            }`}>
                            {analysisResult.type === 'story' ? <BookOpen size={32} /> : <Gamepad2 size={32} />}
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{analysisResult.category}</h3>
                        <p className="text-neutral-600">
                            {analysisResult.type === 'story' ? 'Hikaye başarıyla oluşturuldu!' : 'Oyun başarıyla tasarlandı!'}
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={viewResult}
                            className="flex-1 bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                        >
                            {analysisResult.type === 'story' ? 'Hikayeyi Oku' : 'Oyunu Oyna'}
                        </button>
                        <button
                            onClick={() => {
                                setAnalysisResult(null);
                                setActiveStory('');
                            }}
                            className="px-6 py-3 border border-neutral-200 rounded-lg font-medium hover:bg-neutral-50 transition-colors"
                        >
                            Yeni Oluştur
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateTab;
