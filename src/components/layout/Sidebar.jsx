import React, { memo, useCallback, useMemo } from 'react';
import { Plus, BookOpen, Gamepad2, LogOut, Trash2 } from 'lucide-react';
import { useUI } from '../../context/UIContext';
import { useAuth } from '../../context/AuthContext';
import { useStory } from '../../context/StoryContext';
import Logo from '../ui/Logo';

const SidebarItem = memo(({ story, onClick, onDelete }) => (
    <div
        onClick={() => onClick(story)}
        className="group relative w-full text-left p-3 rounded-xl hover:bg-neutral-50 transition-all cursor-pointer border border-transparent hover:border-neutral-100 will-change-transform"
    >
        <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${story.type === 'story' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                {story.type === 'story' ? <BookOpen size={16} /> : <Gamepad2 size={16} />}
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-neutral-900 break-words leading-snug">
                    {story.title || 'İsimsiz Dönüşüm'}
                </h4>
                <p className="text-[10px] font-bold text-neutral-400 mt-0.5 uppercase tracking-widest">
                    {new Date(story.createdAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                </p>
            </div>
        </div>
        <button
            onClick={(e) => onDelete(e, story.id)}
            className="absolute top-2 right-2 p-1.5 text-neutral-400 opacity-0 group-hover:opacity-100 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all z-10"
            title="Sil"
        >
            <Trash2 size={14} />
        </button>
    </div>
));

const Sidebar = () => {
    const { setCurrentView, setActiveTab } = useUI();
    const { signOut } = useAuth();
    const { savedStories, deleteStory } = useStory();

    const handleOpenStory = useCallback((story) => {
        setCurrentView({ type: story.type, data: story });
    }, [setCurrentView]);

    const handleDelete = useCallback((e, id) => {
        e.stopPropagation();
        if (window.confirm('Bu hikayeyi silmek istediğinize emin misiniz?')) {
            deleteStory(id);
        }
    }, [deleteStory]);

    const storyItems = useMemo(() => (
        savedStories.map((story) => (
            <SidebarItem
                key={story.id}
                story={story}
                onClick={handleOpenStory}
                onDelete={handleDelete}
            />
        ))
    ), [savedStories, handleOpenStory, handleDelete]);

    return (
        <aside className="w-64 h-screen bg-white/20 backdrop-blur-3xl border-r border-white/10 flex flex-col flex-shrink-0 animate-fade-in">
            <div className="h-20 flex items-center px-6 border-b border-neutral-100">
                <Logo size="lg" />
            </div>

            <div className="flex-1 overflow-y-auto px-3 pb-4 custom-scrollbar">
                <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-4 px-3 mt-6">
                    Mirasın
                </h3>

                {savedStories.length === 0 ? (
                    <div className="text-center py-12 text-neutral-400 px-4 italic font-serif opacity-50">
                        <p className="text-sm">Henüz bir metamorfoz hikayen yok.</p>
                    </div>
                ) : (
                    <div className="space-y-1">
                        {storyItems}
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-neutral-100 bg-neutral-50/50">
                <button
                    onClick={() => signOut()}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-neutral-500 hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-bold"
                >
                    <LogOut size={20} />
                    <span>Oturumu Kapat</span>
                </button>
            </div>
        </aside>
    );
};

export default memo(Sidebar);
