// جلوگیری از اجرای همزمان
let isLoading = false;

// آخرین داده معتبر
let lastBTC = null;
let lastGold = null;

// ======================
// دریافت اطلاعات بازار
// ======================

async function fetchWithTimeout(url, timeout = 4000) {

    const controller = new AbortController();

    const timer = setTimeout(() => controller.abort(), timeout);

    try {

        const response = await fetch(url, {
            signal: controller.signal
        });

        clearTimeout(timer);

        return await response.json();

    } catch (error) {

        clearTimeout(timer);
        throw error;

    }

}

async function loadMarket() {

    if (isLoading) return;

    isLoading = true;

    try {

        // BTC
        try {

            const btcData = await fetchWithTimeout(
                "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
            );

            lastBTC = btcData.bitcoin.usd;

            document.getElementById("btc-price").innerHTML =
                "$" + lastBTC.toLocaleString("en-US");

        } catch (e) {

            if (lastBTC !== null) {

                document.getElementById("btc-price").innerHTML =
                    "$" + lastBTC.toLocaleString("en-US");

            }

        }

        // Gold
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

}

// ======================
// Quantora AI Engine
// ======================

function runAI() {

    const btc = lastBTC;
    const gold = lastGold;

    if (btc === null || gold === null) return;

    let btcTrend = "Neutral";
    let goldTrend = "Neutral";
    let recommendation = "WAIT";

    if (btc > 60000) {

        btcTrend = "Bullish 📈";

    } else {

        btcTrend = "Bearish 📉";

    }

    if (gold > 3300) {

        goldTrend = "Bullish 📈";

    } else {

        goldTrend = "Bearish 📉";

    }

    if (btcTrend === "Bullish 📈" && goldTrend === "Bullish 📈") {

        recommendation = "BUY";

    } else if (btcTrend === "Bearish 📉") {

        recommendation = "SELL";

    } else {

        recommendation = "WAIT";

    }

    document.getElementById("btc-trend").innerHTML = btcTrend;
    document.getElementById("gold-trend").innerHTML = goldTrend;
    document.getElementById("recommendation").innerHTML = recommendation;

}

// اجرای اولیه
loadMarket();

// بروزرسانی هر ۵ ثانیه
setInterval(loadMarket, 5000);
