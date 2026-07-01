/*
====================================
        Quantora UI Engine v3
====================================
*/

"use strict";

function updateUI() {

    // ==========================
    // BTC Price
    // ==========================
    const btcPrice = document.getElementById("btc-price");

    if (btcPrice && market.btc !== null) {
        btcPrice.innerHTML =
            "$" + Number(market.btc).toLocaleString("en-US");
    }

    // ==========================
    // Gold Price
    // ==========================
    const goldPrice = document.getElementById("gold-price");

    if (goldPrice && market.gold !== null) {
        goldPrice.innerHTML =
            "$" + Number(market.gold).toLocaleString("en-US");
    }

    // ==========================
    // DXY
    // ==========================
    const dxyPrice = document.getElementById("dxy-price");

    if (dxyPrice && market.dxy !== null) {
        dxyPrice.innerHTML = market.dxy;
    }

    // ==========================
    // BTC Trend
    // ==========================
    const btcTrend = document.getElementById("btc-trend");

    if (btcTrend) {
        btcTrend.innerHTML = market.btcTrend || "-";
    }

    // ==========================
    // Gold Trend
    // ==========================
    const goldTrend = document.getElementById("gold-trend");

    if (goldTrend) {
        goldTrend.innerHTML = market.goldTrend || "-";
    }

    // ==========================
    // DXY Trend
    // ==========================
    const dxyTrend = document.getElementById("dxy-trend");

    if (dxyTrend) {
        dxyTrend.innerHTML = market.dxyTrend || "Coming Soon";
    }

    // ==========================
    // AI Recommendation
    // ==========================
    const recommendation = document.getElementById("recommendation");

    if (recommendation) {
        recommendation.innerHTML = market.recommendation || "Analyzing...";
    }

    // ==========================
    // AI Confidence
    // ==========================
    const confidence = document.getElementById("ai-confidence");

    if (confidence && typeof ai !== "undefined") {
        confidence.innerHTML = ai.confidence;
    }

}
