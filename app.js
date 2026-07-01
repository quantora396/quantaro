/*
==========================================
        Quantora App Engine v3
==========================================
*/

// جلوگیری از اجرای همزمان
let isLoading = false;

// آخرین داده‌های معتبر
let market = {
    btc: null,
    btcChange: null,
    gold: null,
    dxy: null
};

// ======================
// Fetch With Timeout
// ======================

async function fetchWithTimeout(url, timeout = 5000) {

    const controller = new AbortController();

    const timer = setTimeout(() => controller.abort(), timeout);

    try {

        const response = await fetch(url, {
            signal: controller.signal
        });

        clearTimeout(timer);

        if (!response.ok) {
            throw new Error("API Error");
        }

        return await response.json();

    } catch (err) {

        clearTimeout(timer);

        throw err;

    }

}
