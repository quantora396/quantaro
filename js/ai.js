/* ==========================================
   Quantora AI
========================================== */

function runAI() {

    let btcTrend = "WAIT";
    let goldTrend = "WAIT";
    let recommendation = "WAIT";

    if (market.btc !== null) {

        if (market.btc >= 100000) {

            btcTrend = "Bullish 📈";

        } else {

            btcTrend = "Bearish 📉";

        }

    }

    if (market.gold !== null) {

        if (market.gold >= 3300) {

            goldTrend = "Bullish 📈";

        } else {

            goldTrend = "Bearish 📉";

        }

    }

    if (

        btcTrend === "Bullish 📈" &&
        goldTrend === "Bullish 📈"

    ) {

        recommendation = "BUY 🟢";

    }

    else if (

        btcTrend === "Bearish 📉"

    ) {

        recommendation = "SELL 🔴";

    }

    else {

        recommendation = "WAIT 🟡";

    }

    market.btcTrend = btcTrend;
    market.goldTrend = goldTrend;
    market.recommendation = recommendation;

}
