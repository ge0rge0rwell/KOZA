'use client';
import React, { useState, useEffect } from 'react';
import { subscribeToNotifications } from '../../services/firestoreService';

const NOTIF_ICONS = {
    like: { icon: Heart, color: 'text-rose-400', label: 'Beğendi' },
    reply: { icon: MessageCircle, color: 'text-blue-400', label: 'Cevapladı' },
    badge: { icon: AtSign, color: 'text-primary-400', label: 'Başarım' }
};

const NotificationItem = ({ notif }) => {
    const meta = NOTIF_ICONS[notif.type] || { icon: Bell, color: 'text-neutral-400', label: notif.type };
    const Icon = meta.icon;

    return (
        <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-neutral-800/50 transition-colors">
            <div className={`mt-0.5 ${meta.color} shrink-0`}>
                <Icon size={15} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm text-neutral-300">
                    <span className="font-semibold text-white">{notif.authorName || 'Sistem'}</span>
                    {' '}{meta.label.toLowerCase()}
                </p>
                {notif.content && (
                    <p className="text-xs text-neutral-500 mt-1 truncate">
                        {notif.content}
                    </p>
                )}
            </div>
            <span className="text-xs text-neutral-700 shrink-0">
                {notif.createdAt?.seconds ? new Date(notif.createdAt.seconds * 1000).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) : 'şimdi'}
            </span>
        </div>
    );
};

const NotificationCenter = ({ currentUserId }) => {
    const [notifs, setNotifs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [unread, setUnread] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!currentUserId) return;

        setLoading(true);
        const unsubscribe = subscribeToNotifications(currentUserId, (data) => {
            setNotifs(data);
            setUnread(prev => open ? 0 : data.length > notifs.length ? prev + (data.length - notifs.length) : prev);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [currentUserId, open]);

    return (
        <div className="relative">
            <button
                onClick={() => { setOpen(o => !o); setUnread(0); }}
                className="relative p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            >
                <Bell size={19} />
                {unread > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {unread > 9 ? '9+' : unread}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl z-50 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800">
                        <h3 className="text-sm font-semibold text-white">Bildirimler</h3>
                        <div className="text-neutral-500 hover:text-white transition-colors">
                            {loading ? <Loader2 size={14} className="animate-spin" /> : <Bell size={14} />}
                        </div>
                    </div>
                    <div className="max-h-80 overflow-y-auto divide-y divide-neutral-800/50">
                        {notifs.length === 0 ? (
                            <div className="p-6 text-center">
                                <Bell className="w-8 h-8 text-neutral-700 mx-auto mb-2" />
                                <p className="text-xs text-neutral-600">Yeni bildirim yok</p>
                            </div>
                        ) : (
                            notifs.map(n => <NotificationItem key={n.id} notif={n} />)
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotificationCenter;
