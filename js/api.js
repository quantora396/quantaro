/*
==========================================
        Quantora API Engine v2
==========================================
*/

"use strict";

// ================================
// API Endpoints
// ================================

const API = {

    BTC: "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true",

    GOLD: "https://api.gold-api.com/price/XAU",

    DXY: null

};

// ================================
// Configuration
// ================================

const CONFIG = {

    timeout: 5000,

    retries: 3,

    refreshInterval: 60000

};

// ================================
// Market State
// ================================

const market = {

    btc: null,

    btcChange: null,

    gold: null,

    dxy: null,

    btcTrend: "",

    goldTrend: "",

    dxyTrend: "",

    recommendation: "",

    lastUpdate: null

};

// ================================
// Cache
// ================================

const cache = {

    btc: null,

    btcChange: null,

    gold: null,

    dxy: null,

    lastUpdate: null

};

// ================================
// Fetch With Timeout
// ================================

async function fetchWithTimeout(url, timeout = CONFIG.timeout) {

    if (!url) return null;

    const controller = new AbortController();

    const timer = setTimeout(() => {

        controller.abort();

    }, timeout);

    try {

        const response = await fetch(url, {

            signal: controller.signal,

            cache: "no-store"

        });

        clearTimeout(timer);

        if (!response.ok) {

            throw new Error("API Error");

        }

        return await response.json();

    } catch (error) {

        clearTimeout(timer);

        console.error("Fetch Error:", error);

        return null;

    }

}

// ================================
// Retry Helper
// ================================

async function fetchWithRetry(url) {

    for (let i = 0; i < CONFIG.retries; i++) {

        const data = await fetchWithTimeout(url);

        if (data) {

            return data;

        }

    }

    return null;

}// ================================
// Bitcoin
// ================================

async function loadBTC() {

    const data = await fetchWithRetry(API.BTC);

    if (data && data.bitcoin) {

        market.btc = data.bitcoin.usd;
        market.btcChange = data.bitcoin.usd_24h_change;

        cache.btc = market.btc;
        cache.btcChange = market.btcChange;
        cache.lastUpdate = new Date();

    } else if (cache.btc !== null) {

        market.btc = cache.btc;
        market.btcChange = cache.btcChange;

    }

}

// ================================
// Gold
// ================================

async function loadGold() {

    const data = await fetchWithRetry(API.GOLD);

    if (data && data.price) {

        market.gold = Math.round(data.price);

        cache.gold = market.gold;
        cache.lastUpdate = new Date();

    } else if (cache.gold !== null) {

        market.gold = cache.gold;

    }

}

// ================================
// DXY
// ================================

async function loadDXY() {

    if (!API.DXY) {

        market.dxy = cache.dxy ?? null;
        return;

    }

    const data = await fetchWithRetry(API.DXY);

    if (data) {

        market.dxy = data.price ?? null;

        cache.dxy = market.dxy;
        cache.lastUpdate = new Date();

    } else if (cache.dxy !== null) {

        market.dxy = cache.dxy;

    }

}

// ================================
// Load All Markets
// ================================

async function loadMarket() {

    await Promise.all([
        loadBTC(),
        loadGold(),
        loadDXY()
    ]);

    market.lastUpdate = new Date();

}// ================================
// Market Helpers
// ================================

function hasMarketData() {

    return market.btc !== null && market.gold !== null;

}

function getMarketSnapshot() {

    return {

        btc: market.btc,
        btcChange: market.btcChange,
        gold: market.gold,
        dxy: market.dxy,
        lastUpdate: market.lastUpdate

    };

}

// ================================
// Force Refresh
// ================================

async function refreshMarket() {

    await loadMarket();

    return getMarketSnapshot();

}

// ================================
// Auto Refresh
// ================================

async function startMarketEngine() {

    await loadMarket();

    setInterval(async () => {

        await loadMarket();

    }, CONFIG.refreshInterval);

}

// ================================
// Public API
// ================================

window.QuantoraAPI = {

    market,

    cache,

    refresh: refreshMarket,

    snapshot: getMarketSnapshot,

    ready: hasMarketData,

    start: startMarketEngine

};

// ================================
// Auto Start
// ================================

document.addEventListener("DOMContentLoaded", () => {

    startMarketEngine();

});

// ================================
// End Of File
// ================================
