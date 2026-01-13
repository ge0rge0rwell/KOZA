import React from 'react';
import { useApp } from '../../context/AppContext';
import Onboarding from '../Onboarding';
import GalaxyToastContainer from '../galaxy/GalaxyToastContainer';
import Header from './Header';
import GalaxyBottomNav from '../galaxy/GalaxyBottomNav';
import GalaxyFab from '../galaxy/GalaxyFab';
import { Home, Users, Book, Search, User, Plus } from 'lucide-react';
import MorphCursor from '../optics/MorphCursor';
import LiquidOptics from '../optics/LiquidOptics';
import LiquidHUD from '../optics/LiquidHUD';
import FluidBackground from '../optics/FluidBackground';
import SynapseLayer from '../optics/SynapseLayer';

const MainLayout = ({ children }) => {
    const {
        notification,
        activeTab,
        setActiveTab,
        currentView,
        addToast,
        showOnboarding,
        setShowOnboarding
    } = useApp();

    const [velocity, setVelocity] = useState(0);
    const lastMousePos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const dx = e.clientX - lastMousePos.current.x;
            const dy = e.clientY - lastMousePos.current.y;
            const v = Math.min(Math.hypot(dx, dy) / 20, 5); // Max aberration factor
            setVelocity(v);
            lastMousePos.current = { x: e.clientX, y: e.clientY };

            // Decelerate velocity
            const timer = setTimeout(() => setVelocity(0), 100);
            return () => clearTimeout(timer);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const navItems = [
        { id: 'create', label: 'Keşfet', icon: <Home size={20} />, dot: true },
        { id: 'community', label: 'Topluluk', icon: <Users size={20} /> },
        { id: 'learn', label: 'Akademi', icon: <Book size={20} /> },
        { id: 'search', label: 'Ara', icon: <Search size={20} /> },
        { id: 'profile', label: 'Profil', icon: <User size={20} /> },
    ];

    const handleTabChange = (id) => {
        if (id === 'search') {
            addToast('info', 'Keşfet', 'Arama özelliği yakında sizlerle!');
            return;
        }
        setActiveTab(id);
    };

    return (
        <div
            className="min-h-screen text-neutral-900 pb-20 overflow-x-hidden selection:bg-primary-200 selection:text-primary-900 transition-all duration-300"
            style={{
                filter: `contrast(${100 + velocity}%) saturate(${100 + velocity * 2}%)`,
            }}
        >
            <MorphCursor />
            <LiquidOptics />
            <LiquidHUD />
            <FluidBackground />
            <SynapseLayer />

            {/* Volumetric Parallax Planes */}
            <div className="fixed inset-0 pointer-events-none z-[10001] overflow-hidden">
                {/* Plane 1: Deep Grain */}
                <div className="absolute inset-x-[-10%] inset-y-[-10%] w-[120%] h-[120%] grain-texture opacity-[0.05]"
                    style={{ transform: 'translate3d(calc(var(--mouse-x) * -0.01), calc(var(--mouse-y) * -0.01), 0)' }}
                />

                {/* Atmospheric Singularity Flares */}
                <div className="absolute top-0 right-0 w-[80%] h-full bg-gradient-to-l from-primary-500/5 to-transparent skew-x-[-20%] pointer-events-none animate-pulse-slow"
                    style={{ transform: `translate3d(calc(var(--mouse-x) * 0.05), 0, 0)` }}
                />
                <div className="absolute bottom-0 left-0 w-[50%] h-[60%] bg-blue-400/5 blur-[160px] rounded-full"
                    style={{ transform: `translate3d(calc(var(--mouse-x) * -0.02), calc(var(--mouse-y) * -0.02), 0)` }}
                />

                {/* Plane 2: Light Leak 1 */}
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-400/5 blur-[120px] rounded-full animate-float"
                    style={{ transform: 'translate3d(calc(var(--mouse-x) * 0.02), calc(var(--mouse-y) * 0.02), 0)' }}
                />
                {/* Plane 3: Primary Glow Pulse */}
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary-500/5 blur-[150px] rounded-full animate-pulse"
                    style={{ transform: 'translate3d(calc(var(--mouse-x) * -0.03), calc(var(--mouse-y) * -0.03), 0)' }}
                />
            </div>

            {/* Onboarding Overlay */}
            {showOnboarding && <Onboarding onComplete={() => setShowOnboarding(false)} />}

            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="relative z-10 pt-20 max-w-6xl mx-auto px-4 animate-liquid">
                {children}
            </main>

            {/* Bottom Navigation */}
            {!currentView && (
                <GalaxyBottomNav
                    items={navItems}
                    activeId={activeTab}
                    onTabChange={handleTabChange}
                />
            )}

            {/* Floating Action Button */}
            {!currentView && (
                <GalaxyFab
                    icon={<Plus size={24} />}
                    onClick={() => addToast('info', 'Aksiyon', 'Yeni gönderi özelliği yakında!')}
                    label="Yeni"
                    size="md"
                    className="!bottom-24"
                />
            )}

            {/* Notification */}
            {notification && (
                <div className="fixed bottom-24 right-4 bg-white border border-neutral-200 rounded-lg shadow-lg p-4 max-w-sm animate-slide-up z-50">
                    <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${notification.type === 'levelup' ? 'bg-primary-100 text-primary-600' : 'bg-neutral-100 text-neutral-600'
                            }`}>
                            <Bell size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm">{notification.title}</p>
                            <p className="text-sm text-neutral-600 mt-0.5">{notification.message}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Galaxy Toast Notifications */}
            <GalaxyToastContainer />
        </div>
    );
};

export default MainLayout;
