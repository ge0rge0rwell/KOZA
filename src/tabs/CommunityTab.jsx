import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Eye, BookOpen, Gamepad2 } from 'lucide-react';
import GalaxyInput from '../components/galaxy/GalaxyInput';
import GalaxyButton from '../components/galaxy/GalaxyButton';
import GalaxyCard from '../components/galaxy/GalaxyCard';

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
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2 text-neutral-900">Topluluk</h1>
                <p className="text-neutral-500">Diğer kullanıcıların dönüşüm hikayelerini keşfet</p>
            </div>

            {/* Search */}
            <div className="mb-8">
                <GalaxyInput
                    label="Keşfet"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Hikaye veya oyun ara..."
                />
            </div>

            {/* Filter */}
            <div className="flex gap-4 mb-8 overflow-x-auto pb-4 scrollbar-none items-center">
                {['all', 'story', 'game'].map(type => (
                    <GalaxyButton
                        key={type}
                        variant={filter === type ? 'primary' : 'secondary'}
                        onClick={() => setFilter(type)}
                        className="whitespace-nowrap min-w-[120px]"
                    >
                        {type === 'all' ? 'Hepsi' : type === 'story' ? 'Hikayeler' : 'Oyunlar'}
                    </GalaxyButton>
                ))}
            </div>

            {/* Works Grid */}
            {filteredWorks.length === 0 ? (
                <div className="text-center py-12 bg-white/40 rounded-3xl border border-white/60 backdrop-blur-md shadow-sm">
                    <BookOpen size={48} className="mx-auto mb-4 text-neutral-300" />
                    <p className="text-neutral-500">Sonuç bulunamadı</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredWorks.map(work => (
                        <GalaxyCard key={work.id} title={work.title} subtitle={work.category} emoji={work.type === 'story' ? '📖' : '🎮'}>
                            <div className="flex items-center gap-3 mb-4 -mt-2">
                                <div className="w-8 h-8 bg-primary-100/50 rounded-full flex items-center justify-center text-primary-600 font-bold border border-primary-200">
                                    {work.author[0]}
                                </div>
                                <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">{work.author}</span>
                            </div>

                            <p className="text-neutral-500 text-sm mb-6 line-clamp-2 leading-relaxed">{work.preview}</p>

                            <div className="flex items-center justify-between pt-4 border-t border-primary-500/10">
                                <div className="flex items-center gap-4 text-sm text-neutral-500">
                                    <span className="flex items-center gap-1.5 hover:text-primary-600 transition-colors cursor-pointer">
                                        <Eye size={16} />
                                        {work.views}
                                    </span>
                                    <button
                                        onClick={() => awardXP(10, 'Topluluk desteği')}
                                        className="flex items-center gap-1.5 hover:text-red-500 transition-all hover:scale-110"
                                    >
                                        <Heart size={16} />
                                        {work.likes}
                                    </button>
                                </div>
                                <GalaxyButton className="!py-1.5 !px-4 !text-[10px]" onClick={() => { }}>
                                    GÖRÜNTÜLE
                                </GalaxyButton>
                            </div>
                        </GalaxyCard>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommunityTab;
