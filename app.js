// جلوگیری از اجرای همزمان
let isLoading = false;

// آخرین داده‌های معتبر
let lastBTC = null;
let lastBTCChange = null;
let lastGold = null;

// ======================
// دریافت اطلاعات بازار
// ======================

async function fetchWithTimeout(url, timeout = 5000) {

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    try {

        const response = await fetch(url, {
            signal: controller.signal
        });

        clearTimeout(timer);

        if (!response.ok) {
            throw new Error("API Error");
        }

        return await response.json();

    } catch (err) {

        clearTimeout(timer);
        throw err;

    }

}

// ======================
// دریافت اطلاعات بازار
// ======================

async function loadMarket() {

    if (isLoading) return;

    isLoading = true;

    try {

        // BTC
        try {

            const btcData = await fetchWithTimeout(
                "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true"
            );

            lastBTC = btcData.bitcoin.usd;
            lastBTCChange = btcData.bitcoin.usd_24h_change;

            const btcElement = document.getElementById("btc-price");

            btcElement.innerHTML =
                "$" +
                lastBTC.toLocaleString("en-US") +
                "<br><small>" +
                lastBTCChange.toFixed(2) +
                "% (24h)</small>";

            btcElement.style.color =
                lastBTCChange >= 0 ? "#22c55e" : "#ef4444";

        } catch (e) {

            if (lastBTC !== null) {

                document.getElementById("btc-price").innerHTML =
                    "$" + lastBTC.toLocaleString("en-US");

            }

        }

        // GOLD
        try {

            const goldData = await fetchWithTimeout(
                "https://api.gold-api.com/price/XAU"
            );

            lastGold = Math.round(goldData.price);

            document.getElementById("gold-price").innerHTML =
                "$" + lastGold.toLocaleString("en-US");

        } catch (e) {

            if (lastGold !== null) {

                document.getElementById("gold-price").innerHTML =
                    "$" + lastGold.toLocaleString("en-US");

            }

        }

        // DXY
        document.getElementById("dxy-price").innerHTML = "Coming Soon";

        runAI();

    } finally {

        isLoading = false;

    }

}// ======================
// Quantora AI Engine
// ======================

function runAI() {

    if (lastBTC === null || lastGold === null) return;

    let btcTrend = "Neutral";
    let goldTrend = "Neutral";
    let recommendation = "WAIT";

    // تحلیل BTC بر اساس تغییرات 24 ساعته
    if (lastBTCChange > 2) {

        btcTrend = "Bullish 📈";

    } else if (lastBTCChange < -2) {

        btcTrend = "Bearish 📉";

    }

    // تحلیل Gold
    if (lastGold > 3300) {

        goldTrend = "Bullish 📈";

    } else {

        goldTrend = "Bearish 📉";

    }

    // پیشنهاد AI
    if (btcTrend === "Bullish 📈" && goldTrend === "Bullish 📈") {

        recommendation = "BUY 🟢";

    } else if (btcTrend === "Bearish 📉") {

        recommendation = "SELL 🔴";

    } else {

        recommendation = "HOLD 🟡";

    }

    const btcTrendElement = document.getElementById("btc-trend");
    const goldTrendElement = document.getElementById("gold-trend");
    const recommendationElement = document.getElementById("recommendation");

    btcTrendElement.innerHTML = btcTrend;
    goldTrendElement.innerHTML = goldTrend;
    recommendationElement.innerHTML = recommendation;

    // رنگ‌بندی
    btcTrendElement.style.color =
        btcTrend.includes("Bullish") ? "#22c55e" : "#ef4444";

    goldTrendElement.style.color =
        goldTrend.includes("Bullish") ? "#22c55e" : "#ef4444";

    if (recommendation.includes("BUY")) {

        recommendationElement.style.color = "#22c55e";

    } else if (
