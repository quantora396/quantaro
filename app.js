
/*
====================================
        Quantora App
====================================
*/

document.addEventListener("DOMContentLoaded", async () => {

    await loadMarket();

    updateAI();

    setInterval(async () => {

        await loadMarket();

        updateAI();

    }, 60000);

});
// ======================
// Start Quantora AI
// ======================

function updateAI() {

    if (typeof calculateAIScore === "function") {

        calculateAIScore();

    } else {

        console.error("Quantora AI Engine not loaded.");

    }

}
