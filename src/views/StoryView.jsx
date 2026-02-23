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
    VolumeX,
    MessageSquare,
    Sparkles,
    Loader2
} from 'lucide-react';
import TransformationCanvas from '../components/cocoon/TransformationCanvas';
import GalaxyButton from '../components/galaxy/GalaxyButton';
import useAudioStory from '../hooks/useAudioStory';
import MessageBox from '../components/input/MessageBox';
import { useStory } from '../context/StoryContext';

// Memoized Sub-Components
const StoryHeader = memo(({ title, currentPage, totalPages, onPrev, onNext, onReset, onJump, onToggleFullscreen, onPrint, onShare, onMastodonShare, isMastodonSharing, onToggleAudio, isSpeaking, onClose }) => (
    <header className="h-16 bg-white border-b border-neutral-200 px-6 flex items-center justify-between z-50 shadow-sm shrink-0">
        <div className="flex items-center gap-4">
            <Book size={20} className="text-neutral-400" />
            <h1 className="font-bold text-neutral-800 text-sm tracking-tight truncate max-w-[200px]">{title}</h1>
            <button onClick={onReset} title="Back to Start" className="flex items-center gap-1 ml-4 py-1 px-2 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer">
                <RotateCcw size={16} className="text-neutral-400" />
            </button>
            <button onClick={onJump} title="Go to End" className="flex items-center gap-1 py-1 px-2 hover:bg-neutral-50 rounded-lg transition-colors cursor-pointer">
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
                <button onClick={onToggleFullscreen} title="Fullscreen" className="p-2 hover:bg-neutral-50 rounded-lg text-neutral-400 hover:text-neutral-600"><Maximize2 size={18} /></button>
                <button onClick={onPrint} title="Print" className="p-2 hover:bg-neutral-50 rounded-lg text-neutral-400 hover:text-neutral-600"><Printer size={18} /></button>
                <button onClick={onShare} title="Share" className="p-2 hover:bg-neutral-50 rounded-lg text-neutral-400 hover:text-neutral-600"><Share2 size={18} /></button>
            </div>
            <div className="flex items-center gap-1 ml-1">
                <button onClick={onToggleAudio} className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all text-sm font-bold ${isSpeaking ? 'bg-primary-500 text-white shadow-lg' : 'bg-primary-100 text-primary-600 hover:bg-primary-200'}`}>
                    {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    <span>Listen</span>
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
                    <p className="font-serif italic text-lg">Last Page</p>
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
            <h3 className="text-3xl font-bold mb-4 text-primary-600">A Great Journey!</h3>
            <p className="text-neutral-600 mb-8 max-w-xs mx-auto font-medium text-lg">This story has completed its metamorphosis. New stories await you.</p>
            <GalaxyButton onClick={onClose} className="!py-6 !px-16 !text-xl !rounded-full shadow-2xl" icon={Check}>
                Finish and Return
            </GalaxyButton>
        </div>
    </div>
));

const StoryView = ({ story, onClose }) => {
    const { refineStory, isProcessing } = useStory();
    const [currentPage, setCurrentPage] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [isRefinementOpen, setIsRefinementOpen] = useState(false);
    const [refinementStatus, setRefinementStatus] = useState(null); // 'idle', 'loading', 'success', 'error'
    const pages = useMemo(() => story.pages || [], [story.pages]);
    const totalPages = pages.length;
    const themeColor = story.themeColor || '#9333EA';
    const author = "KOZA TRAVELER";

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
        const shareData = { title: story.title, text: `Read this story I created with KOZA: ${story.title}`, url: window.location.href };
        try {
            if (navigator.share) await navigator.share(shareData);
            else { await navigator.clipboard.writeText(window.location.href); alert("Link copied to clipboard!"); }
        } catch (err) { console.error('Share error:', err); }
    }, [story.title]);

    const [isMastodonSharing, setIsMastodonSharing] = useState(false);
    const handleMastodonShare = async () => {
        setIsMastodonSharing(true);
        try {
            // Simulated API call to enqueue BullMQ publishing job
            // await fetch('http://localhost:4000/api/mastodon/publish', {
            //     method: 'POST',
            //     body: JSON.stringify({ content: `Yeni hikayemi okuyun: ${story.title}\n\n#KOZA #Hikaye` })
            // });
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert("Hikaye Mastodon gönderi kuyruğuna eklendi!");
        } catch (error) {
            console.error('Mastodon paylaşım hatası', error);
            alert("Paylaşılamadı. Hesabınız bağlı mı?");
        } finally {
            setIsMastodonSharing(false);
        }
    };

    const handleRefine = async () => {
        if (!feedback.trim()) return;
        setRefinementStatus('loading');
        const result = await refineStory(story, feedback);
        if (result.success) {
            setRefinementStatus('success');
            setFeedback('');
            setTimeout(() => {
                setRefinementStatus(null);
                setIsRefinementOpen(false);
            }, 2000);
        } else {
            setRefinementStatus('error');
            alert(result.message || "An error occurred.");
        }
    };

    if (!pages.length) return (
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-8">
            <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center shadow-xl">
                <p className="text-neutral-600 mb-6 font-medium">Story could not be loaded</p>
                <button onClick={onClose} className="text-primary-600 hover:text-primary-700 font-bold">← Go Back</button>
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
                onMastodonShare={handleMastodonShare} isMastodonSharing={isMastodonSharing}
                onToggleAudio={toggle} isSpeaking={isSpeaking} onClose={onClose}
            />

            <div className="absolute top-20 right-6 z-50 flex flex-col items-end gap-2">
                <button
                    onClick={() => setIsRefinementOpen(!isRefinementOpen)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all shadow-lg active:scale-95 ${isRefinementOpen ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 hover:bg-neutral-50'}`}
                >
                    <Sparkles size={16} />
                    <span>Edit Story</span>
                </button>

                {isRefinementOpen && (
                    <div className="w-80 bg-white p-4 rounded-3xl shadow-2xl border border-indigo-100 animate-fade-in-up mt-2">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
                                <MessageSquare size={14} />
                                <span>How shall we change it?</span>
                            </div>
                            <button onClick={() => setIsRefinementOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                                <X size={16} />
                            </button>
                        </div>
                        <p className="text-[10px] text-neutral-500 mb-4 leading-relaxed">
                            E.g.: "Add a side character", "Create a more magical atmosphere" or "Change the ending".
                        </p>
                        <MessageBox
                            value={feedback}
                            onChange={setFeedback}
                            onSend={handleRefine}
                            disabled={refinementStatus === 'loading'}
                            placeholder="Your feedback..."
                        />
                        {refinementStatus === 'loading' && (
                            <div className="mt-4 flex items-center justify-center gap-2 text-indigo-600 font-bold text-xs animate-pulse">
                                <Loader2 size={16} className="animate-spin" />
                                <span>KOZA is weaving your story again...</span>
                            </div>
                        )}
                        {refinementStatus === 'success' && (
                            <div className="mt-4 flex items-center justify-center gap-2 text-green-600 font-bold text-xs">
                                <Check size={16} />
                                <span>Transformation Complete!</span>
                            </div>
                        )}
                    </div>
                )}
            </div>

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
