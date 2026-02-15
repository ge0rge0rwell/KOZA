import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, BookOpen, Check, Headphones, PauseCircle, PlayCircle } from 'lucide-react';
import TransformationCanvas from '../components/cocoon/TransformationCanvas';
import GalaxyButton from '../components/galaxy/GalaxyButton';
import GalaxyProgress from '../components/galaxy/GalaxyProgress';
import GalaxyToast from '../components/galaxy/GalaxyToast';
import useAudioStory from '../hooks/useAudioStory';

const StoryView = ({ story, onClose }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const pages = story.pages || [];
    const totalPages = pages.length;
    const themeColor = story.themeColor || '#9333EA';

    const currentPageData = pages[currentPage];

    // Audio Hook
    const { toggle, isSpeaking, stop, supported } = useAudioStory(currentPageData?.content);

    // Stop audio when changing pages or closing
    useEffect(() => {
        stop();
        // Optional: Auto-play on page turn? Let's keep it manual for now.
    }, [currentPage, stop]);

    useEffect(() => {
        return () => stop();
    }, [stop]);

    const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
    const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 0));

    if (!pages.length) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-12">
                <button onClick={onClose} className="mb-4 text-neutral-600 hover:text-neutral-900">
                    ← Geri
                </button>
                <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
                    <p className="text-neutral-600">Hikaye yüklenemedi</p>
                </div>
            </div>
        );
    }

    const progressValue = ((currentPage + 1) / totalPages) * 100;

    return (
        <div className="min-h-screen bg-white/10 text-neutral-900 relative overflow-hidden" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, ${themeColor}08 0%, transparent 80%)`
        }}>
            {/* Background Particles */}
            <TransformationCanvas color={themeColor} intensity={0.5} />

            {/* Header */}
            <div className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-xl border-b border-white/10 z-50 transition-all duration-300">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-500 hover:text-neutral-900"
                    >
                        <X size={24} />
                    </button>

                    <div className="flex flex-col items-center">
                        <div className="text-[10px] font-bold tracking-widest text-neutral-500 mb-1 uppercase">
                            SAYFA {currentPage + 1} / {totalPages}
                        </div>
                        <div className="w-32">
                            <GalaxyProgress value={progressValue} size="small" />
                        </div>
                    </div>

                    {/* Audio Controls */}
                    {supported ? (
                        <button
                            onClick={toggle}
                            className={`p-2 rounded-full transition-all duration-300 ${isSpeaking
                                ? 'bg-primary-100 text-primary-600 animate-pulse'
                                : 'hover:bg-neutral-100 text-neutral-500 hover:text-primary-600'
                                }`}
                            title={isSpeaking ? "Duraklat" : "Sesli Oku"}
                        >
                            {isSpeaking ? <PauseCircle size={24} /> : <Headphones size={24} />}
                        </button>
                    ) : (
                        <div className="w-10"></div>
                    )}
                </div>
            </div>

            {/* Story Content */}
            <div className="pt-24 min-h-screen flex items-center justify-center px-4 py-12 relative z-10">
                <div className="max-w-2xl w-full">
                    <div className="animate-fade-in transition-all duration-700">
                        <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-balance text-center drop-shadow-lg" style={{ color: themeColor }}>
                            {currentPageData.title}
                        </h2>

                        <div className={`bg-white/10 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/10 shadow-xl transition-all duration-500 ${isSpeaking ? 'ring-2 ring-primary-400 ring-offset-4' : ''}`}>
                            <div className="prose prose-slate prose-xl max-w-none">
                                <p className="text-neutral-900 leading-relaxed text-balance text-center font-serif text-lg first-letter:text-5xl first-letter:font-serif first-letter:mr-2 first-letter:float-left first-letter:text-primary-600">
                                    {currentPageData.content}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="mt-12 flex items-center justify-between pointer-events-auto">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 0}
                            className="p-4 bg-white hover:bg-neutral-50 rounded-full disabled:opacity-0 disabled:cursor-default transition-all border border-neutral-200 text-neutral-900 hover:scale-110 active:scale-95 shadow-sm"
                        >
                            <ChevronLeft size={28} />
                        </button>

                        <div className="flex gap-2">
                            {pages.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i)}
                                    className={`h-1.5 rounded-full transition-all duration-500 ${i === currentPage
                                        ? 'w-8 bg-neutral-900 shadow-sm'
                                        : 'w-1.5 bg-neutral-200 hover:bg-neutral-300'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages - 1}
                            className="p-4 bg-white hover:bg-neutral-50 rounded-full disabled:opacity-0 disabled:cursor-default transition-all border border-neutral-200 text-neutral-900 hover:scale-110 active:scale-95 shadow-sm"
                        >
                            <ChevronRight size={28} />
                        </button>
                    </div>

                    {currentPage === totalPages - 1 && (
                        <div className="mt-12 text-center animate-fade-in-up">
                            <GalaxyButton
                                onClick={onClose}
                                className="!py-4 !px-12 !text-lg !rounded-full shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:shadow-[0_0_50px_rgba(147,51,234,0.5)]"
                                icon={Check}
                            >
                                Metamorfozu Tamamla
                            </GalaxyButton>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StoryView;
