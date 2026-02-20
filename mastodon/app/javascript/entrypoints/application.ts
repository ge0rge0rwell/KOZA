import { loadLocale } from '../mastodon/locales/index';
import main from '../mastodon/main';
import { loadPolyfills } from '../mastodon/polyfills/index';

loadPolyfills()
  .then(loadLocale)
  .then(main)
  .catch((e: unknown) => {
    console.error(e);
  });
