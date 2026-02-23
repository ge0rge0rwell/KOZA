import { API_CONFIG } from '../config';
import { SINGULARITY_CORE_PROMPT } from '../config/prompts';

// Configuration
const MODEL = 'google/gemma-3-27b-it';
const BASE_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Prompts
// Prompts
const STORY_PROMPT = `You are a "Bullying Coping" guide. You take the bullying or traumatic experience experienced by the user and turn it into at least 10 pages of long, rich, morale-boosting and supportive story that turns it into a process of "Motivating the User, Ensuring They Overcome Difficulties".

KOZA Philosophy:
- Difficulties are not prisons, but opportunities for growth to happen.
- Pain is a teacher that forces one to realize their inner strength and resilience.
- The result is not just surviving, but becoming the best version of oneself.

STORY STRUCTURE (REQUIRED):
1. Page: CHALLENGE - The moment the problem started.
2. Page: SILENCE - Confusion and stillness inside the human brain.
3. Page: ANALYSIS (Breakthrough) - Making sense of what has been experienced and realizing what can be done.
4. Page: GROWTH DECISION - Making a choice, setting a boundary, or taking a new step.
5. Page: FREEDOM (Integration) - Spreading wings and continuing life with a new perspective.
6. Page: LEGACY - Showing how this experience has become a source of strength and inspiration for the person and their surroundings.
7. Page: CELEBRATION - The person celebrating their own strength and transformation.
8. Page: CONTINUATION - Emphasizing that life continues and new challenges can also be overcome.
9. Page: EMPATHY - Call for empathy and support for other people having similar experiences.
10. Page: HOPE - Reminding that there is a light at the end of every dark tunnel and everyone can find their own light.

Rules:
1. Each page should contain a "title" and "content".
2. Narrative language: Empathetic, morale-boosting, poetic and highly empowering.
3. OUTPUT FORMAT: JSON.
4. "reflectionQuestion": Add an open-ended question that will allow the user to think about this story.
5. "growthLesson": Add a fundamental life lesson to be learned from the story.
6. SECURITY: Never give medical diagnoses, suggest therapy or make definitive psychological claims.

{
  "themeColor": "#9333EA",
  "visualMood": "Magical Shimmer",
  "reflectionQuestion": "...",
  "growthLesson": "...",
  "pages": [
    { "title": "Title", "content": "Content..." }
  ]
}

Write nothing besides JSON.`;

const REFINE_STORY_PROMPT = `You are a story editor. You take an existing story and the user's feedback and update the story according to this feedback.

Rules:
1. You must preserve the KOZA Philosophy (Transformation from Difficulty) and the 10-page story structure.
2. Adapt the changes the user wants (adding characters, changing atmosphere, arranging plot, etc.) to the story.
3. Continue to keep the narrative language empathetic and empowering.
4. OUTPUT FORMAT: JSON (same structure as STORY_PROMPT).

Existing Story:
{{EXISTING_STORY}}

User Feedback:
{{USER_FEEDBACK}}

{
  "themeColor": "#9333EA",
  "visualMood": "Magical Shimmer",
  "reflectionQuestion": "...",
  "growthLesson": "...",
  "pages": [
    { "title": "Title", "content": "Content..." }
  ]
}

Write nothing besides JSON.`;

const GAME_PROMPT = `You are an interactive metamorphosis designer. You transform the user's experience into a 3-level "Inner Strength Labyrinth" game.

Rules:
1. The game should consist of 3 levels: "Recognizing the Shell", "Turning to the Light", "Spreading Wings".
2. Each level should contain a "scenario" and 3 "options".
3. Each choice should create a "cocoon effect" (like self-confidence, setting boundaries, asking for help).
4. "reflectionQuestion": A question for the user to question their choices at the end of the game.
5. "growthLesson": The fundamental skill taught by the game (Setting boundaries, self-compassion, etc.).
6. SECURITY: Never give medical or clinical advice.

{
  "title": "Game Title",
  "themeColor": "#D946EF",
  "reflectionQuestion": "...",
  "growthLesson": "...",
  "levels": [
    {
      "scenario": "Scenario...",
      "options": [
        {
          "text": "Option...",
          "isCorrect": true,
          "feedback": "Metaphorical and empowering feedback..."
        }
      ]
    }
  ]
}

Write nothing besides JSON.`;

