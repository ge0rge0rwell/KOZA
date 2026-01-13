import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Eye, BookOpen, Gamepad2, Search, User } from 'lucide-react';

// New Atomic Imports
import {
    GalaxyContainer,
    GalaxyStack,
    GalaxyBox,
    GalaxyGrid,
    GalaxyFlex,
    GalaxyAspectRatio
} from '../components/galaxy/GalaxyLayout';

import {
    GalaxyHeading,
    GalaxyText
} from '../components/galaxy/GalaxyTypography';

import {
    GalaxyInput,
    GalaxyInputGroup,
    GalaxyInputLeftElement
} from '../components/galaxy/GalaxyFormParts';

import {
    GalaxyTag,
    GalaxyTagLabel,
    GalaxyTagLeftIcon,
    GalaxyEmptyState
} from '../components/galaxy/GalaxyDataDisplay';

import GalaxyButton from '../components/galaxy/GalaxyButton'; // Keeping existing button for now
import GalaxyCard from '../components/galaxy/GalaxyCard'; // Keeping existing card for now

const CommunityTab = () => {
    const { communityWorks, awardXP } = useApp();
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredWorks = communityWorks.filter(work => {
        const matchesFilter = filter === 'all' || work.type === filter;
        const matchesSearch = searchQuery === '' ||
            work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            work.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
            work.category.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    return (
        <GalaxyContainer className="py-12 px-6">
            <GalaxyStack spacing={12}>
                {/* Header Section */}
                <header className="max-w-3xl animate-slide-up">
                    <GalaxyHeading as="h1" className="text-4xl sm:text-6xl font-black mb-6 tracking-tighter chromatic-shimmer">
                        Topluluk <span className="text-primary-500">Galerisi</span>
                    </GalaxyHeading>
                    <GalaxyText className="text-xl text-neutral-500 leading-relaxed font-medium">
                        Başkalarının dönüşüm yolculuklarına tanıklık et, ilham al ve paylaş.
                    </GalaxyText>
                </header>

                {/* Controls Section */}
                <GalaxyFlex direction="column" className="md:flex-row gap-6 items-center">
                    <div className="flex-1 w-full">
                        <GalaxyInput
                            label="Hikaye veya oyun ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <GalaxyFlex gap={2} className="w-full md:w-auto overflow-x-auto pb-2 scrollbar-none">
                        {['all', 'story', 'game'].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${filter === f
                                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                                    : 'bg-white/40 border border-white/60 text-neutral-500 hover:bg-white/60'
                                    }`}
                            >
                                {f === 'all' ? 'Hepsi' : f === 'story' ? 'Hikayeler' : 'Oyunlar'}
                            </button>
                        ))}
                    </GalaxyFlex>
                </GalaxyFlex>

                {/* Grid */}
                {filteredWorks.length === 0 ? (
                    <GalaxyCard className="py-32 flex flex-center">
                        <GalaxyEmptyState
                            icon={BookOpen}
                            title="İçerik Bulunamadı"
                            description="Aramana uygun harika şeyler henüz burada değil."
                        />
                    </GalaxyCard>
                ) : (
                    <GalaxyGrid templateColumns="repeat(auto-fill, minmax(320px, 1fr))" gap={10}>
                        {filteredWorks.map((work, index) => (
                            <GalaxyCard key={work.id} className="animate-slide-up group" style={{ animationDelay: `${index * 50}ms` }}>
                                <GalaxyFlex direction="column" className="h-full">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="text-4xl">{work.type === 'story' ? '📖' : '🎮'}</div>
                                        <GalaxyTag size="sm" className="bg-primary-500/10 text-primary-600 border-none font-bold uppercase tracking-tighter text-[9px]">
                                            {work.category}
                                        </GalaxyTag>
                                    </div>

                                    <GalaxyHeading as="h3" size="lg" className="mb-2 font-bold group-hover:text-primary-600 transition-colors">
                                        {work.title}
                                    </GalaxyHeading>

                                    <div className="flex items-center gap-2 mb-6">
                                        <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center text-[8px] font-black text-primary-700">
                                            {work.author[0]}
                                        </div>
                                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{work.author}</span>
                                    </div>

                                    <GalaxyText className="text-neutral-500 text-sm leading-relaxed mb-10 flex-1 line-clamp-3 font-medium">
                                        {work.preview}
                                    </GalaxyText>

                                    <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                                        <div className="flex items-center gap-6">
                                            <span className="flex items-center gap-2 text-xs font-bold text-neutral-400">
                                                <Eye size={14} className="text-primary-400" />
                                                {work.views}
                                            </span>
                                            <button
                                                onClick={() => awardXP(10, 'Destek')}
                                                className="flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-red-500 transition-colors group/heart"
                                            >
                                                <Heart size={14} className="group-hover/heart:fill-red-500" />
                                                {work.likes}
                                            </button>
                                        </div>
                                        <GalaxyButton variant="secondary" className="!px-6 !py-2 !text-[10px] !rounded-xl">
                                            Keşfet
                                        </GalaxyButton>
                                    </div>
                                </GalaxyFlex>
                            </GalaxyCard>
                        ))}
                    </GalaxyGrid>
                )}
            </GalaxyStack>
        </GalaxyContainer>
    );
};

export default CommunityTab;

