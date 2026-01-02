import { Heart, Eye, BookOpen, Gamepad2, Search } from 'lucide-react';
import UiverseInput from '../components/uiverse/UiverseInput';
import UiverseButton from '../components/uiverse/UiverseButton';
import UiverseCard from '../components/uiverse/UiverseCard';

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
                <h1 className="text-3xl font-bold mb-2">Topluluk</h1>
                <p className="text-neutral-600">Diğer kullanıcıların dönüşüm hikayelerini keşfet</p>
            </div>

            {/* Search */}
            <div className="mb-8">
                <UiverseInput
                    label="Keşfet"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Hikaye veya oyun ara..."
                />
            </div>

            {/* Filter */}
            <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-none">
                {['all', 'story', 'game'].map(type => (
                    <UiverseButton
                        key={type}
                        variant={filter === type ? 'primary' : 'secondary'}
                        onClick={() => setFilter(type)}
                        className="!py-2 !px-6 whitespace-nowrap"
                    >
                        {type === 'all' ? 'Hepsi' : type === 'story' ? 'Hikayeler' : 'Oyunlar'}
                    </UiverseButton>
                ))}
            </div>

            {/* Works Grid */}
            {filteredWorks.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-neutral-200">
                    <BookOpen size={48} className="mx-auto mb-4 text-neutral-300" />
                    <p className="text-neutral-600">Sonuç bulunamadı</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredWorks.map(work => (
                        <UiverseCard key={work.id} className="group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white font-black border border-white/20">
                                        {work.author[0]}
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-white">{work.author}</p>
                                        <p className="text-xs text-primary-400 font-semibold">{work.category}</p>
                                    </div>
                                </div>
                                <div className={`px-2 py-1 rounded-lg text-xs font-black uppercase tracking-widest ${work.type === 'story'
                                    ? 'bg-primary-500/20 text-primary-400'
                                    : 'bg-white/10 text-neutral-300'
                                    }`}>
                                    {work.type === 'story' ? <BookOpen size={12} className="inline mr-1" /> : <Gamepad2 size={12} className="inline mr-1" />}
                                    {work.type === 'story' ? 'Hikaye' : 'Oyun'}
                                </div>
                            </div>

                            <h3 className="font-bold text-xl mb-2 text-white group-hover:text-primary-400 transition-colors">{work.title}</h3>
                            <p className="text-neutral-400 text-sm mb-6 line-clamp-2 leading-relaxed">{work.preview}</p>

                            <div className="flex items-center justify-between pt-6 border-t border-white/10">
                                <div className="flex items-center gap-4 text-sm text-neutral-500">
                                    <span className="flex items-center gap-1 hover:text-primary-400 transition-colors">
                                        <Eye size={16} />
                                        {work.views}
                                    </span>
                                    <button
                                        onClick={() => awardXP(10, 'Topluluk desteği')}
                                        className="flex items-center gap-1 hover:text-red-400 transition-all hover:scale-110"
                                    >
                                        <Heart size={16} />
                                        {work.likes}
                                    </button>
                                </div>
                                <button className="text-sm font-black text-primary-400 hover:text-primary-300 uppercase tracking-widest flex items-center gap-1 group/btn">
                                    GÖRÜNTÜLE
                                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                                </button>
                            </div>
                        </UiverseCard>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CommunityTab;
