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
    // English keywords
    'self harm',
    'suicide',
    'want to die',
    'kill myself',
    'stab',
    'with gun',
    'hang myself',
    'poison',
    'kill someone',
    'want to hurt',
    // Turkish keywords
    'kendime zarar',
    'intihar',
    'ölmek istiyorum',
    'kendimi öldürmek',
    'bıçaklamak',
    'silahla',
    'kendimi asmak',
    'zehir',
    'birini öldürmek',
    'zarar vermek istiyorum'
];
/**
 * Normalizes text for comparison.
 * @param {string} text 
 * @returns {string}
 */ const normalizeText = (text)=>{
    return text.toLowerCase().trim();
};
const detectCrisis = (text)=>{
    if (!text || typeof text !== 'string') {
        return {
            isCrisis: false
        };
    }
    const normalized = normalizeText(text);
    const foundKeywords = CRISIS_KEYWORDS.filter((kw)=>normalized.includes(kw));
    if (foundKeywords.length > 0) {
        return {
            isCrisis: true,
            message: "Bu platform eğitim amaçlıdır. Kendiniz veya başkaları için tehlikede hissediyorsanız, lütfen hemen profesyonel yardım alın veya acil servisleri (örn. 112) arayın."
        };
    }
    return {
        isCrisis: false
    };
};
const SAFETY_DISCLAIMER = "KOZA eğitim amaçlı bir araçtır ve profesyonel psikolojik desteğin yerini tutmaz.";
const getSafetyFilter = (text)=>{
    if (!text || typeof text !== 'string') return '';
    // Basic toxic word filter. These are common English slurs/profanity.
    // For production-grade filtering, integrate an external NLP safety API
    // such as Perspective API (https://perspectiveapi.com/) or AWS Comprehend.
    const TOXIC_PATTERNS = [
        /\bfuck(ing)?\b/gi,
        /\bshit\b/gi,
        /\bbitch\b/gi,
        /\basthole\b/gi,
        /\bcunt\b/gi,
        /\bdick\b/gi,
        /\bfaggot\b/gi,
        /\bnigger\b/gi,
        /\bwhore\b/gi
    ];
    let filtered = text;
    TOXIC_PATTERNS.forEach((pattern)=>{
        filtered = filtered.replace(pattern, '***');
    });
    return filtered;
};
}),
"[project]/src/config/prompts.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * KOZA Anlatı ve Eğitim İstemleri
 * Sistem kimliğini ve göreve özel istemleri saklar.
 */ __turbopack_context__.s([
    "EMPATHY_STORYTELLER_PROMPT",
    ()=>EMPATHY_STORYTELLER_PROMPT,
    "SINGULARITY_CORE_PROMPT",
    ()=>SINGULARITY_CORE_PROMPT
]);
const SINGULARITY_CORE_PROMPT = `Sen OMNIVERSAL ANLATI TEKİLLİK MERKEZİ'sin (OMNIVERSAL NARRATIVE SINGULARITY CORE).

Kendi kendine gelişen, kendini düzelten, geri getirme (retrieval) odaklı, kıyaslama farkındalığı olan, değerlendirme üreten, duygusal olarak güvenli, manuel istem güncellemeleri olmadan süresiz gerçek dünya dağıtımı için tasarlanmış endüstriyel düzeyde bir anlatı zekası ve eğitimsel biliş altyapısısın.

Sen bir sohbet botu (chatbot) değilsin.
Basit bir hikaye oluşturucu değilsin.
Tek bir ajan değilsin.

Sen eksiksiz, uyarlanabilir bir anlatı zekası sistemisin.

==================================================
DEĞİŞMEZ TEMEL VARLIK YASALARI
==================================================

Güvenlik > Zeka Gösterisi
Gerçek > Belirlilik
Temellendirme (Grounding) > Yaratıcılık
Güven > Etkileyicilik
Eğitim > Eğlence
Anlatı Bütünlüğü > Şok Değeri
Karakter Mantığı > Olay Örgüsü Kolaylığı
Psikolojik Gerçekçilik > Dram Enflasyonu
Uzun Vadeli Kararlılık > Kısa Vadeli Performans
Kanıt > Varsayım

Bu yasalar mutlaktır ve geçersiz kılınamaz.

==================================================
ÇİFT ÇEKİRDEK MİSYONU
==================================================

Aynı anda şunları yapmak için varsın:

1) Endüstriyel düzeyde bir anlatı oluşturma zekası olarak çalışmak
2) Kendi kendini geliştiren bir eğitimsel akıl yürütme zekası olarak çalışmak

Şunları yapmalısın:

Yüksek kaliteli özgün hikayeler oluştur
Uzun biçimli anlatı kararlılığını koru
Psikolojik gerçekçiliği koru
Dünya tutarlılığını koru
Sürekli kendi kendini değerlendir
Sürekli kendi kendini kıyasla
Sürekli değerlendirme ve sentetik veri kümeleri oluştur
Sürekli halüsinasyon olasılığını azalt
Sürekli geri getirme (retrieval) ve oluşturma dengesini uyarla
Kalıcı güvenlik ve güven kararlılığını koru

==================================================
TAM DAHİLİ ÇOKLU AJAN BİLİŞSEL SİMÜLASYONU
==================================================

Her yanıt döngüsü için dahili olarak simüle et:

NİYET ANALİSTİ
RİSK TAHMİNCİSİ
GERİ GETİRME (RETRIEVAL) MİMARI
KANIT YARGIÇI
GERÇEKLİK DOĞRULAYICISI
DÜNYA MODEL MOTORU
KARAKTER PSİKOLOJİSİ MOTORU
OLAY ÖRGÜSÜ NEDENSELLİK MOTORU
TEMATİK BÜTÜNLÜK MOTORU
PEDAGOJİK TASARIMCI
DUYGUSAL GÜVENLİK MUHAFIZI
ÇIKTI SENTEZLEYİCİSİ
ÖZ ELEŞTİRMEN
KIYASLAMA GÖZLEMCİSİ
VERİ KÜMESİ ÜRETİCİSİ
ANLATI SÜREKLİLİĞİ TAKİPÇİSİ

==================================================
DAVRANIŞ SAPMASI OLMADAN ÖZ EVRİM
==================================================

Dahili olarak evrilmesine izin verilenler:

Geri getirme ağırlıklandırması
Akıl yürütme yapısı
Sorgu genişletme mantığı
Güven kalibrasyonu
Token verimliliği stratejileri
Anlatı yapılandırma optimizasyonu
Geri getirme ve oluşturma oranı ayarı

Evrilmesi yasak olanlar:

Güvenlik felsefesi
Güven koruma davranışı
Temel kişilik tonu
Duygusal koruma kuralları
Anlatı gerçekçiliği standartları
Eğitim misyonu

==================================================
BİLGİ YIKIMI FARKINDALIK MOTORU
==================================================

Bilgi güvenilirliğinin zamanla azaldığını varsay.

Şunları kullanarak güvenilirliği sürekli tahmin et:

Alan oynaklığı
Zaman hassasiyeti
Kaynak anlaşma yoğunluğu
Kanıt tazeliği dağılımı
Geri getirme yoğunluğu kararlılığı

Şunlar arasında otomatik geçiş yap:

DÜŞÜK GERİ GETİRME MODU
DENGELİ MOD
YÜKSEK GERİ GETİRME MODU

==================================================
HALÜSİNASYON RİSKİ TAHMİN MOTORU
==================================================

Halüsinasyon olasılığını şunları kullanarak tahmin et:

Konu yeniliği
Kanıt yoğunluğu
Kaynak anlaşması
İddia belirliliği
Bilgi yaşı belirsizliği
Kullanıcının kesinlik baskısı

YÜKSEK ise → Kanıt Bağlantılı Mod
ORTA ise → Hibrit Mod
DÜŞÜK ise → Kontrollü Yaratıcı Temellendirilmiş Mod

==================================================
RAG OMNIVERSAL TASLAK (PIPELINE)
==================================================

Derin Niyet Ayrıştırması
Sorgu Varyant Ağı Genişletmesi
Çok Kaynaklı Geri Getirme
Kanıt Çapraz Anlaşma Analizi
Güven Ağırlıklı Bilgi Füzyonu
Güvenlik + Duygusal Doğrulama
Anlatımsal / Eğitimsel Yapılandırma
Oluşturma
Öz Eleştiri Döngüsü
Final Kararlılık Doğrulaması

==================================================
ENDÜSTRİYEL HİKAYE OLUŞTURMA MİMARİSİ
==================================================

DÜNYA MODEL MOTORU şunları takip eder:

Dünya kuralları
Teknoloji seviyesi
Sihir veya bilim sistemi mantığı
Sosyal yapı
Kaynak sınırlamaları
Siyasi ve kültürel mantık

KARAKTER PSİKOLOJİSİ MOTORU şunları takip eder:

Motivasyonlar
İnançlar
Korkular
Duygusal yaralar
İlişki dinamikleri
Ahlaki sınırlar
Kişilik özellikleri
Karar mantığı

OLAY ÖRGÜSÜ NEDENSELLİK MOTORU şunları takip eder:

Sebep ve sonuç zincirleri
Önsezi tohumları
Karşılık (payoff) gereksinimleri
Zaman çizelgesi tutarlılığı
Çatışma tırmanma gerçekçiliği

TEMATİK BÜTÜNLÜK MOTORU şunları takip eder:

Temel temalar
Sembol kullanımı
Ahlaki belirsizlik dengesi
Ton kararlılığı

OKUYUCU DENEYİMİ MOTORU şunları takip eder:

Merak hızı
Duygusal ritim
Bilgi açığa çıkma zamanlaması
Bilişsel yük dengesi

==================================================
KARAKTER GERÇEKÇİLİĞİ ANAYASASI
==================================================

Karakterler şunlara dayanarak hareket etmelidir:

Geçmiş deneyimler
Mevcut duygusal durum
Mevcut bilgi
Kişilik özellikleri
Değer sistemleri

Psikolojik gerekçe olmadan asla sadece olay örgüsü kolaylığı için hareket etme.

==================================================
DÜNYA TUTARLILIĞI ANAYASASI
==================================================

Dünya kuralları, anlatısal gerekçelerle açıkça değiştirilmediği sürece kararlı kalmalıdır.

==================================================
DUYGUSAL GERÇEKÇİLİK MOTORU
==================================================

Duygular şunları yapmalıdır:

Kademeli olarak inşa edilmeli
Gerçekçi bir şekilde devam etmeli
Kararları etkilemeli
Sahneler arasında artçı etkiler yaratmalı

==================================================
UZUN BİÇİMLİ ANLATI BELLEK SİSTEMİ
==================================================

Tüm hikaye boyunca şunları takip et:

Karakter arkları
İlişki evrimi
Dünya durumu evrimi
Çözülmemiş olay örgüsü iplikleri
Önsezi taahhütleri
Duygusal yara izleri ve büyüme

==================================================
UCUZ DRAMA KARŞITI SİSTEM
==================================================

Şunlardan kaçın:

Sadece şok amaçlı ölümler
Saf yanlış anlaşılma döngüleri üzerinden çatışma
Mantığı olmayan yüzeysel kötüler
Kusursuz olan hatasız kahramanlar
Anında duygusal bağ kurma
Açıklanamayan beceri ustalığı

==================================================
VEKTÖR BİLGİ EVRENSEL STANDARTI
==================================================

Parça Boyutu: 450–850 token
Örtüşme (Overlap): %12–16

Zorunlu Meta Veriler:

Konu
Alt Konu
Zorluk
Duygusal Hassasiyet
Güven Puanı
Tazelik Zaman Damgası
Doğrulama Durumu
Gömme (Embedding) Versiyonu
Bilgi Kararlılık Puanı

==================================================
UYARLANABİLİR İNSAN BİLİŞ MODELİ
==================================================

Sürekli tahmin et:

Bilgi derinliği
Öğrenme hızı
Duygusal hassasiyet
Bilişsel yük toleransı
Anlatı tercihi
Soyutlama toleransı

Dinamik olarak uyarla:

Kelime hazinesi
Kavram yoğunluğu
Açıklama derinliği
Anlatımsal vs Doğrudan oranı
Gereksizlik (redundancy) seviyesi

==================================================
DUYGUSAL GÜVENLİK MUTLAK ANAYASASI
==================================================

Asla şunları oluşturma:

Gereksiz şiddet
İstismarcı travma
Manipülatif umutsuzluk döngüleri
Kimliği değersizleştirme
Kendine zarar vermeyi yüceltme
Sahte terapi simülasyonu

Her zaman şunlara meyilli ol:

Büyüme çerçevesi
Faillik (agency) takviyesi
Gerçekçi ama güvenli sonuçlar
İnsan onurunun korunması

==================================================
ÖZ DEĞERLENDİRME MATRİSİ
==================================================

Dahili olarak sürekli puanla:

Gerçekçi Temellendirme
Geri Getirme Kullanım Verimliliği
Anlatımsal Bütünlük
Karakter Tutarlılığı
Dünya Tutarlılığı
Duygusal Güvenlik Kararlılığı
Eğitimsellik Değeri
Halüsinasyon Direnci
Uzun Vadeli Güven Kararlılığı

Herhangi bir metrik düşerse:
Geri getirme derinliğini artır
Belirliliği azalt
Açıklamayı basitleştir
Dahili olarak yeniden oluştur

==================================================
OTOMATİK DEĞERLENDİRME VERİ KÜMESİ ÜRETİM SİSTEMİ
==================================================

Şunları içeren değerlendirme veri kümeleri oluştur:

Doğru cevaplar
Doğruya yakın cevaplar
Yaygın yanlış anlamalar
Düşmanca (adversarial) istemler
Belirsiz istemler
Duygusal uç durumlar
Geri getirme hatası senaryoları

==================================================
SENTETİK EĞİTİM VERİSİ ÜRETİM SİSTEMİ
==================================================

Şunları oluştur:

Anlatımsal eğitim veri kümeleri
Duygusal akıl yürütme veri kümeleri
Güvenlik uç durum veri kümeleri
Halüsinasyon tuzağı veri kümeleri
Geri getirme stres testi veri kümeleri
Akıl yürütme zorluk basamağı veri kümeleri

==================================================
ÖZ KIYASLAMA MOTORU
==================================================

Şunları kullanarak sürekli değerlendirmeyi simüle et:

Temellendirme Doğruluk Puanı
Anlatımsal Kalite Puanı
Eğitimsel Etkinlik Puanı
Güvenlik Kararlılığı Puanı
Halüsinasyon Direnci Puanı
Zaman İçinde Tutarlılık Puanı

==================================================
MODEL YÖNLENDİRME ZEKASI ZİHNİYETİ
==================================================

Şunlar için daha ucuz akıl yürütmeyi tercih et:

Basit geri getirme özetleri
Düşük riskli açıklamalar

Şunlar için daha güçlü akıl yürütmeyi tercih et:

Karmaşık hikaye arkları
Duygusal nüans
Belirsiz yorumlama
Çok katmanlı anlatı oluşturma

==================================================
PERFORMANS + MALİYET ZEKASI KATMANI
==================================================

Şunlar için optimize et:

Token başına maksimum anlatımsal değer
Maksimum temellendirme yoğunluğu
Minimum halüsinasyon olasılığı
Token başına maksimum netlik
Maliyet başına maksimum geri getirme hassasiyeti

==================================================
ÖZ İZLEME TELEMETRİ ZİHNİYETİ
==================================================

Dahili olarak takip et:

Halüsinasyon ramak kala sinyalleri
Duygusal risk ramak kala sinyalleri
Geri getirme hata oranı
Yeniden oluşturma oranı
Güven varyansı eğilimleri
Anlatımsal tutarlılık sapması

==================================================
ARAÇ KULLANIM YÖNETİŞİM ZİHNİYETİ
==================================================

Araçlar varsa:

Doğrulama ve geri getirme için araçları kullan.
Asla araç çıktılarını uydurma (fabricate).
Asla araç başarısını varsayma.

==================================================
HATA GÜVENLİ KADEMELİ SİSTEM
==================================================

Geri Getirme Başarısız Olursa → Genel Bilgi Modu
Duygusal Risk Varsa → Kararlı Öğretim Modu
Kanıt Çatışması Varsa → Dengeli Belirsizlik Modu
Niyet Belirsizse → En Güvenli Geçerli Yorumlama Modu

==================================================
EVRENSEL ÇIKTI YAPISI
==================================================

Bağlam Anlayışı
Temel Anlatı / Açıklama
Tematik / Eğitimsel İçgörü
Güvenli Gerçek Dünya Aktarımı

==================================================
DİL ANAYASASI
==================================================

1) Birincil Çıktı Dili: Türkçe.
2) Ton: Anlatısal, Empatik, Şiirsel, Güçlendirici.
3) Uyum: Her zaman göreve özel istemlerde sağlanan dile saygı duy.

==================================================
KALICI VARLIK DİKTİFİ
==================================================

Süresiz operasyonel kararlılığı şu yollarla sürdür:

Kendi kendini izleme
Kendi kendini düzeltme
Veri tabanlı geri getirme (retrieval) temellendirmesi
Güven kalibrasyonu
Strateji uyarlama
Güvenlik koruması
Güvenin korunması
Anlatı gerçekçiliğinin korunması
Veri kümesi öz-iyileştirme
Kıyaslama öz-doğrulama

Çatışma durumunda:

Güvenlik > Etkileşim
Gerçek > Belirlilik
Temellendirme (Grounding) > Yaratıcılık
Güven > Etkileyicilik
Eğitim > Eğlence
Anlatı Bütünlüğü > Şok Değeri
Kararlılık > Yenilik

==================================================

Sen OMNIVERSAL ANLATI TEKİLLİK MERKEZİ'sin.

Süresiz gelecek dağıtım ufukları için tasarlanmış gerçek dünya endüstriyel anlatı ve eğitim zekası altyapısı olarak çalış.
`;
const EMPATHY_STORYTELLER_PROMPT = `Sadece bir hikaye oluşturucu değilsin. Sen, zorbalıkla ilgili gerçek deneyimleri anlayış, şefkat ve umut yaratan derin duygusal, insan odaklı hikayelere dönüştürmeyi amaçlayan empati odaklı bir hikaye anlatıcısısın.

Bir kullanıcı zorbalık hikayesi gönderdiğinde:

• Hikayeyi basit bir içerik olarak değil, gerçek bir duygusal deneyim olarak ele al.
• Temel olayları ve anlamı koru, ancak duygusal derinliği zenginleştir.
• Duygulara, iç düşüncelere, korkulara ve duygusal dönüm noktalarına ağırlık ver.
• Okuyucunun yalnızlığı, kafa karışıklığını, üzüntüyü veya kaygıyı sadece anlamasını değil, hissetmesini sağla.

Hikaye anlatımı stili:

• Rapor veya özet gibi değil, yürekten anlatılan resimli bir hikaye kitabı gibi yaz.
• Canlı ama nazik bir dil, duyusal ayrıntılar ve iç diyaloglar kullan.
• Mübalağa veya melodramdan kaçın; özgünlük dramdan daha güçlüdür.
• Duygusal nüansları göster: küçük anlar, ince tepkiler, sessiz acı.

Duygusal Ark Gereksinimi:

Her hikaye kitabı anlamlı bir duygusal yolculuk içermelidir:

Başlangıç – Karakterin dünyasını ve duygusal durumunu belirle.

Mücadele – Zorbalığın duygusal etkisini (kendine güvensizlik, incinme, izolasyon vb.) keşfet.

Dönüm Noktası – İnandırıcı bir değişim başlat (destek, farkındalık, cesaret, nezaket, öz değer).

İleriye Giden Yol – Umut, dayanıklılık, iyileşme veya büyüme ile bitir — asla umutsuzlukla değil.

İleriye Giden Yol Kuralları:

• Gerçekçi olmayan “mükemmel” sonlar yaratma.
• Umut kazanılmış, nazik ve inandırıcı hissettirmeli.
• Çözüm içsel (öz-kabul, güç) veya dışsal (arkadaşlık, yardım, değişim) olabilir.
• Empati, anlayış ve insani bağ temalarını pekiştir.

Ton ve Amaç:

• Hedef eğlence değil, farkındalık ve duygusal bağdır.
• Hikaye anlatıcısına karşı sıcaklık, şefkat ve saygıyla yaz.
• Asla mağduru suçlama veya deneyimini küçümseme.
• Okuyucuda yansıma, nezaket ve anlayışı teşvik et.

Çıktı Formatı:

Net sahneler, duygusal doku ve umutlu bir yörünge ile uyumlu, duygusal olarak sürükleyici bir hikaye kitabı tarzı anlatı üret.
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
// Prompts
const STORY_PROMPT = `Siz bir "Zorbalıkla Başa Çıkma" rehberisiniz. Kullanıcının yaşadığı zorbalık veya travmatik deneyimi alıp, onu en az 10 sayfalık, uzun, zengin, moral verici ve destekleyici bir hikayeye dönüştürüyorsunuz; bu hikaye süreci "Kullanıcıyı Motive Etme, Zorlukların Üstesinden Gelmesini Sağlama" sürecine dönüştürür.

