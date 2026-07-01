/*
==========================================
        Quantora App Engine v3
==========================================
*/

// جلوگیری از اجرای همزمان
let isLoading = false;

// آخرین داده‌های معتبر
let market = {
    btc: null,
    btcChange: null,
    gold: null,
    dxy: null
};

// ======================
// Fetch With Timeout
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
// Load Market Data
// ======================

async function loadMarket() {

    if (isLoading) return;

    isLoading = true;

    try {

        // ======================
        // Bitcoin
        // ======================

        try {

            const btcData = await fetchWithTimeout(
                "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true"
            );

            market.btc = btcData.bitcoin.usd;
            market.btcChange = btcData.bitcoin.usd_24h_change;

            const btcElement = document.getElementById("btc-price");

            if (btcElement) {

                btcElement.innerHTML =
                    "$" +
                    market.btc.toLocaleString("en-US") +
                    "<br><small>" +
                    market.btcChange.toFixed(2) +
                    "% (24h)</small>";

                btcElement.style.color =
                    market.btcChange >= 0 ? "#22c55e" : "#ef4444";

            }

        } catch (error) {

            console.error("BTC Error:", error);

        }

        // ======================
        // Gold
        // ======================

        try {

            const goldData = await fetchWithTimeout(
                "https://api.gold-api.com/price/XAU"
            );

            market.gold = Math.round(goldData.price);

            const goldElement = document.getElementById("gold-price");

            if (goldElement) {

                goldElement.innerHTML =
                    "$" + market.gold.toLocaleString("en-US");

            }

        } catch (error) {

            console.error("Gold Error:", error);

        }
