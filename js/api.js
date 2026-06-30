/* ==========================================
   Quantora API
========================================== */

const API = {

    btc: "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",

    gold: "https://api.gold-api.com/price/XAU"

};

/* ==========================================
   Fetch With Timeout
========================================== */

async function fetchWithTimeout(url, timeout = 5000) {

    const controller = new AbortController();

    const timer = setTimeout(() => controller.abort(), timeout);

    try {

        const response = await fetch(url, {

            signal: controller.signal

        });

        clearTimeout(timer);

        return await response.json();

    }

    catch (error) {

        clearTimeout(timer);

        console.error(error);

        return null;

    }

}

/* ==========================================
   Market Data
========================================== */

const market = {

    btc: null,

    gold: null

};

async function refreshMarketData() {

    const btc = await fetchWithTimeout(API.btc);

    if (btc && btc.bitcoin) {

        market.btc = btc.bitcoin.usd;

    }

    const gold = await fetchWithTimeout(API.gold);

    if (gold && gold.price) {

        market.gold = gold.price;

    }

}
