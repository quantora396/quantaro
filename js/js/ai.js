/*
====================================
        Quantora AI Engine v3
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
    ai.confidence = "Low";
    ai.signal = "WAIT";

    ai.technicalScore = 0;
    ai.fundamentalScore = 0;
    ai.smartMoneyScore = 0;
    ai.riskScore = 0;

    ai.reasons = [];
}

function addReason(text) {
    ai.reasons.push(text);
}
// ====================================
// Main AI Analysis
// ====================================

function analyzeAI() {

    resetAI();

    // BTC Analysis
    if (typeof lastBTC !== "undefined" && lastBTC > 100000) {
        ai.technicalScore += 20;
        addReason("BTC price is strong.");
    } else {
        ai.technicalScore -= 10;
        addReason("BTC is below bullish zone.");
    }

    // Gold Analysis
    if (typeof lastGold !== "undefined" && lastGold > 3000) {
        ai.fundamentalScore += 20;
        addReason("Gold remains strong.");
    }

    // Total Score
    ai.score =
        ai.technicalScore +
        ai.fundamentalScore +
        ai.smartMoneyScore -
        ai.riskScore;

    // Signal
    if (ai.score >= 30) {
        ai.signal = "BUY";
        ai.confidence = "High";
    }
    else if (ai.score >= 10) {
        ai.signal = "HOLD";
        ai.confidence = "Medium";
    }
    else {
        ai.signal = "SELL";
        ai.confidence = "Low";
    }

    console.log("Quantora AI:", ai);
}
