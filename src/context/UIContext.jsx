'use client';
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const UIContext = createContext(null);

export const UIProvider = ({ children }) => {
    const [currentView, setCurrentView] = useState(null);
    const [activeTab, setActiveTab] = useState('create');
    const [notification, setNotification] = useState(null);
    const [toasts, setToasts] = useState([]);
    const [showOnboarding, setShowOnboarding] = useState(false);

    useEffect(() => {
        const complete = localStorage.getItem('koza-onboarding-complete');
        if (!complete) {
            setShowOnboarding(true);
        }
    }, []);



    const addToast = useCallback((type, title, message) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, type, title, message }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    }, []);

    // Helper to trigger notifications
    const triggerNotification = useCallback((type, title, message) => {
        setNotification({ type, title, message });
        setTimeout(() => setNotification(null), 3000);
    }, []);

    const value = {
        currentView,
        setCurrentView,
        activeTab,
        setActiveTab,
        notification,
        setNotification, // Exposed for legacy, but triggerNotification is preferred
        triggerNotification,
        toasts,
        setToasts,
        addToast,
        showOnboarding,
        setShowOnboarding
    };

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
    const context = useContext(UIContext);
    if (!context) throw new Error('useUI must be used within UIProvider');
    return context;
};
