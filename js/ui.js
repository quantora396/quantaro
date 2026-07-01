/*
====================================
        Quantora UI v2
====================================
*/

function updateUI() {

    // قیمت‌ها
    if (typeof lastBTC !== "undefined" && lastBTC !== null) {
        document.getElementById("btc-price").innerHTML =
            "$" + lastBTC.toLocaleString("en-US");
    }

    if (typeof lastGold !== "undefined" && lastGold !== null) {
        document.getElementById("gold-price").innerHTML =
            "$" + lastGold.toLocaleString("en-US");
    }

    // خروجی AI
    if (typeof ai !== "undefined") {

        if (document.getElementById("btc-trend"))
            document.getElementById("btc-trend").innerHTML = ai.reasons[0] || "-";

        if (document.getElementById("gold-trend"))
            document.getElementById("gold-trend").innerHTML = ai.reasons[1] || "-";

        if (document.getElementById("recommendation"))
            document.getElementById("recommendation").innerHTML = ai.signal;

    }

}
