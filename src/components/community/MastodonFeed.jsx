import React, { memo } from 'react';
import StatusItem from './StatusItem';

const MastodonFeed = ({ works }) => {
    // Map existing works to status format
    const statuses = works.map(work => ({
        id: work.id,
        author: work.author,
        authorHandle: work.author.toLowerCase().replace(/\s/g, ''),
        content: work.preview,
        timestamp: '1sa', // Mock timestamp for now
        likes: work.likes,
        replies: Math.floor(work.views / 10),
        boosts: Math.floor(work.likes / 5),
        type: work.type,
        avatar: null
    }));

    return (
        <div className="max-w-2xl mx-auto bg-white/50 dark:bg-black/20 backdrop-blur-xl border-x border-neutral-100 dark:border-white/5 min-h-screen">
            <div className="sticky top-0 z-20 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-100 dark:border-white/5 p-4">
                <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">Akış</h2>
            </div>

            <div className="flex flex-col">
                {statuses.length === 0 ? (
                    <div className="p-20 text-center text-neutral-500 dark:text-neutral-400 italic">
                        Henüz bir paylaşım yok.
                    </div>
                ) : (
                    statuses.map(status => (
                        <StatusItem key={status.id} status={status} />
                    ))
                )}
            </div>
        </div>
    );
};

export default memo(MastodonFeed);
