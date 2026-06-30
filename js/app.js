/*
====================================
        Quantora App
====================================
*/

async function startQuantora() {

    await refreshMarketData();

    runAI();

    updateUI();

}

startQuantora();

// هر 30 ثانیه بروزرسانی
setInterval(async () => {

    await refreshMarketData();

    runAI();

    updateUI();

}, 30000);
