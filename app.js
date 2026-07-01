
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
