'use client';
import React from 'react';
import { useUser } from '../context/UserContext';
import { useUI } from '../context/UIContext';
import { Shield, Zap, Target, Lock, ArrowRight, AlertTriangle } from 'lucide-react';
import GalaxyContainer from '../components/galaxy/GalaxyContainer';
import GalaxyButton from '../components/galaxy/GalaxyButton';
import GalaxyCard from '../components/galaxy/GalaxyCard';
import GalaxyGrid from '../components/galaxy/GalaxyGrid';

const PricingView = ({ onClose }) => {
    const { user } = useUser();
    const { addToast } = useUI();

    const tiers = [
        {
            name: 'Observer',
            price: '0',
            description: 'Basic cognitive structuralization.',
            features: [
                '10 Narrative Structuralizations / mo',
                'Basic Logic Simulation',
                'Standard Clarity Indexing'
            ],
            cta: 'Current Plan',
            variant: 'secondary',
            disabled: true
        },
        {
            name: 'Architect',
            price: '49',
            description: 'Full pattern intelligence for strategic minds.',
            features: [
                'Unlimited Structuralizations',
                'Advanced Pattern Intelligence',
                'Global Entropy Mapping',
                'Data Vector Exports'
            ],
            cta: 'Upgrade to Architect',
            variant: 'primary',
            highlight: true
        },
        {
            name: 'Sovereign',
            price: '499',
            description: 'The peak tier of intellectual self-respect.',
            features: [
                'Priority Cognitive Auditing',
                'Personalized AI Strategy Lead',
                'Deep Systemic Pattern Forensics',
                'Unlimited Everything'
            ],
            cta: 'Claim Sovereignty',
            variant: 'gold'
        }
    ];

    return (
        <GalaxyContainer className="py-20 animate-fade-in">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-black uppercase tracking-tight mb-4">
                    Monetize Your Cognitive Evolution
                </h1>
                <p className="text-neutral-500 max-w-2xl mx-auto border-l-2 border-amber-500 pl-6 text-left">
                    The difference between noise and signal is the system you use to process it. Choose your level of structural authority.
                </p>
            </div>

            <GalaxyGrid cols={3} gap={8}>
                {tiers.map((tier) => (
                    <div key={tier.name} className={`relative flex flex-col h-full ${tier.highlight ? 'scale-105 z-10' : ''}`}>
                        <GalaxyCard
                            className={`flex-1 flex flex-col border-2 ${tier.highlight ? 'border-neutral-900 shadow-2xl' : 'border-neutral-200'}`}
                        >
                            <div className="mb-6">
                                <h3 className="text-xl font-bold uppercase tracking-widest text-neutral-400 mb-1">{tier.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-black text-neutral-900">${tier.price}</span>
                                    <span className="text-neutral-500">/mo</span>
                                </div>
                            </div>

                            <p className="text-neutral-600 mb-8 font-medium">{tier.description}</p>

                            <ul className="space-y-4 mb-10 flex-1">
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex gap-3 text-sm font-semibold text-neutral-700">
                                        <Shield size={16} className="text-neutral-400 shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <GalaxyButton
                                variant={tier.variant}
                                className="w-full justify-center"
                                disabled={tier.disabled}
                                onClick={() => addToast('success', 'Commitment Recorded', `Initiating ${tier.name} upgrade sequence.`)}
                            >
                                {tier.cta}
                            </GalaxyButton>
                        </GalaxyCard>
                    </div>
                ))}
            </GalaxyGrid>

            {/* Loss Aversion Section */}
            <div className="mt-24 p-12 bg-neutral-950 text-white rounded-sm border-l-8 border-amber-500">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 text-amber-500 mb-4 uppercase tracking-widest font-black text-sm">
                            <AlertTriangle size={20} />
                            Critical Awareness
                        </div>
                        <h2 className="text-3xl font-black uppercase mb-6 leading-tight">
                            The Cost of Inaction
                        </h2>
                        <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                            Unprocessed narratives turn into structural debt. By opting for the **Observer** tier, you are choosing to lose **85% of your pattern intelligence** over a 12-month period.
                        </p>
                        <div className="flex gap-8">
                            <div>
                                <div className="text-2xl font-black text-white">2.4k+</div>
                                <div className="text-xs text-neutral-500 uppercase tracking-widest">Nodes Lost/Year</div>
                            </div>
                            <div>
                                <div className="text-2xl font-black text-white">92%</div>
                                <div className="text-xs text-neutral-500 uppercase tracking-widest">Entropy Increase</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-72">
                        <GalaxyButton variant="gold" className="w-full h-16 text-lg" onClick={onClose}>
                            Prevent Data Loss
                        </GalaxyButton>
                    </div>
                </div>
            </div>
        </GalaxyContainer>
    );
};

export default PricingView;
