
/*
====================================
        Quantora App
====================================
*/

document.addEventListener("DOMContentLoaded", () => {

    loadMarket();

updateAI();

setInterval(() => {

    loadMarket();

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
