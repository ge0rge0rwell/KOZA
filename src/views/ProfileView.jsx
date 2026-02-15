import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, BookOpen, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ProfileView = ({ onClose }) => {
    const { user, savedStories, deleteStory, setCurrentView } = useApp();
    const { user: authUser } = useAuth();
    const [imgError, setImgError] = useState(false);

    const progressPercent = (user.xp / user.nextLevelXp) * 100;

    return (
        <div className="min-h-screen bg-white/10 backdrop-blur-3xl relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            {authUser?.photoURL && !imgError ? (
                                <img
                                    src={authUser.photoURL}
                                    alt={authUser.displayName || 'User'}
                                    className="w-16 h-16 rounded-2xl ring-4 ring-white shadow-xl object-cover"
                                    onError={() => setImgError(true)}
                                />
                            ) : (
                                <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center text-primary-600 shadow-xl border-4 border-white">
                                    <UserIcon size={32} />
                                </div>
                            )}
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full" title="Çevrimiçi" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">
                                {authUser?.displayName || 'Gezgin'}
                            </h1>
                            <p className="text-neutral-500 font-medium">{user.title || 'Empati Çırağı'}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all shadow-sm border border-white/10"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Stats Card */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-8 mb-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <div className="text-sm text-neutral-600 mb-1">Seviye</div>
                            <div className="text-4xl font-bold">{user.level}</div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-neutral-600 mb-1">İlerleme</div>
                            <div className="text-2xl font-semibold text-primary-600">
                                {user.xp} / {user.nextLevelXp} XP
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>

                    {/* Activity Stats */}
                    <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
                        <div>
                            <div className="text-2xl font-bold mb-1">{user.storiesCreated}</div>
                            <div className="text-sm text-neutral-600">Hikaye Oluşturuldu</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold mb-1">{savedStories.length}</div>
                            <div className="text-sm text-neutral-600">Kaydedilmiş Hikaye</div>
                        </div>
                    </div>
                </div>

                {/* Saved Stories */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Hikayelerim</h2>

                    {savedStories.length === 0 ? (
                        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-12 text-center">
                            <BookOpen size={48} className="mx-auto mb-4 text-neutral-300" />
                            <p className="text-neutral-600 mb-4">Henüz hikaye oluşturmadın</p>
                            <button
                                onClick={onClose}
                                className="px-6 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
                            >
                                İlk Hikayeni Oluştur
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {savedStories.map(story => (
                                <div
                                    key={story.id}
                                    className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/10 p-4 hover:border-white/20 transition-colors group"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <button
                                            onClick={() => setCurrentView({ type: 'story', data: story })}
                                            className="flex-1 text-left"
                                        >
                                            <h3 className="font-semibold mb-1 group-hover:text-primary-600 transition-colors">
                                                {story.title}
                                            </h3>
                                            <p className="text-sm text-neutral-600 line-clamp-2">
                                                {story.content}
                                            </p>
                                            <div className="text-xs text-neutral-400 mt-2">
                                                {new Date(story.createdAt).toLocaleDateString('tr-TR')}
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => deleteStory(story.id)}
                                            className="p-2 text-neutral-400 hover:text-error hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileView;
