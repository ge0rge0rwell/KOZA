import { MastodonTimelineService } from './src/social/mastodon.timeline.service';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '.env') });

async function run() {
  try {
    const instanceUrl = process.env.MASTODON_INSTANCE_URL || 'http://localhost:3000';
    const accessToken = process.env.MASTODON_SERVICE_TOKEN || '';
    const service = new MastodonTimelineService(instanceUrl, accessToken);
    
    console.log(`Fetching local timeline from ${instanceUrl}...`);
    const posts = await service.getLocalTimeline();
    console.log("Success! Posts count:", posts.length);
    if (posts.length > 0) {
      console.log("First post HTML content preview:", posts[0].htmlContent.substring(0, 100));
    }
  } catch (e: any) {
    console.error("Timeline Error:", e);
  } finally {
    process.exit(0);
  }
}
run();
