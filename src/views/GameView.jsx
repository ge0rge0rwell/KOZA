import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle, XCircle } from 'lucide-react';

const GameView = ({ game, onClose }) => {
    const { awardXP, user, setUser } = useApp();
    const [currentLevel, setCurrentLevel] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);

    const levels = game.levels || [];
    const currentLevelData = levels[currentLevel];

    const handleOptionSelect = (option, index) => {
        setSelectedOption(index);
        setShowFeedback(true);

        if (option.isCorrect) {
            setScore(prev => prev + 100);
            awardXP(50, 'Doğru karar');
        }

        setTimeout(() => {
            if (currentLevel < levels.length - 1) {
                setCurrentLevel(prev => prev + 1);
                setSelectedOption(null);
                setShowFeedback(false);
            } else {
                // Game completed
                setUser(prev => ({ ...prev, gamesPlayed: prev.gamesPlayed + 1 }));
            }
        }, 2000);
    };

    const isCompleted = currentLevel === levels.length - 1 && showFeedback;

    return (
        <div className="min-h-screen bg-neutral-900 text-white">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 bg-neutral-900/80 backdrop-blur-sm border-b border-neutral-800 z-50">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-neutral-400">Oyun</p>
                        <p className="font-semibold">{game.title}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-sm">
                            <span className="text-neutral-400">Seviye:</span>{' '}
                            <span className="font-semibold">{currentLevel + 1} / {levels.length}</span>
                        </div>
                        <div className="text-sm">
                            <span className="text-neutral-400">Skor:</span>{' '}
                            <span className="font-semibold text-primary-400">{score}</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Game Content */}
            <div className="pt-16 min-h-screen flex items-center justify-center px-4 py-12">
                <div className="max-w-2xl w-full">
                    {!isCompleted ? (
                        <div className="animate-fade-in">
                            <div className="mb-8">
                                <div className="inline-block px-3 py-1 bg-neutral-800 rounded-full text-sm mb-4">
                                    Seviye {currentLevel + 1}
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                                    {currentLevelData.scenario}
                                </h2>
                            </div>

                            <div className="space-y-3">
                                {currentLevelData.options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => !showFeedback && handleOptionSelect(option, index)}
                                        disabled={showFeedback}
                                        className={`w-full text-left p-6 rounded-xl border-2 transition-all ${showFeedback && index === selectedOption
                                                ? option.isCorrect
                                                    ? 'border-green-500 bg-green-500/10'
                                                    : 'border-red-500 bg-red-500/10'
                                                : 'border-neutral-700 bg-neutral-800 hover:border-neutral-600'
                                            } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${showFeedback && index === selectedOption
                                                    ? option.isCorrect
                                                        ? 'bg-green-500'
                                                        : 'bg-red-500'
                                                    : 'bg-neutral-700'
                                                }`}>
                                                {showFeedback && index === selectedOption ? (
                                                    option.isCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />
                                                ) : (
                                                    String.fromCharCode(65 + index)
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium mb-2">{option.text}</p>
                                                {showFeedback && index === selectedOption && (
                                                    <p className="text-sm text-neutral-300 mt-2">
                                                        {option.feedback}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center animate-fade-in">
                            <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle size={40} />
                            </div>
                            <h2 className="text-3xl font-bold mb-3">Oyun Tamamlandı!</h2>
                            <p className="text-neutral-400 mb-2">Toplam Skor: {score}</p>
                            <p className="text-neutral-400 mb-8">Tebrikler, tüm seviyeleri tamamladın!</p>
                            <button
                                onClick={onClose}
                                className="px-8 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg font-medium transition-colors"
                            >
                                Bitir
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GameView;
