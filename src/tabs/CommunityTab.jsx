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
        <GalaxyContainer className="py-8">
            <GalaxyStack spacing={8}>
                {/* Header */}
                <GalaxyBox className="text-center sm:text-left mb-6">
                    <h1 className="text-4xl font-black mb-2 italic tracking-tighter text-shimmer">
                        Community
                    </h1>
                    <p className="text-neutral-500 font-medium">
                        Explore the transformative journeys of others.
                    </p>
                </GalaxyBox>

                {/* Search */}
                <GalaxyInputGroup>
                    <GalaxyInputLeftElement>
                        <Search size={20} />
                    </GalaxyInputLeftElement>
                    <GalaxyInput
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Hikaye veya oyun ara..."
                        className="pl-10"
                    />
                </GalaxyInputGroup>

                {/* Filter */}
                <GalaxyFlex gap={3} className="overflow-x-auto pb-2 scrollbar-none items-center">
                    <GalaxyTag
                        size="md"
                        variant={filter === 'all' ? 'solid' : 'subtle'}
                        onClick={() => setFilter('all')}
                        className="cursor-pointer hover:opacity-80"
                    >
                        <GalaxyTagLabel>Hepsi</GalaxyTagLabel>
                    </GalaxyTag>

                    <GalaxyTag
                        size="md"
                        variant={filter === 'story' ? 'solid' : 'subtle'}
                        onClick={() => setFilter('story')}
                        className="cursor-pointer hover:opacity-80"
                    >
                        <GalaxyTagLeftIcon as={BookOpen} />
                        <GalaxyTagLabel>Hikayeler</GalaxyTagLabel>
                    </GalaxyTag>

                    <GalaxyTag
                        size="md"
                        variant={filter === 'game' ? 'solid' : 'subtle'}
                        onClick={() => setFilter('game')}
                        className="cursor-pointer hover:opacity-80"
                    >
                        <GalaxyTagLeftIcon as={Gamepad2} />
                        <GalaxyTagLabel>Oyunlar</GalaxyTagLabel>
                    </GalaxyTag>
                </GalaxyFlex>

                {/* Works Grid */}
                {filteredWorks.length === 0 ? (
                    <GalaxyEmptyState
                        icon={BookOpen}
                        title="Sonuç bulunamadı"
                        description="Aradığınız kriterlere uygun bir içerik yok."
                    />
                ) : (
                    <GalaxyGrid templateColumns="repeat(auto-fill, minmax(280px, 1fr))" gap={6}>
                        {filteredWorks.map(work => (
                            <GalaxyCard
                                key={work.id}
                                title={work.title}
                                subtitle={
                                    <GalaxyFlex align="center" gap={2} className="mt-1">
                                        <GalaxyTag size="sm" variant="outline" className="text-[10px] h-5">
                                            <GalaxyTagLabel>{work.category}</GalaxyTagLabel>
                                        </GalaxyTag>
                                    </GalaxyFlex>
                                }
                                emoji={work.type === 'story' ? '📖' : '🎮'}
                            >
                                <GalaxyFlex align="center" gap={3} className="mb-4 -mt-1">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                                        {work.author[0]}
                                    </div>
                                    <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
                                        {work.author}
                                    </span>
                                </GalaxyFlex>

                                <GalaxyText size="sm" className="text-neutral-600 mb-6 line-clamp-3 leading-relaxed opacity-80">
                                    {work.preview}
                                </GalaxyText>

                                <GalaxyFlex align="center" justify="space-between" className="pt-4 border-t border-primary-500/10">
                                    <GalaxyFlex align="center" gap={4} className="text-sm text-neutral-500">
                                        <span className="flex items-center gap-1.5 hover:text-primary-600 transition-colors cursor-pointer group">
                                            <Eye size={16} className="group-hover:text-primary-500 transition-colors" />
                                            {work.views}
                                        </span>
                                        <button
                                            onClick={() => awardXP(10, 'Topluluk desteği')}
                                            className="flex items-center gap-1.5 hover:text-red-500 transition-all hover:scale-110 group"
                                        >
                                            <Heart size={16} className="group-hover:fill-red-500 transition-colors" />
                                            {work.likes}
                                        </button>
                                    </GalaxyFlex>
                                    <GalaxyButton
                                        className="!py-1.5 !px-4 !text-[11px] uppercase tracking-wide"
                                        onClick={() => { }}
                                        variant="secondary"
                                    >
                                        Görüntüle
                                    </GalaxyButton>
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