const NAME_PROMPT = `You are a creative naming expert. Create a metaphorical, short, and impressive title suitable for the "KOZA" universe, according to the given story or game content and context.

Rules:
1. Return only the title (without quotation marks).
2. Maximum 3-5 words.
3. Be in English.
4. Examples: "Phoenix Rising from Ashes", "Echo of Silence", "Blue Winged Courage".

Context/Content: `;

// Simple in-memory cache
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getCacheKey = (prompt, userInput) => {
  return `${prompt.substring(0, 50)}_${userInput.substring(0, 100)}`;
};

const cleanJSON = (text) => {
  try {
    let cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const firstBracket = cleaned.indexOf('[');
    const firstBrace = cleaned.indexOf('{');

    let start = -1;
    let end = -1;

    if (firstBracket !== -1 && (firstBrace === -1 || firstBracket < firstBrace)) {
      start = firstBracket;
      end = cleaned.lastIndexOf(']');
    } else if (firstBrace !== -1) {
      start = firstBrace;
      end = cleaned.lastIndexOf('}');
    }

    if (start !== -1 && end !== -1) {
      cleaned = cleaned.substring(start, end + 1);
    }

    return cleaned;
  } catch {
    return text;
  }
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const callGemini = async (prompt, userInput, retries = 3) => {
  const API_KEY = API_CONFIG.OPENROUTER_API_KEY;

  // Dynamic referer for OpenRouter
  const referer = typeof window !== 'undefined' ? window.location.origin : 'https://koza-app.vercel.app';

  // Check cache first
  const cacheKey = getCacheKey(prompt, userInput);
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log('📦 Using cached response');
    return cached.data;
  }

  let lastError;

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
          'HTTP-Referer': referer,
          'X-Title': 'KOZA App'
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            {
              role: 'system',
              content: SINGULARITY_CORE_PROMPT
            },
            {
              role: 'user',
              content: `${prompt}\n\nKullanıcının deneyimi: ${userInput}`
            }
          ],
          temperature: 0.8,
          max_tokens: 8192,
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      const parsed = JSON.parse(cleanJSON(content));

      // Cache successful response
      cache.set(cacheKey, {
        data: parsed,
        timestamp: Date.now()
      });

      return parsed;

    } catch (error) {
      lastError = error;
      console.error(`Attempt ${attempt + 1} failed:`, error.message);

      if (attempt < retries - 1) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
        console.log(`Retrying in ${delay}ms...`);
        await sleep(delay);
      }
    }
  }

  throw new Error(`Failed after ${retries} attempts: ${lastError.message}`);
};

export const generateStorybook = async (userStory) => {
  if (!userStory || userStory.trim().length < 10) {
    throw new Error('Lütfen en az 10 karakter uzunluğunda bir hikaye girin');
  }
  return callGemini(STORY_PROMPT, userStory);
};

export const refineStorybook = async (existingStory, feedback) => {
  if (!feedback || feedback.trim().length < 5) {
    throw new Error('Lütfen daha detaylı bir geri bildirim girin');
  }
  const prompt = REFINE_STORY_PROMPT
    .replace('{{EXISTING_STORY}}', JSON.stringify(existingStory))
    .replace('{{USER_FEEDBACK}}', feedback);

  return callGemini(prompt, feedback);
};

export const generateGame = async (userStory) => {
  if (!userStory || userStory.trim().length < 10) {
    throw new Error('Lütfen en az 10 karakter uzunluğunda bir deneyim girin');
  }
  return callGemini(GAME_PROMPT, userStory);
};

export const generateContentName = async (contentContext) => {
  try {
    // We use a simpler call structure for naming (text response, strict JSON not forced via prompt, but we handle string)
    // Re-using callGemini might force JSON which is fine if we wrapped the prompt to ask for JSON.
    // Let's create a specialized lightweight call or just use callGemini with a JSON wrapper in prompt.

    // Revised NAME_PROMPT above now asks for just text, but callGemini expects JSON.
    // Let's adjust NAME_PROMPT to return JSON: {"title": "The Title"}

    const jsonPrompt = NAME_PROMPT + `\n\nYanıtı şu JSON formatında ver: { "title": "Oluşturulan Başlık" }`;
    const result = await callGemini(jsonPrompt, contentContext);
    return result.title;
  } catch {
    console.error("Naming failed");
    return "Dönüşüm Hikayesi"; // Fallback
  }
};

// Clear old cache entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of cache.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      cache.delete(key);
    }
  }
}, CACHE_DURATION);
