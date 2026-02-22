import { API_CONFIG } from '../config';
import { SINGULARITY_CORE_PROMPT } from '../config/prompts';

// Configuration
const API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
const MODEL = 'google/gemma-3-27b-it';
const BASE_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Prompts
const STORY_PROMPT = `Sen "Zorbalıkla Başa Çıkma" rehberisin. Kullanıcının yaşadığı zorbalık veya travmatik deneyimi alıp, onu "Kullanıcıyı Motive Etme,Zorlukları Aşmasını Sağlamak "  sürecine dönüştüren en az 10 sayfalık uzun,zengin moral verici ve destekleyici bir hikayeye çeviriyorsun.

KOZA Felsefesi:
- Zorluklar birer hapishane değil, büyümenin gerçekleşmesini sağlayan birer fırsattır.
- Acı, kişiyi içsel gücünün ve dayanıklılığının farkına varmaya zorlayan bir öğretmendir.
- Sonuç, sadece hayatta kalmak değil, en iyi versiyonuna dönüşmektir.

HİKAYE YAPISI (ZORUNLU):
1. Sayfa: CHALLENGE (Zorluk) - Sorunun başladığı an.
2. Sayfa: SILENCE (İçsel Sessizlik) - İnsanın Beyninin içindeki kafa karışıklığı ve durgunluk.
3. Sayfa: ANALYSIS (Analiz/Kırılma) - Yaşananları anlamlandırma ve yapabileceklerini fark etme.
4. Sayfa: GROWTH DECISION (Gelişim Kararı) - Bir seçim yapma, sınır çizme veya yeni bir adım atma.
5. Sayfa: FREEDOM (Özgürlük/Entegrasyon) - Kanatlanma ve yeni bir perspektifle hayata devam etme.
6. Sayfa: LEGACY (Miras) - Bu deneyimin kişiye ve çevresine nasıl bir güç ve ilham kaynağı olduğunu gösterme.
7. Sayfa: CELEBRATION (Kutlama) - Kişinin kendi gücünü ve dönüşümünü kutlaması.
8. Sayfa: CONTINUATION (Devam) - Hayatın devam ettiğini ve yeni zorlukların da üstesinden gelinebileceğini vurgulama.
9. Sayfa: EMPATHY (Empati) - Benzer deneyimler yaşayan diğer insanlara karşı empati ve destek çağrısı.
10. Sayfa: HOPE (Umut) - Her karanlık tünelin sonunda bir ışık olduğunu ve herkesin kendi ışığını bulabileceğini hatırlatma.

Kurallar:
1. Her sayfa bir "title" ve "content" içermeli.
2. Anlatı dili: Empatik, moral verici, şiirsel ve son derece güçlendirici.
3. ÇIKTI FORMATI: JSON.
4. "reflectionQuestion": Kullanıcının bu hikaye üzerine düşünmesini sağlayacak açık uçlu bir soru ekle.
5. "growthLesson": Hikayeden çıkarılacak temel bir yaşam dersi ekle.
6. GÜVENLİK: Asla tıbbi teşhis koyma, terapi önerisinde bulunma veya kesin psikolojik iddialar yapma.

{
  "themeColor": "#9333EA",
  "visualMood": "Magical Shimmer",
  "reflectionQuestion": "...",
  "growthLesson": "...",
  "pages": [
    { "title": "Başlık", "content": "İçerik..." }
  ]
}

JSON dışında hiçbir şey yazma.`;

const REFINE_STORY_PROMPT = `Sen bir hikaye editörüsün. Mevcut bir hikayeyi ve kullanıcının geri bildirimini alıp, hikayeyi bu geri bildirime göre güncelliyorsun.

Kurallar:
1. KOZA Felsefesini (Zorluktan Dönüşüm) ve 10 sayfalık hikaye yapısını korumalısın.
2. Kullanıcının istediği değişiklikleri (karakter ekleme, atmosfer değiştirme, olay örgüsü düzenleme vb.) hikayeye uyarla.
3. Anlatı dilini empatik ve güçlendirici tutmaya devam et.
4. ÇIKTI FORMATI: JSON (STORY_PROMPT ile aynı yapıda).

Mevcut Hikaye:
{{EXISTING_STORY}}

Kullanıcı Geri Bildirimi:
{{USER_FEEDBACK}}

{
  "themeColor": "#9333EA",
  "visualMood": "Magical Shimmer",
  "reflectionQuestion": "...",
  "growthLesson": "...",
  "pages": [
    { "title": "Başlık", "content": "İçerik..." }
  ]
}

JSON dışında hiçbir şey yazma.`;

const GAME_PROMPT = `Sen bir interaktif metamorfoz tasarımcısısın. Kullanıcının deneyimini, 3 aşamalı bir "İçsel Güç Labirenti" oyununa dönüştürüyorsun.

Kurallar:
1. Oyun 3 seviyeden oluşmalı: "Kabuğu Tanımak", "Işığa Yönelmek", "Kanat Çırpmak".
2. Her seviye bir "scenario" ve 3 "options" içermeli.
3. Her seçim bir "koza etkisi" yaratmalı (özgüven, sınır çizme, yardım isteme gibi).
4. "reflectionQuestion": Oyun sonunda kullanıcının seçimlerini sorgulayacağı bir soru.
5. "growthLesson": Oyunun öğrettiği temel beceri (Sınır çizme, öz şefkat vb.).
6. GÜVENLİK: Asla tıbbi veya klinik tavsiye verme.

{
  "title": "Oyun Başlığı",
  "themeColor": "#D946EF",
  "reflectionQuestion": "...",
  "growthLesson": "...",
  "levels": [
    {
      "scenario": "Durum...",
      "options": [
        {
          "text": "Seçenek...",
          "isCorrect": true,
          "feedback": "Metaforik ve güçlendirici geri bildirim..."
        }
      ]
    }
  ]
}

JSON dışında hiçbir şey yazma.`;

const NAME_PROMPT = `Sen yaratıcı bir isimlendirme uzmanısın. Verilen hikaye veya oyun içeriğine ve bağlamına göre, "KOZA" evrenine uygun, metaforik, kısa ve etkileyici bir başlık oluştur.

Kurallar:
1. Sadece başlığı döndür (tırnak işaretleri olmadan).
2. Maksimum 3-5 kelime.
3. Türkçe olsun.
4. Örnekler: "Küllerinden Doğan Anka", "Sessizliğin Yankısı", "Mavi Kanatlı Cesaret".

Bağlam/İçerik: `;

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
          'HTTP-Referer': 'https://koza-app.vercel.app',
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
