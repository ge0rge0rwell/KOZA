import React, { useState } from 'react';
import { Heart, Repeat2, MessageCircle, ExternalLink } from 'lucide-react';

/**
 * Renders a single Mastodon status in full KOZA visual style.
 * This is a pure display component — all social actions are handled by the parent.
 */
const PostCard = ({ post, onLike, onBoost, onReply }) => {
    const [liked, setLiked] = useState(false);
    const [boosted, setBoosted] = useState(false);

    const handleLike = () => {
        setLiked(prev => !prev);
        onLike?.(post.id);
    };

    const handleBoost = () => {
        setBoosted(prev => !prev);
        onBoost?.(post.id);
    };

    const timeAgo = (dateStr) => {
        const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
        if (diff < 60) return `${Math.floor(diff)}s`;
        if (diff < 3600) return `${Math.floor(diff / 60)}m`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}s`;
        return new Date(dateStr).toLocaleDateString('tr-TR');
    };

    return (
        <article className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 hover:border-neutral-700 transition-all duration-200 group">
            {/* Author Row */}
            <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                    <img
                        src={post.author.avatarUrl}
                        alt={post.author.displayName}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-neutral-800 group-hover:ring-primary-500/30 transition-all"
                        onError={e => e.target.src = `https://ui-avatars.com/api/?name=${post.author.username}&background=6d28d9&color=fff`}
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-neutral-900" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                        {post.author.displayName}
                    </p>
                    <p className="text-xs text-neutral-500 truncate">@{post.author.username}</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-600">{timeAgo(post.createdAt)}</span>
                    <a
                        href={post.author.mastodonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-700 hover:text-primary-400 transition-colors"
                    >
                        <ExternalLink size={13} />
                    </a>
                </div>
            </div>

            {/* Content */}
            <div
                className="text-neutral-200 text-sm leading-relaxed mb-4 prose prose-invert prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: post.htmlContent }}
            />

            {/* Media */}
            {post.media?.length > 0 && (
                <div className={`grid gap-2 mb-4 ${post.media.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {post.media.map((m, i) => (
                        m.type === 'image' && (
                            <img
                                key={i}
                                src={m.url}
                                alt={m.alt || 'Media attachment'}
                                className="w-full rounded-xl object-cover max-h-64"
                            />
                        )
                    ))}
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-6 pt-3 border-t border-neutral-800/50">
                <button
                    onClick={() => onReply?.(post.id)}
                    className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-blue-400 transition-colors"
                >
                    <MessageCircle size={15} />
                    <span>{post.repliesCount}</span>
                </button>
                <button
                    onClick={handleBoost}
                    className={`flex items-center gap-1.5 text-xs transition-colors ${boosted ? 'text-emerald-400' : 'text-neutral-500 hover:text-emerald-400'}`}
                >
                    <Repeat2 size={15} />
                    <span>{post.boostsCount + (boosted ? 1 : 0)}</span>
                </button>
                <button
                    onClick={handleLike}
                    className={`flex items-center gap-1.5 text-xs transition-colors ${liked ? 'text-rose-400' : 'text-neutral-500 hover:text-rose-400'}`}
                >
                    <Heart size={15} className={liked ? 'fill-current' : ''} />
                    <span>{post.likesCount + (liked ? 1 : 0)}</span>
                </button>
            </div>
        </article>
    );
};

export default PostCard;
