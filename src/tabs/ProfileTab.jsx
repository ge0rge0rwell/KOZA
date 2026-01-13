import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ACHIEVEMENTS, getAchievementProgress } from '../utils/achievements';
import { Trash2, BookOpen, Gamepad2, Lock } from 'lucide-react';
import CocoonStage from '../components/cocoon/CocoonStage';
import MilestoneNotification from '../components/cocoon/MilestoneNotification';
import { getOzToNextStage } from '../utils/cocoon/stageCalculator';

// Legacy Galaxy Components (to be kept until fully replaced if complex logic exists)
import GalaxyCard from '../components/galaxy/GalaxyCard';

// New Atomic Imports
import {
    GalaxyStack,
    GalaxyBox,
    GalaxyGrid,
    GalaxyFlex,
    GalaxyDivider
} from '../components/galaxy/GalaxyLayout';

import {
    GalaxyHeading,
    GalaxyText,
    GalaxyList,
    GalaxyListItem
} from '../components/galaxy/GalaxyTypography';

import {
    GalaxyStatGroup,
    GalaxyStat,
    GalaxyStatLabel,
    GalaxyStatNumber,
    GalaxyStatHelpText,
    GalaxyTag,
    GalaxyEmptyState
} from '../components/galaxy/GalaxyDataDisplay';

import { GalaxyCircularProgress, GalaxyCircularProgressLabel } from '../components/galaxy/GalaxyFeedback';

