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
