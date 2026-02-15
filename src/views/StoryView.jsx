import React, { useState, useEffect, useCallback, memo, useMemo } from 'react';
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

// Memoized Sub-Components
const StoryHeader = memo(({ title, currentPage, totalPages, onPrev, onNext, onReset, onJump, onToggleFullscreen, onPrint, onShare, onToggleAudio, isSpeaking, onClose }) => (
    <header className="h-16 bg-white border-b border-neutral-200 px-6 flex items-center justify-between z-50 shadow-sm shrink-0">
        <div className="flex items-center gap-4">
            <Book size={20} className="text-neutral-400" />
            <h1 className="font-bold text-neutral-800 text-sm tracking-tight truncate max-w-[200px]">{title}</h1>
            <button onClick={onReset} title="En Başa Dön" className="flex items-center gap-1 ml-4 py-1 px-2 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer">
                <RotateCcw size={16} className="text-neutral-400" />
            </button>
            <button onClick={onJump} title="En Sona Git" className="flex items-center gap-1 py-1 px-2 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer">
                <RotateCw size={16} className="text-neutral-400" />
            </button>
        </div>

        <div className="flex items-center gap-6">
            <button onClick={onPrev} disabled={currentPage === 0} className="p-2 hover:bg-neutral-50 rounded-lg disabled:opacity-20 transition-all text-neutral-600">
                <ChevronLeft size={20} />
            </button>
            <div className="text-xs font-bold tracking-widest text-neutral-500 tabular-nums">{currentPage + 1} / {totalPages}</div>
            <button onClick={onNext} disabled={currentPage >= totalPages - 1} className="p-2 hover:bg-neutral-50 rounded-lg disabled:opacity-20 transition-all text-neutral-600">
                <ChevronRight size={20} />
            </button>
        </div>

        <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 border-r border-neutral-200">
                <button onClick={onToggleFullscreen} title="Tam Ekran" className="p-2 hover:bg-neutral-50 rounded-lg text-neutral-400 hover:text-neutral-600"><Maximize2 size={18} /></button>
                <button onClick={onPrint} title="Yazdır" className="p-2 hover:bg-neutral-50 rounded-lg text-neutral-400 hover:text-neutral-600"><Printer size={18} /></button>
                <button onClick={onShare} title="Paylaş" className="p-2 hover:bg-neutral-50 rounded-lg text-neutral-400 hover:text-neutral-600"><Share2 size={18} /></button>
            </div>
            <div className="flex items-center gap-1 ml-1">
                <button onClick={onToggleAudio} className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all text-sm font-bold ${isSpeaking ? 'bg-primary-500 text-white shadow-lg' : 'bg-primary-100 text-primary-600 hover:bg-primary-200'}`}>
                    {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    <span>Dinle</span>
                </button>
                <button onClick={onClose} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-lg text-neutral-400 ml-2 transition-colors"><X size={20} /></button>
            </div>
        </div>
    </header>
));

const StoryPage = memo(({ page, pageNumber, alignment = 'left', onPageClick, author }) => (
    <div
        onClick={onPageClick}
        className={`flex-1 relative overflow-hidden flex flex-col p-8 sm:p-16 lg:p-24 ${alignment === 'left' ? 'border-r border-neutral-100' : ''} transition-all duration-500 cursor-pointer hover:bg-neutral-50/50 ${!page ? 'opacity-50 cursor-default' : ''}`}
    >
        <div className="absolute inset-0 paper-texture pointer-events-none" />
        <div className={`relative z-10 flex flex-col h-full max-w-2xl mx-auto w-full ${alignment === 'right' ? 'text-right' : 'text-left'}`}>
            <div className={`text-[10px] sm:text-xs font-black tracking-[0.2em] text-neutral-300 uppercase mb-8 ${alignment === 'right' ? 'text-right' : 'text-left'}`}>
                {author}
            </div>
            {page ? (
                <div className={`flex-1 flex flex-col justify-start animate-fade-in-${alignment}`}>
                    <h3 className={`text-xl font-bold mb-6 text-primary-600/60 uppercase tracking-widest text-sm ${alignment === 'right' ? 'text-right' : 'text-left'}`}>
                        {page.title}
                    </h3>
                    <div className="prose prose-slate max-w-none">
                        <p className={`text-neutral-800 leading-relaxed font-serif text-lg sm:text-xl lg:text-3xl selection:bg-primary-100 ${alignment === 'right' ? 'text-right pl-4' : 'text-left pr-4'} overflow-y-auto max-h-[60vh] custom-scrollbar`}>
                            {page.content}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center animate-pulse text-neutral-300">
                    <Book size={64} className="mb-4 opacity-20" />
                    <p className="font-serif italic text-lg">Son Sayfa</p>
                </div>
            )}
            <div className={`mt-8 text-sm font-bold text-neutral-300 tabular-nums ${alignment === 'right' ? 'text-right' : 'text-left'}`}>
                {pageNumber}
            </div>
        </div>
    </div>
));

const StoryCompletionOverlay = memo(({ onClose }) => (
    <div className="absolute inset-0 z-40 bg-white/60 backdrop-blur-md flex items-center justify-center animate-fade-in">
        <div className="text-center p-12 bg-white rounded-[48px] shadow-2xl border border-neutral-100 scale-110">
            <h3 className="text-3xl font-bold mb-4 text-primary-600">Harika Bir Yolculuktu!</h3>
            <p className="text-neutral-600 mb-8 max-w-xs mx-auto font-medium text-lg">Bu hikaye metamorfozunu tamamladı. Yeni hikayeler seni bekliyor.</p>
            <GalaxyButton onClick={onClose} className="!py-6 !px-16 !text-xl !rounded-full shadow-2xl" icon={Check}>
                Bitir ve Dön
            </GalaxyButton>
        </div>
    </div>
));

const StoryView = ({ story, onClose }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const pages = useMemo(() => story.pages || [], [story.pages]);
    const totalPages = pages.length;
    const themeColor = story.themeColor || '#9333EA';
    const author = "KOZA GEZGİNİ";

    const currentPageData = pages[currentPage];
    const { toggle, isSpeaking, stop } = useAudioStory(currentPageData?.content);

    useEffect(() => { stop(); }, [currentPage, stop]);
    useEffect(() => () => stop(), [stop]);

    const nextPage = useCallback(() => setCurrentPage(prev => Math.min(prev + 2, totalPages % 2 === 0 ? totalPages - 2 : totalPages - 1)), [totalPages]);
    const prevPage = useCallback(() => setCurrentPage(prev => Math.max(prev - 2, 0)), []);

    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen();
        else if (document.exitFullscreen) document.exitFullscreen().catch(e => console.log(e));
    }, []);

    const handlePrint = useCallback(() => requestAnimationFrame(() => window.print()), []);

    const handleShare = useCallback(async () => {
        const shareData = { title: story.title, text: `KOZA ile oluşturduğum bu hikayeyi oku: ${story.title}`, url: window.location.href };
        try {
            if (navigator.share) await navigator.share(shareData);
            else { await navigator.clipboard.writeText(window.location.href); alert("Bağlantı panoya kopyalandı!"); }
        } catch (err) { console.error('Paylaşım hatası:', err); }
    }, [story.title]);

    if (!pages.length) return (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-8">
            <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center shadow-xl">
                <p className="text-neutral-600 mb-6 font-medium">Hikaye yüklenemedi</p>
                <button onClick={onClose} className="text-primary-600 hover:text-primary-700 font-bold">← Geri Dön</button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f3f4f6] text-neutral-900 relative overflow-hidden flex flex-col font-sans">
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <TransformationCanvas color={themeColor} intensity={0.3} />
            </div>

            <StoryHeader
                title={story.title} currentPage={currentPage} totalPages={totalPages}
                onPrev={prevPage} onNext={nextPage}
                onReset={() => setCurrentPage(0)} onJump={() => setCurrentPage(totalPages - 1)}
                onToggleFullscreen={toggleFullscreen} onPrint={handlePrint} onShare={handleShare}
                onToggleAudio={toggle} isSpeaking={isSpeaking} onClose={onClose}
            />

            <main className="flex-1 relative z-10 overflow-hidden">
                <div className="w-full h-full bg-white book-depth flex relative overflow-hidden group shadow-2xl">
                    <div className="book-spine" />
                    <StoryPage
                        page={pages[currentPage]} pageNumber={currentPage + 1}
                        alignment="left" onPageClick={prevPage} author={author}
                    />
                    <StoryPage
                        page={pages[currentPage + 1]} pageNumber={currentPage + 2}
                        alignment="right" onPageClick={nextPage} author={author}
                    />
                    {currentPage === totalPages - 1 && <StoryCompletionOverlay onClose={onClose} />}
                </div>
            </main>

            <div className="h-1 bg-neutral-200 w-full shrink-0">
                <div className="h-full bg-primary-500 transition-all duration-700 ease-out" style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }} />
            </div>
        </div>
    );
};

export default memo(StoryView);
