import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Eye, BookOpen, Gamepad2, Search, User } from 'lucide-react';

// New Atomic Imports
import PageContainer from '../components/galaxy/GalaxyContainer';
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
    GalaxyInput,
    GalaxyInputGroup,
    GalaxyInputLeftElement
} from '../components/galaxy/GalaxyFormParts';

import {
    GalaxyTag,
    GalaxyTagLabel,
    GalaxyTagLeftIcon,
    GalaxyEmptyState
} from '../components/galaxy/GalaxyDataDisplay';

import GalaxyButton from '../components/galaxy/GalaxyButton'; // Keeping existing button for now
import GalaxyCard from '../components/galaxy/GalaxyCard'; // Keeping existing card for now
import MastodonFeed from '../components/community/MastodonFeed';
import { LayoutGrid, List } from 'lucide-react';

const CommunityTab = () => {
    return (
        <div className="fixed inset-0 top-16 z-50 bg-neutral-900 flex flex-col pt-0 mt-0">
            <iframe
                src="/mastodon"
                className="w-full h-full border-none flex-1"
                title="KOZA Topluluk"
                allow="geolocation; microphone; camera; fullscreen; autoplay; clipboard-read; clipboard-write; web-share"
            />
        </div>
    );
};

export default CommunityTab;

