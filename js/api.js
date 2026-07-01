/*
==========================================
        Quantora API Engine v1
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

    gold: null,

    dxy: null

};// ================================
// Fetch With Timeout
// ================================

async function fetchWithTimeout(url, timeout = 5000) {

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

    }

    catch (error) {

        clearTimeout(timer);

        console.error(error);

        return null;

    }

}

// ================================
// Bitcoin
// ================================

async function loadBTC() {

    const data = await fetchWithTimeout(API.BTC);

    if (!data || !data.bitcoin) {

        return;

    }

    market.btc = data.bitcoin.usd;

    market.btcChange = data.bitcoin.usd_24h_change;

    cache.btc = market.btc;

}// ================================
// Gold
// ================================

async function loadGold() {

    const data = await fetchWithTimeout(API.GOLD);

    if (!data || !data.price) {

        return;

    }

    market.gold = Math.round(data.price);

    cache.gold = market.gold;

}

// ================================
// DXY
// ================================

async function loadDXY() {

    if (!API.DXY) {

        market.dxy = null;

        return;

    }

    const data = await fetchWithTimeout(API.DXY);

    if (!data) {

        return;

    }

    market.dxy = data.price ?? null;

    cache.dxy = market.dxy;

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
// Public API
// ================================

window.QuantoraAPI = {

    market,

    cache,

    refresh: refreshMarket,

    snapshot: getMarketSnapshot,

    ready: hasMarketData

};

// ================================
// End Of File
// ================================
