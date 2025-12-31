import Loader from '../components/Loader';

const CreateTab = () => {
    const { activeStory, setActiveStory, isProcessing, setIsProcessing, setCurrentView, awardXP, saveStory, setAnalysisResult, analysisResult, addToast } = useApp();
    const [stage, setStage] = useState('');
    const [error, setError] = useState(null);
    const [creationMode, setCreationMode] = useState('story'); // 'story' or 'game'

    const handleGenerate = async () => {
        if (!activeStory.trim() || isProcessing) return;

        setError(null);

        const validation = validateStoryInput(activeStory);
        if (!validation.isValid) {
            setError(validation.errors[0]);
            return;
        }

        setIsProcessing(true);
        setStage(creationMode === 'story' ? 'Hikaye oluşturuluyor...' : 'Oyun tasarlanıyor...');

        try {
            const result = creationMode === 'story'
                ? await generateStorybook(validation.sanitized)
                : await generateGame(validation.sanitized);

            const data = {
                type: creationMode,
                title: creationMode === 'story' ? (result[0]?.title || 'Dönüşüm Hikayesi') : (result.title || 'Dönüşüm Oyunu'),
                content: validation.sanitized,
                [creationMode === 'story' ? 'pages' : 'levels']: creationMode === 'story' ? result : result.levels
            };

            setAnalysisResult({
                type: creationMode,
                category: creationMode === 'story' ? 'Dönüşüm Hikayesi' : 'Dönüşüm Oyunu',
                data
            });

            saveStory(data);
            awardXP(500, creationMode === 'story' ? 'Hikaye oluşturuldu' : 'Oyun oluşturuldu');
            addToast('success', 'Başarılı!', creationMode === 'story' ? 'Hikaye oluşturuldu' : 'Oyun oluşturuldu');
        } catch (error) {
            console.error('Generation failed:', error);
            setError(error.message || 'Bir hata oluştu. Lütfen tekrar deneyin.');
            addToast('error', 'Hata', error.message || 'Oluşturma başarısız oldu');
        } finally {
            setIsProcessing(false);
            setStage('');
        }
    };

    const viewResult = () => {
        if (analysisResult) {
            setCurrentView({ type: analysisResult.type, data: analysisResult.data });
            setActiveStory('');
            setAnalysisResult(null);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-medium mb-4">
                    <Sparkles size={16} />
                    AI Destekli Dönüşüm Aracı
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">
                    Deneyimini Dönüştür
                </h1>
                <p className="text-neutral-600 text-lg">
                    Yaşadığın zorluğu anlat, AI ile güçlendirici bir dünyaya adım at.
                </p>
            </div>

            <div className="max-w-2xl mx-auto">
                {!analysisResult ? (
                    <div className="space-y-6">
                        {/* Mode Toggle */}
                        <div className="flex p-1 bg-neutral-100 rounded-xl w-fit mx-auto shadow-inner border border-neutral-200">
                            <button
                                onClick={() => setCreationMode('story')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${creationMode === 'story'
                                    ? 'bg-white text-primary-600 shadow-sm'
                                    : 'text-neutral-500 hover:text-neutral-700'}`}
                            >
                                <BookOpen size={18} />
                                Hikaye
                            </button>
                            <button
                                onClick={() => setCreationMode('game')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${creationMode === 'game'
                                    ? 'bg-white text-primary-600 shadow-sm'
                                    : 'text-neutral-500 hover:text-neutral-700'}`}
                            >
                                <Gamepad2 size={18} />
                                Oyun
                            </button>
                        </div>

                        <div className="animate-slide-up">
                            <MessageBox
                                value={activeStory}
                                onChange={(val) => {
                                    setActiveStory(val);
                                    setError(null);
                                }}
                                onSend={handleGenerate}
                                placeholder={creationMode === 'story' ? "Zorlandığın bir anı anlat, hikaye olsun..." : "Bir zorluğu anlat, üstesinden gelme oyunu olsun..."}
                                disabled={isProcessing}
                            />
                        </div>

                        {error && (
                            <div className="mt-4 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600 animate-slide-down">
                                <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                                <span className="text-sm font-medium">{error}</span>
                            </div>
                        )}

                        {isProcessing && (
                            <div className="mt-12 animate-fade-in flex justify-center">
                                <Loader message={stage} />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl border border-neutral-200 p-10 shadow-xl animate-fade-in text-center">
                        <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-6 shadow-lg ${analysisResult.type === 'story' ? 'bg-primary-600 text-white' : 'bg-neutral-800 text-white'
                            }`}>
                            {analysisResult.type === 'story' ? <BookOpen size={40} /> : <Gamepad2 size={40} />}
                        </div>
                        <h3 className="text-3xl font-black mb-2 tracking-tight">{analysisResult.category}</h3>
                        <p className="text-neutral-500 text-lg mb-10">
                            {analysisResult.type === 'story'
                                ? 'Deneyimin artık epik bir hikaye.'
                                : 'Zorluğun artık heyecanlı bir oyun.'}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={viewResult}
                                className="flex-1 bg-primary-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-primary-700 hover:scale-[1.02] transition-all shadow-lg active:scale-95"
                            >
                                {analysisResult.type === 'story' ? 'Hikayeyi Oku' : 'Oyunu Oyna'}
                            </button>
                            <button
                                onClick={() => {
                                    setAnalysisResult(null);
                                    setActiveStory('');
                                }}
                                className="px-8 py-4 bg-neutral-100 text-neutral-700 rounded-2xl font-bold hover:bg-neutral-200 transition-all active:scale-95"
                            >
                                Yeni Oluştur
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-3xl font-black text-primary-600 mb-1">5</div>
                    <div className="text-sm font-bold text-neutral-400 uppercase tracking-wider">Altın Sayfa</div>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-3xl font-black text-primary-600 mb-1">AI</div>
                    <div className="text-sm font-bold text-neutral-400 uppercase tracking-wider">Mistik Rejisör</div>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-3xl font-black text-primary-600 mb-1">500</div>
                    <div className="text-sm font-bold text-neutral-400 uppercase tracking-wider">Öz Birikimi</div>
                </div>
            </div>
        </div>
    );
};

export default CreateTab;