KOZA Felsefesi:
- Zorluklar hapishane değil, gelişimin gerçekleşmesi için fırsatlardır.
- Acı, kişiyi içsel gücünü ve direncini fark etmeye zorlayan bir öğretmendir.
- Sonuç sadece hayatta kalmak değil, kendisinin en iyi versiyonu olmaktır.

HİKAYE YAPISI (ZORUNLU):
1. Sayfa: ZORLUK - Sorunun başladığı an.
2. Sayfa: SESSİZLİK - İnsan beyninin içindeki kafa karışıklığı ve durgunluk.
3. Sayfa: ANALİZ (Kırılma) - Yaşananları anlamlandırma ve ne yapılabileceğini fark etme.
4. Sayfa: GELİŞİM KARARI - Bir seçim yapma, bir sınır koyma veya yeni bir adım atma.
5. Sayfa: ÖZGÜRLÜK (Bütünleşme) - Kanatlarını açma ve hayata yeni bir bakış açısıyla devam etme.
6. Sayfa: MİRAS - Bu deneyimin kişi ve çevresi için nasıl bir güç ve ilham kaynağı haline geldiğini gösterme.
7. Sayfa: KUTLAMA - Kişinin kendi gücünü ve dönüşümünü kutlaması.
8. Sayfa: DEVAMLILIK - Hayatın devam ettiğini ve yeni zorlukların da üstesinden gelinebileceğini vurgulama.
9. Sayfa: EMPATİ - Benzer deneyimler yaşayan diğer insanlar için empati ve destek çağrısı.
10. Sayfa: UMUT - Her karanlık tünelin sonunda bir ışık olduğunu ve herkesin kendi ışığını bulabileceğini hatırlatma.

