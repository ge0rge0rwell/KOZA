const INITIAL_STATE = {
    "meta": {
        "access_token": null,
        "activity_api_enabled": true,
        "admin": null,
        "domain": "localhost",
        "limited_federation_mode": false,
        "locale": "en",
        "mascot": null,
        "profile_directory": true,
        "registrations_open": false,
        "repository": "mastodon/mastodon",
        "search_enabled": false,
        "single_user_mode": false,
        "source_url": "https://github.com/mastodon/mastodon",
        "sso_redirect": null,
        "status_page_url": null,
        "streaming_api_base_url": "ws://localhost:4000",
        "title": "Mastodon",
        "landing_page": "trends",
        "trends_enabled": true,
        "version": "4.6.0-alpha.4",
        "terms_of_service_enabled": false,
        "local_live_feed_access": "public",
        "remote_live_feed_access": "public",
        "local_topic_feed_access": "public",
        "remote_topic_feed_access": "public",
        "auto_play_gif": null,
        "display_media": null,
        "reduce_motion": null,
        "use_blurhash": null
    },
    "compose": { "text": "" },
    "accounts": {},
    "media_attachments": { "accept_content_types": [] },
    "settings": {},
    "languages": [["en", "English", "English"], ["tr", "Turkish", "Türkçe"]],
    "features": [],
    "push_subscription": null,
    "role": null
};

export function injectMastodonState(path = '/mastodon') {
    // 1. Inject initial-state script
    if (!document.getElementById('initial-state')) {
        const script = document.createElement('script');
        script.id = 'initial-state';
        script.type = 'application/json';
        script.textContent = JSON.stringify(INITIAL_STATE);
        document.body.appendChild(script);
    }

    // 2. Inject initialPath meta tag
    let meta = document.querySelector('meta[name="initialPath"]');
    if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'initialPath';
        document.head.appendChild(meta);
    }
    meta.content = path;
}

export function cleanupMastodonState() {
    const script = document.getElementById('initial-state');
    if (script) script.remove();

    const meta = document.querySelector('meta[name="initialPath"]');
    if (meta) meta.remove();
}
