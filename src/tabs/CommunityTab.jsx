import React, { useCallback, useEffect, useRef, useState } from 'react';
import PostCard from '../components/community/PostCard';
import PostComposer from '../components/community/PostComposer';
import NotificationCenter from '../components/community/NotificationCenter';
import { Loader2, RefreshCw, Hash } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

const TABS = [
    { id: 'local', label: 'Topluluk' },
    { id: 'koza', label: '#koza' },
    { id: 'metamorfoz', label: '#metamorfoz' }
];

/**
 * KOZA Community Tab — powered entirely by the Mastodon local timeline API.
 * No iframes. No Mastodon UI. Pure KOZA experience.
 */
const CommunityTab = () => {
    const [activeTab, setActiveTab] = useState('local');
    const [posts, setPosts] = useState([]);
    const [cursor, setCursor] = useState(null);
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null);
    const sentinelRef = useRef(null);

    // In production, get from AuthContext
    const currentUserId = null;

    const fetchFeed = useCallback(async (reset = false) => {
        if (loading && !reset) return;
        setLoading(true);
        setError(null);

        const currentCursor = reset ? undefined : cursor;

        try {
            let url;
            if (activeTab === 'local') {
                url = `${API_BASE}/api/community/feed?limit=20${currentCursor ? `&maxId=${currentCursor}` : ''}`;
            } else {
                const tag = activeTab.replace('#', '');
                url = `${API_BASE}/api/community/feed/tag/${tag}?limit=20${currentCursor ? `&maxId=${currentCursor}` : ''}`;
            }

            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const data = await res.json();
            const newPosts = data.posts ?? [];

            setPosts(prev => reset ? newPosts : [...prev, ...newPosts]);
            setCursor(data.nextCursor ?? null);
            setHasMore(newPosts.length >= 20 && !!data.nextCursor);
        } catch (e) {
            setError('Feed yüklenemedi. Sunucu bağlantısı kontrol edin.');
        } finally {
            setLoading(false);
            setInitialLoading(false);
        }
    }, [activeTab, cursor, loading]);

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
        if (!hasMore || loading) return;
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
                <PostComposer currentUserId={currentUserId} onPostSuccess={() => fetchFeed(true)} />

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
