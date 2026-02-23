'use client';
import React, { useState } from 'react';
import { Heart, Repeat2, MessageCircle, ExternalLink } from 'lucide-react';

/**
 * Renders a single post in full KOZA visual style. 
 * Supports both plain text and potentially rich content from Firestore.
 */
const PostCard = ({ post, onLike, onReply }) => {
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        setLiked(prev => !prev);
        onLike?.(post.id);
    };

    const timeAgo = (dateValue) => {
        if (!dateValue) return 'şimdi';

        let date;
        if (dateValue?.seconds) {
            date = new Date(dateValue.seconds * 1000);
        } else {
            date = new Date(dateValue);
        }

        const diff = (Date.now() - date.getTime()) / 1000;
        if (diff < 60) return `${Math.floor(diff)}sn`;
        if (diff < 3600) return `${Math.floor(diff / 60)}dk`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}sa`;
        return date.toLocaleDateString('tr-TR');
    };

    // Mapping Firestore doc fields to display names
    const displayName = post.authorName || 'Anonim Gezgin';
    const avatar = post.authorAvatar || `https://ui-avatars.com/api/?name=${displayName}&background=6d28d9&color=fff`;
    const content = post.content || '';

    return (
        <article className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 hover:border-neutral-700 transition-all duration-200 group">
            {/* Author Row */}
            <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                    <img
                        src={avatar}
                        alt={displayName}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-neutral-800 group-hover:ring-primary-500/30 transition-all"
                        onError={e => e.target.src = `https://ui-avatars.com/api/?name=${displayName}&background=6d28d9&color=fff`}
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-neutral-900" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                        {displayName}
                    </p>
                    <p className="text-xs text-neutral-500 truncate">Gezgin</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-600">{timeAgo(post.createdAt)}</span>
                </div>
            </div>

            {/* Content */}
            <div className="text-neutral-200 text-sm leading-relaxed mb-4 whitespace-pre-wrap">
                {content}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6 pt-3 border-t border-neutral-800/50">
                <button
                    onClick={() => onReply?.(post.id)}
                    className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-blue-400 transition-colors"
                >
                    <MessageCircle size={15} />
                    <span>{post.repliesCount || 0}</span>
                </button>
                <button
                    onClick={handleLike}
                    className={`flex items-center gap-1.5 text-xs transition-colors ${liked ? 'text-rose-400' : 'text-neutral-500 hover:text-rose-400'}`}
                >
                    <Heart size={15} className={liked ? 'fill-current' : ''} />
                    <span>{(post.likesCount || 0) + (liked ? 1 : 0)}</span>
                </button>
            </div>
        </article>
    );
};

export default PostCard;
