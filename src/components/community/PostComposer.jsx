'use client';
import React, { useState, useRef } from 'react';
import { Send, Image, Globe, Lock, Eye, X, Loader2 } from 'lucide-react';

const VISIBILITY_OPTIONS = [
    { value: 'public', icon: Globe, label: 'Herkese Açık', color: 'text-emerald-400' },
    { value: 'unlisted', icon: Eye, label: 'Listelenmemiş', color: 'text-blue-400' },
    { value: 'private', icon: Lock, label: 'Gizli', color: 'text-amber-400' }
];

const MAX_CHARS = 500;
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

/**
 * Post Composer — sends posts to the KOZA API which enqueues them in BullMQ
 * for publishing to Mastodon.
 */
const PostComposer = ({ currentUserId, onPostSuccess }) => {
    const [content, setContent] = useState('');
    const [visibility, setVisibility] = useState('unlisted');
    const [mediaFiles, setMediaFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const fileRef = useRef(null);

    const remaining = MAX_CHARS - content.length;
    const isOverLimit = remaining < 0;
    const isEmpty = content.trim() === '' && mediaFiles.length === 0;

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files || []);
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4'];
        const valid = files.filter(f => validTypes.includes(f.type));
        setMediaFiles(prev => [...prev, ...valid].slice(0, 4)); // max 4 attachments
    };

    const removeMedia = (idx) => setMediaFiles(prev => prev.filter((_, i) => i !== idx));

    const handleSubmit = async () => {
        if (isEmpty || isOverLimit || isSubmitting) return;
        setIsSubmitting(true);
        setError(null);
        try {
            const res = await fetch(`${API_BASE}/api/mastodon/publish`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-koza-user-id': currentUserId || ''
                },
                body: JSON.stringify({ content: content.trim() })
            });
            if (!res.ok) throw new Error(await res.text());
            setContent('');
            setMediaFiles([]);
            onPostSuccess?.();
        } catch (err) {
            setError('Gönderilemedi. Mastodon hesabınız bağlı mı?');
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedVisibility = VISIBILITY_OPTIONS.find(o => o.value === visibility);

    return (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 mb-6">
            <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder="Ne düşünüyorsun, koza? ✨"
                rows={3}
                className="w-full bg-transparent text-neutral-200 placeholder-neutral-600 text-sm resize-none outline-none leading-relaxed"
                disabled={isSubmitting}
            />

            {/* Media Previews */}
            {mediaFiles.length > 0 && (
                <div className="flex gap-2 mt-3 flex-wrap">
                    {mediaFiles.map((f, i) => (
                        <div key={i} className="relative">
                            <img
                                src={URL.createObjectURL(f)}
                                alt="Preview"
                                className="w-20 h-20 object-cover rounded-xl"
                            />
                            <button
                                onClick={() => removeMedia(i)}
                                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center"
                            >
                                <X size={10} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {error && <p className="text-xs text-red-400 mt-2">{error}</p>}

            {/* Toolbar */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-800">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => fileRef.current?.click()}
                        className="p-2 rounded-lg text-neutral-500 hover:text-primary-400 hover:bg-primary-500/10 transition-colors"
                        title="Medya Ekle"
                        disabled={isSubmitting}
                    >
                        <Image size={17} />
                    </button>
                    <input ref={fileRef} type="file" multiple accept="image/*,video/mp4" className="hidden" onChange={handleFileSelect} />

                    {/* Visibility Selector */}
                    <select
                        value={visibility}
                        onChange={e => setVisibility(e.target.value)}
                        className="bg-neutral-800 border border-neutral-700 text-xs text-neutral-400 rounded-lg px-2 py-1.5 outline-none cursor-pointer"
                    >
                        {VISIBILITY_OPTIONS.map(o => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-3">
                    <span className={`text-xs tabular-nums font-medium ${remaining < 50 ? 'text-amber-400' : isOverLimit ? 'text-red-400' : 'text-neutral-600'}`}>
                        {remaining}
                    </span>
                    <button
                        onClick={handleSubmit}
                        disabled={isEmpty || isOverLimit || isSubmitting}
                        className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-xl transition-colors"
                    >
                        {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                        <span>Paylaş</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostComposer;
