import React, { memo } from 'react';
import {
    MessageCircle,
    Repeat,
    Heart,
    Bookmark,
    Share2,
    MoreHorizontal
} from 'lucide-react';

const StatusItem = ({ status }) => {
    const {
        author,
        authorHandle,
        avatar,
        content,
        timestamp,
        likes,
        boosts,
        replies,
        type // 'story' or 'game'
    } = status;

    return (
        <div className="flex gap-4 p-4 border-b border-neutral-100 dark:border-white/5 hover:bg-neutral-50/50 dark:hover:bg-white/5 transition-colors cursor-pointer group">
            {/* Avatar Section */}
            <div className="shrink-0">
                <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-black text-xl overflow-hidden">
                    {avatar ? (
                        <img src={avatar} alt={author} className="w-full h-full object-cover" />
                    ) : (
                        <span>{author[0]}</span>
                    )}
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 min-w-0">
                {/* Header */}
                <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                        <span className="font-bold text-neutral-900 dark:text-neutral-50 truncate">
                            {author}
                        </span>
                        <span className="text-neutral-500 dark:text-neutral-400 text-sm truncate">
                            @{authorHandle || author.toLowerCase().replace(/\s/g, '')}
                        </span>
                        <span className="text-neutral-300 dark:text-neutral-600">·</span>
                        <span className="text-neutral-500 dark:text-neutral-400 text-sm whitespace-nowrap">
                            {timestamp || '1s'}
                        </span>
                    </div>
                    <button className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors">
                        <MoreHorizontal size={18} />
                    </button>
                </div>

                {/* Body Text */}
                <div className="text-neutral-800 dark:text-neutral-200 leading-relaxed mb-3 break-words">
                    <p className="whitespace-pre-wrap">{content}</p>
                </div>

                {/* Type Tag (Specific to KOZA) */}
                <div className="mb-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${type === 'story'
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                            : 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
                        }`}>
                        {type === 'story' ? '📖 Hikaye' : '🎮 Oyun'}
                    </span>
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between max-w-md text-neutral-500 dark:text-neutral-400">
                    <button className="flex items-center gap-2 hover:text-blue-500 transition-colors group/action">
                        <div className="p-2 rounded-full group-hover/action:bg-blue-50 dark:group-hover/action:bg-blue-900/20">
                            <MessageCircle size={18} />
                        </div>
                        <span className="text-xs">{replies || 0}</span>
                    </button>

                    <button className="flex items-center gap-2 hover:text-green-500 transition-colors group/action">
                        <div className="p-2 rounded-full group-hover/action:bg-green-50 dark:group-hover/action:bg-green-900/20">
                            <Repeat size={18} />
                        </div>
                        <span className="text-xs">{boosts || 0}</span>
                    </button>

                    <button className="flex items-center gap-2 hover:text-red-500 transition-colors group/action">
                        <div className="p-2 rounded-full group-hover/action:bg-red-50 dark:group-hover/action:bg-red-900/20">
                            <Heart size={18} />
                        </div>
                        <span className="text-xs">{likes || 0}</span>
                    </button>

                    <button className="flex items-center gap-2 hover:text-indigo-500 transition-colors group/action text-neutral-400">
                        <div className="p-2 rounded-full group-hover/action:bg-indigo-50 dark:group-hover/action:bg-indigo-900/20">
                            <Bookmark size={18} />
                        </div>
                    </button>

                    <button className="flex items-center gap-2 hover:text-indigo-500 transition-colors group/action text-neutral-400">
                        <div className="p-2 rounded-full group-hover/action:bg-indigo-50 dark:group-hover/action:bg-indigo-900/20">
                            <Share2 size={18} />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(StatusItem);