const ProfileTab = () => {
    const { user, savedStories, deleteStory, setCurrentView } = useApp();
    const [previousOz, setPreviousOz] = useState(user.totalXP);
    const prevOzRef = useRef(user.totalXP);

    const progressPercent = (user.xp / user.nextLevelXp) * 100;
    const ozToNextStage = getOzToNextStage(user.totalXP);

    useEffect(() => {
        if (user.totalXP !== prevOzRef.current) {
            setPreviousOz(prevOzRef.current);
            prevOzRef.current = user.totalXP;
        }
    }, [user.totalXP]);

    const unlockedAchievements = ACHIEVEMENTS.filter(a => user.achievements?.includes(a.id));

    return (
        <GalaxyContainer className="py-12 px-6">
            <MilestoneNotification previousOz={previousOz} currentOz={user.totalXP} />
            <GalaxyStack spacing={12}>

                {/* Profile Header & Cocoon */}
                <header className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 animate-slide-up">
                        <div className="space-y-2">
                            <GalaxyTag className="bg-primary-500 text-white font-black px-4 py-1 border-none">SEVİYE {user.level}</GalaxyTag>
                            <GalaxyHeading as="h1" className="text-5xl sm:text-7xl font-black tracking-tighter italic">
                                {user.displayName || 'Gezgin'}
                            </GalaxyHeading>
                            <GalaxyText className="text-xl text-neutral-400 font-bold uppercase tracking-[0.2em]">{user.title || 'Dönüşüm Yolcusu'}</GalaxyText>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <GalaxyText className="font-black text-neutral-400 text-[10px] tracking-widest uppercase">Gelişim İlerlemesi</GalaxyText>
                                <GalaxyText className="font-black text-primary-500">{Math.round(progressPercent)}%</GalaxyText>
                            </div>
                            <div className="h-2 w-full bg-neutral-200/50 rounded-full overflow-hidden">
                                <div className="h-full bg-primary-500 rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(0,122,255,0.4)]" style={{ width: `${progressPercent}%` }} />
                            </div>
                        </div>

                        <GalaxyGrid templateColumns="repeat(3, 1fr)" gap={4}>
                            <div className="liquid-glass p-6 rounded-[32px] text-center border-none">
                                <GalaxyText className="text-2xl font-black text-primary-500 mb-1">{user.totalXP}</GalaxyText>
                                <GalaxyText className="text-[9px] font-black text-neutral-400 uppercase tracking-tighter">Toplam ÖZ</GalaxyText>
                            </div>
                            <div className="liquid-glass p-6 rounded-[32px] text-center border-none">
                                <GalaxyText className="text-2xl font-black text-neutral-900 mb-1">{savedStories.length}</GalaxyText>
                                <GalaxyText className="text-[9px] font-black text-neutral-400 uppercase tracking-tighter">Eser</GalaxyText>
                            </div>
                            <div className="liquid-glass p-6 rounded-[32px] text-center border-none">
                                <GalaxyText className="text-2xl font-black text-neutral-900 mb-1">{unlockedAchievements.length}</GalaxyText>
                                <GalaxyText className="text-[9px] font-black text-neutral-400 uppercase tracking-tighter">Başarı</GalaxyText>
                            </div>
                        </GalaxyGrid>
                    </div>

                    <div className="relative aspect-square lg:aspect-auto lg:h-[600px] animate-fade-in delay-300">
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/5 to-transparent rounded-[80px]" />
                        <CocoonStage totalOz={user.totalXP} />
                        {ozToNextStage > 0 && (
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-8 py-3 liquid-glass rounded-full border-white/60 text-[10px] font-black text-neutral-500 uppercase tracking-widest whitespace-nowrap shadow-xl">
                                Bir sonraki evre için <span className="text-primary-500">{ozToNextStage} ÖZ</span> kaldı
                            </div>
                        )}
                    </div>
                </header>

                <GalaxyDivider className="opacity-10" />

                {/* Achievements & Creations */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Achievements Sidebar */}
                    <section className="lg:col-span-1 space-y-8">
                        <GalaxyHeading as="h2" size="xl" className="font-bold flex items-center gap-3">
                            <Star className="text-amber-500 fill-amber-500" size={24} />
                            Başarılar
                        </GalaxyHeading>
                        <div className="space-y-4">
                            {unlockedAchievements.slice(0, 5).map((achievement) => (
                                <div key={achievement.id} className="p-4 liquid-glass rounded-[24px] flex items-center gap-4 group hover:border-primary-500/40 transition-all border-none">
                                    <div className="text-3xl transition-transform group-hover:scale-110">{achievement.icon}</div>
                                    <div>
                                        <GalaxyText className="font-bold text-neutral-900 text-sm">{achievement.name}</GalaxyText>
                                        <GalaxyText className="text-[10px] text-neutral-500 italic">+{achievement.xp} ÖZ Kazandın</GalaxyText>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Creations Section */}
                    <section className="lg:col-span-2 space-y-8">
                        <GalaxyHeading as="h2" size="xl" className="font-bold flex items-center gap-3">
                            <BookOpen className="text-primary-500" size={24} />
                            Eserlerin
                        </GalaxyHeading>
                        {savedStories.length === 0 ? (
                            <GalaxyCard className="py-20 text-center border-none bg-neutral-50">
                                <GalaxyEmptyState icon={BookOpen} title="Henüz Eser Yok" description="Dönüştür sayfasından ilk hikayeni oluştur." />
                            </GalaxyCard>
                        ) : (
                            <GalaxyGrid templateColumns="repeat(auto-fill, minmax(280px, 1fr))" gap={6}>
                                {savedStories.map((story) => (
                                    <GalaxyCard key={story.id} className="group hover:!border-primary-500/40 animate-slide-up">
                                        <GalaxyFlex direction="column" className="h-full">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="text-3xl">{story.type === 'story' ? '📖' : '🎮'}</div>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); deleteStory(story.id); }}
                                                    className="p-2 text-neutral-300 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <GalaxyHeading as="h3" size="md" className="mb-4 font-bold group-hover:text-primary-600 transition-colors">
                                                {story.title}
                                            </GalaxyHeading>
                                            <div className="flex-1">
                                                <GalaxyText className="text-[11px] text-neutral-400 font-bold uppercase mb-2">
                                                    {new Date(story.createdAt).toLocaleDateString('tr-TR')}
                                                </GalaxyText>
                                                <GalaxyText className="text-xs text-neutral-500 line-clamp-3 italic mb-8">
                                                    "{story.content}"
                                                </GalaxyText>
                                            </div>
                                            <GalaxyButton
                                                variant="secondary"
                                                className="w-full !rounded-xl !text-[10px]"
                                                onClick={() => setCurrentView({ type: story.type, data: story })}
                                            >
                                                Görüntüle
                                            </GalaxyButton>
                                        </GalaxyFlex>
                                    </GalaxyCard>
                                ))}
                            </GalaxyGrid>
                        )}
                    </section>
                </div>
            </GalaxyStack>
        </GalaxyContainer>
    );
};

export default ProfileTab;

