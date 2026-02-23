import React, { useState, useCallback, memo, useMemo } from 'react';
import { useUser } from '../context/UserContext';
import { useStory } from '../context/StoryContext';
import { useUI } from '../context/UIContext';
import { useAuth } from '../context/AuthContext';
import { X, Trash2, BookOpen, User as UserIcon } from 'lucide-react';

// Memoized Sub-Components
const ProfileHeader = memo(({ authUser, userTitle, imgError, onImgError, onClose }) => (
    <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
            <div className="relative">
                {authUser?.photoURL && !imgError ? (
                    <img
                        src={authUser.photoURL}
                        alt={authUser.displayName || 'User'}
                        className="w-16 h-16 rounded-2xl ring-4 ring-white shadow-xl object-cover will-change-transform"
                        onError={onImgError}
                    />
                ) : (
                    <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600 shadow-xl border-4 border-white">
                        <UserIcon size={32} />
                    </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full" title="Online" />
            </div>
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
                    {authUser?.displayName || 'Traveler'}
                </h1>
                <p className="text-neutral-500 font-medium">{userTitle || 'Empathy Apprentice'}</p>
            </div>
        </div>
        <button
            onClick={onClose}
            className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all shadow-sm border border-white/10 cursor-pointer"
        >
            <X size={20} />
        </button>
    </div>
));

const StatsCard = memo(({ level, xp, nextLevelXp, storiesCreated, savedCount }) => {
    const progressPercent = useMemo(() => (xp / nextLevelXp) * 100, [xp, nextLevelXp]);

    return (
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-8 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="text-sm text-neutral-600 mb-1 font-bold uppercase tracking-widest text-[10px]">Level</div>
                    <div className="text-4xl font-black text-neutral-900">{level}</div>
                </div>
                <div className="text-right">
                    <div className="text-sm text-neutral-600 mb-1 font-bold uppercase tracking-widest text-[10px]">Progress</div>
                    <div className="text-2xl font-extrabold text-primary-600">
                        {xp} / {nextLevelXp} <span className="text-xs">XP</span>
                    </div>
                </div>
            </div>

            <div className="h-3 bg-neutral-200/30 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-1000 ease-out will-change-transform"
                    style={{ width: `${progressPercent}%` }}
                />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
                <div>
                    <div className="text-2xl font-black text-neutral-900 mb-1">{storiesCreated}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Created</div>
                </div>
                <div>
                    <div className="text-2xl font-black text-neutral-900 mb-1">{savedCount}</div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Collection</div>
                </div>
            </div>
        </div>
    );
});

const StoryListItem = memo(({ story, onView, onDelete }) => (
    <div className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/10 p-4 hover:border-white/20 transition-all group hover:bg-white/20">
        <div className="flex items-start justify-between gap-4">
            <button
                onClick={() => onView(story)}
                className="flex-1 text-left cursor-pointer"
            >
                <h3 className="font-bold text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors">
                    {story.title}
                </h3>
                <p className="text-sm text-neutral-600 line-clamp-1 italic font-serif">
                    {story.pages?.[0]?.content || story.content}
                </p>
                <div className="text-[10px] font-bold text-neutral-400 mt-2 uppercase tracking-widest">
                    {new Date(story.createdAt).toLocaleDateString('en-US')}
                </div>
            </button>
            <button
                onClick={() => onDelete(story.id)}
                className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            >
                <Trash2 size={16} />
            </button>
        </div>
    </div>
));

const ProfileView = ({ onClose }) => {
    const { user } = useUser();
    const { savedStories, deleteStory } = useStory();
    const { setCurrentView } = useUI();
    const { user: authUser } = useAuth();
    const [imgError, setImgError] = useState(false);

    const handleImgError = useCallback(() => setImgError(true), []);
    const handleViewStory = useCallback((story) => setCurrentView({ type: 'story', data: story }), [setCurrentView]);
    const handleDeleteStory = useCallback((id) => deleteStory(id), [deleteStory]);

    const renderedStories = useMemo(() => (
        savedStories.map(story => (
            <StoryListItem
                key={story.id}
                story={story}
                onView={handleViewStory}
                onDelete={handleDeleteStory}
            />
        ))
    ), [savedStories, handleViewStory, handleDeleteStory]);

    return (
        <div className="min-h-screen bg-neutral-50/10 backdrop-blur-3xl relative overflow-hidden font-sans">
            <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
                <ProfileHeader
                    authUser={authUser}
                    userTitle={user.title}
                    imgError={imgError}
                    onImgError={handleImgError}
                    onClose={onClose}
                />

                <StatsCard
                    level={user.level}
                    xp={user.xp}
                    nextLevelXp={user.nextLevelXp}
                    storiesCreated={user.storiesCreated}
                    savedCount={savedStories.length}
                />

                <div className="mt-12">
                    <h2 className="text-sm font-black uppercase tracking-[0.2em] text-neutral-400 mb-6 flex items-center gap-2">
                        <BookOpen size={14} />
                        Story Collection
                    </h2>

                    {savedStories.length === 0 ? (
                        <div className="bg-white/20 backdrop-blur-xl rounded-2xl border border-white/10 p-16 text-center shadow-sm">
                            <BookOpen size={48} className="mx-auto mb-6 text-neutral-300 opacity-50" />
                            <p className="text-neutral-500 mb-8 font-medium italic">You haven't performed a story metamorphosis yet.</p>
                            <button
                                onClick={onClose}
                                className="px-10 py-4 bg-primary-600 text-white rounded-full font-bold hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary-600/20 active:scale-95 cursor-pointer"
                            >
                                Start Adventure
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {renderedStories}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default memo(ProfileView);
