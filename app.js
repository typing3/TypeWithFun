/* =========================================================
   TypeWithFun
   app.js

   Main Application Controller

   Responsibilities:
   - App startup
   - Theme management
   - Settings loading
   - Daily challenge system
   - Particle background
   - Navigation helpers
   - Accessibility enhancements
   - Global error handling
   ========================================================= */

"use strict";

/* =========================================================
   APP CONFIG
   ========================================================= */

const App = {

    version: "1.0.0",

    initialized: false,

    /* =====================================================
       START APP
       ===================================================== */

    initialize() {

        try {

            this.loadSettings();

            this.renderDailyChallenge();

            this.initializeParticles();

            this.initializeAccessibility();

            this.registerGlobalEvents();

            this.initialized = true;

            console.log(
                `TypeWithFun v${this.version} loaded`
            );

        } catch (error) {

            console.error(
                "Application startup failed",
                error
            );

            showToast(
                "Application failed to initialize.",
                "error"
            );
        }
    },

    /* =====================================================
       LOAD SETTINGS
       ===================================================== */

    loadSettings() {

        const settings =
            SettingsStorage.getSettings();

        if (!settings) return;

        this.applyTheme(
