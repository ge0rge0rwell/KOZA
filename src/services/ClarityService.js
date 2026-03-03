/**
 * ClarityService: Core engine for the Sovereign Mind retention loop.
 * Calculates "Entropy Reduction" and "Clarity Index" based on narrative structuralization.
 */
export const ClarityService = {
    /**
     * Calculates the Clarity Index (formerly XP) based on the structural quality of the input/output.
     * @param {string} input - Raw narrative data.
     * @param {object} analysis - The structuralized output from the AI.
     * @returns {number} The amount of Clarity Index gained.
     */
    calculateClarityGain: (input, analysis) => {
        const inputWeight = Math.min(Math.floor(input.length / 50), 50); // Reward depth, cap at 50
        const signalStrength = analysis?.actionPoints?.length ? analysis.actionPoints.length * 10 : 20;
        const entropyReductionBonus = 50; // Flat bonus for successful structuralization

        return inputWeight + signalStrength + entropyReductionBonus;
    },

    /**
     * Generates a "Cognitive Evolution" metric for the user.
     * This simulates the "Self-mastery" and "Competence validation" progression.
     */
    getEntropyReductionScore: (userStats) => {
        const baseLevel = userStats?.storiesCreated || 0;
        const multiplier = userStats?.xp || 0;

        // Return a normalized "Percentage of Chaos Controlled"
        return Math.min(Math.round((baseLevel * 2) + (multiplier / 1000)), 99.9);
    }
};
