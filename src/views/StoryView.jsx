import React, { useState, useEffect } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    X,
    Book,
    RotateCcw,
    RotateCw,
    Maximize2,
    Printer,
    Share2,
    Volume2,
    ChevronDown,
    Check,
    VolumeX
} from 'lucide-react';
import TransformationCanvas from '../components/cocoon/TransformationCanvas';
import GalaxyButton from '../components/galaxy/GalaxyButton';
import useAudioStory from '../hooks/useAudioStory';

const StoryView = ({ story, onClose }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const pages = story.pages || [];
    const totalPages = pages.length;
    const themeColor = story.themeColor || '#9333EA';
    const author = "KOZA GEZGİNİ"; // Default author if not in story meta

    const currentPageData = pages[currentPage];

    // Audio Hook
    const { toggle, isSpeaking, stop, supported } = useAudioStory(currentPageData?.content);

    // Stop audio when changing pages or closing
    useEffect(() => {
        stop();
    }, [currentPage, stop]);

    useEffect(() => {
        return () => stop();
    }, [stop]);

    const nextPage = () => setCurrentPage(prev => Math.min(prev + 2, totalPages % 2 === 0 ? totalPages - 2 : totalPages - 1));
    const prevPage = () => setCurrentPage(prev => Math.max(prev - 2, 0));

    // Functional Handlers
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen().catch(e => console.log(e));
            }
        }
    };

    const handlePrint = () => {
        // Clear any active processing or expensive effects before printing
        // Wrapping in requestAnimationFrame for an "instant" UI response
        requestAnimationFrame(() => {
            window.print();
        });
    };

    const handleShare = async () => {
        const shareData = {
            title: story.title,
            text: `KOZA ile oluşturduğum bu hikayeyi oku: ${story.title}`,
            url: window.location.href
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert("Bağlantı panoya kopyalandı!");
            }
        } catch (err) {
            console.error('Paylaşım hatası:', err);
        }
    };

    const resetToFirst = () => setCurrentPage(0);
    const jumpToLast = () => setCurrentPage(totalPages - 1);

    if (!pages.length) {
        return (
            <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-8">
                <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center shadow-xl">
                    <p className="text-neutral-600 mb-6 font-medium">Hikaye yüklenemedi</p>
                    <button onClick={onClose} className="text-primary-600 hover:text-primary-700 font-bold">
                        ← Geri Dön
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f3f4f6] text-neutral-900 relative overflow-hidden flex flex-col font-sans">
            {/* Immersive Site Background showing through in margins */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <TransformationCanvas color={themeColor} intensity={0.3} />
            </div>

            {/* Premium Header */}
            <header className="h-16 bg-white border-b border-neutral-200 px-6 flex items-center justify-between z-50 shadow-sm shrink-0">
                <div className="flex items-center gap-4">
                    <Book size={20} className="text-neutral-400" />
                    <h1 className="font-bold text-neutral-800 text-sm tracking-tight truncate max-w-[200px]">
                        {story.title}
                    </h1>
                    <button
                        onClick={resetToFirst}
                        title="En Başa Dön"
                        className="flex items-center gap-1 ml-4 py-1 px-2 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer"
                    >
                        <RotateCcw size={16} className="text-neutral-400" />
                    </button>
                    <button
                        onClick={jumpToLast}
                        title="En Sona Git"
                        className="flex items-center gap-1 py-1 px-2 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer"
                    >
                        <RotateCw size={16} className="text-neutral-400" />
                    </button>
                </div>

                {/* Page Navigation Center */}
                <div className="flex items-center gap-6">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 0}
                        className="p-2 hover:bg-neutral-50 rounded-lg disabled:opacity-20 transition-all text-neutral-600"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div className="text-xs font-bold tracking-widest text-neutral-500 tabular-nums">
                        {currentPage + 1} / {totalPages}
                    </div>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages - 1}
                        className="p-2 hover:bg-neutral-50 rounded-lg disabled:opacity-20 transition-all text-neutral-600"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 px-2 border-r border-neutral-200">
                        <button
                            onClick={toggleFullscreen}
                            title="Tam Ekran"
                            className="p-2 hover:bg-neutral-50 rounded-lg text-neutral-400 hover:text-neutral-600"
                        >
                            <Maximize2 size={18} />
                        </button>
                        <button
                            onClick={handlePrint}
                            title="Yazdır"
                            className="p-2 hover:bg-neutral-50 rounded-lg text-neutral-400 hover:text-neutral-600"
                        >
                            <Printer size={18} />
                        </button>
                        <button
                            onClick={handleShare}
                            title="Paylaş"
                            className="p-2 hover:bg-neutral-50 rounded-lg text-neutral-400 hover:text-neutral-600"
                        >
                            <Share2 size={18} />
                        </button>
                    </div>

                    <div className="flex items-center gap-1 ml-1">
                        <button
                            onClick={toggle}
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all text-sm font-bold ${isSpeaking
                                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                                : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                                }`}
                        >
                            {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
                            <span>Dinle</span>
                        </button>
                        <button className="p-2 hover:bg-neutral-50 rounded-lg text-neutral-400">
                            <ChevronDown size={18} />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-red-50 hover:text-red-500 rounded-lg text-neutral-400 ml-2 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 relative z-10 overflow-hidden">
                <div className="w-full h-full bg-white book-depth flex relative overflow-hidden group shadow-2xl">
                    {/* Spine Fold */}
                    <div className="book-spine" />

                    {/* Left Page: Interactive Navigation Area */}
                    <div
                        onClick={prevPage}
                        className={`flex-1 relative overflow-hidden flex flex-col p-8 sm:p-16 lg:p-24 border-r border-neutral-100 transition-all duration-500 cursor-pointer hover:bg-neutral-50/50 ${currentPage === 0 ? 'opacity-50 cursor-default' : ''}`}
                    >
                        <div className="absolute inset-0 paper-texture pointer-events-none" />

                        {/* Page Content N */}
                        <div className="relative z-10 flex flex-col h-full max-w-2xl mx-auto w-full">
                            {/* Author Tag (Left) */}
                            <div className="text-[10px] sm:text-xs font-black tracking-[0.2em] text-neutral-300 uppercase mb-8">
                                {author}
                            </div>

                            <div className="flex-1 flex flex-col justify-start animate-fade-in-left">
                                <h3 className="text-xl font-bold mb-6 text-primary-600/60 uppercase tracking-widest text-sm">
                                    {pages[currentPage]?.title}
                                </h3>
                                <div className="prose prose-slate max-w-none">
                                    <p className="text-neutral-800 leading-relaxed font-serif text-lg sm:text-xl lg:text-3xl selection:bg-primary-100 overflow-y-auto max-h-[60vh] pr-4 custom-scrollbar">
                                        {pages[currentPage]?.content}
                                    </p>
                                </div>
                            </div>

                            {/* Page Number (Left) */}
                            <div className="mt-8 text-sm font-bold text-neutral-300 tabular-nums">
                                {currentPage + 1}
                            </div>
                        </div>

                        {/* Back Arrow Hint on Hover */}
                        <div className="absolute left-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none">
                            <ChevronLeft size={64} className="text-neutral-400" />
                        </div>
                    </div>

                    {/* Right Page: Interactive Navigation Area */}
                    <div
                        onClick={nextPage}
                        className={`flex-1 relative overflow-hidden flex flex-col p-8 sm:p-16 lg:p-24 transition-all duration-500 cursor-pointer hover:bg-neutral-50/50 ${currentPage + 1 >= totalPages ? 'bg-neutral-50/10' : ''}`}
                    >
                        <div className="absolute inset-0 paper-texture pointer-events-none" />

                        {/* Page Content N+1 */}
                        {currentPage + 1 < totalPages ? (
                            <div className="relative z-10 flex flex-col h-full max-w-2xl mx-auto w-full">
                                {/* Author Tag (Right) */}
                                <div className="text-[10px] sm:text-xs font-black tracking-[0.2em] text-neutral-300 uppercase mb-8 text-right">
                                    {author}
                                </div>

                                <div className="flex-1 flex flex-col justify-start animate-fade-in-right">
                                    <h3 className="text-xl font-bold mb-6 text-primary-600/60 uppercase tracking-widest text-sm text-right">
                                        {pages[currentPage + 1]?.title}
                                    </h3>
                                    <div className="prose prose-slate max-w-none">
                                        <p className="text-neutral-800 leading-relaxed font-serif text-lg sm:text-xl lg:text-3xl selection:bg-primary-100 text-right overflow-y-auto max-h-[60vh] pl-4 custom-scrollbar">
                                            {pages[currentPage + 1]?.content}
                                        </p>
                                    </div>
                                </div>

                                {/* Page Number (Right) */}
                                <div className="mt-8 text-sm font-bold text-neutral-300 tabular-nums text-right">
                                    {currentPage + 2}
                                </div>
                            </div>
                        ) : (
                            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-8 animate-pulse text-neutral-300">
                                <Book size={64} className="mb-4 opacity-20" />
                                <p className="font-serif italic text-lg">Son Sayfa</p>
                            </div>
                        )}

                        {/* Next Arrow Hint on Hover */}
                        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none">
                            <ChevronRight size={64} className="text-neutral-400" />
                        </div>
                    </div>

                    {/* Metamorphosis Completion (Last Page Overlay) */}
                    {currentPage === totalPages - 1 && (
                        <div className="absolute inset-0 z-40 bg-white/60 backdrop-blur-md flex items-center justify-center animate-fade-in">
                            <div className="text-center p-12 bg-white rounded-[48px] shadow-2xl border border-neutral-100 scale-110">
                                <h3 className="text-3xl font-bold mb-4 text-primary-600">Harika Bir Yolculuktu!</h3>
                                <p className="text-neutral-600 mb-8 max-w-xs mx-auto font-medium text-lg">Bu hikaye metamorfozunu tamamladı. Yeni hikayeler seni bekliyor.</p>
                                <GalaxyButton
                                    onClick={onClose}
                                    className="!py-6 !px-16 !text-xl !rounded-full shadow-2xl"
                                    icon={Check}
                                >
                                    Bitir ve Dön
                                </GalaxyButton>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Subtle Progress Trace at the very bottom */}
            <div className="h-1 bg-neutral-200 w-full shrink-0">
                <div
                    className="h-full bg-primary-500 transition-all duration-700 ease-out"
                    style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
                />
            </div>
        </div>
    );
};

export default StoryView;
