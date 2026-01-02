import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ACHIEVEMENTS, getAchievementProgress } from '../utils/achievements';
import { Trash2, BookOpen, Gamepad2, Award, TrendingUp, Lock } from 'lucide-react';
import CocoonStage from '../components/cocoon/CocoonStage';
import MilestoneNotification from '../components/cocoon/MilestoneNotification';
import { getOzToNextStage } from '../utils/cocoon/stageCalculator';
import UiverseCard from '../components/uiverse/UiverseCard';
import UiverseButton from '../components/uiverse/UiverseButton';

const ProfileTab = () => {
    const { user, savedStories, deleteStory, setCurrentView } = useApp();
    const [previousOz, setPreviousOz] = useState(user.totalXP);
    const prevOzRef = useRef(user.totalXP);

    const progressPercent = (user.xp / user.nextLevelXp) * 100;
    const ozToNextStage = getOzToNextStage(user.totalXP);

    // Track ÖZ changes for milestone notifications
    useEffect(() => {
        if (user.totalXP !== prevOzRef.current) {
            setPreviousOz(prevOzRef.current);
            prevOzRef.current = user.totalXP;
        }
    }, [user.totalXP]);

    // Get unlocked and locked achievements
    const unlockedAchievements = ACHIEVEMENTS.filter(a => user.achievements?.includes(a.id));
    const lockedAchievements = ACHIEVEMENTS.filter(a => !user.achievements?.includes(a.id));

    const stats = {
        storiesCreated: user.storiesCreated || 0,
        gamesCreated: user.gamesCreated || 0,
        level: user.level,
        totalXP: user.totalXP || user.xp,
        dailyStreak: user.dailyStreak || 0
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 pb-32">
            {/* Milestone Notifications */}
            <MilestoneNotification previousOz={previousOz} currentOz={user.totalXP} />

            {/* Cocoon Transformation Display */}
            <UiverseCard className="mb-6">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold mb-2 text-white">Dönüşüm Yolculuğun</h2>
                    <p className="text-neutral-400">Her ÖZ ile kelebeğe yaklaşıyorsun</p>
                </div>

                {/* Cocoon Display */}
                <div style={{ minHeight: '600px', position: 'relative' }}>
                    <CocoonStage totalOz={user.totalXP} />
                </div>

                {/* ÖZ Progress Info */}
                <div className="mt-8 text-center">
                    <div className="inline-flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-primary-500/10 to-purple-500/10 rounded-full border border-primary-500/20">
                        <div>
                            <p className="text-sm text-neutral-400">Toplam ÖZ</p>
                            <p className="text-2xl font-bold text-primary-400">{user.totalXP}</p>
                        </div>
                        {ozToNextStage > 0 && (
                            <>
                                <div className="w-px h-8 bg-neutral-700" />
                                <div>
                                    <p className="text-sm text-neutral-400">Sonraki Aşamaya</p>
                                    <p className="text-xl font-semibold text-neutral-300">{ozToNextStage} ÖZ</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </UiverseCard>

            {/* Stats Card */}
            <UiverseCard className="mb-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <p className="text-sm text-neutral-400 mb-1">Seviye</p>
                        <h2 className="text-4xl font-bold text-white">{user.level}</h2>
                        <p className="text-sm text-primary-400 mt-1 font-semibold">{user.title}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-neutral-400 mb-1">İlerleme</p>
                        <p className="text-2xl font-semibold text-primary-500">
                            {user.xp} / {user.nextLevelXp} ÖZ
                        </p>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="h-3 bg-white/5 rounded-full overflow-hidden mb-6 border border-white/10">
                    <div
                        className="h-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all duration-500 shadow-[0_0_10px_rgba(79,172,254,0.3)]"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>

                {/* Activity Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <div className="text-2xl font-bold mb-1 text-white">{stats.storiesCreated}</div>
                        <div className="text-sm text-neutral-400">Hikaye</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <div className="text-2xl font-bold mb-1 text-white">{stats.gamesCreated}</div>
                        <div className="text-sm text-neutral-400">Oyun</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <div className="text-2xl font-bold mb-1 text-white">{stats.totalXP}</div>
                        <div className="text-sm text-neutral-400">Toplam ÖZ</div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                        <div className="text-2xl font-bold mb-1 text-white">{stats.dailyStreak}</div>
                        <div className="text-sm text-neutral-400">Gün Serisi</div>
                    </div>
                </div>
            </UiverseCard>

            {/* Achievements */}
            <UiverseCard className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                    <Award size={20} className="text-primary-500" />
                    <h3 className="font-semibold text-white">Başarılar</h3>
                    <span className="text-sm text-neutral-400">
                        ({unlockedAchievements.length} / {ACHIEVEMENTS.length})
                    </span>
                </div>

                {/* Unlocked Achievements */}
                {unlockedAchievements.length > 0 && (
                    <div className="mb-6">
                        <p className="text-sm font-medium text-neutral-500 mb-3">Kazanıldı</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {unlockedAchievements.map(achievement => (
                                <div
                                    key={achievement.id}
                                    className="p-4 rounded-xl border border-primary-500/30 bg-primary-500/5 backdrop-blur-sm"
                                >
                                    <div className="text-3xl mb-2">{achievement.icon}</div>
                                    <p className="font-semibold text-sm mb-1 text-white">{achievement.name}</p>
                                    <p className="text-xs text-neutral-400 mb-2 line-clamp-2">{achievement.description}</p>
                                    <p className="text-xs font-medium text-primary-400">+{achievement.xp} ÖZ</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Locked Achievements */}
                {lockedAchievements.length > 0 && (
                    <div>
                        <p className="text-sm font-medium text-neutral-500 mb-3">Kilitli</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {lockedAchievements.map(achievement => {
                                const progress = getAchievementProgress(achievement.id, stats);
                                return (
                                    <div
                                        key={achievement.id}
                                        className="p-4 rounded-xl border border-white/10 bg-white/5 relative overflow-hidden"
                                    >
                                        <div className="absolute inset-y-0 left-0 bg-primary-500 opacity-10" style={{ width: `${progress}%` }} />
                                        <div className="relative">
                                            <div className="text-3xl mb-2 opacity-30 grayscale">{achievement.icon}</div>
                                            <p className="font-semibold text-sm mb-1 flex items-center gap-1 text-neutral-300">
                                                <Lock size={12} />
                                                {achievement.name}
                                            </p>
                                            <p className="text-xs text-neutral-500 mb-2 line-clamp-2">{achievement.description}</p>
                                            <div className="flex items-center justify-between">
                                                <p className="text-xs font-medium text-neutral-500">+{achievement.xp} ÖZ</p>
                                                <p className="text-xs font-medium text-primary-400">{Math.round(progress)}%</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </UiverseCard>

            {/* Saved Stories */}
            <UiverseCard>
                <div className="flex items-center gap-2 mb-6">
                    <TrendingUp size={20} className="text-primary-500" />
                    <h3 className="font-semibold text-white">Hikayelerim</h3>
                    <span className="text-sm text-neutral-400">({savedStories.length})</span>
                </div>

                {savedStories.length === 0 ? (
                    <div className="text-center py-12">
                        <BookOpen size={48} className="mx-auto mb-4 text-neutral-700" />
                        <p className="text-neutral-500 mb-4">Henüz hikaye oluşturmadın</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {savedStories.map(story => (
                            <div
                                key={story.id}
                                className="flex items-start gap-4 p-4 border border-white/10 rounded-xl hover:border-primary-500/30 bg-white/5 transition-all group"
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${story.type === 'story' ? 'bg-primary-500/10 text-primary-400' : 'bg-neutral-800 text-neutral-300'
                                    }`}>
                                    {story.type === 'story' ? <BookOpen size={20} /> : <Gamepad2 size={20} />}
                                </div>
                                <button
                                    onClick={() => setCurrentView({ type: story.type, data: story })}
                                    className="flex-1 text-left"
                                >
                                    <h4 className="font-semibold mb-1 text-white group-hover:text-primary-400 transition-colors">
                                        {story.title}
                                    </h4>
                                    <p className="text-sm text-neutral-400 line-clamp-2 mb-1">
                                        {story.content}
                                    </p>
                                    <p className="text-xs text-neutral-500 uppercase tracking-widest font-bold">
                                        {new Date(story.createdAt).toLocaleDateString('tr-TR')}
                                    </p>
                                </button>
                                <button
                                    onClick={() => deleteStory(story.id)}
                                    className="p-2 text-neutral-600 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </UiverseCard>
        </div>
    );
};

export default ProfileTab;
