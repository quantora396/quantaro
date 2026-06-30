/*
====================================
    Quantora UI
====================================
*/

function updateUI() {

    if (market.btc !== null) {
        document.getElementById("btc-price").innerHTML =
            "$" + Number(market.btc).toLocaleString("en-US");
    }

    if (market.gold !== null) {
        document.getElementById("gold-price").innerHTML =
            "$" + Number(market.gold).toLocaleString("en-US");
    }

    if (market.btcTrend) {
        document.getElementById("btc-trend").innerHTML =
            market.btcTrend;
    }

    if (market.goldTrend) {
        document.getElementById("gold-trend").innerHTML =
            market.goldTrend;
    }

    if (market.recommendation) {
        document.getElementById("recommendation").innerHTML =
            market.recommendation;
    }

}
