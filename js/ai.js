/*
====================================
        Quantora AI Engine v3
====================================
*/

const ai = {

    score: 0,
    confidence: "0%",
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
    // Bitcoin
    // ==========================

    if (market.btc >= 110000) {

        ai.technicalScore += 35;
        ai.reasons.push("BTC extremely bullish");

    }

    else if (market.btc >= 100000) {

        ai.technicalScore += 25;
        ai.reasons.push("BTC bullish");

    }

    else if (market.btc >= 95000) {

        ai.technicalScore += 15;
        ai.reasons.push("BTC neutral");

    }

    else {

        ai.technicalScore -= 20;
        ai.riskScore += 20;
        ai.reasons.push("BTC bearish");

    }

    // ==========================
    // Gold
    // ==========================

    if (market.gold >= 3400) {

        ai.fundamentalScore += 20;
        ai.reasons.push("Gold demand rising");

    }

    else if (market.gold >= 3300) {

        ai.fundamentalScore += 10;
        ai.reasons.push("Gold stable");

    }

    else {

        ai.fundamentalScore -= 10;
        ai.riskScore += 10;
        ai.reasons.push("Gold weak");

    }

    // ==========================
    // Smart Money
    // ==========================

    if (market.btcTrend === "Bullish 📈") {

        ai.smartMoneyScore += 25;
        ai.reasons.push("Institutional accumulation");

    } else {

        ai.smartMoneyScore += 5;
        ai.riskScore += 10;
        ai.reasons.push("Institutional caution");

    }

    // ==========================
    // Risk
    // ==========================

    if (ai.riskScore >= 30) {

        ai.reasons.push("High market risk");

    }

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
    // Signal
    // ==========================

    if (ai.score >= 85) {

        ai.signal = "STRONG BUY 🟢";

    }

    else if (ai.score >= 70) {

        ai.signal = "BUY 🟢";

    }

    else if (ai.score >= 50) {

        ai.signal = "HOLD 🟡";

    }

    else if (ai.score >= 30) {

        ai.signal = "SELL 🔴";

    }

    else {

        ai.signal = "STRONG SELL ⚫";

    }

    // ==========================
    // Confidence
    // ==========================

    ai.confidence = ai.score + "%";

    console.log("========== QUANTORA AI ==========");
    console.log("Score:", ai.score);
    console.log("Signal:", ai.signal);
    console.log("Confidence:", ai.confidence);
    console.log("Technical:", ai.technicalScore);
    console.log("Fundamental:", ai.fundamentalScore);
    console.log("Smart Money:", ai.smartMoneyScore);
    console.log("Risk:", ai.riskScore);
    console.log(ai.reasons);

}
