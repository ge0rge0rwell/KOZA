import React from 'react';
import MastodonEmbed from '../components/community/MastodonEmbed';

const CommunityTab = () => {
    return (
        <div className="fixed inset-0 top-16 z-50 bg-neutral-900 flex flex-col pt-0 mt-0">
            <MastodonEmbed />
        </div>
    );
};

export default CommunityTab;

