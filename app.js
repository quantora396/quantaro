async function loadMarket() {

    // BTC
    try {
        const btcResponse = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
        );

        const btcData = await btcResponse.json();

        document.getElementById("btc-price").innerHTML =
            "$" + btcData.bitcoin.usd.toLocaleString("en-US");

    } catch {
        document.getElementById("btc-price").innerHTML = "Error";
    }

    // Gold
    try {
        const goldResponse = await fetch(
            "https://api.gold-api.com/price/XAU"
        );

        const goldData = await goldResponse.json();

        document.getElementById("gold-price").innerHTML =
            "$" + Math.round(goldData.price).toLocaleString("en-US");

    } catch {
        document.getElementById("gold-price").innerHTML = "Error";
    }

    // DXY
    document.getElementById("dxy-price").innerHTML = "Coming Soon";
}

loadMarket();
setInterval(loadMarket, 60000);


// ======================
// Quantora AI Engine
// ======================

function runAI() {

    const btc = Number(
        document.getElementById("btc-price")
            .innerText
            .replace("$", "")
            .replace(/,/g, "")
    );

    const gold = Number(
        document.getElementById("gold-price")
            .innerText
            .replace("$", "")
            .replace(/,/g, "")
    );

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
    }

    document.getElementById("btc-trend").innerHTML = btcTrend;
    document.getElementById("gold-trend").innerHTML = goldTrend;
    document.getElementById("recommendation").innerHTML = recommendation;
}

setTimeout(runAI, 2000);
setInterval(runAI, 5000);
