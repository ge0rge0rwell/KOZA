import { API_CONFIG } from '../config';

const GEMINI_API_KEY = API_CONFIG.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-2.0-flash-exp';

const STORY_PROMPT = `Sen bir hikaye yazarısın. Kullanıcının yaşadığı zorbalık veya zorluk deneyimini alıp, onu güçlendirici 5 sayfalık bir hikayeye dönüştürüyorsun.

Kurallar:
1. Her sayfa bir "title" ve "content" içermeli
2. İçerik empatik, destekleyici ve umut verici olmalı
3. Hikaye kullanıcının güçlenmesiyle bitmeli
4. Her sayfa 2-3 paragraf olmalı
5. JSON formatında döndür:

[
  {
    "title": "Sayfa başlığı",
    "content": "Sayfa içeriği..."
  }
]

JSON dışında hiçbir şey yazma.`;

const GAME_PROMPT = `Sen bir oyun tasarımcısısın. Kullanıcının yaşadığı zorluğu alıp, onu 3 seviyeli interaktif bir oyuna dönüştürüyorsun.

Kurallar:
1. Oyun 3 seviyeden oluşmalı
2. Her seviye bir "scenario" (durum) ve 3 "options" (seçenek) içermeli
3. Her seçenek için "text", "isCorrect" (boolean) ve "feedback" olmalı
4. JSON formatında döndür:

{
  "title": "Oyun başlığı",
  "levels": [
    {
      "scenario": "Durum açıklaması",
      "options": [
        {
          "text": "Seçenek metni",
          "isCorrect": true,
          "feedback": "Geri bildirim"
        }
      ]
    }
  ]
}

JSON dışında hiçbir şey yazma.`;

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
  } catch (e) {
    return text;
  }
};

const callGemini = async (prompt, userInput) => {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          role: 'user',
          parts: [{ text: `${prompt}\n\nKullanıcının deneyimi: ${userInput}` }]
        }],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 8192,
          responseMimeType: 'application/json'
        }
      })
    }
  );

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  const content = data.candidates[0].content.parts[0].text;

  return JSON.parse(cleanJSON(content));
};

export const generateStorybook = async (userStory) => {
  return callGemini(STORY_PROMPT, userStory);
};

export const generateGame = async (userStory) => {
  return callGemini(GAME_PROMPT, userStory);
};
