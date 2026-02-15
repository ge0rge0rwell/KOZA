import { Brain, Shield, Users, MessageCircle, PlayCircle } from 'lucide-react';
import GalaxyButton from '../components/galaxy/GalaxyButton';
import GalaxyCard from '../components/galaxy/GalaxyCard';

// Atomic Imports
import GalaxyContainer from '../components/galaxy/GalaxyContainer';
import {
    GalaxyStack,
    GalaxyBox,
    GalaxyGrid,
    GalaxyFlex,
    GalaxyAspectRatio
} from '../components/galaxy/GalaxyLayout';

import {
    GalaxyHeading,
    GalaxyText
} from '../components/galaxy/GalaxyTypography';

import {
    GalaxyTag,
    GalaxyTagLabel
} from '../components/galaxy/GalaxyDataDisplay';

const LearnTab = () => {
    const modules = [
        {
            id: 1,
            title: "Duygu Kontrolü",
            subtitle: "Modül 01",
            description: "Öfke, korku ve hayal kırıklığını anlamak ve onları yakıta dönüştürmek.",
            icon: Brain,
            color: "primary",
            progress: 65
        },
        {
            id: 2,
            title: "Dijital Güvenlik",
            subtitle: "Modül 02",
            description: "Siber dünyada sınırlarını çizmek ve dijital ayak izini yönetmek.",
            icon: Shield,
            color: "success",
            progress: 30
        },
        {
            id: 3,
            title: "Radikal Empati",
            subtitle: "Modül 03",
            description: "Başkalarının gözünden bakabilmek için derin dinleme teknikleri.",
            icon: Users,
            color: "warning",
            progress: 0
        },
        {
            id: 4,
            title: "İletişim Sanatı",
            subtitle: "Modül 04",
            description: "Kendini doğru ifade etme ve çatışmaları barışçıl çözme rehberi.",
            icon: MessageCircle,
            color: "error",
            progress: 10
        }
    ];

    return (
        <GalaxyContainer className="py-12 px-6">
            <GalaxyStack spacing={12}>
                {/* Header Section - Airy & Modern */}
                <header className="max-w-3xl animate-slide-up">
                    <GalaxyHeading as="h1" className="text-4xl sm:text-6xl font-black mb-6 tracking-tighter chromatic-shimmer">
                        Koza <span className="text-primary-500">Akademi</span>
                    </GalaxyHeading>
                    <GalaxyText className="text-xl text-neutral-500 leading-relaxed font-medium">
                        Dönüşüm yolculuğunda sana rehberlik edecek, modern ve etkileşimli modülleri keşfet.
                    </GalaxyText>
                </header>

                {/* Hero / Featured Card */}
                <GalaxyCard className="!p-0 border-none shadow-none group">
                    <div className="relative overflow-hidden rounded-[40px] liquid-glass p-8 sm:p-12">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-500/10 to-transparent -z-10" />
                        <GalaxyFlex direction="column" className="lg:flex-row items-center gap-12">
                            <div className="flex-1 space-y-6">
                                <GalaxyTag size="lg" className="bg-primary-500 text-white border-none px-4 py-1">Öne Çıkan</GalaxyTag>
                                <GalaxyHeading as="h2" size="3xl" className="font-bold">Duygusal Dayanıklılık</GalaxyHeading>
                                <GalaxyText className="text-lg text-neutral-500 max-w-lg leading-relaxed font-medium">
                                    Zorbalıkla başa çıkma ve içsel huzuru bulma konusundaki en kapsamlı rehberimiz.
                                </GalaxyText>
                                <GalaxyButton onClick={() => console.log('Start Academy')} className="!px-12 !py-4 text-lg">
                                    <PlayCircle size={24} className="mr-2" />
                                    Hemen Başla
                                </GalaxyButton>
                            </div>
                            <div className="w-full lg:w-1/3 aspect-video lg:aspect-square bg-white/10 rounded-[32px] border border-white/20 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500 shadow-xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-primary-500/5 group-hover:bg-primary-500/10 transition-colors" />
                                <PlayCircle size={64} className="text-primary-500 drop-shadow-lg" />
                            </div>
                        </GalaxyFlex>
                    </div>
                </GalaxyCard>

                {/* Modules Grid */}
                <section>
                    <GalaxyFlex justify="space-between" align="center" className="mb-8 px-2">
                        <GalaxyHeading as="h2" size="xl">Tüm Modüller</GalaxyHeading>
                        <GalaxyText className="text-neutral-400 font-bold uppercase tracking-widest text-[10px]">Modül Sayısı: {modules.length}</GalaxyText>
                    </GalaxyFlex>
                    <GalaxyGrid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={8}>
                        {modules.map((module, index) => {
                            const Icon = module.icon;
                            return (
                                <GalaxyCard key={module.id} className="group hover:!border-primary-500/40 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                                    <GalaxyFlex direction="column" className="h-full">
                                        <div className="flex justify-between items-start mb-8">
                                            <div className={`p-4 rounded-3xl ${module.color === 'primary' ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20' :
                                                module.color === 'success' ? 'bg-green-500 text-white' :
                                                    module.color === 'warning' ? 'bg-amber-500 text-white' :
                                                        'bg-red-500 text-white'
                                                }`}>
                                                <Icon size={28} />
                                            </div>
                                            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-tighter">{module.subtitle}</span>
                                        </div>

                                        <GalaxyHeading as="h3" size="lg" className="mb-3 font-bold group-hover:text-primary-600 transition-colors">
                                            {module.title}
                                        </GalaxyHeading>
                                        <GalaxyText className="text-neutral-500 text-sm leading-relaxed mb-8 flex-1 font-medium italic">
                                            "{module.description}"
                                        </GalaxyText>

                                        {/* Progress Bar */}
                                        <div className="space-y-2 mb-8">
                                            <div className="flex justify-between text-[10px] font-bold text-neutral-400">
                                                <span>İLERLEME</span>
                                                <span>{module.progress}%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-neutral-200/50 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary-500 rounded-full transition-all duration-1000"
                                                    style={{ width: `${module.progress}%` }}
                                                />
                                            </div>
                                        </div>

                                        <GalaxyButton variant="secondary" className="w-full !rounded-2xl group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-500 transition-all">
                                            İncele
                                        </GalaxyButton>
                                    </GalaxyFlex>
                                </GalaxyCard>
                            );
                        })}
                    </GalaxyGrid>
                </section>
            </GalaxyStack>
        </GalaxyContainer>
    );
};

export default LearnTab;
