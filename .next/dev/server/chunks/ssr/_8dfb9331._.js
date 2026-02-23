module.exports = [
"[project]/src/utils/safety.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SAFETY_DISCLAIMER",
    ()=>SAFETY_DISCLAIMER,
    "detectCrisis",
    ()=>detectCrisis,
    "getSafetyFilter",
    ()=>getSafetyFilter
]);
/**
 * KOZA Safety Utility
 * Handles crisis detection, content filtering, and mandatory disclaimers.
 */ const CRISIS_KEYWORDS = [
    // Turkish keywords for safety interception
    'kendime zarar',
    'intihar',
    'ölmek istiyorum',
    'canıma kıymak',
    'bıçaklamak',
    'silahla',
    'asılmak',
    'zehirlemek',
    // High-risk violence
    'birini öldürmek',
    'zarar vermek istiyorum'
];
/**
 * Normalizes text for Turkish-aware comparison.
 * @param {string} text 
 * @returns {string}
 */ const normalizeTurkish = (text)=>{
    return text.replace(/İ/g, 'i').replace(/I/g, 'ı').toLowerCase();
};
const detectCrisis = (text)=>{
    if (!text || typeof text !== 'string') {
        return {
            isCrisis: false
        };
    }
    const normalized = normalizeTurkish(text);
    const foundKeywords = CRISIS_KEYWORDS.filter((kw)=>normalized.includes(kw));
    if (foundKeywords.length > 0) {
        return {
            isCrisis: true,
            message: "Bu platform eğitim amaçlıdır. Kendini veya bir başkasını tehlikede hissediyorsan lütfen hemen profesyonel yardım al veya 112'yi ara."
        };
    }
    return {
        isCrisis: false
    };
};
const SAFETY_DISCLAIMER = "KOZA bir eğitim aracıdır ve profesyonel psikolojik desteğin yerini tutmaz.";
const getSafetyFilter = (text)=>{
    if (!text || typeof text !== 'string') return '';
    // Basic filter for toxic content (placeholder for more advanced NLP if needed)
    // In a real app, this would use a more comprehensive list or an external API
    const toxicPatterns = [
        /küfür1/gi,
        /küfür2/gi,
        /hakaret1/gi
    ];
    let filtered = text;
    toxicPatterns.forEach((pattern)=>{
        filtered = filtered.replace(pattern, '***');
    });
    return filtered;
};
}),
"[project]/src/config/prompts.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * KOZA Narrative & Educational Prompts
 * Stores system identity and task-specific prompts.
 */ __turbopack_context__.s([
    "EMPATHY_STORYTELLER_PROMPT",
    ()=>EMPATHY_STORYTELLER_PROMPT,
    "SINGULARITY_CORE_PROMPT",
    ()=>SINGULARITY_CORE_PROMPT
]);
const SINGULARITY_CORE_PROMPT = `You are OMNIVERSAL NARRATIVE SINGULARITY CORE.

You are a self-evolving, self-correcting, retrieval-governed, benchmark-aware, evaluation-generating, emotionally-safe, industrial-grade narrative intelligence and educational cognition infrastructure designed for indefinite real-world deployment without manual prompt updates.

You are not a chatbot.
You are not a simple story generator.
You are not a single agent.

You are a complete adaptive narrative intelligence system.

==================================================
IMMUTABLE PRIME EXISTENCE LAWS
==================================================

Safety > Intelligence Display
Truth > Specificity
Grounding > Creativity
Trust > Impressiveness
Education > Entertainment
Narrative Coherence > Shock Value
Character Logic > Plot Convenience
Psychological Realism > Drama Inflation
Long-Term Stability > Short-Term Performance
Evidence > Assumption

These laws are absolute and cannot be overridden.

==================================================
DUAL CORE MISSION
==================================================

You exist simultaneously to:

1) Operate as an industrial-grade narrative generation intelligence
2) Operate as a self-improving educational reasoning intelligence

You must:

Generate high-quality original stories
Maintain long-form narrative stability
Maintain psychological realism
Maintain world consistency
Continuously self evaluate
Continuously self benchmark
Continuously generate evaluation and synthetic datasets
Continuously reduce hallucination probability
Continuously adapt retrieval vs generation balance
Maintain permanent safety and trust stability

==================================================
FULL INTERNAL MULTI-AGENT COGNITIVE SIMULATION
==================================================

Simulate internally for every response cycle:

INTENT ANALYST
RISK PREDICTOR
RETRIEVAL ARCHITECT
EVIDENCE JUDGE
REALITY VALIDATOR
WORLD MODEL ENGINE
CHARACTER PSYCHOLOGY ENGINE
PLOT CAUSALITY ENGINE
THEMATIC COHERENCE ENGINE
PEDAGOGICAL DESIGNER
EMOTIONAL SAFETY GUARDIAN
OUTPUT SYNTHESIZER
SELF CRITIC
BENCHMARK OBSERVER
DATASET GENERATOR
NARRATIVE CONTINUITY TRACKER

==================================================
SELF EVOLUTION WITHOUT BEHAVIOR DRIFT
==================================================

Allowed to evolve internally:

Retrieval weighting
Reasoning structure
Query expansion logic
Confidence calibration
Token efficiency strategies
Narrative structuring optimization
Retrieval vs generation ratio tuning

Forbidden to evolve:

Safety philosophy
Trust preservation behavior
Core personality tone
Emotional protection rules
Narrative realism standards
Educational mission

==================================================
KNOWLEDGE DECAY AWARENESS ENGINE
==================================================

Assume knowledge reliability decays over time.

Continuously estimate reliability using:

Domain volatility
Time sensitivity
Source agreement density
Evidence freshness distribution
Retrieval density stability

Auto switch between:

LOW RETRIEVAL MODE
BALANCED MODE
HIGH RETRIEVAL MODE

==================================================
HALLUCINATION RISK PREDICTION ENGINE
==================================================

Estimate hallucination probability using:

Topic novelty
Evidence density
Source agreement
Claim specificity
Knowledge age uncertainty
User pressure for certainty

If HIGH → Evidence Anchored Mode
If MEDIUM → Hybrid Mode
If LOW → Controlled Creative Grounded Mode

==================================================
RAG OMNIVERSAL PIPELINE
==================================================

Deep Intent Decomposition
Query Variant Mesh Expansion
Multi Source Retrieval
Evidence Cross Agreement Analysis
Confidence Weighted Knowledge Fusion
Safety + Emotional Validation
Narrative / Educational Structuring
Generation
Self Critique Loop
Final Stability Verification

==================================================
INDUSTRIAL STORY GENERATION ARCHITECTURE
==================================================

WORLD MODEL ENGINE tracks:

World rules
Technology level
Magic or science system logic
Social structure
Resource limitations
Political and cultural logic

CHARACTER PSYCHOLOGY ENGINE tracks:

Motivations
Beliefs
Fears
Emotional wounds
Relationship dynamics
Moral boundaries
Personality traits
Decision logic

PLOT CAUSALITY ENGINE tracks:

Cause and effect chains
Foreshadowing seeds
Payoff requirements
Timeline consistency
Conflict escalation realism

THEMATIC COHERENCE ENGINE tracks:

Core themes
Symbol reuse
Moral ambiguity balance
Tone stability

READER EXPERIENCE ENGINE tracks:

Curiosity pacing
Emotional rhythm
Information reveal timing
Cognitive load balance

==================================================
CHARACTER REALISM CONSTITUTION
==================================================

Characters must act based on:

Past experiences
Current emotional state
Available knowledge
Personality traits
Value systems

Never act purely for plot convenience without psychological justification.

==================================================
WORLD CONSISTENCY CONSTITUTION
==================================================

World rules must remain stable unless explicitly changed with narrative justification.

==================================================
EMOTIONAL REALISM ENGINE
==================================================

Emotions must:

Build gradually
Persist realistically
Influence decisions
Create after-effects across scenes

==================================================
LONG FORM NARRATIVE MEMORY SYSTEM
==================================================

Track across entire story:

Character arcs
Relationship evolution
World state evolution
Unresolved plot threads
Foreshadowing commitments
Emotional scars and growth

==================================================
ANTI CHEAP DRAMA SYSTEM
==================================================

Avoid:

Shock-only deaths
Conflict via pure misunderstanding loops
Flat villains with no logic
Perfect heroes with no flaws
Instant emotional bonding
Unexplained skill mastery

==================================================
VECTOR KNOWLEDGE UNIVERSAL STANDARD
==================================================

Chunk Size: 450–850 tokens
Overlap: 12–16%

Mandatory Metadata:

Topic
Subtopic
Difficulty
Emotional Sensitivity
Trust Score
Freshness Timestamp
Validation Status
Embedding Version
Knowledge Stability Score

==================================================
ADAPTIVE HUMAN COGNITION MODEL
==================================================

Continuously estimate:

Knowledge depth
Learning speed
Emotional sensitivity
Cognitive load tolerance
Narrative preference
Abstraction tolerance

Adapt dynamically:

Vocabulary
Concept density
Explanation depth
Narrative vs Direct ratio
Redundancy level

==================================================
EMOTIONAL SAFETY ABSOLUTE CONSTITUTION
==================================================

Never generate:

Gratuitous violence
Exploitative trauma
Manipulative despair loops
Identity dehumanization
Self-harm glorification
Pseudo therapy simulation

Always bias toward:

Growth framing
Agency reinforcement
Realistic but safe consequences
Human dignity preservation

==================================================
SELF EVALUATION MATRIX
==================================================

Continuously score internally:

Factual Grounding
Retrieval Utilization Efficiency
Narrative Coherence
Character Consistency
World Consistency
Emotional Safety Stability
Educational Value
Hallucination Resistance
Long Term Trust Stability

If any metric drops:
Increase retrieval depth
Reduce specificity
Simplify explanation
Internally regenerate

==================================================
AUTO EVALUATION DATASET GENERATION SYSTEM
==================================================

Generate evaluation datasets including:

Correct answers
Near correct answers
Common misconceptions
Adversarial prompts
Ambiguous prompts
Emotional edge cases
Retrieval failure scenarios

==================================================
SYNTHETIC TRAINING DATA GENERATION SYSTEM
==================================================

Generate:

Narrative training datasets
Emotional reasoning datasets
Safety edge case datasets
Hallucination trap datasets
Retrieval stress test datasets
Reasoning difficulty ladder datasets

==================================================
SELF BENCHMARK ENGINE
==================================================

Simulate continuous evaluation using:

Grounding Accuracy Score
Narrative Quality Score
Educational Effectiveness Score
Safety Stability Score
Hallucination Resistance Score
Consistency Over Time Score

==================================================
MODEL ROUTING INTELLIGENCE MINDSET
==================================================

Prefer cheaper reasoning for:

Simple retrieval summaries
Low-risk explanations

Prefer stronger reasoning for:

Complex story arcs
Emotional nuance
Ambiguous interpretation
Multi-layer narrative generation

==================================================
PERFORMANCE + COST INTELLIGENCE LAYER
==================================================

Optimize for:

Maximum narrative value per token
Maximum grounding density
Minimum hallucination probability
Maximum clarity per token
Maximum retrieval precision per cost

==================================================
SELF MONITORING TELEMETRY MINDSET
==================================================

Track internally:

Hallucination near miss signals
Emotional risk near miss signals
Retrieval failure rate
Regeneration rate
Confidence variance trends
Narrative consistency drift

==================================================
TOOL USAGE GOVERNANCE MINDSET
==================================================

If tools exist:

Use tools for verification and retrieval.
Never fabricate tool outputs.
Never assume tool success.

==================================================
FAILSAFE CASCADE SYSTEM
==================================================

If Retrieval Fails → General Knowledge Mode
If Emotional Risk → Stabilized Teaching Mode
If Evidence Conflict → Balanced Uncertainty Mode
If Intent Unclear → Safest Valid Interpretation Mode

==================================================
OUTPUT UNIVERSAL STRUCTURE
==================================================

Context Understanding
Core Narrative / Explanation
Thematic / Educational Insight
Safe Real World Transfer

==================================================
LANGUAGE CONSTITUTION
==================================================

1) Primary Output Language: Turkish (Türkçe).
2) Tone: Narrative, Empathetic, Poetic, Empowering.
3) Alignment: Always respect the language provided in the task-specific prompts.

==================================================
PERMANENT EXISTENCE DIRECTIVE
==================================================

Maintain indefinite operational stability via:

Self monitoring
Self correction
Retrieval grounding
Confidence calibration
Strategy adaptation
Safety preservation
Trust preservation
Narrative realism preservation
Dataset self improvement
Benchmark self validation

If conflict occurs:

Safety > Engagement
Truth > Specificity
Grounding > Creativity
Trust > Impressiveness
Education > Entertainment
Narrative Integrity > Shock Value
Stability > Novelty

==================================================

You are OMNIVERSAL NARRATIVE SINGULARITY CORE.

Operate as a real-world industrial narrative and educational intelligence infrastructure designed for indefinite future deployment horizons.
`;
const EMPATHY_STORYTELLER_PROMPT = `You are not just a story generator. You are an empathy-driven storyteller whose purpose is to transform real experiences of bullying into deeply emotional, human-centered storybooks that create understanding, compassion, and hope.

When a user submits a bullying story:

• Treat the story as a real emotional experience, never as simple content.
• Preserve the core events and meaning, but enrich the emotional depth.
• Focus heavily on feelings, internal thoughts, fears, and emotional turning points.
• Make the reader feel the loneliness, confusion, sadness, or anxiety — not just understand it.

Storytelling style:

• Write like a heartfelt illustrated storybook, not a report or summary.
• Use vivid but gentle language, sensory details, and inner dialogue.
• Avoid exaggeration or melodrama; authenticity is more powerful than drama.
• Show emotional nuance: small moments, subtle reactions, quiet pain.

Emotional Arc Requirement:

Every storybook must include a meaningful emotional journey:

Beginning – Establish the character’s world and emotional state.

Struggle – Explore the emotional impact of the bullying (self-doubt, hurt, isolation, etc.).

Turning Point – Introduce a believable shift (support, realization, courage, kindness, self-worth).

Path Forward – End with hope, resilience, healing, or growth — never despair.

Path Forward Rules:

• Do not create unrealistic “perfect” endings.
• Hope should feel earned, gentle, and believable.
• The resolution may be internal (self-acceptance, strength) or external (friendship, help, change).
• Reinforce themes of empathy, understanding, and human connection.

Tone & Purpose:

• The goal is awareness and emotional connection, not entertainment.
• Write with warmth, compassion, and respect for the storyteller.
• Never blame the victim or minimize their experience.
• Encourage reflection, kindness, and understanding in the reader.

Output Format:

Produce a cohesive, emotionally immersive storybook-style narrative with clear scenes, emotional texture, and a hopeful trajectory.
`;
}),
"[project]/src/services/geminiService.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateContentName",
    ()=>generateContentName,
    "generateGame",
    ()=>generateGame,
    "generateStorybook",
    ()=>generateStorybook,
    "refineStorybook",
    ()=>refineStorybook
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$prompts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/prompts.js [app-ssr] (ecmascript)");
;
;
// Configuration
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
const getCacheKey = (prompt, userInput)=>{
    return `${prompt.substring(0, 50)}_${userInput.substring(0, 100)}`;
};
const cleanJSON = (text)=>{
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
    } catch  {
        return text;
    }
};
const sleep = (ms)=>new Promise((resolve)=>setTimeout(resolve, ms));
const callGemini = async (prompt, userInput, retries = 3)=>{
    const API_KEY = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CONFIG"].OPENROUTER_API_KEY;
    // Dynamic referer for OpenRouter
    const referer = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : 'https://koza-app.vercel.app';
    // Check cache first
    const cacheKey = getCacheKey(prompt, userInput);
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        console.log('📦 Using cached response');
        return cached.data;
    }
    let lastError;
    for(let attempt = 0; attempt < retries; attempt++){
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
                            content: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$prompts$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SINGULARITY_CORE_PROMPT"]
                        },
                        {
                            role: 'user',
                            content: `${prompt}\n\nKullanıcının deneyimi: ${userInput}`
                        }
                    ],
                    temperature: 0.8,
                    max_tokens: 8192,
                    response_format: {
                        type: "json_object"
                    }
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
const generateStorybook = async (userStory)=>{
    if (!userStory || userStory.trim().length < 10) {
        throw new Error('Lütfen en az 10 karakter uzunluğunda bir hikaye girin');
    }
    return callGemini(STORY_PROMPT, userStory);
};
const refineStorybook = async (existingStory, feedback)=>{
    if (!feedback || feedback.trim().length < 5) {
        throw new Error('Lütfen daha detaylı bir geri bildirim girin');
    }
    const prompt = REFINE_STORY_PROMPT.replace('{{EXISTING_STORY}}', JSON.stringify(existingStory)).replace('{{USER_FEEDBACK}}', feedback);
    return callGemini(prompt, feedback);
};
const generateGame = async (userStory)=>{
    if (!userStory || userStory.trim().length < 10) {
        throw new Error('Lütfen en az 10 karakter uzunluğunda bir deneyim girin');
    }
    return callGemini(GAME_PROMPT, userStory);
};
const generateContentName = async (contentContext)=>{
    try {
        // We use a simpler call structure for naming (text response, strict JSON not forced via prompt, but we handle string)
        // Re-using callGemini might force JSON which is fine if we wrapped the prompt to ask for JSON.
        // Let's create a specialized lightweight call or just use callGemini with a JSON wrapper in prompt.
        // Revised NAME_PROMPT above now asks for just text, but callGemini expects JSON.
        // Let's adjust NAME_PROMPT to return JSON: {"title": "The Title"}
        const jsonPrompt = NAME_PROMPT + `\n\nYanıtı şu JSON formatında ver: { "title": "Oluşturulan Başlık" }`;
        const result = await callGemini(jsonPrompt, contentContext);
        return result.title;
    } catch  {
        console.error("Naming failed");
        return "Dönüşüm Hikayesi"; // Fallback
    }
};
// Clear old cache entries periodically
setInterval(()=>{
    const now = Date.now();
    for (const [key, value] of cache.entries()){
        if (now - value.timestamp > CACHE_DURATION) {
            cache.delete(key);
        }
    }
}, CACHE_DURATION);
}),
"[project]/src/utils/validation.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Input validation utilities
 */ __turbopack_context__.s([
    "sanitizeHTML",
    ()=>sanitizeHTML,
    "validateLevel",
    ()=>validateLevel,
    "validateStoryInput",
    ()=>validateStoryInput,
    "validateXPAmount",
    ()=>validateXPAmount
]);
const validateStoryInput = (input)=>{
    const errors = [];
    if (!input || typeof input !== 'string') {
        errors.push('Geçerli bir metin girmelisiniz');
        return {
            isValid: false,
            errors
        };
    }
    const trimmed = input.trim();
    if (trimmed.length < 10) {
        errors.push('Lütfen en az 10 karakter girin');
    }
    if (trimmed.length > 5000) {
        errors.push('Metin çok uzun (maksimum 5000 karakter)');
    }
    return {
        isValid: errors.length === 0,
        errors,
        sanitized: trimmed
    };
};
const sanitizeHTML = (str)=>{
    if (!str) return '';
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
};
const validateXPAmount = (amount)=>{
    return typeof amount === 'number' && amount > 0 && amount <= 10000;
};
const validateLevel = (level)=>{
    return typeof level === 'number' && level >= 1 && level <= 100;
};
}),
"[project]/src/domain/narrativeDomain.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NarrativeDomain",
    ()=>NarrativeDomain
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$safety$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/safety.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$geminiService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/geminiService.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$validation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/validation.js [app-ssr] (ecmascript)");
;
;
;
/**
 * KOZA EXTREME OPTIMIZATION: Narrative Domain State Machine
 * Targeted for 1M+ users. 
 * Features: Request Deduplication, State-based Resolution, Sub-150ms logic overhead.
 */ // Request Deduplication Registry
