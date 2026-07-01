/*
====================================
        Quantora AI Engine v4
====================================
*/

const ai = {

    score: 0,
    confidence: "0%",
    signal: "WAIT",

    technicalScore: 0,
    fundamentalScore: 0,
    smartMoneyScore: 0,
    sentimentScore: 0,
    macroScore: 0,
    riskScore: 0,

    marketStrength: 0,
    trendPower: 0,

    reasons: []

};

// ====================================
// Reset AI
// ====================================

function resetAI() {

    ai.score = 0;

    ai.technicalScore = 0;
    ai.fundamentalScore = 0;
    ai.smartMoneyScore = 0;
    ai.sentimentScore = 0;
    ai.macroScore = 0;
    ai.riskScore = 0;

    ai.marketStrength = 0;
    ai.trendPower = 0;

    ai.signal = "WAIT";
    ai.confidence = "0%";

    ai.reasons = [];

}

// ====================================
// Helpers
// ====================================

function addReason(text) {

    ai.reasons.push(text);

}

function addScore(section, value) {

    switch (section) {

        case "technical":
            ai.technicalScore += value;
            break;

        case "fundamental":
            ai.fundamentalScore += value;
            break;

        case "smart":
            ai.smartMoneyScore += value;
            break;

        case "macro":
            ai.macroScore += value;
            break;

        case "sentiment":
            ai.sentimentScore += value;
            break;

        case "risk":
            ai.riskScore += value;
            break;

    }

}

// ====================================
// Main AI
// ====================================

