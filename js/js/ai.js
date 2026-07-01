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
