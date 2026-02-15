import React from 'react';
import { Plus, BookOpen, Gamepad2, LogOut, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { useStory } from '../../context/StoryContext';
import Logo from '../ui/Logo';

const Sidebar = () => {
    const { setCurrentView, setActiveTab } = useApp();
    const { signOut } = useAuth();
    const { savedStories, deleteStory } = useStory();

    const handleCreateNew = () => {
        setActiveTab('create');
        setCurrentView(null);
    };

    const handleOpenStory = (story) => {
        setCurrentView({ type: story.type, data: story });
    };

    const handleDelete = (e, id) => {
        e.stopPropagation();
        if (window.confirm('Bu hikayeyi silmek istediğinize emin misiniz?')) {
            deleteStory(id);
        }
    };

    return (
        <aside className="w-64 h-screen bg-white/20 backdrop-blur-3xl border-r border-white/10 flex flex-col flex-shrink-0">
            {/* Logo Area */}
            <div className="h-20 flex items-center px-6 border-b border-neutral-100">
                <Logo size="lg" />
            </div>



            {/* History List */}
            <div className="flex-1 overflow-y-auto px-3 pb-4">
                <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3 px-3 mt-2">
                    Geçmiş Dönüşümler
                </h3>

                {savedStories.length === 0 ? (
                    <div className="text-center py-8 text-neutral-400 px-4">
                        <p className="text-sm">Henüz bir hikaye veya oyun oluşturmadın.</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {savedStories.map((story) => (
                            <div
                                key={story.id}
                                onClick={() => handleOpenStory(story)}
                                className="group relative w-full text-left p-3 rounded-xl hover:bg-neutral-50 transition-all cursor-pointer border border-transparent hover:border-neutral-100"
                            >
                                <div className="flex items-start gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${story.type === 'story' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                                        }`}>
                                        {story.type === 'story' ? <BookOpen size={16} /> : <Gamepad2 size={16} />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-sm text-neutral-900 truncate">
                                            {story.title || 'İsimsiz Dönüşüm'}
                                        </h4>
                                        <p className="text-xs text-neutral-500 mt-0.5">
                                            {new Date(story.createdAt).toLocaleDateString('tr-TR', {
                                                day: 'numeric',
                                                month: 'short'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={(e) => handleDelete(e, story.id)}
                                    className="absolute top-2 right-2 p-1.5 text-neutral-400 opacity-0 group-hover:opacity-100 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                    title="Sil"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-neutral-100 bg-neutral-50/50">
                <button
                    onClick={() => signOut()}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-neutral-500 hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-medium"
                >
                    <LogOut size={20} />
                    <span>Çıkış Yap</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
