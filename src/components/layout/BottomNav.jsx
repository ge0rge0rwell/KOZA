import React from 'react';
import { useApp } from '../../context/AppContext';
import './BottomNav.css';

const BottomNav = () => {
    const { activeTab, setActiveTab, currentView, addToast } = useApp();

    if (currentView) return null;

    const navItems = [
        {
            id: 'create',
            label: 'Keşfet',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 256 256">
                    <rect width="256" height="256" fill="none"></rect>
                    <path d="M213.3815,109.61945,133.376,36.88436a8,8,0,0,0-10.76339.00036l-79.9945,72.73477A8,8,0,0,0,40,115.53855V208a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V115.53887A8,8,0,0,0,213.3815,109.61945Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
                </svg>
            )
        },
        {
            id: 'community',
            label: 'Topluluk',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 256 256">
                    <rect width="256" height="256" fill="none"></rect>
                    <circle cx="88" cy="108" r="52" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle>
                    <path d="M155.4,57.9A54.5,54.5,0,0,1,168,56a52,52,0,0,1,52,52,54.5,54.5,0,0,1-1.9,12.6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
                    <path d="M16,216a88,88,0,0,1,144,0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
                    <path d="M160,216a88,88,0,0,1,80-48" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
                </svg>
            )
        },
        {
            id: 'learn',
            label: 'Akademi',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 256 256">
                    <rect width="256" height="256" fill="none"></rect>
                    <path d="M45.42853,176.99811A95.95978,95.95978,0,1,1,79.00228,210.5717l.00023-.001L45.84594,220.044a8,8,0,0,1-9.89-9.89l9.47331-33.15657Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
                    <line x1="96" y1="112" x2="160" y2="112" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
                    <line x1="96" y1="144" x2="160" y2="144" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
                </svg>
            )
        },
        {
            id: 'search',
            label: 'Ara',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 256 256">
                    <rect width="256" height="256" fill="none"></rect>
                    <circle cx="116" cy="116" r="84" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle>
                    <line x1="175.39356" y1="175.40039" x2="223.99414" y2="224.00098" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
                </svg>
            )
        },
        {
            id: 'profile',
            label: 'Profil',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 256 256">
                    <rect width="256" height="256" fill="none"></rect>
                    <circle cx="128" cy="96" r="64" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="16"></circle>
                    <path d="M30.989,215.99064a112.03731,112.03731,0,0,1,194.02311.002" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
                </svg>
            )
        }
    ];


    const handleNavClick = (id) => {
        if (id === 'search') {
            addToast('info', 'Keşfet', 'Arama özelliği yakında sizlerle!');
            return;
        }
        setActiveTab(id);
    };

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-4 w-full max-w-lg">
            <div className="uiverse-nav-container">
                <div className="uiverse-nav-glow" style={{
                    left: `${(navItems.findIndex(i => i.id === activeTab) * 20) + 10}%`
                }} />
                <div className="nav-items-wrapper">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                            onClick={() => handleNavClick(item.id)}
                        >
                            <span className="nav-icon">
                                {item.icon}
                            </span>
                            <span className="nav-label">{activeTab === item.id ? item.label : ''}</span>
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default BottomNav;
