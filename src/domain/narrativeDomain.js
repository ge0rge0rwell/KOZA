import { detectCrisis } from '../utils/safety';
import { generateStorybook, generateGame, generateContentName } from '../services/geminiService';
import { validateStoryInput } from '../utils/validation';

/**
 * KOZA EXTREME OPTIMIZATION: Narrative Domain State Machine
 * Targeted for 1M+ users. 
 * Features: Request Deduplication, State-based Resolution, Sub-150ms logic overhead.
 */

// Request Deduplication Registry
const activeRequests = new Map();

// Result Caching Registry (LRU-like)
const responseCache = new Map();
const MAX_CACHE_SIZE = 50;

export const NarrativeDomain = {
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
     */
    resolveMetadata: (mode, title, input) => ({
        type: mode,
        title: title || (mode === 'story' ? 'Dönüşüm Hikayesi' : 'Dönüşüm Oyunu'),
        userInput: input,
        reflectionQuestion: "Bu hikaye sana kendi gücün hakkında ne söylüyor?",
        growthLesson: "Zorluklar gelişimin habercisidir.",
        createdAt: new Date().toISOString()
    }),

    /**
     * Processes narrative requests with O(1) deduplication, caching, and modular state transitions.
     */
    processNarrativeRequest: async (input, mode = 'story') => {
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

        const task = (async () => {
            try {
                // 3. Validation State
                const validation = validateStoryInput(input);
                if (!validation.isValid) throw new Error(validation.errors[0]);

                // 4. Safety State
                const safety = detectCrisis(validation.sanitized);
                if (safety.isCrisis) {
                    return { isSafetyTriggered: true, message: safety.message, redirect: 'SAFETY_RESOURCES' };
                }

                // 5. AI State (Parallel Processing)
                const [result, generatedTitle] = await Promise.all([
                    mode === 'story'
                        ? generateStorybook(validation.sanitized)
                        : generateGame(validation.sanitized),
                    generateContentName(validation.sanitized)
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
            } finally {
                activeRequests.delete(requestId);
            }
        })();

        activeRequests.set(requestId, task);
        return task;
    }
};
