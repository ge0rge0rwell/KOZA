import { useEffect, useRef } from 'react';
import { injectMastodonState, cleanupMastodonState } from '../../utils/mastodonEmbed';
import main from 'mastodon/main';

// Import Mastodon global styles
import 'mastodon/../styles/application.scss';
import 'mastodon/../styles/mastodon/reset.scss';

const MastodonEmbed = () => {
    const containerRef = useRef(null);
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;

        // 1. Inject required DOM state
        injectMastodonState();

        // 2. Small delay to ensure DOM is ready and initial-state is parsed
        const runMastodon = async () => {
            try {
                console.log('KOZA: Initializing Mastodon embedded...');
                // Mastodon's main() looks for #mastodon element
                await main();
                initialized.current = true;
            } catch (error) {
                console.error('KOZA: Failed to initialize Mastodon:', error);
            }
        };

        runMastodon();

        return () => {
            // NOTE: We might not want to fully cleanup if we navigate away and back
            // but for strictness:
            // cleanupMastodonState();
        };
    }, []);

    return (
        <div
            className="mastodon-embed-container"
            style={{ width: '100%', height: '100vh', overflow: 'auto' }}
        >
            <div id="mastodon"></div>
        </div>
    );
};

export default MastodonEmbed;