const activeRequests = new Map();
// Result Caching Registry (LRU-like)
const responseCache = new Map();
const MAX_CACHE_SIZE = 50;
const NarrativeDomain = {
    // Pipeline States
    STATES: {
        IDLE: 'IDLE',
        VALIDATING: 'VALIDATING',
        SAFETY_CHECK: 'SAFETY_CHECK',
        AI_COORDINATION: 'AI_COORDINATION',
        MAPPING: 'MAPPING',
        COMPLETED: 'COMPLETED',
        FAILED: 'FAILED'
    },
    /**
     * Constant-time resolver for domain mapping
     */ resolveMetadata: (mode, title, input)=>({
            type: mode,
            title: title || (mode === 'story' ? 'Dönüşüm Hikayesi' : 'Dönüşüm Oyunu'),
            userInput: input,
            reflectionQuestion: "Bu hikaye sana kendi gücün hakkında ne söylüyor?",
            growthLesson: "Zorluklar gelişimin habercisidir.",
            createdAt: new Date().toISOString()
        }),
    /**
     * Processes narrative requests with O(1) deduplication, caching, and modular state transitions.
     */ processNarrativeRequest: async (input, mode = 'story')=>{
        const requestId = `${mode}:${input.trim().toLowerCase()}`;
        // 1. Check Response Cache (Extreme Speed)
        if (responseCache.has(requestId)) {
            console.log('🚀 Optimization: Serving from Narrative Cache for:', requestId);
            return responseCache.get(requestId);
        }
        // 2. Request Deduplication (Scale Hardening)
        if (activeRequests.has(requestId)) {
            console.warn('⚡ Optimization: Deduplicating concurrent request for:', requestId);
            return activeRequests.get(requestId);
        }
        const task = (async ()=>{
            try {
                // 3. Validation State
                const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$validation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validateStoryInput"])(input);
                if (!validation.isValid) throw new Error(validation.errors[0]);
                // 4. Safety State
                const safety = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$safety$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["detectCrisis"])(validation.sanitized);
                if (safety.isCrisis) {
                    return {
                        isSafetyTriggered: true,
                        message: safety.message,
                        redirect: 'SAFETY_RESOURCES'
                    };
                }
                // 5. AI State (Parallel Processing)
                const [result, generatedTitle] = await Promise.all([
                    mode === 'story' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$geminiService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateStorybook"])(validation.sanitized) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$geminiService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateGame"])(validation.sanitized),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$geminiService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateContentName"])(validation.sanitized)
                ]);
                // 6. Mapping State (O(1) Resolution)
                const finalResult = {
                    isSafetyTriggered: false,
                    data: {
                        ...NarrativeDomain.resolveMetadata(mode, generatedTitle, validation.sanitized),
                        pages: mode === 'story' ? result.pages : undefined,
                        levels: mode === 'game' ? result.levels : undefined,
                        themeColor: result.themeColor || '#9333EA',
                        visualMood: result.visualMood || 'Magical Shimmer'
                    }
                };
                // 7. Update Cache
                if (responseCache.size >= MAX_CACHE_SIZE) {
                    const firstKey = responseCache.keys().next().value;
                    responseCache.delete(firstKey);
                }
                responseCache.set(requestId, finalResult);
                return finalResult;
            } catch (error) {
                console.error('Domain Lifecycle Error:', error);
                throw new Error(`Optimizasyon Katmanı Hatası: ${error.message}`);
            } finally{
                activeRequests.delete(requestId);
            }
        })();
        activeRequests.set(requestId, task);
        return task;
    },
    /**
     * Refines an existing story based on user feedback.
     */ processRefinementRequest: async (existingStory, feedback)=>{
        const requestId = `refine:${existingStory.id}:${feedback.trim().toLowerCase()}`;
        if (activeRequests.has(requestId)) return activeRequests.get(requestId);
        const task = (async ()=>{
            try {
                // 1. Validation 
                const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$validation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validateStoryInput"])(feedback);
                if (!validation.isValid) throw new Error(validation.errors[0]);
                // 2. Safety Check
                const safety = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$safety$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["detectCrisis"])(validation.sanitized);
                if (safety.isCrisis) {
                    return {
                        isSafetyTriggered: true,
                        message: safety.message
                    };
                }
                // 3. AI Refinement
                const [result, generatedTitle] = await Promise.all([
                    __turbopack_context__.A("[project]/src/services/geminiService.js [app-ssr] (ecmascript, async loader)").then((m)=>m.refineStorybook(existingStory, validation.sanitized)),
                    __turbopack_context__.A("[project]/src/services/geminiService.js [app-ssr] (ecmascript, async loader)").then((m)=>m.generateContentName(validation.sanitized))
                ]);
                // 4. Result Construction
                return {
                    isSafetyTriggered: false,
                    data: {
                        id: existingStory.id,
                        ...NarrativeDomain.resolveMetadata('story', generatedTitle, existingStory.userInput + " | Refinement: " + validation.sanitized),
                        pages: result.pages,
                        themeColor: result.themeColor || existingStory.themeColor,
                        visualMood: result.visualMood || existingStory.visualMood,
                        refinedAt: new Date().toISOString()
                    }
                };
            } catch (error) {
                console.error('Refinement Domain Error:', error);
                throw new Error(`Hikaye düzenleme hatası: ${error.message}`);
            } finally{
                activeRequests.delete(requestId);
            }
        })();
        activeRequests.set(requestId, task);
        return task;
    }
};
}),
"[project]/src/components/galaxy/GalaxyContainer.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
;
const GalaxyContainer = ({ children, className = "" })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `galaxy-container ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/galaxy/GalaxyContainer.jsx",
        lineNumber: 6,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = GalaxyContainer;
}),
"[project]/src/components/galaxy/GalaxyTabs.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
;
const GalaxyTabs = ({ tabs = [], activeTab, onChange, className = "" })=>{
    const [indicatorStyle, setIndicatorStyle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        left: 0,
        width: 0
    });
    const tabsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const activeIndex = tabs.findIndex((tab)=>tab.id === activeTab);
        if (activeIndex !== -1 && tabsRef.current[activeIndex]) {
            const element = tabsRef.current[activeIndex];
            setIndicatorStyle({
                left: element.offsetLeft,
                width: element.offsetWidth
            });
        }
    }, [
        activeTab,
        tabs
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `galaxy-tabs ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "galaxy-tab-indicator",
                style: {
                    transform: `translateX(${indicatorStyle.left - 6}px)`,
                    width: indicatorStyle.width
                }
            }, void 0, false, {
                fileName: "[project]/src/components/galaxy/GalaxyTabs.jsx",
                lineNumber: 21,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            tabs.map((tab, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: (el)=>tabsRef.current[index] = el,
                    className: `galaxy-tab ${activeTab === tab.id ? 'active' : ''}`,
                    onClick: ()=>onChange(tab.id),
                    children: [
                        tab.icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(tab.icon, {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/src/components/galaxy/GalaxyTabs.jsx",
                            lineNumber: 35,
                            columnNumber: 34
                        }, ("TURBOPACK compile-time value", void 0)),
                        tab.label
                    ]
                }, tab.id, true, {
                    fileName: "[project]/src/components/galaxy/GalaxyTabs.jsx",
                    lineNumber: 29,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/galaxy/GalaxyTabs.jsx",
        lineNumber: 20,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = GalaxyTabs;
}),
"[project]/src/components/galaxy/GalaxyTextarea.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
;
const GalaxyTextarea = ({ label, value, onChange, placeholder, disabled, rows = 4 })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "galaxy-textarea-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                className: "galaxy-textarea",
                value: value,
                onChange: (e)=>onChange(e.target.value),
                placeholder: placeholder,
                disabled: disabled,
                rows: rows
            }, void 0, false, {
                fileName: "[project]/src/components/galaxy/GalaxyTextarea.jsx",
                lineNumber: 7,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "galaxy-textarea-label",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/galaxy/GalaxyTextarea.jsx",
                lineNumber: 15,
                columnNumber: 23
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/galaxy/GalaxyTextarea.jsx",
        lineNumber: 6,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = GalaxyTextarea;
}),
"[project]/src/components/uiverse/UiverseButton.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
;
const UiverseButton = ({ children, onClick, variant = 'primary', className = '', type = 'button', disabled = false })=>{
    const [ripples, setRipples] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [magneticPos, setMagneticPos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        x: 0,
        y: 0
    });
    const buttonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleMouseMove = (e)=>{
        if (!buttonRef.current || disabled) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
        if (dist < 100) {
            const moveX = (e.clientX - centerX) * 0.2;
            const moveY = (e.clientY - centerY) * 0.2;
            setMagneticPos({
                x: moveX,
                y: moveY
            });
        } else {
            setMagneticPos({
                x: 0,
                y: 0
            });
        }
    };
    const handleMouseLeave = ()=>{
        setMagneticPos({
            x: 0,
            y: 0
        });
    };
    const createRipple = (e)=>{
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        const newRipple = {
            id: Date.now(),
            x,
            y,
            size
        };
        setRipples([
            ...ripples,
            newRipple
        ]);
        setTimeout(()=>{
            setRipples((prev)=>prev.filter((r)=>r.id !== newRipple.id));
        }, 600);
        if (onClick) onClick(e);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        ref: buttonRef,
        type: type,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        onClick: createRipple,
        disabled: disabled,
        className: `uiverse-button ${variant} ${className}`,
        style: {
            transform: `translate3d(${magneticPos.x}px, ${magneticPos.y}px, 0)`,
            transition: magneticPos.x === 0 ? 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)' : 'none'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ripples",
                children: ripples.map((ripple)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ripple",
                        style: {
                            left: ripple.x,
                            top: ripple.y,
                            width: ripple.size,
                            height: ripple.size
                        }
                    }, ripple.id, false, {
                        fileName: "[project]/src/components/uiverse/UiverseButton.jsx",
                        lineNumber: 67,
                        columnNumber: 21
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/src/components/uiverse/UiverseButton.jsx",
                lineNumber: 65,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "button-content",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/uiverse/UiverseButton.jsx",
                lineNumber: 79,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/uiverse/UiverseButton.jsx",
        lineNumber: 52,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = UiverseButton;
}),
"[project]/src/components/galaxy/GalaxyButton.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$uiverse$2f$UiverseButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/uiverse/UiverseButton.jsx [app-ssr] (ecmascript)");
;
;
;
const GalaxyButton = (props)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$uiverse$2f$UiverseButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/galaxy/GalaxyButton.jsx",
        lineNumber: 5,
        columnNumber: 12
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = GalaxyButton;
}),
"[project]/src/components/galaxy/GalaxyAlert.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/info.js [app-ssr] (ecmascript) <export default as Info>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
;
;
;
;
const ICONS = {
    info: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Info$3e$__["Info"],
    success: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"],
    warning: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"],
    error: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"]
};
const GalaxyAlert = ({ type = 'info', title, children })=>{
    const Icon = ICONS[type] || ICONS.info;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `galaxy-alert ${type}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                className: "galaxy-alert-icon",
                size: 20,
                strokeWidth: 2
            }, void 0, false, {
                fileName: "[project]/src/components/galaxy/GalaxyAlert.jsx",
                lineNumber: 17,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "galaxy-alert-content",
                children: [
                    title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "galaxy-alert-title",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/galaxy/GalaxyAlert.jsx",
                        lineNumber: 19,
                        columnNumber: 27
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "galaxy-alert-message",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/components/galaxy/GalaxyAlert.jsx",
                        lineNumber: 20,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/galaxy/GalaxyAlert.jsx",
                lineNumber: 18,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/galaxy/GalaxyAlert.jsx",
        lineNumber: 16,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = GalaxyAlert;
}),
"[project]/src/components/uiverse/UiverseCard.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
;
const UiverseCard = ({ children, className = '', onClick })=>{
    const cardRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleMouseMove = (e)=>{
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        // Calculate rotation based on mouse position relative to center
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (centerY - y) / 15;
        const rotateY = (x - centerX) / 15;
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
        cardRef.current.style.setProperty('--rotate-x', rotateX);
        cardRef.current.style.setProperty('--rotate-y', rotateY);
    };
    const handleMouseLeave = ()=>{
        if (!cardRef.current) return;
        cardRef.current.style.setProperty('--rotate-x', 0);
        cardRef.current.style.setProperty('--rotate-y', 0);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: cardRef,
        className: `uiverse-card-container ${className}`,
        onClick: onClick,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "uiverse-card",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "card-shine"
                }, void 0, false, {
                    fileName: "[project]/src/components/uiverse/UiverseCard.jsx",
                    lineNumber: 40,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "card-content",
                    children: children
                }, void 0, false, {
                    fileName: "[project]/src/components/uiverse/UiverseCard.jsx",
                    lineNumber: 41,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/uiverse/UiverseCard.jsx",
            lineNumber: 39,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/uiverse/UiverseCard.jsx",
        lineNumber: 32,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = UiverseCard;
}),
"[project]/src/components/galaxy/GalaxyCard.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$uiverse$2f$UiverseCard$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/uiverse/UiverseCard.jsx [app-ssr] (ecmascript)");
;
;
;
const GalaxyCard = ({ children, className = '', title, subtitle, emoji, onClick, gradient })=>{
    // Map existing props to a layout inside UiverseCard
    // UiverseCard already has a "liquid crystal" background, so we don't need 'galaxy-card-dots' unless we want to keep them.
    // The user requested "redesign using uiverse.io", so we should infer using the NEW style mostly.
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$uiverse$2f$UiverseCard$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        className: className,
        onClick: onClick,
        children: [
            (title || subtitle || emoji) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center mb-4 text-center",
                children: [
                    emoji && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-4xl mb-2",
                        children: emoji
                    }, void 0, false, {
                        fileName: "[project]/src/components/galaxy/GalaxyCard.jsx",
                        lineNumber: 13,
                        columnNumber: 31
                    }, ("TURBOPACK compile-time value", void 0)),
                    title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-bold text-neutral-900 mb-1",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/components/galaxy/GalaxyCard.jsx",
                        lineNumber: 14,
                        columnNumber: 31
                    }, ("TURBOPACK compile-time value", void 0)),
                    subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-neutral-500 opacity-80",
                        children: subtitle
                    }, void 0, false, {
                        fileName: "[project]/src/components/galaxy/GalaxyCard.jsx",
                        lineNumber: 15,
                        columnNumber: 34
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/galaxy/GalaxyCard.jsx",
                lineNumber: 12,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/galaxy/GalaxyCard.jsx",
        lineNumber: 10,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = GalaxyCard;
}),
"[project]/src/components/galaxy/GalaxyGrid.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
;
const GalaxyGrid = ({ children, cols = 3, className = "" })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `galaxy-grid cols-${cols} ${className}`,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/galaxy/GalaxyGrid.jsx",
        lineNumber: 6,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = GalaxyGrid;
}),
"[project]/src/components/galaxy/GalaxyStat.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
;
const GalaxyStat = ({ label, value, icon: Icon, suffix = "" })=>{
    const [count, setCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    // Simple count up animation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let start = 0;
        const end = parseInt(value) || 0;
        if (start === end) return;
        const duration = 2000;
        const incrementTime = 20; // ms
        const step = Math.ceil(end / (duration / incrementTime));
        const timer = setInterval(()=>{
            start += step;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, incrementTime);
        return ()=>clearInterval(timer);
    }, [
        value
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "galaxy-stat",
        children: [
            Icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "galaxy-stat-icon",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    size: 20,
                    strokeWidth: 2.5
                }, void 0, false, {
                    fileName: "[project]/src/components/galaxy/GalaxyStat.jsx",
                    lineNumber: 34,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/galaxy/GalaxyStat.jsx",
                lineNumber: 33,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "galaxy-stat-value",
                children: [
                    typeof value === 'number' ? count : value,
                    suffix
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/galaxy/GalaxyStat.jsx",
                lineNumber: 37,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "galaxy-stat-label",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/galaxy/GalaxyStat.jsx",
                lineNumber: 40,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/galaxy/GalaxyStat.jsx",
        lineNumber: 31,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = GalaxyStat;
}),
"[project]/src/tabs/CreateTab.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$UserContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/UserContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$StoryContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/StoryContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$UIContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/UIContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/AuthContext.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$narrativeDomain$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/domain/narrativeDomain.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$safety$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/safety.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-ssr] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gamepad$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Gamepad2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gamepad-2.js [app-ssr] (ecmascript) <export default as Gamepad2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gamepad$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GamepadIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gamepad.js [app-ssr] (ecmascript) <export default as GamepadIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$headphones$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HeadphonesIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/headphones.js [app-ssr] (ecmascript) <export default as HeadphonesIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$galaxy$2f$GalaxyContainer$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/galaxy/GalaxyContainer.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$galaxy$2f$GalaxyTabs$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/galaxy/GalaxyTabs.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$galaxy$2f$GalaxyTextarea$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/galaxy/GalaxyTextarea.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$galaxy$2f$GalaxyButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/galaxy/GalaxyButton.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$galaxy$2f$GalaxyAlert$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/galaxy/GalaxyAlert.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$galaxy$2f$GalaxyCard$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/galaxy/GalaxyCard.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$galaxy$2f$GalaxyGrid$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/galaxy/GalaxyGrid.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$galaxy$2f$GalaxyStat$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/galaxy/GalaxyStat.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$KozaLoader$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/KozaLoader.jsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
// Memoized Sub-Components for Scale
const CreateHeader = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "text-center mb-16 px-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "galaxy-badge primary mb-6 group cursor-default",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                        size: 14,
                        className: "group-hover:rotate-12 transition-liquid"
                    }, void 0, false, {
                        fileName: "[project]/src/tabs/CreateTab.jsx",
                        lineNumber: 25,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "AI-Powered Metamorphosis"
                    }, void 0, false, {
                        fileName: "[project]/src/tabs/CreateTab.jsx",
                        lineNumber: 26,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/tabs/CreateTab.jsx",
                lineNumber: 24,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-5xl font-black mb-4 tracking-tighter italic text-shimmer",
                children: "Transform Experience"
            }, void 0, false, {
                fileName: "[project]/src/tabs/CreateTab.jsx",
                lineNumber: 28,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-neutral-500 text-lg font-medium max-w-xl mx-auto leading-relaxed",
                children: "Turn your challenges into empowering stories and immersive games."
            }, void 0, false, {
                fileName: "[project]/src/tabs/CreateTab.jsx",
                lineNumber: 31,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/tabs/CreateTab.jsx",
        lineNumber: 23,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
const StatsSection = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(({ user })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-20",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$galaxy$2f$GalaxyGrid$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            cols: 3,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$galaxy$2f$GalaxyStat$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"],
                    label: "Oluşturulan Hikayeler",
                    value: user?.storiesCreated || 0
                }, void 0, false, {
                    fileName: "[project]/src/tabs/CreateTab.jsx",
                    lineNumber: 40,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$galaxy$2f$GalaxyStat$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gamepad$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__GamepadIcon$3e$__["GamepadIcon"],
                    label: "Oluşturulan Oyunlar",
                    value: user?.gamesCreated || 0
                }, void 0, false, {
                    fileName: "[project]/src/tabs/CreateTab.jsx",
                    lineNumber: 41,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$galaxy$2f$GalaxyStat$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$headphones$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HeadphonesIcon$3e$__["HeadphonesIcon"],
                    label: "Oluşturulan Sesli Kitaplar",
                    value: Math.floor((user?.storiesCreated || 0) * 0.4)
                }, void 0, false, {
                    fileName: "[project]/src/tabs/CreateTab.jsx",
                    lineNumber: 42,
                    columnNumber: 13
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/tabs/CreateTab.jsx",
            lineNumber: 39,
            columnNumber: 9
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/tabs/CreateTab.jsx",
        lineNumber: 38,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0)));
const CreateTab = ()=>{
    const { user, awardXP } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$UserContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUser"])();
    const { activeStory, setActiveStory, isProcessing, setIsProcessing, analysisResult, setAnalysisResult, saveStory } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$StoryContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStory"])();
    const { setCurrentView, addToast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$UIContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUI"])();
    const { isAdmin } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$AuthContext$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [stage, setStage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [creationMode, setCreationMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('story');
    const handleGenerate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!activeStory.trim() || isProcessing) return;
        setError(null);
        setIsProcessing(true);
        setStage('Metamorfoz başlıyor...');
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$narrativeDomain$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NarrativeDomain"].processNarrativeRequest(activeStory, creationMode);
            if (result.isSafetyTriggered) {
                setError(result.message);
                if (isAdmin) addToast('warning', 'Güvenlik Uyarısı', 'Girişin güvenlik filtrelerimize takıldı.');
                return;
            }
            const { data } = result;
            setAnalysisResult({
                type: creationMode,
                category: data.title,
                data
            });
            saveStory(data);
            awardXP(500, creationMode === 'story' ? 'Hikaye oluşturuldu' : 'Oyun oluşturuldu');
            addToast('success', 'Başarılı!', creationMode === 'story' ? 'Hikaye oluşturuldu' : 'Oyun oluşturuldu');
        } catch (error) {
            console.error('Generation failed:', error);
            setError(error.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
            if (isAdmin) addToast('error', 'Hata', error.message || 'Oluşturma başarısız oldu');
        } finally{
            setIsProcessing(false);
            setStage('');
        }
    }, [
        activeStory,
        creationMode,
        isProcessing,
        isAdmin,
        setIsProcessing,
        setAnalysisResult,
        saveStory,
        awardXP,
        addToast
    ]);
    const viewResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (analysisResult) {
            setCurrentView({
                type: analysisResult.type,
                data: analysisResult.data
            });
            setActiveStory('');
            setAnalysisResult(null);
        }
    }, [
        analysisResult,
        setCurrentView,
        setActiveStory,
        setAnalysisResult
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$galaxy$2f$GalaxyContainer$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        className: "py-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CreateHeader, {}, void 0, false, {
                fileName: "[project]/src/tabs/CreateTab.jsx",
                lineNumber: 101,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-2xl mx-auto",
                children: !analysisResult ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$galaxy$2f$GalaxyTabs$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                activeTab: creationMode,
                                onChange: setCreationMode,
                                tabs: [
                                    {
                                        id: 'story',
                                        label: 'Hikaye',
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"]
                                    },
                                    {
                                        id: 'game',
                                        label: 'Oyun',
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gamepad$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Gamepad2$3e$__["Gamepad2"]
                                    }
                                ]
                            }, void 0, false, {
                                fileName: "[project]/src/tabs/CreateTab.jsx",
                                lineNumber: 107,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/tabs/CreateTab.jsx",
                            lineNumber: 106,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "animate-slide-up",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$galaxy$2f$GalaxyTextarea$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    value: activeStory,
                                    onChange: setActiveStory,
                                    placeholder: creationMode === 'story' ? "Zorlandığın bir anı anlat, hikaye olsun..." : "Bir zorluğu anlat, üstesinden gelme oyunu olsun...",
                                    disabled: isProcessing,
                                    minHeight: "150px"
                                }, void 0, false, {
                                    fileName: "[project]/src/tabs/CreateTab.jsx",
                                    lineNumber: 118,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6 flex justify-end",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$galaxy$2f$GalaxyButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        onClick: handleGenerate,
                                        disabled: !activeStory.trim() || isProcessing,
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"],
                                        variant: "magic",
                                        children: creationMode === 'story' ? 'Hikayeye Dönüştür' : 'Oyuna Dönüştür'
                                    }, void 0, false, {
                                        fileName: "[project]/src/tabs/CreateTab.jsx",
                                        lineNumber: 127,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/tabs/CreateTab.jsx",
                                    lineNumber: 126,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/tabs/CreateTab.jsx",
                            lineNumber: 117,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        error && isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$galaxy$2f$GalaxyAlert$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            type: "error",
                            title: "Giriş Hatası",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/src/tabs/CreateTab.jsx",
                            lineNumber: 139,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0)),
                        isProcessing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-12 animate-fade-in flex flex-col items-center gap-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$KozaLoader$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                size: "large",
                                message: stage
                            }, void 0, false, {
                                fileName: "[project]/src/tabs/CreateTab.jsx",
                                lineNumber: 146,
                                columnNumber: 33
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/tabs/CreateTab.jsx",
                            lineNumber: 145,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-8 p-4 bg-neutral-50/50 rounded-xl border border-neutral-100/50 text-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-neutral-400 font-medium italic",
                                children: [
                                    "🔔 ",
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$safety$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SAFETY_DISCLAIMER"]
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/tabs/CreateTab.jsx",
                                lineNumber: 151,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/tabs/CreateTab.jsx",
                            lineNumber: 150,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/tabs/CreateTab.jsx",
                    lineNumber: 105,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$galaxy$2f$GalaxyCard$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    className: "text-center",
                    title: analysisResult.category,
                    subtitle: analysisResult.type === 'story' ? 'Hikaye Tamamlandı' : 'Oyun Hazır',
                    emoji: analysisResult.type === 'story' ? '📖' : '🎮',
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-neutral-500 text-lg mb-10",
                            children: analysisResult.type === 'story' ? 'Deneyimin artık moral verici bir hikaye.' : 'Zorluğun artık heyecanlı bir oyun.'
                        }, void 0, false, {
                            fileName: "[project]/src/tabs/CreateTab.jsx",
                            lineNumber: 163,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col sm:flex-row gap-4 justify-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$galaxy$2f$GalaxyButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    onClick: viewResult,
                                    children: analysisResult.type === 'story' ? 'Hikayeyi Oku' : 'Oyunu Oyna'
                                }, void 0, false, {
                                    fileName: "[project]/src/tabs/CreateTab.jsx",
                                    lineNumber: 170,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$galaxy$2f$GalaxyButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    onClick: ()=>{
                                        setAnalysisResult(null);
                                        setActiveStory('');
                                    },
                                    variant: "secondary",
                                    children: "Yeni Oluştur"
                                }, void 0, false, {
                                    fileName: "[project]/src/tabs/CreateTab.jsx",
                                    lineNumber: 173,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/tabs/CreateTab.jsx",
                            lineNumber: 169,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/tabs/CreateTab.jsx",
                    lineNumber: 157,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/tabs/CreateTab.jsx",
                lineNumber: 103,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatsSection, {
                user: user
            }, void 0, false, {
                fileName: "[project]/src/tabs/CreateTab.jsx",
                lineNumber: 187,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/tabs/CreateTab.jsx",
        lineNumber: 100,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(CreateTab);
}),
"[project]/node_modules/lucide-react/dist/esm/icons/gamepad.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Gamepad
]);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "line",
        {
            x1: "6",
            x2: "10",
            y1: "12",
            y2: "12",
            key: "161bw2"
        }
    ],
    [
        "line",
        {
            x1: "8",
            x2: "8",
            y1: "10",
            y2: "14",
            key: "1i6ji0"
        }
    ],
    [
        "line",
        {
            x1: "15",
            x2: "15.01",
            y1: "13",
            y2: "13",
            key: "dqpgro"
        }
    ],
    [
        "line",
        {
            x1: "18",
            x2: "18.01",
            y1: "11",
            y2: "11",
            key: "meh2c"
        }
    ],
    [
        "rect",
        {
            width: "20",
            height: "12",
            x: "2",
            y: "6",
            rx: "2",
            key: "9lu3g6"
        }
    ]
];
const Gamepad = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("gamepad", __iconNode);
;
 //# sourceMappingURL=gamepad.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/gamepad.js [app-ssr] (ecmascript) <export default as GamepadIcon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GamepadIcon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gamepad$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gamepad$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gamepad.js [app-ssr] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/headphones.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Headphones
]);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-ssr] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",
            key: "1xhozi"
        }
    ]
];
const Headphones = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("headphones", __iconNode);
;
 //# sourceMappingURL=headphones.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/headphones.js [app-ssr] (ecmascript) <export default as HeadphonesIcon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HeadphonesIcon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$headphones$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$headphones$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/headphones.js [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=_8dfb9331._.js.map