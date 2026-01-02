import { Brain, Shield, Users, MessageCircle, PlayCircle } from 'lucide-react';
import UiverseCard from '../components/uiverse/UiverseCard';
import UiverseButton from '../components/uiverse/UiverseButton';

const LearnTab = () => {
    const modules = [
        {
            id: 1,
            title: "Duygu Kontrolü",
            subtitle: "Modül 01",
            description: "Öfke, korku ve hayal kırıklığını anlamak ve onları yakıta dönüştürmek.",
            icon: Brain,
            color: "primary"
        },
        {
            id: 2,
            title: "Dijital Güvenlik",
            subtitle: "Modül 02",
            description: "Siber dünyada sınırlarını çizmek ve dijital ayak izini yönetmek.",
            icon: Shield,
            color: "success"
        },
        {
            id: 3,
            title: "Radikal Empati",
            subtitle: "Modül 03",
            description: "Başkalarının gözünden bakabilmek için derin dinleme teknikleri.",
            icon: Users,
            color: "warning"
        },
        {
            id: 4,
            title: "İletişim Sanatı",
            subtitle: "Modül 04",
            description: "Kendini doğru ifade etme ve çatışmaları barışçıl çözme rehberi.",
            icon: MessageCircle,
            color: "error"
        }
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Akademi</h1>
                <p className="text-neutral-600">Dönüşüm yolculuğunda sana rehberlik edecek modüller</p>
            </div>

            {/* Featured */}
            <UiverseCard className="!p-0 overflow-hidden mb-12 border-none">
                <div className="bg-gradient-to-br from-primary-600/20 to-primary-900/40 p-8 text-white relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 blur-[100px] rounded-full" />
                    <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                        <div className="flex-1">
                            <div className="inline-block px-3 py-1 bg-primary-500/20 border border-primary-500/30 rounded-full text-sm font-black uppercase tracking-widest mb-4 text-primary-300">
                                Yeni Başlayanlar İçin
                            </div>
                            <h2 className="text-4xl font-black mb-3 tracking-tight">Duygusal Rehber</h2>
                            <p className="text-neutral-400 mb-8 leading-relaxed max-w-lg">
                                Zorbalık sadece bir olay değil, bir iletişim biçimi hatasıdır. Kendini ve sınırlarını korumayı öğrenmek, dönüşümün ilk adımıdır.
                            </p>
                            <UiverseButton onClick={() => console.log('Start Academy')} className="!px-10">
                                <PlayCircle size={20} />
                                Akademiyi Başlat
                            </UiverseButton>
                        </div>
                        <div className="w-full md:w-80 aspect-video bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center shadow-2xl group cursor-pointer hover:border-primary-500/50 transition-all">
                            <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(79,172,254,0.5)] group-hover:scale-110 transition-transform">
                                <PlayCircle size={32} className="text-white ml-1" />
                            </div>
                        </div>
                    </div>
                </div>
            </UiverseCard>

            {/* Modules */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {modules.map(module => {
                    const Icon = module.icon;
                    return (
                        <UiverseCard key={module.id} className="group">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${module.color === 'primary' ? 'bg-primary-500/10 border-primary-500/20 text-primary-400' :
                                module.color === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                                    module.color === 'warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                                        'bg-red-500/10 border-red-500/20 text-red-400'
                                }`}>
                                <Icon size={28} />
                            </div>
                            <p className="text-xs text-primary-400 font-black uppercase tracking-tighter mb-1">{module.subtitle}</p>
                            <h3 className="font-bold text-lg mb-3 text-white group-hover:text-primary-400 transition-colors">{module.title}</h3>
                            <p className="text-sm text-neutral-400 leading-relaxed">{module.description}</p>
                        </UiverseCard>
                    );
                })}
            </div>
        </div>
    );
};

export default LearnTab;
