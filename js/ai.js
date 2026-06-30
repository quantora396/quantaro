/* ==========================================
   Quantora AI v2
========================================== */

function runAI() {

    let score = 0;

    // ======================
    // Bitcoin
    // ======================

    if (market.btc !== null) {

        if (market.btc >= 100000) {

            market.btcTrend = "Bullish 📈";
            score += 2;

        } else if (market.btc >= 95000) {

            market.btcTrend = "Neutral ➖";
            score += 1;

        } else {

            market.btcTrend = "Bearish 📉";
            score -= 2;

        }

    } else {

        market.btcTrend = "No Data";

    }

    // ======================
    // Gold
    // ======================

    if (market.gold !== null) {

        if (market.gold >= 3300) {

            market.goldTrend = "Bullish 📈";
            score += 1;

        } else if (market.gold >= 3200) {

            market.goldTrend = "Neutral ➖";

        } else {

            market.goldTrend = "Bearish 📉";
            score -= 1;

        }

    } else {

        market.goldTrend = "No Data";

    }

    // ======================
    // Market Fear Index
    // ======================

    if (market.fear !== null) {

        if (market.fear < 30) {

            score += 2;

        } else if (market.fear > 70) {

            score -= 2;

        }

    }

    // ======================
    // Dollar Index
    // ======================

    if (market.dxy !== null) {

        if (market.dxy > 105) {

            score -= 1;

        } else if (market.dxy < 102) {

            score += 1;

        }

    }

    // ======================
    // Final Recommendation
    // ======================

    if (score >= 4) {

        market.recommendation = "STRONG BUY 🟢🟢";

    } else if (score >= 2) {

        market.recommendation = "BUY 🟢";

    } else if (score <= -4) {

        market.recommendation = "STRONG SELL 🔴🔴";

    } else if (score <= -2) {

        market.recommendation = "SELL 🔴";

    } else {

        market.recommendation = "WAIT 🟡";

    }

    market.aiScore = score;

}