function calculateAIScore() {

    resetAI();

    // ==============================
    // Bitcoin
    // ==============================

    if (market.btc !== null) {

        if (market.btc >= 110000) {

            addScore("technical", 35);
            ai.trendPower += 25;
            addReason("BTC extremely bullish");

        }

        else if (market.btc >= 100000) {

            addScore("technical", 25);
            ai.trendPower += 18;
            addReason("BTC bullish");

        }

        else if (market.btc >= 95000) {

            addScore("technical", 15);
            ai.trendPower += 10;
            addReason("BTC neutral");

        }

        else {

            addScore("technical", -20);
            addScore("risk", 20);
            addReason("BTC bearish");

        }

    }

    // ==============================
    // Gold
    // ==============================

    if (market.gold !== null) {

        if (market.gold >= 3500) {

            addScore("technical", 30);
            addScore("smart", 20);
            addReason("Gold extremely bullish");

        }

        else if (market.gold >= 3300) {

            addScore("technical", 20);
            addScore("smart", 10);
            addReason("Gold bullish");

        }

        else if (market.gold >= 3000) {

            addScore("technical", 10);
            addReason("Gold stable");

        }

        else {

            addScore("technical", -10);
            addScore("risk", 15);
            addReason("Gold weak");

        }

    }

    // بخش دوم از همینجا ادامه پیدا می‌کند...    // ==============================
    // DXY (Dollar Index)
    // ==============================

    if (market.dxy !== undefined && market.dxy !== null) {

        if (market.dxy <= 100) {

            addScore("macro", 20);
            addReason("Weak Dollar");

        } else if (market.dxy <= 105) {

            addScore("macro", 10);
            addReason("Neutral Dollar");

        } else {

            addScore("macro", -15);
            addScore("risk", 10);
            addReason("Strong Dollar");

        }

    }

    // ==============================
    // VIX
    // ==============================

    if (market.vix !== undefined && market.vix !== null) {

        if (market.vix <= 18) {

            addScore("sentiment", 20);
            addReason("Low market fear");

        } else if (market.vix <= 25) {

            addScore("sentiment", 10);
            addReason("Normal volatility");

        } else {

            addScore("risk", 25);
            addReason("High volatility");

        }

    }

    // ==============================
    // Fear & Greed Index
    // ==============================

    if (market.fearGreed !== undefined && market.fearGreed !== null) {

        if (market.fearGreed >= 75) {

            addScore("sentiment", 20);
            addReason("Extreme Greed");

        } else if (market.fearGreed >= 50) {

            addScore("sentiment", 10);
            addReason("Greed");

        } else if (market.fearGreed >= 30) {

            addReason("Neutral Sentiment");

        } else {

            addScore("risk", 20);
            addReason("Fear");

        }

    }

    // ==============================
    // BTC Dominance
    // ==============================

    if (market.btcDominance !== undefined && market.btcDominance !== null) {

        if (market.btcDominance >= 60) {

            addScore("smart", 15);
            addReason("BTC Dominance High");

        } else {

            addReason("Altcoin Strength");

        }

    }

    // ==============================
    // ETF Flow
    // ==============================

    if (market.etfFlow !== undefined && market.etfFlow !== null) {

        if (market.etfFlow > 0) {

            addScore("smart", 25);
            addReason("ETF Inflow");

        } else {

            addScore("risk", 20);
            addReason("ETF Outflow");

        }

    }

    // ==============================
    // Funding Rate
    // ==============================

    if (market.fundingRate !== undefined && market.fundingRate !== null) {

        if (market.fundingRate > 0) {

            addScore("smart", 10);
            addReason("Positive Funding");

        } else {

            addScore("risk", 10);
            addReason("Negative Funding");

        }

    }

    // ==============================
    // Open Interest
    // ==============================

    if (market.openInterest !== undefined && market.openInterest !== null) {

        if (market.openInterest > 0) {

            addScore("smart", 15);
            addReason("Open Interest Rising");

        }

    }

    // بخش ۳ از اینجا ادامه پیدا می‌کند...    // ==============================
    // Market Strength
    // ==============================

    ai.marketStrength =
        ai.technicalScore +
        ai.smartMoneyScore +
        ai.sentimentScore +
        ai.macroScore;

    // ==============================
    // Final Score
    // ==============================

    ai.score =
        ai.technicalScore +
        ai.fundamentalScore +
        ai.smartMoneyScore +
        ai.sentimentScore +
        ai.macroScore -
        ai.riskScore;

    if (ai.score > 100)
        ai.score = 100;

    if (ai.score < 0)
        ai.score = 0;

    // ==============================
    // Confidence
    // ==============================

    let confidence = 40;

    if (ai.score >= 80) confidence += 25;
    else if (ai.score >= 60) confidence += 15;
    else if (ai.score >= 40) confidence += 10;

    if (ai.reasons.length >= 6) confidence += 15;
    if (ai.riskScore <= 10) confidence += 10;
    if (confidence > 100) confidence = 100;

    ai.confidence = confidence + "%";

    // ==============================
    // Signal
    // ==============================

    if (ai.score >= 85) {

        ai.signal = "STRONG BUY 🟢";

    } else if (ai.score >= 70) {

        ai.signal = "BUY 🟢";

    } else if (ai.score >= 50) {

        ai.signal = "HOLD 🟡";

    } else if (ai.score >= 30) {

        ai.signal = "SELL 🔴";

    } else {

        ai.signal = "STRONG SELL ⚫";

    }

    // ==============================
    // Trend Power
    // ==============================

    ai.trendPower =
        Math.max(
            0,
            Math.min(
                100,
                ai.technicalScore +
                ai.smartMoneyScore -
                ai.riskScore
            )
        );

    // ==============================
    // Console Output
    // ==============================

    console.log("========== QUANTORA AI v4 ==========");
    console.log("Score:", ai.score);
    console.log("Signal:", ai.signal);
    console.log("Confidence:", ai.confidence);
    console.log("Market Strength:", ai.marketStrength);
    console.log("Trend Power:", ai.trendPower);
    console.log("Technical:", ai.technicalScore);
    console.log("Fundamental:", ai.fundamentalScore);
    console.log("Macro:", ai.macroScore);
    console.log("Sentiment:", ai.sentimentScore);
    console.log("Smart Money:", ai.smartMoneyScore);
    console.log("Risk:", ai.riskScore);
    console.log("Reasons:", ai.reasons);

}
