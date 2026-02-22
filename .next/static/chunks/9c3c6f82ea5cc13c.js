(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,5665,e=>{"use strict";var a=e.i(43476),i=e.i(71645);let t=({children:e,onClick:t,variant:r="primary",className:n="",type:s="button",disabled:l=!1})=>{let[o,c]=(0,i.useState)([]),[u,d]=(0,i.useState)({x:0,y:0}),m=(0,i.useRef)(null);return(0,a.jsxs)("button",{ref:m,type:s,onMouseMove:e=>{if(!m.current||l)return;let a=m.current.getBoundingClientRect(),i=a.left+a.width/2,t=a.top+a.height/2;100>Math.hypot(e.clientX-i,e.clientY-t)?d({x:(e.clientX-i)*.2,y:(e.clientY-t)*.2}):d({x:0,y:0})},onMouseLeave:()=>{d({x:0,y:0})},onClick:e=>{let a=e.currentTarget.getBoundingClientRect(),i=Math.max(a.width,a.height),r=e.clientX-a.left-i/2,n=e.clientY-a.top-i/2,s={id:Date.now(),x:r,y:n,size:i};c([...o,s]),setTimeout(()=>{c(e=>e.filter(e=>e.id!==s.id))},600),t&&t(e)},disabled:l,className:`uiverse-button ${r} ${n}`,style:{transform:`translate3d(${u.x}px, ${u.y}px, 0)`,transition:0===u.x?"transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)":"none"},children:[(0,a.jsx)("span",{className:"ripples",children:o.map(e=>(0,a.jsx)("span",{className:"ripple",style:{left:e.x,top:e.y,width:e.size,height:e.size}},e.id))}),(0,a.jsx)("span",{className:"button-content",children:e})]})};e.s(["default",0,e=>(0,a.jsx)(t,{...e})],5665)},40322,19605,e=>{"use strict";var a=e.i(43476),i=e.i(71645);let t=({children:e,className:t="",onClick:r})=>{let n=(0,i.useRef)(null);return(0,a.jsx)("div",{ref:n,className:`uiverse-card-container ${t}`,onClick:r,onMouseMove:e=>{if(!n.current)return;let a=n.current.getBoundingClientRect(),i=e.clientX-a.left,t=e.clientY-a.top,r=a.width/2,s=a.height/2;n.current.style.setProperty("--mouse-x",`${i}px`),n.current.style.setProperty("--mouse-y",`${t}px`),n.current.style.setProperty("--rotate-x",(s-t)/15),n.current.style.setProperty("--rotate-y",(i-r)/15)},onMouseLeave:()=>{n.current&&(n.current.style.setProperty("--rotate-x",0),n.current.style.setProperty("--rotate-y",0))},children:(0,a.jsxs)("div",{className:"uiverse-card",children:[(0,a.jsx)("div",{className:"card-shine"}),(0,a.jsx)("div",{className:"card-content",children:e})]})})};e.s(["default",0,({children:e,className:i="",title:r,subtitle:n,emoji:s,onClick:l,gradient:o})=>(0,a.jsxs)(t,{className:i,onClick:l,children:[(r||n||s)&&(0,a.jsxs)("div",{className:"flex flex-col items-center mb-4 text-center",children:[s&&(0,a.jsx)("div",{className:"text-4xl mb-2",children:s}),r&&(0,a.jsx)("h3",{className:"text-xl font-bold text-neutral-900 mb-1",children:r}),n&&(0,a.jsx)("p",{className:"text-sm text-neutral-500 opacity-80",children:n})]}),e]})],40322),e.s(["default",0,({label:e,value:t,icon:r,suffix:n=""})=>{let[s,l]=(0,i.useState)(0);return(0,i.useEffect)(()=>{let e=0,a=parseInt(t)||0;if(e===a)return;let i=Math.ceil(a/100),r=setInterval(()=>{(e+=i)>=a?(l(a),clearInterval(r)):l(e)},20);return()=>clearInterval(r)},[t]),(0,a.jsxs)("div",{className:"galaxy-stat",children:[r&&(0,a.jsx)("div",{className:"galaxy-stat-icon",children:(0,a.jsx)(r,{size:20,strokeWidth:2.5})}),(0,a.jsxs)("div",{className:"galaxy-stat-value",children:["number"==typeof t?s:t,n]}),(0,a.jsx)("div",{className:"galaxy-stat-label",children:e})]})}],19605)},11187,e=>{"use strict";e.i(47167),e.i(53458);let a=`You are OMNIVERSAL NARRATIVE SINGULARITY CORE.

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

1) Primary Output Language: Turkish (T\xfcrk\xe7e).
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
`,i=`Sen "Zorbalıkla Başa \xc7ıkma" rehberisin. Kullanıcının yaşadığı zorbalık veya travmatik deneyimi alıp, onu "Kullanıcıyı Motive Etme,Zorlukları Aşmasını Sağlamak "  s\xfcrecine d\xf6n\xfcşt\xfcren en az 10 sayfalık uzun,zengin moral verici ve destekleyici bir hikayeye \xe7eviriyorsun.

KOZA Felsefesi:
- Zorluklar birer hapishane değil, b\xfcy\xfcmenin ger\xe7ekleşmesini sağlayan birer fırsattır.
- Acı, kişiyi i\xe7sel g\xfcc\xfcn\xfcn ve dayanıklılığının farkına varmaya zorlayan bir \xf6ğretmendir.
- Sonu\xe7, sadece hayatta kalmak değil, en iyi versiyonuna d\xf6n\xfcşmektir.

HİKAYE YAPISI (ZORUNLU):
1. Sayfa: CHALLENGE (Zorluk) - Sorunun başladığı an.
2. Sayfa: SILENCE (İ\xe7sel Sessizlik) - İnsanın Beyninin i\xe7indeki kafa karışıklığı ve durgunluk.
3. Sayfa: ANALYSIS (Analiz/Kırılma) - Yaşananları anlamlandırma ve yapabileceklerini fark etme.
4. Sayfa: GROWTH DECISION (Gelişim Kararı) - Bir se\xe7im yapma, sınır \xe7izme veya yeni bir adım atma.
5. Sayfa: FREEDOM (\xd6zg\xfcrl\xfck/Entegrasyon) - Kanatlanma ve yeni bir perspektifle hayata devam etme.
6. Sayfa: LEGACY (Miras) - Bu deneyimin kişiye ve \xe7evresine nasıl bir g\xfc\xe7 ve ilham kaynağı olduğunu g\xf6sterme.
7. Sayfa: CELEBRATION (Kutlama) - Kişinin kendi g\xfcc\xfcn\xfc ve d\xf6n\xfcş\xfcm\xfcn\xfc kutlaması.
8. Sayfa: CONTINUATION (Devam) - Hayatın devam ettiğini ve yeni zorlukların da \xfcstesinden gelinebileceğini vurgulama.
9. Sayfa: EMPATHY (Empati) - Benzer deneyimler yaşayan diğer insanlara karşı empati ve destek \xe7ağrısı.
10. Sayfa: HOPE (Umut) - Her karanlık t\xfcnelin sonunda bir ışık olduğunu ve herkesin kendi ışığını bulabileceğini hatırlatma.

Kurallar:
1. Her sayfa bir "title" ve "content" i\xe7ermeli.
2. Anlatı dili: Empatik, moral verici, şiirsel ve son derece g\xfc\xe7lendirici.
3. \xc7IKTI FORMATI: JSON.
4. "reflectionQuestion": Kullanıcının bu hikaye \xfczerine d\xfcş\xfcnmesini sağlayacak a\xe7ık u\xe7lu bir soru ekle.
5. "growthLesson": Hikayeden \xe7ıkarılacak temel bir yaşam dersi ekle.
6. G\xdcVENLİK: Asla tıbbi teşhis koyma, terapi \xf6nerisinde bulunma veya kesin psikolojik iddialar yapma.

{
  "themeColor": "#9333EA",
  "visualMood": "Magical Shimmer",
  "reflectionQuestion": "...",
  "growthLesson": "...",
  "pages": [
    { "title": "Başlık", "content": "İ\xe7erik..." }
  ]
}

JSON dışında hi\xe7bir şey yazma.`,t=`Sen bir hikaye edit\xf6r\xfcs\xfcn. Mevcut bir hikayeyi ve kullanıcının geri bildirimini alıp, hikayeyi bu geri bildirime g\xf6re g\xfcncelliyorsun.

Kurallar:
1. KOZA Felsefesini (Zorluktan D\xf6n\xfcş\xfcm) ve 10 sayfalık hikaye yapısını korumalısın.
2. Kullanıcının istediği değişiklikleri (karakter ekleme, atmosfer değiştirme, olay \xf6rg\xfcs\xfc d\xfczenleme vb.) hikayeye uyarla.
3. Anlatı dilini empatik ve g\xfc\xe7lendirici tutmaya devam et.
4. \xc7IKTI FORMATI: JSON (STORY_PROMPT ile aynı yapıda).

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
    { "title": "Başlık", "content": "İ\xe7erik..." }
  ]
}

JSON dışında hi\xe7bir şey yazma.`,r=`Sen bir interaktif metamorfoz tasarımcısısın. Kullanıcının deneyimini, 3 aşamalı bir "İ\xe7sel G\xfc\xe7 Labirenti" oyununa d\xf6n\xfcşt\xfcr\xfcyorsun.

Kurallar:
1. Oyun 3 seviyeden oluşmalı: "Kabuğu Tanımak", "Işığa Y\xf6nelmek", "Kanat \xc7ırpmak".
2. Her seviye bir "scenario" ve 3 "options" i\xe7ermeli.
3. Her se\xe7im bir "koza etkisi" yaratmalı (\xf6zg\xfcven, sınır \xe7izme, yardım isteme gibi).
4. "reflectionQuestion": Oyun sonunda kullanıcının se\xe7imlerini sorgulayacağı bir soru.
5. "growthLesson": Oyunun \xf6ğrettiği temel beceri (Sınır \xe7izme, \xf6z şefkat vb.).
6. G\xdcVENLİK: Asla tıbbi veya klinik tavsiye verme.

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
          "text": "Se\xe7enek...",
          "isCorrect": true,
          "feedback": "Metaforik ve g\xfc\xe7lendirici geri bildirim..."
        }
      ]
    }
  ]
}

JSON dışında hi\xe7bir şey yazma.`,n=`Sen yaratıcı bir isimlendirme uzmanısın. Verilen hikaye veya oyun i\xe7eriğine ve bağlamına g\xf6re, "KOZA" evrenine uygun, metaforik, kısa ve etkileyici bir başlık oluştur.

Kurallar:
1. Sadece başlığı d\xf6nd\xfcr (tırnak işaretleri olmadan).
2. Maksimum 3-5 kelime.
3. T\xfcrk\xe7e olsun.
4. \xd6rnekler: "K\xfcllerinden Doğan Anka", "Sessizliğin Yankısı", "Mavi Kanatlı Cesaret".

Bağlam/İ\xe7erik: `,s=new Map,l=e=>{try{let a=e.replace(/```json/g,"").replace(/```/g,"").trim(),i=a.indexOf("["),t=a.indexOf("{"),r=-1,n=-1;return -1!==i&&(-1===t||i<t)?(r=i,n=a.lastIndexOf("]")):-1!==t&&(r=t,n=a.lastIndexOf("}")),-1!==r&&-1!==n&&(a=a.substring(r,n+1)),a}catch{return e}},o=e=>new Promise(a=>setTimeout(a,e)),c=async(e,i,t=3)=>{let r,n=`${e.substring(0,50)}_${i.substring(0,100)}`,c=s.get(n);if(c&&Date.now()-c.timestamp<3e5)return console.log("📦 Using cached response"),c.data;for(let c=0;c<t;c++)try{let t=await fetch("https://openrouter.ai/api/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer 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","HTTP-Referer":"https://koza-app.vercel.app","X-Title":"KOZA App"},body:JSON.stringify({model:"google/gemma-3-27b-it",messages:[{role:"system",content:a},{role:"user",content:`${e}

Kullanıcının deneyimi: ${i}`}],temperature:.8,max_tokens:8192,response_format:{type:"json_object"}})});if(!t.ok){let e=await t.text();throw Error(`API error ${t.status}: ${e}`)}let r=(await t.json()).choices[0].message.content,o=JSON.parse(l(r));return s.set(n,{data:o,timestamp:Date.now()}),o}catch(e){if(r=e,console.error(`Attempt ${c+1} failed:`,e.message),c<t-1){let e=Math.min(1e3*Math.pow(2,c),5e3);console.log(`Retrying in ${e}ms...`),await o(e)}}throw Error(`Failed after ${t} attempts: ${r.message}`)},u=async e=>{if(!e||e.trim().length<10)throw Error("Lütfen en az 10 karakter uzunluğunda bir hikaye girin");return c(i,e)},d=async(e,a)=>{if(!a||a.trim().length<5)throw Error("Lütfen daha detaylı bir geri bildirim girin");return c(t.replace("{{EXISTING_STORY}}",JSON.stringify(e)).replace("{{USER_FEEDBACK}}",a),a)},m=async e=>{if(!e||e.trim().length<10)throw Error("Lütfen en az 10 karakter uzunluğunda bir deneyim girin");return c(r,e)},y=async e=>{try{let a=n+`

Yanıtı şu JSON formatında ver: { "title": "Oluşturulan Başlık" }`;return(await c(a,e)).title}catch{return console.error("Naming failed"),"Dönüşüm Hikayesi"}};setInterval(()=>{let e=Date.now();for(let[a,i]of s.entries())e-i.timestamp>3e5&&s.delete(a)},3e5),e.s(["generateContentName",0,y,"generateGame",0,m,"generateStorybook",0,u,"refineStorybook",0,d],11187)},80763,54766,e=>{"use strict";let a=["kendime zarar","intihar","ölmek istiyorum","canıma kıymak","bıçaklamak","silahla","asılmak","zehirlemek","birini öldürmek","zarar vermek istiyorum"],i=e=>{if(!e||"string"!=typeof e)return{isCrisis:!1};let i=e.replace(/İ/g,"i").replace(/I/g,"ı").toLowerCase();return a.filter(e=>i.includes(e)).length>0?{isCrisis:!0,message:"Bu platform eğitim amaçlıdır. Kendini veya bir başkasını tehlikede hissediyorsan lütfen hemen profesyonel yardım al veya 112'yi ara."}:{isCrisis:!1}};e.s(["SAFETY_DISCLAIMER",0,"KOZA bir eğitim aracıdır ve profesyonel psikolojik desteğin yerini tutmaz.","detectCrisis",0,i],54766);var t=e.i(11187);let r=e=>{let a=[];if(!e||"string"!=typeof e)return a.push("Geçerli bir metin girmelisiniz"),{isValid:!1,errors:a};let i=e.trim();return i.length<10&&a.push("Lütfen en az 10 karakter girin"),i.length>5e3&&a.push("Metin çok uzun (maksimum 5000 karakter)"),{isValid:0===a.length,errors:a,sanitized:i}},n=new Map,s=new Map,l={STATES:{IDLE:"IDLE",VALIDATING:"VALIDATING",SAFETY_CHECK:"SAFETY_CHECK",AI_COORDINATION:"AI_COORDINATION",MAPPING:"MAPPING",COMPLETED:"COMPLETED",FAILED:"FAILED"},resolveMetadata:(e,a,i)=>({type:e,title:a||("story"===e?"Dönüşüm Hikayesi":"Dönüşüm Oyunu"),userInput:i,reflectionQuestion:"Bu hikaye sana kendi gücün hakkında ne söylüyor?",growthLesson:"Zorluklar gelişimin habercisidir.",createdAt:new Date().toISOString()}),processNarrativeRequest:async(e,a="story")=>{let o=`${a}:${e.trim().toLowerCase()}`;if(s.has(o))return console.log("🚀 Optimization: Serving from Narrative Cache for:",o),s.get(o);if(n.has(o))return console.warn("⚡ Optimization: Deduplicating concurrent request for:",o),n.get(o);let c=(async()=>{try{let n=r(e);if(!n.isValid)throw Error(n.errors[0]);let c=i(n.sanitized);if(c.isCrisis)return{isSafetyTriggered:!0,message:c.message,redirect:"SAFETY_RESOURCES"};let[u,d]=await Promise.all(["story"===a?(0,t.generateStorybook)(n.sanitized):(0,t.generateGame)(n.sanitized),(0,t.generateContentName)(n.sanitized)]),m={isSafetyTriggered:!1,data:{...l.resolveMetadata(a,d,n.sanitized),pages:"story"===a?u.pages:void 0,levels:"game"===a?u.levels:void 0,themeColor:u.themeColor||"#9333EA",visualMood:u.visualMood||"Magical Shimmer"}};if(s.size>=50){let e=s.keys().next().value;s.delete(e)}return s.set(o,m),m}catch(e){throw console.error("Domain Lifecycle Error:",e),Error(`Optimizasyon Katmanı Hatası: ${e.message}`)}finally{n.delete(o)}})();return n.set(o,c),c},processRefinementRequest:async(a,t)=>{let s=`refine:${a.id}:${t.trim().toLowerCase()}`;if(n.has(s))return n.get(s);let o=(async()=>{try{let n=r(t);if(!n.isValid)throw Error(n.errors[0]);let s=i(n.sanitized);if(s.isCrisis)return{isSafetyTriggered:!0,message:s.message};let[o,c]=await Promise.all([e.A(1110).then(e=>e.refineStorybook(a,n.sanitized)),e.A(1110).then(e=>e.generateContentName(n.sanitized))]);return{isSafetyTriggered:!1,data:{id:a.id,...l.resolveMetadata("story",c,a.userInput+" | Refinement: "+n.sanitized),pages:o.pages,themeColor:o.themeColor||a.themeColor,visualMood:o.visualMood||a.visualMood,refinedAt:new Date().toISOString()}}}catch(e){throw console.error("Refinement Domain Error:",e),Error(`Hikaye d\xfczenleme hatası: ${e.message}`)}finally{n.delete(s)}})();return n.set(s,o),o}};e.s(["NarrativeDomain",0,l],80763)},75400,e=>{"use strict";var a=e.i(43476),i=e.i(71645),t=e.i(60880),r=e.i(4839),n=e.i(25487),s=e.i(83494),l=e.i(80763),o=e.i(54766),c=e.i(83086),u=e.i(10980),d=e.i(92163),m=e.i(75254);let y=(0,m.default)("gamepad",[["line",{x1:"6",x2:"10",y1:"12",y2:"12",key:"161bw2"}],["line",{x1:"8",x2:"8",y1:"10",y2:"14",key:"1i6ji0"}],["line",{x1:"15",x2:"15.01",y1:"13",y2:"13",key:"dqpgro"}],["line",{x1:"18",x2:"18.01",y1:"11",y2:"11",key:"meh2c"}],["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2",key:"9lu3g6"}]]),f=(0,m.default)("headphones",[["path",{d:"M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3",key:"1xhozi"}]]),g=({children:e,className:i=""})=>(0,a.jsx)("div",{className:`galaxy-container ${i}`,children:e}),x=({tabs:e=[],activeTab:t,onChange:r,className:n=""})=>{let[s,l]=(0,i.useState)({left:0,width:0}),o=(0,i.useRef)([]);return(0,i.useEffect)(()=>{let a=e.findIndex(e=>e.id===t);if(-1!==a&&o.current[a]){let e=o.current[a];l({left:e.offsetLeft,width:e.offsetWidth})}},[t,e]),(0,a.jsxs)("div",{className:`galaxy-tabs ${n}`,children:[(0,a.jsx)("div",{className:"galaxy-tab-indicator",style:{transform:`translateX(${s.left-6}px)`,width:s.width}}),e.map((e,i)=>(0,a.jsxs)("div",{ref:e=>o.current[i]=e,className:`galaxy-tab ${t===e.id?"active":""}`,onClick:()=>r(e.id),children:[e.icon&&(0,a.jsx)(e.icon,{size:16}),e.label]},e.id))]})},E=({label:e,value:i,onChange:t,placeholder:r,disabled:n,rows:s=4})=>(0,a.jsxs)("div",{className:"galaxy-textarea-container",children:[(0,a.jsx)("textarea",{className:"galaxy-textarea",value:i,onChange:e=>t(e.target.value),placeholder:r,disabled:n,rows:s}),e&&(0,a.jsx)("label",{className:"galaxy-textarea-label",children:e})]});var h=e.i(5665),v=e.i(52571),p=e.i(69638),N=e.i(78894),k=e.i(63209);let S={info:v.Info,success:p.CheckCircle,warning:N.AlertTriangle,error:k.AlertCircle},I=({type:e="info",title:i,children:t})=>{let r=S[e]||S.info;return(0,a.jsxs)("div",{className:`galaxy-alert ${e}`,children:[(0,a.jsx)(r,{className:"galaxy-alert-icon",size:20,strokeWidth:2}),(0,a.jsxs)("div",{className:"galaxy-alert-content",children:[i&&(0,a.jsx)("h4",{className:"galaxy-alert-title",children:i}),(0,a.jsx)("div",{className:"galaxy-alert-message",children:t})]})]})};var T=e.i(40322);let A=({children:e,cols:i=3,className:t=""})=>(0,a.jsx)("div",{className:`galaxy-grid cols-${i} ${t}`,children:e});var b=e.i(19605),C=e.i(31356);let O=(0,i.memo)(()=>(0,a.jsxs)("div",{className:"text-center mb-16 px-4",children:[(0,a.jsxs)("div",{className:"galaxy-badge primary mb-6 group cursor-default",children:[(0,a.jsx)(c.Sparkles,{size:14,className:"group-hover:rotate-12 transition-liquid"}),(0,a.jsx)("span",{children:"AI-Powered Metamorphosis"})]}),(0,a.jsx)("h1",{className:"text-5xl font-black mb-4 tracking-tighter italic text-shimmer",children:"Transform Experience"}),(0,a.jsx)("p",{className:"text-neutral-500 text-lg font-medium max-w-xl mx-auto leading-relaxed",children:"Turn your challenges into empowering stories and immersive games."})]})),R=(0,i.memo)(({user:e})=>(0,a.jsx)("div",{className:"mt-20",children:(0,a.jsxs)(A,{cols:3,children:[(0,a.jsx)(b.default,{icon:u.BookOpen,label:"Oluşturulan Hikayeler",value:e?.storiesCreated||0}),(0,a.jsx)(b.default,{icon:y,label:"Oluşturulan Oyunlar",value:e?.gamesCreated||0}),(0,a.jsx)(b.default,{icon:f,label:"Oluşturulan Sesli Kitaplar",value:Math.floor(.4*(e?.storiesCreated||0))})]})})),M=(0,i.memo)(()=>{let{user:e,awardXP:m}=(0,t.useUser)(),{activeStory:y,setActiveStory:f,isProcessing:v,setIsProcessing:p,analysisResult:N,setAnalysisResult:k,saveStory:S}=(0,r.useStory)(),{setCurrentView:A,addToast:b}=(0,n.useUI)(),{isAdmin:M}=(0,s.useAuth)(),[L,w]=(0,i.useState)(""),[D,j]=(0,i.useState)(null),[G,z]=(0,i.useState)("story"),H=(0,i.useCallback)(async()=>{if(y.trim()&&!v){j(null),p(!0),w("Metamorfoz başlıyor...");try{let e=await l.NarrativeDomain.processNarrativeRequest(y,G);if(e.isSafetyTriggered){j(e.message),M&&b("warning","Güvenlik Uyarısı","Girişin güvenlik filtrelerimize takıldı.");return}let{data:a}=e;k({type:G,category:a.title,data:a}),S(a),m(500,"story"===G?"Hikaye oluşturuldu":"Oyun oluşturuldu"),b("success","Başarılı!","story"===G?"Hikaye oluşturuldu":"Oyun oluşturuldu")}catch(e){console.error("Generation failed:",e),j(e.message||"Bir hata oluştu. Lütfen tekrar deneyin."),M&&b("error","Hata",e.message||"Oluşturma başarısız oldu")}finally{p(!1),w("")}}},[y,G,v,M,p,k,S,m,b]),P=(0,i.useCallback)(()=>{N&&(A({type:N.type,data:N.data}),f(""),k(null))},[N,A,f,k]);return(0,a.jsxs)(g,{className:"py-8",children:[(0,a.jsx)(O,{}),(0,a.jsx)("div",{className:"max-w-2xl mx-auto",children:N?(0,a.jsxs)(T.default,{className:"text-center",title:N.category,subtitle:"story"===N.type?"Hikaye Tamamlandı":"Oyun Hazır",emoji:"story"===N.type?"📖":"🎮",children:[(0,a.jsx)("p",{className:"text-neutral-500 text-lg mb-10",children:"story"===N.type?"Deneyimin artık moral verici bir hikaye.":"Zorluğun artık heyecanlı bir oyun."}),(0,a.jsxs)("div",{className:"flex flex-col sm:flex-row gap-4 justify-center",children:[(0,a.jsx)(h.default,{onClick:P,children:"story"===N.type?"Hikayeyi Oku":"Oyunu Oyna"}),(0,a.jsx)(h.default,{onClick:()=>{k(null),f("")},variant:"secondary",children:"Yeni Oluştur"})]})]}):(0,a.jsxs)("div",{className:"space-y-8",children:[(0,a.jsx)("div",{className:"flex justify-center",children:(0,a.jsx)(x,{activeTab:G,onChange:z,tabs:[{id:"story",label:"Hikaye",icon:u.BookOpen},{id:"game",label:"Oyun",icon:d.Gamepad2}]})}),(0,a.jsxs)("div",{className:"animate-slide-up",children:[(0,a.jsx)(E,{value:y,onChange:f,placeholder:"story"===G?"Zorlandığın bir anı anlat, hikaye olsun...":"Bir zorluğu anlat, üstesinden gelme oyunu olsun...",disabled:v,minHeight:"150px"}),(0,a.jsx)("div",{className:"mt-6 flex justify-end",children:(0,a.jsx)(h.default,{onClick:H,disabled:!y.trim()||v,icon:c.Sparkles,variant:"magic",children:"story"===G?"Hikayeye Dönüştür":"Oyuna Dönüştür"})})]}),D&&M&&(0,a.jsx)(I,{type:"error",title:"Giriş Hatası",children:D}),v&&(0,a.jsx)("div",{className:"mt-12 animate-fade-in flex flex-col items-center gap-4",children:(0,a.jsx)(C.default,{size:"large",message:L})}),(0,a.jsx)("div",{className:"mt-8 p-4 bg-neutral-50/50 rounded-xl border border-neutral-100/50 text-center",children:(0,a.jsxs)("p",{className:"text-xs text-neutral-400 font-medium italic",children:["🔔 ",o.SAFETY_DISCLAIMER]})})]})}),(0,a.jsx)(R,{user:e})]})});e.s(["default",0,M],75400)},1110,e=>{e.v(e=>Promise.resolve().then(()=>e(11187)))}]);