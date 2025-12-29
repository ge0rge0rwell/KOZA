import React from 'react';
import { Brain, Shield, Users, MessageCircle, PlayCircle } from 'lucide-react';

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
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-8 text-white mb-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                        <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                            Yeni Başlayanlar İçin
                        </div>
                        <h2 className="text-3xl font-bold mb-3">Duygusal Rehber</h2>
                        <p className="text-primary-100 mb-6">
                            Zorbalık sadece bir olay değil, bir iletişim biçimi hatasıdır. Kendini ve sınırlarını korumayı öğrenmek, dönüşümün ilk adımıdır.
                        </p>
                        <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors flex items-center gap-2">
                            <PlayCircle size={20} />
                            Akademiyi Başlat
                        </button>
                    </div>
                    <div className="w-full md:w-64 aspect-video bg-white/10 rounded-xl flex items-center justify-center">
                        <PlayCircle size={64} className="text-white/50" />
                    </div>
                </div>
            </div>

            {/* Modules */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {modules.map(module => {
                    const Icon = module.icon;
                    return (
                        <div key={module.id} className="bg-white rounded-xl border border-neutral-200 p-6 hover:border-neutral-300 transition-colors">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${module.color === 'primary' ? 'bg-primary-100 text-primary-600' :
                                    module.color === 'success' ? 'bg-green-100 text-green-600' :
                                        module.color === 'warning' ? 'bg-amber-100 text-amber-600' :
                                            'bg-red-100 text-red-600'
                                }`}>
                                <Icon size={24} />
                            </div>
                            <p className="text-xs text-neutral-500 font-medium mb-1">{module.subtitle}</p>
                            <h3 className="font-semibold mb-2">{module.title}</h3>
                            <p className="text-sm text-neutral-600">{module.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default LearnTab;
