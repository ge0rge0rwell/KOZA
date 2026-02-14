import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Users, Book, User } from 'lucide-react';
import './BottomMenu.css';

const BottomMenu = () => {
    const { activeTab, setActiveTab, setCurrentView } = useApp();

    const navItems = [
        { id: 'create', label: 'Keşfet', icon: <Home /> },
        { id: 'community', label: 'Topluluk', icon: <Users /> },
        { id: 'learn', label: 'Akademi', icon: <Book /> },
    ];

    const handleTabChange = (id) => {
        setActiveTab(id);
        setCurrentView(null);
    };

    return (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="menu">
                {navItems.map((item) => (
                    <div
                        key={item.id}
                        className={`link ${activeTab === item.id ? 'active' : ''}`}
                        onClick={() => handleTabChange(item.id)}
                    >
                        <span className="link-icon">
                            {item.icon}
                        </span>
                        <span className="link-title">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BottomMenu;