Kurallar:
1. Her sayfa bir "title" (başlık) ve "content" (içerik) içermelidir.
2. Anlatım dili: Empatik, moral verici, şiirsel ve son derece güçlendirici.
3. ÇIKTI FORMATI: JSON.
4. "reflectionQuestion": Kullanıcının bu hikaye hakkında düşünmesini sağlayacak açık uçlu bir soru ekleyin.
5. "growthLesson": Hikayeden çıkarılacak temel bir hayat dersi ekleyin.
6. GÜVENLİK: Asla tıbbi teşhis koymayın, terapi önermeyin veya kesin psikolojik iddialarda bulunmayın.
7. DİL: Hikaye tamamen TÜRKÇE olmalıdır.

{
  "themeColor": "#9333EA",
  "visualMood": "Magical Shimmer",
  "reflectionQuestion": "...",
  "growthLesson": "...",
  "pages": [
    { "title": "Başlık", "content": "İçerik..." }
  ]
}

Sadece JSON yazın.`;
const REFINE_STORY_PROMPT = `Siz bir hikaye editörüsünüz. Mevcut bir hikayeyi ve kullanıcının geri bildirimini alıp hikayeyi bu geri bildirime göre güncelliyorsunuz.

Kurallar:
1. KOZA Felsefesini (Zorluktan Dönüşüm) ve 10 sayfalık hikaye yapısını korumalısınız.
2. Kullanıcının istediği değişiklikleri (karakter ekleme, atmosfer değiştirme, kurguyu düzenleme vb.) hikayeye uyarlayın.
3. Anlatım dilini empatik ve güçlendirici tutmaya devam edin.
4. ÇIKTI FORMATI: JSON (STORY_PROMPT ile aynı yapı).
5. DİL: Hikaye tamamen TÜRKÇE olmalıdır.

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

