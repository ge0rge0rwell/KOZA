'use client';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { getPublicFeed } from '../services/firestoreService';

const CommunityTab = () => {
    const [activeTab, setActiveTab] = useState('local');
    const [posts, setPosts] = useState([]);
    const [lastDoc, setLastDoc] = useState(null);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);
    const sentinelRef = useRef(null);

    const { user: authUser } = useAuth();
    const { user: profile } = useUser();

    // User data for composer
    const currentUserId = authUser?.uid || null;
    const userName = profile?.displayName || authUser?.displayName || 'Gezgin';
    const avatarUrl = profile?.avatarUrl || authUser?.photoURL || '';

    const fetchFeed = useCallback(async (reset = false) => {
        if (loading && !reset) return;
        setLoading(true);
        setError(null);

        try {
            const feedResult = await getPublicFeed(activeTab, reset ? null : lastDoc);

            setPosts(prev => reset ? feedResult.posts : [...prev, ...feedResult.posts]);
            setLastDoc(feedResult.lastDoc);
            setHasMore(feedResult.posts.length >= 20 && !!feedResult.lastDoc);
        } catch (e) {
            console.error('Feed error:', e);
            setError('Paylaşımlar yüklenemedi. Lütfen internet bağlantınızı kontrol edin.');
        } finally {
            setLoading(false);
            setInitialLoading(false);
        }
    }, [activeTab, lastDoc, loading]);

    // Reset on tab change
    useEffect(() => {
        setInitialLoading(true);
        setPosts([]);
        setCursor(null);
        setHasMore(true);
        fetchFeed(true);
    }, [activeTab]);

    // Infinite scroll using IntersectionObserver
    useEffect(() => {
        if (!hasMore || loading || error) return;
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) fetchFeed(false);
        }, { threshold: 0.1 });
        if (sentinelRef.current) observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [hasMore, loading, fetchFeed]);

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            {/* Tab Bar */}
            <div className="flex items-center justify-between px-4 pt-4 pb-0 shrink-0">
                <div className="flex gap-1 bg-neutral-900 border border-neutral-800 rounded-xl p-1">
                    {TABS.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeTab === tab.id
                                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                                : 'text-neutral-400 hover:text-white'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => fetchFeed(true)}
                        disabled={loading}
                        className="p-2 rounded-xl text-neutral-500 hover:text-white hover:bg-neutral-800 transition-colors disabled:opacity-30"
                        title="Yenile"
                    >
                        <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
                    </button>
                    <NotificationCenter currentUserId={currentUserId} />
                </div>
            </div>

            {/* Feed */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-0">
                <PostComposer
                    currentUserId={currentUserId}
                    userName={userName}
                    avatarUrl={avatarUrl}
                    onPostSuccess={() => fetchFeed(true)}
                />

                {initialLoading && (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <Loader2 className="w-8 h-8 text-primary-500 animate-spin mx-auto mb-3" />
                            <p className="text-sm text-neutral-500">Topluluk yükleniyor...</p>
                        </div>
                    </div>
                )}

                {error && !initialLoading && (
                    <div className="bg-red-950/30 border border-red-900/50 rounded-2xl p-6 text-center">
                        <p className="text-sm text-red-400 mb-3">{error}</p>
                        <button
                            onClick={() => fetchFeed(true)}
                            className="text-xs text-red-300 hover:text-white"
                        >
                            Tekrar Dene
                        </button>
                    </div>
                )}

                {!initialLoading && !error && posts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <Hash className="w-10 h-10 text-neutral-700 mb-4" />
                        <p className="text-neutral-500 text-sm">Henüz gönderi yok.</p>
                        <p className="text-neutral-700 text-xs mt-1">İlk paylaşımı sen yap!</p>
                    </div>
                )}

                <div className="space-y-3">
                    {posts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>

                {/* Infinite Scroll Sentinel */}
                <div ref={sentinelRef} className="h-10 flex items-center justify-center">
                    {loading && !initialLoading && (
                        <Loader2 className="w-5 h-5 text-neutral-600 animate-spin" />
                    )}
                    {!hasMore && posts.length > 0 && (
                        <p className="text-xs text-neutral-700">Tüm gönderiler yüklendi</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommunityTab;
