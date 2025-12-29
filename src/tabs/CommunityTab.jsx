import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Eye, BookOpen, Gamepad2 } from 'lucide-react';

const CommunityTab = () => {
    const { communityWorks, awardXP } = useApp();
    const [filter, setFilter] = useState('all');

    const filteredWorks = communityWorks.filter(work =>
        filter === 'all' ? true : work.type === filter
    );

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Topluluk</h1>
                <p className="text-neutral-600">Diğer kullanıcıların dönüşüm hikayelerini keşfet</p>
            </div>

            {/* Filter */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {['all', 'story', 'game'].map(type => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${filter === type
                                ? 'bg-primary-600 text-white'
                                : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                            }`}
                    >
                        {type === 'all' ? 'Hepsi' : type === 'story' ? 'Hikayeler' : 'Oyunlar'}
                    </button>
                ))}
            </div>

            {/* Works Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredWorks.map(work => (
                    <div key={work.id} className="bg-white rounded-xl border border-neutral-200 p-6 hover:border-neutral-300 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-600 font-semibold">
                                    {work.author[0]}
                                </div>
                                <div>
                                    <p className="font-medium text-sm">{work.author}</p>
                                    <p className="text-xs text-neutral-500">{work.category}</p>
                                </div>
                            </div>
                            <div className={`px-2 py-1 rounded text-xs font-medium ${work.type === 'story'
                                    ? 'bg-primary-50 text-primary-700'
                                    : 'bg-neutral-100 text-neutral-700'
                                }`}>
                                {work.type === 'story' ? <BookOpen size={12} className="inline mr-1" /> : <Gamepad2 size={12} className="inline mr-1" />}
                                {work.type === 'story' ? 'Hikaye' : 'Oyun'}
                            </div>
                        </div>

                        <h3 className="font-semibold text-lg mb-2">{work.title}</h3>
                        <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{work.preview}</p>

                        <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                            <div className="flex items-center gap-4 text-sm text-neutral-500">
                                <span className="flex items-center gap-1">
                                    <Eye size={16} />
                                    {work.views}
                                </span>
                                <button
                                    onClick={() => awardXP(10, 'Topluluk desteği')}
                                    className="flex items-center gap-1 hover:text-red-500 transition-colors"
                                >
                                    <Heart size={16} />
                                    {work.likes}
                                </button>
                            </div>
                            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
                                Görüntüle →
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommunityTab;
