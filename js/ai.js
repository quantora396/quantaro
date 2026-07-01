/*
====================================
        Quantora AI Engine v2
====================================
*/

const ai = {

    score: 0,

    confidence: "Low",

    signal: "WAIT",

    technicalScore: 0,

    fundamentalScore: 0,

    smartMoneyScore: 0,

    riskScore: 0,

    reasons: []

};

function resetAI() {

    ai.score = 0;

    ai.technicalScore = 0;

    ai.fundamentalScore = 0;

    ai.smartMoneyScore = 0;

    ai.riskScore = 0;

    ai.reasons = [];

}

function calculateAIScore() {

    resetAI();

    // ==========================
    // BTC Analysis
    // ==========================

    if (market.btcTrend === "Bullish 📈") {

        ai.technicalScore += 25;

        ai.reasons.push("Bitcoin Trend Bullish");

    } else {

        ai.technicalScore -= 15;

        ai.riskScore += 15;

        ai.reasons.push("Bitcoin Trend Bearish");

    }

    // ==========================
    // Gold Analysis
    // ==========================

    if (market.goldTrend === "Bullish 📈") {

        ai.fundamentalScore += 20;

        ai.reasons.push("Gold Market Strong");

    } else {

        ai.fundamentalScore += 5;

    }

    // ==========================
    // Smart Money
    // ==========================

    ai.smartMoneyScore += 20;

    ai.reasons.push("Institutional Activity Stable");

    // ==========================
    // Final Score
    // ==========================

    ai.score =
        ai.technicalScore +
        ai.fundamentalScore +
        ai.smartMoneyScore -
        ai.riskScore;

    if (ai.score > 100)
        ai.score = 100;

    if (ai.score < 0)
        ai.score = 0;

    // ==========================
    // Confidence
    // ==========================

    if (ai.score >= 80) {

        ai.signal = "STRONG BUY 🟢";

        ai.confidence = "Very High";

    }

    else if (ai.score >= 60) {

        ai.signal = "BUY 🟢";

        ai.confidence = "High";

    }

    else if (ai.score >= 40) {

        ai.signal = "HOLD 🟡";

        ai.confidence = "Medium";

    }

    else {

        ai.signal = "SELL 🔴";

        ai.confidence = "Low";

    }

    console.log("AI Score:", ai.score);

    console.log("Signal:", ai.signal);

    console.log("Confidence:", ai.confidence);

    console.log(ai.reasons);

}
