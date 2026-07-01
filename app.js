
/*
====================================
        Quantora App
====================================
*/

document.addEventListener("DOMContentLoaded", () => {

    loadMarket();

    setInterval(() => {
        loadMarket();
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
