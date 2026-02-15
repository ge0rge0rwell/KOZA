import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle, XCircle, Trophy, ArrowRight } from 'lucide-react';
import GalaxyButton from '../components/galaxy/GalaxyButton';
import GalaxyCard from '../components/galaxy/GalaxyCard';
import GalaxyProgress from '../components/galaxy/GalaxyProgress';
import GalaxyStat from '../components/galaxy/GalaxyStat';

const GameView = ({ game, onClose }) => {
    const { awardXP, setUser } = useApp();
    const [currentLevel, setCurrentLevel] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [score, setScore] = useState(0);

    const levels = game.levels || [];
    const currentLevelData = levels[currentLevel];
    const progressPercent = ((currentLevel + 1) / levels.length) * 100;

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
        <div className="min-h-screen bg-white/10 text-neutral-900 relative overflow-hidden">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 bg-white/10 backdrop-blur-xl border-b border-white/10 z-50">
                <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Oyun Modu</p>
                        <p className="font-semibold text-neutral-900">{game.title}</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="hidden sm:block w-32">
                            <GalaxyProgress value={progressPercent} size="small" />
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-primary-50 rounded-full border border-primary-200">
                            <span className="text-sm font-bold text-primary-600">{score}</span>
                            <span className="text-xs text-primary-600">PTS</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-neutral-100 rounded-full transition-colors text-neutral-500 hover:text-neutral-900"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Game Content */}
            <div className="pt-20 min-h-screen flex items-center justify-center px-4 py-8">
                <div className="max-w-2xl w-full">
                    {!isCompleted ? (
                        <div className="animate-fade-in">
                            <div className="mb-8 text-center">
                                <div className="inline-block px-4 py-1.5 bg-neutral-100 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border border-neutral-200 text-neutral-600">
                                    Seviye {currentLevel + 1} / {levels.length}
                                </div>
                                <h1 className="text-2xl sm:text-4xl font-extrabold mb-4 text-balance leading-tight text-neutral-900">
                                    {currentLevelData.scenario}
                                </h1>
                            </div>

                            <div className="space-y-4">
                                {currentLevelData.options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => !showFeedback && handleOptionSelect(option, index)}
                                        disabled={showFeedback}
                                        className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden group ${showFeedback && index === selectedOption
                                            ? option.isCorrect
                                                ? 'border-green-500/50 bg-green-50 shadow-sm'
                                                : 'border-red-500/50 bg-red-50 shadow-sm'
                                            : 'border-white/10 bg-white/10 hover:bg-white/20 hover:border-white/30 shadow-sm'
                                            } ${showFeedback ? 'cursor-default' : 'cursor-pointer'}`}
                                    >
                                        <div className="flex items-start gap-4 relative z-10">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg transition-colors ${showFeedback && index === selectedOption
                                                ? option.isCorrect
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-red-500 text-white'
                                                : 'bg-neutral-100 text-neutral-500 group-hover:bg-neutral-200'
                                                }`}>
                                                {showFeedback && index === selectedOption ? (
                                                    option.isCorrect ? <CheckCircle size={22} /> : <XCircle size={22} />
                                                ) : (
                                                    String.fromCharCode(65 + index)
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className={`font-medium mb-1 text-lg ${showFeedback && index === selectedOption ? 'text-neutral-900' : 'text-neutral-700 group-hover:text-neutral-900'}`}>
                                                    {option.text}
                                                </p>
                                                {showFeedback && index === selectedOption && (
                                                    <div className="animate-slide-down mt-3 pt-3 border-t border-neutral-200">
                                                        <p className={`text-sm ${option.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                                            {option.feedback}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center animate-fade-in-up">
                            <GalaxyCard className="bg-white border-neutral-200 shadow-xl">
                                <div className="w-24 h-24 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl animate-bounce-slow">
                                    <Trophy size={48} className="text-white drop-shadow-md" />
                                </div>
                                <h2 className="text-4xl font-extrabold mb-2 text-neutral-900">Oyun Tamamlandı!</h2>
                                <p className="text-neutral-600 mb-8">Mükemmel bir iş çıkardın.</p>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                                        <p className="text-sm text-neutral-500 mb-1">Toplam Skor</p>
                                        <p className="text-3xl font-bold text-primary-600">{score}</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                                        <p className="text-sm text-neutral-500 mb-1">Seviyeler</p>
                                        <p className="text-3xl font-bold text-neutral-900">{levels.length}</p>
                                    </div>
                                </div>

                                <GalaxyButton
                                    onClick={onClose}
                                    className="w-full !py-4 !text-lg !rounded-xl shadow-lg"
                                    icon={ArrowRight}
                                >
                                    Macera Tamamlandı
                                </GalaxyButton>
                            </GalaxyCard>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GameView;
