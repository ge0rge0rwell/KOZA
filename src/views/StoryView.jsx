import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const StoryView = ({ story, onClose }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const pages = story.pages || [];
    const totalPages = pages.length;

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

    const currentPageData = pages[currentPage];

    return (
        <div className="min-h-screen bg-neutral-900 text-white">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 bg-neutral-900/80 backdrop-blur-sm border-b border-neutral-800 z-50">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                    <div className="text-sm text-neutral-400">
                        {currentPage + 1} / {totalPages}
                    </div>
                </div>
            </div>

            {/* Story Content */}
            <div className="pt-16 min-h-screen flex items-center justify-center px-4 py-12">
                <div className="max-w-2xl w-full">
                    <div className="animate-fade-in">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-balance">
                            {currentPageData.title}
                        </h2>
                        <div className="prose prose-invert prose-lg max-w-none">
                            <p className="text-neutral-300 leading-relaxed text-balance">
                                {currentPageData.content}
                            </p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="mt-12 flex items-center justify-between">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 0}
                            className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <div className="flex gap-2">
                            {pages.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i)}
                                    className={`h-2 rounded-full transition-all ${i === currentPage
                                            ? 'w-8 bg-primary-500'
                                            : 'w-2 bg-neutral-700 hover:bg-neutral-600'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages - 1}
                            className="p-3 bg-neutral-800 hover:bg-neutral-700 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    {currentPage === totalPages - 1 && (
                        <div className="mt-8 text-center">
                            <button
                                onClick={onClose}
                                className="px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg font-medium transition-colors"
                            >
                                Hikayeyi Tamamla
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StoryView;
