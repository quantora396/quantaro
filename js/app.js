/*
==========================================
        Quantora App Engine v1
==========================================
*/

"use strict";

// ================================
// App State
// ================================

const App = {

    version: "1.0.0",

    refreshInterval: 60000,

    initialized: false,

    refreshing: false

};

// ================================
// Bootstrap
// ================================

document.addEventListener("DOMContentLoaded", async () => {

    await initializeApp();

});

// ================================
// Initialize
// ================================

async function initializeApp() {

    if (App.initialized) return;

    App.initialized = true;

    console.log("Quantora Started");

    await refreshSystem();

    startAutoRefresh();

}

// ================================
// Auto Refresh
// ================================

function startAutoRefresh() {

    setInterval(async () => {

        await refreshSystem();

    }, App.refreshInterval);

}

// ================================
// Main Refresh
// ================================

async function refreshSystem() {

    if (App.refreshing) return;

    App.refreshing = true;

    try {

        if (typeof loadMarket === "function") {

            await loadMarket();

        }

        if (typeof runAI === "function") {

            runAI();

        }

        if (typeof updateUI === "function") {

            updateUI();

        }

    } catch (error) {

        console.error("Refresh Error:", error);

    } finally {

        App.refreshing = false;
    }
    }
// ================================
// Helpers
// ================================

function isFunction(fn) {

    return typeof fn === "function";

}

function logInfo(message) {

    console.log("[Quantora]", message);

}

function logError(message, error) {

    console.error("[Quantora]", message, error);

}

// ================================
// Health Check
// ================================

function checkModules() {

    return {

        api: isFunction(loadMarket),

        ai: isFunction(runAI),

        ui: isFunction(updateUI)

    };

}

// ================================
// Status
// ================================

function getAppStatus() {

    return {

        version: App.version,

        initialized: App.initialized,

        refreshing: App.refreshing,

        modules: checkModules()

    };

}

// ================================
// Manual Refresh
// ================================

async function forceRefresh() {

    logInfo("Manual Refresh");

    await refreshSystem();

}

// ================================
// Debug
// ================================

window.quantora = {

    refresh: forceRefresh,

    status: getAppStatus,

    version: App.version
            };
// ================================
// Events
// ================================

document.addEventListener("visibilitychange", async () => {

    if (!document.hidden) {

        await refreshSystem();

    }

});

window.addEventListener("online", async () => {

    logInfo("Internet Connected");

    await refreshSystem();

});

window.addEventListener("offline", () => {

    logError("Internet Disconnected");

});

// ================================
// Shutdown
// ================================

window.addEventListener("beforeunload", () => {

    logInfo("Quantora Closed");

});
// ================================
// Error Handler
// ================================

window.addEventListener("error", (event) => {

    console.error("Quantora Error:", event.message);

});

window.addEventListener("unhandledrejection", (event) => {

    console.error("Unhandled Promise:", event.reason);

});

// ================================
// Public API
// ================================

window.QuantoraApp = {

    init: initializeApp,

    refresh: forceRefresh,

    status: getAppStatus,

    version() {

        return App.version;

    }

};

// ================================
// End Of File
// ================================