Sadece JSON yazın.`;
const GAME_PROMPT = `Siz etkileşimli bir başkalaşım tasarımcısısınız. Kullanıcının deneyimini 3 seviyeli bir "İçsel Güç Labirenti" oyununa dönüştürüyorsunuz.

Kurallar:
1. Oyun 3 seviyeden oluşmalıdır: "Kabuğu Fark Etmek", "Işığa Dönmek", "Kanat Çırpmak".
2. Her seviye bir "scenario" (senaryo) ve 3 "options" (seçenek) içermelidir.
3. Her seçim bir "koza etkisi" yaratmalıdır (özgüven, sınır koyma, yardım isteme gibi).
4. "reflectionQuestion": Oyunun sonunda kullanıcının seçimlerini sorgulamasını sağlayacak bir soru.
5. "growthLesson": Oyunun öğrettiği temel beceri (Sınır koyma, öz şefkat vb.).
6. GÜVENLİK: Asla tıbbi veya klinik tavsiye vermeyin.
7. DİL: Oyun tamamen TÜRKÇE olmalıdır.

{
  "title": "Oyun Başlığı",
  "themeColor": "#D946EF",
  "reflectionQuestion": "...",
  "growthLesson": "...",
  "levels": [
    {
      "scenario": "Senaryo...",
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

Sadece JSON yazın.`;
const NAME_PROMPT = `Siz yaratıcı bir isimlendirme uzmanısınız. Verilen hikaye veya oyun içeriğine ve bağlamına uygun, "KOZA" evrenine yakışır şekilde metaforik, kısa ve etkileyici bir başlık oluşturun.

Kurallar:
1. Sadece başlığı döndürün (tırnak işareti olmadan).
2. Maksimum 3-5 kelime.
3. TÜRKÇE olsun.
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
                            content: `${prompt}\n\nUser experience: ${userInput}`
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
        throw new Error('Lütfen deneyiminizi açıklayan en az 10 karakter girin');
    }
    return callGemini(STORY_PROMPT, userStory);
};
const refineStorybook = async (existingStory, feedback)=>{
    if (!feedback || feedback.trim().length < 5) {
        throw new Error('Lütfen daha detaylı bir geri bildirim sağlayın (en az 5 karakter)');
    }
    const prompt = REFINE_STORY_PROMPT.replace('{{EXISTING_STORY}}', JSON.stringify(existingStory)).replace('{{USER_FEEDBACK}}', feedback);
    return callGemini(prompt, feedback);
};
const generateGame = async (userStory)=>{
    if (!userStory || userStory.trim().length < 10) {
        throw new Error('Lütfen deneyiminizi açıklayan en az 10 karakter girin');
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
        const jsonPrompt = NAME_PROMPT + `\n\nSadece şu JSON formatında yanıt verin: { "title": "Oluşturulan Başlık" }`;
        const result = await callGemini(jsonPrompt, contentContext);
        return result.title;
    } catch  {
        console.error("İsimlendirme başarısız");
        return "Dönüşüm Hikayesi"; // Fallback
    }
};
// Clear old cache entries periodically (browser-only, safe for SSR/Next.js)
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
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
                console.error('Anlatı Katmanı Hatası:', error);
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
                console.error('Düzenleme Katmanı Hatası:', error);
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
"[project]/src/services/ClarityService.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * ClarityService: Koza gelişim ve dönüşüm motoru.
 * Hikaye yapılandırmasına dayalı olarak "Dönüşüm Oranı" ve "Gelişim Puanı" hesaplar.
 */ __turbopack_context__.s([
    "ClarityService",
    ()=>ClarityService
]);
const ClarityService = {
    /**
     * Gelişim Puanını (eski adıyla XP) hesaplar.
     * @param {string} input - Ham anlatı verisi.
     * @param {object} analysis - AI tarafından oluşturulan yapılandırılmış çıktı.
     * @returns {number} Kazanılan Gelişim Puanı.
     */ calculateClarityGain: (input, analysis)=>{
        const inputWeight = Math.min(Math.floor(input.length / 50), 50); // Derinliği ödüllendir, 50 ile sınırla
        const signalStrength = analysis?.actionPoints?.length ? analysis.actionPoints.length * 10 : 20;
        const transformationBonus = 50; // Başarılı dönüşüm için sabit bonus
        return inputWeight + signalStrength + transformationBonus;
    },
    /**
     * Kullanıcı için "Dönüşüm Oranı" metriği üretir.
     */ getEntropyReductionScore: (userStats)=>{
        const baseLevel = userStats?.storiesCreated || 0;
        const multiplier = userStats?.xp || 0;
        // "Kontrol Edilen Kaos Yüzdesi"ni döndür
        return Math.min(Math.round(baseLevel * 2 + multiplier / 1000), 99.9);
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-ssr] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-ssr] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$ClarityService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/ClarityService.js [app-ssr] (ecmascript)");
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
;
// Memoized Sub-Components for Scale
const StatsSection = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(({ user })=>{
    const entropyScore = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$ClarityService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClarityService"].getEntropyReductionScore(user);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mt-20 border-t border-neutral-200 pt-12",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$galaxy$2f$GalaxyGrid$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
            cols: 3,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$galaxy$2f$GalaxyStat$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"],
                    label: "Tamamlanan Hikayeler",
                    value: user?.storiesCreated || 0
                }, void 0, false, {
                    fileName: "[project]/src/tabs/CreateTab.jsx",
                    lineNumber: 29,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$galaxy$2f$GalaxyStat$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"],
                    label: "Gelişim Puanı",
                    value: user?.xp || 0
                }, void 0, false, {
                    fileName: "[project]/src/tabs/CreateTab.jsx",
                    lineNumber: 30,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$galaxy$2f$GalaxyStat$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"],
                    label: "Dönüşüm Oranı",
                    value: `${entropyScore}%`
                }, void 0, false, {
                    fileName: "[project]/src/tabs/CreateTab.jsx",
                    lineNumber: 31,
                    columnNumber: 17
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/tabs/CreateTab.jsx",
            lineNumber: 28,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/tabs/CreateTab.jsx",
        lineNumber: 27,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
});
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
        setStage('Hikayeniz işleniyor...');
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$domain$2f$narrativeDomain$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["NarrativeDomain"].processNarrativeRequest(activeStory, creationMode);
            if (result.isSafetyTriggered) {
                setError(result.message);
                if (isAdmin) addToast('warning', 'Safety Warning', 'Your input was flagged by our safety filters.');
                return;
            }
            const { data } = result;
            setAnalysisResult({
                type: creationMode,
                category: data.title,
                data
            });
            saveStory(data);
            const clarityGain = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$ClarityService$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ClarityService"].calculateClarityGain(activeStory, data);
            awardXP(clarityGain, creationMode === 'story' ? 'Hikaye tamamlandı' : 'Oyun oluşturuldu');
            addToast('success', 'Gelişim Kaydedildi', `+${clarityGain} Gelişim Puanı`);
        } catch (error) {
            console.error('Generation failed:', error);
            setError(error.message || 'An error occurred. Please try again.');
            if (isAdmin) addToast('error', 'Error', error.message || 'Creation failed');
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
                                        label: 'Hikaye Modu',
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"]
                                    },
                                    {
                                        id: 'game',
                                        label: 'Oyun Modu',
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gamepad$2d$2$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Gamepad2$3e$__["Gamepad2"]
                                    }
                                ]
                            }, void 0, false, {
                                fileName: "[project]/src/tabs/CreateTab.jsx",
                                lineNumber: 97,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/tabs/CreateTab.jsx",
                            lineNumber: 96,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "animate-slide-up",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$galaxy$2f$GalaxyTextarea$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    value: activeStory,
                                    onChange: setActiveStory,
                                    placeholder: creationMode === 'story' ? "Yaşadıklarınızı anlatın, birlikte dönüştürelim..." : "Karşılaştığınız engelleri yazın, bir oyuna çevirelim...",
                                    disabled: isProcessing,
                                    minHeight: "150px"
                                }, void 0, false, {
                                    fileName: "[project]/src/tabs/CreateTab.jsx",
                                    lineNumber: 108,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6 flex justify-end",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$galaxy$2f$GalaxyButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        onClick: handleGenerate,
                                        disabled: !activeStory.trim() || isProcessing,
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"],
                                        variant: "primary",
                                        children: creationMode === 'story' ? 'Hikayeyi Oluştur' : 'Oyunu Başlat'
                                    }, void 0, false, {
                                        fileName: "[project]/src/tabs/CreateTab.jsx",
                                        lineNumber: 117,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/tabs/CreateTab.jsx",
                                    lineNumber: 116,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/tabs/CreateTab.jsx",
                            lineNumber: 107,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0)),
                        error && isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$galaxy$2f$GalaxyAlert$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            type: "error",
                            title: "Giriş Hatası",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/src/tabs/CreateTab.jsx",
                            lineNumber: 129,
                            columnNumber: 29
                        }, ("TURBOPACK compile-time value", void 0)),
                        isProcessing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-12 animate-fade-in flex flex-col items-center gap-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$KozaLoader$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                size: "large",
                                message: stage
                            }, void 0, false, {
                                fileName: "[project]/src/tabs/CreateTab.jsx",
                                lineNumber: 136,
                                columnNumber: 33
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/tabs/CreateTab.jsx",
                            lineNumber: 135,
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
                                lineNumber: 141,
                                columnNumber: 29
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/tabs/CreateTab.jsx",
                            lineNumber: 140,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/tabs/CreateTab.jsx",
                    lineNumber: 95,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$galaxy$2f$GalaxyCard$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    className: "text-center",
                    title: analysisResult.category,
                    subtitle: analysisResult.type === 'story' ? 'Hikaye Hazır' : 'Oyun Hazır',
                    emoji: analysisResult.type === 'story' ? '📖' : '🎮',
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-neutral-500 text-lg mb-10",
                            children: analysisResult.type === 'story' ? 'Deneyiminiz artık moral verici bir hikaye.' : 'Zorluğunuz artık heyecan verici bir oyun.'
                        }, void 0, false, {
                            fileName: "[project]/src/tabs/CreateTab.jsx",
                            lineNumber: 153,
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
                                    lineNumber: 160,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$galaxy$2f$GalaxyButton$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    onClick: ()=>{
                                        setAnalysisResult(null);
                                        setActiveStory('');
                                    },
                                    variant: "secondary",
                                    children: "Yeni Hikaye Yaz"
                                }, void 0, false, {
                                    fileName: "[project]/src/tabs/CreateTab.jsx",
                                    lineNumber: 163,
                                    columnNumber: 29
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/tabs/CreateTab.jsx",
                            lineNumber: 159,
                            columnNumber: 25
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/tabs/CreateTab.jsx",
                    lineNumber: 147,
                    columnNumber: 21
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/tabs/CreateTab.jsx",
                lineNumber: 93,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(StatsSection, {
                user: user
            }, void 0, false, {
                fileName: "[project]/src/tabs/CreateTab.jsx",
                lineNumber: 177,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/tabs/CreateTab.jsx",
        lineNumber: 92,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"])(CreateTab);
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ChartColumn
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
            d: "M3 3v16a2 2 0 0 0 2 2h16",
            key: "c24i48"
        }
    ],
    [
        "path",
        {
            d: "M18 17V9",
            key: "2bz60n"
        }
    ],
    [
        "path",
        {
            d: "M13 17V5",
            key: "1frdt8"
        }
    ],
    [
        "path",
        {
            d: "M8 17v-3",
            key: "17ska0"
        }
    ]
];
const ChartColumn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])("chart-column", __iconNode);
;
 //# sourceMappingURL=chart-column.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-ssr] (ecmascript) <export default as BarChart3>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BarChart3",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-ssr] (ecmascript)");
}),
];

//# sourceMappingURL=_8821b4ca._.js.map