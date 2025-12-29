import React, { createContext, useContext, useState, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const AppContext = createContext(null);

const DEFAULT_USER = {
    xp: 850,
    level: 1,
    nextLevelXp: 1000,
    storiesRead: 3,
    gamesPlayed: 1,
    title: "Empati Çırağı",
    badges: [
        { id: 1, name: "İlk Adım", unlocked: true },
        { id: 2, name: "Hikaye Anlatıcısı", unlocked: false },
        { id: 3, name: "Topluluk Yıldızı", unlocked: false },
    ]
};

const COMMUNITY_WORKS = [
    {
        id: 1,
        title: "Sessiz Çığlığın Dönüşümü",
        author: "Elif Demir",
        type: "story",
        category: "Akran Zorbalığı",
        views: "1.2k",
        likes: 450,
        preview: "Okul koridorlarındaki sessiz mücadelenin, güçlü bir dayanışma hikâyesine dönüşümü."
    },
    {
        id: 2,
        title: "Siber Kalkan: İlk Seviye",
        author: "Can Yılmaz",
        type: "game",
        category: "Siber Zorbalık",
        views: "3.5k",
        likes: 890,
        preview: "Dijital dünyadaki kalkanını oluştur ve topluluğu siber zorbalara karşı koru."
    },
    {
        id: 3,
        title: "Mavi Ekranın Ardındaki Güç",
        author: "Umut Can Belgin",
        type: "story",
        category: "Siber Zorbalık",
        views: "980",
        likes: 310,
        preview: "Dışlanmanın, empati yoluyla nasıl iyileştirici bir güce dönüştüğünün günlüğü."
    },
    {
        id: 4,
        title: "Empati Labirenti",
        author: "Selin Yıldız",
        type: "game",
        category: "Duygusal Zeka",
        views: "2.1k",
        likes: 560,
        preview: "Doğru seçimleri yap, labirentten çık ve arkadaşlık bağlarını yeniden inşa et."
    }
];

export const AppProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage('koza-user', DEFAULT_USER);
    const [savedStories, setSavedStories] = useLocalStorage('koza-stories', []);
    const [activeStory, setActiveStory] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentView, setCurrentView] = useState(null);
    const [activeTab, setActiveTab] = useState('create');
    const [notification, setNotification] = useState(null);
    const [analysisResult, setAnalysisResult] = useState(null);

    const awardXP = useCallback((amount, reason) => {
        setUser(prev => {
            const newXP = prev.xp + amount;
            const leveledUp = newXP >= prev.nextLevelXp;

            if (leveledUp) {
                setNotification({
                    type: 'levelup',
                    title: 'Seviye Atladın!',
                    message: `Yeni seviye: ${prev.level + 1}`
                });

                return {
                    ...prev,
                    xp: newXP - prev.nextLevelXp,
                    level: prev.level + 1,
                    nextLevelXp: Math.floor(prev.nextLevelXp * 1.5)
                };
            }

            setNotification({
                type: 'xp',
                title: `+${amount} XP`,
                message: reason
            });

            return { ...prev, xp: newXP };
        });

        setTimeout(() => setNotification(null), 3000);
    }, [setUser]);

    const saveStory = useCallback((story) => {
        const newStory = {
            id: Date.now(),
            ...story,
            createdAt: new Date().toISOString()
        };
        setSavedStories(prev => [newStory, ...prev].slice(0, 50));
    }, [setSavedStories]);

    const deleteStory = useCallback((id) => {
        setSavedStories(prev => prev.filter(s => s.id !== id));
    }, [setSavedStories]);

    const value = {
        user,
        setUser,
        savedStories,
        activeStory,
        setActiveStory,
        isProcessing,
        setIsProcessing,
        currentView,
        setCurrentView,
        activeTab,
        setActiveTab,
        notification,
        analysisResult,
        setAnalysisResult,
        communityWorks: COMMUNITY_WORKS,
        awardXP,
        saveStory,
        deleteStory
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp must be used within AppProvider');
    return context;
};
