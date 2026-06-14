/* =========================================================
   TypeWithFun
   app.js

   Main Application Controller
   GitHub Pages Compatible
   No Backend Required

   Responsibilities:
   - App startup
   - Theme management
   - Settings loading
   - Daily challenge system
   - Particle background
   - Navigation helpers
   - Accessibility helpers
   - Global utilities
   - Error handling
   ========================================================= */

"use strict";

/* =========================================================
   APP CONTROLLER
   ========================================================= */

const App = {

    version: "1.0.0",

    initialized: false,

    initialize() {

        try {

            this.loadSettings();

            this.initializeParticles();

            this.renderDailyChallenge();

            this.initializeAccessibility();

            this.registerGlobalEvents();

            this.bindNavigationButtons();

            this.initialized = true;

            console.log(
                `TypeWithFun ${this.version} initialized`
            );

        } catch (error) {

            console.error(
                "Application startup failed",
                error
            );

            if (
                typeof showToast === "function"
            ) {

                showToast(
                    "Application failed to initialize.",
                    "error"
                );
            }
        }
    },

    /* =====================================================
       SETTINGS
       ===================================================== */

    loadSettings() {

        if (
            typeof SettingsStorage ===
            "undefined"
        ) {
            return;
        }

        const settings =
            SettingsStorage.getSettings();

        if (!settings) return;

        this.applyTheme(
            settings.theme
        );

        this.applyFontSize(
            settings.fontSize
        );

        this.applyAnimations(
            settings.animations
        );
    },

    applyTheme(theme = "dark") {

        document.body.classList.remove(
            "light-theme"
        );

        if (theme === "light") {

            document.body.classList.add(
                "light-theme"
            );
        }
    },

    applyFontSize(size = "medium") {

        const root =
            document.documentElement;

        switch (size) {

            case "small":

                root.style.setProperty(
                    "--font-size-base",
                    "14px"
                );

                break;

            case "large":

                root.style.setProperty(
                    "--font-size-base",
                    "18px"
                );

                break;

            default:

                root.style.setProperty(
                    "--font-size-base",
                    "16px"
                );
        }
    },

    applyAnimations(enabled = true) {

        if (enabled) {

            document.body.classList.remove(
                "reduce-motion"
            );

        } else {

            document.body.classList.add(
                "reduce-motion"
            );
        }
    },

    /* =====================================================
       DAILY CHALLENGE
       ===================================================== */

    renderDailyChallenge() {

        const challengeText =
            document.getElementById(
                "dailyChallengeText"
            );

        const challenge =
            DailyChallenge.generate();

        if (
            challengeText &&
            challenge
        ) {

            challengeText.textContent =
                challenge.description;
        }

        const challengeButton =
            document.getElementById(
                "challengeButton"
            );

        if (challengeButton) {

            challengeButton.addEventListener(
                "click",
                () => {

                    localStorage.setItem(
                        "twf_active_challenge",
                        JSON.stringify(
                            challenge
                        )
                    );

                    window.location.href =
                        "pages/practice.html";
                }
            );
        }
    },

    /* =====================================================
       PARTICLE SYSTEM
       ===================================================== */

    initializeParticles() {

        const container =
            document.getElementById(
                "particles"
            );

        if (!container) return;

        container.innerHTML = "";

        const count = 30;

        for (
            let i = 0;
            i < count;
            i++
        ) {

            const particle =
                document.createElement(
                    "div"
                );

            particle.classList.add(
                "particle"
            );

            const size =
                Math.random() * 6 + 2;

            particle.style.width =
                `${size}px`;

            particle.style.height =
                `${size}px`;

            particle.style.left =
                `${Math.random() * 100}%`;

            particle.style.opacity =
                (Math.random() * 0.5)
                .toString();

            particle.style.animationDuration =
                `${10 + Math.random() * 15}s`;

            particle.style.animationDelay =
                `${Math.random() * 5}s`;

            particle.style.background =
                this.randomParticleColor();

            container.appendChild(
                particle
            );
        }
    },

    randomParticleColor() {

        const colors = [

            "rgba(79,70,229,.5)",

            "rgba(124,58,237,.5)",

            "rgba(236,72,153,.5)"
        ];

        return colors[
            Math.floor(
                Math.random() *
                colors.length
            )
        ];
    },

    /* =====================================================
       ACCESSIBILITY
       ===================================================== */

    initializeAccessibility() {

        document
            .querySelectorAll(
                "button"
            )
            .forEach(button => {

                if (
                    !button.getAttribute(
                        "aria-label"
                    ) &&
                    button.textContent.trim()
                ) {

                    button.setAttribute(
                        "aria-label",
                        button.textContent.trim()
                    );
                }
            });
    },

    /* =====================================================
       NAVIGATION
       ===================================================== */

    bindNavigationButtons() {

        const homeBtn =
            document.getElementById(
                "homeButton"
            );

        const backBtn =
            document.getElementById(
                "backButton"
            );

        if (homeBtn) {

            homeBtn.addEventListener(
                "click",
                () => Navigation.goHome()
            );
        }

        if (backBtn) {

            backBtn.addEventListener(
                "click",
                () => Navigation.goBack()
            );
        }
    },

    /* =====================================================
       EVENTS
       ===================================================== */

    registerGlobalEvents() {

        window.addEventListener(
            "error",
            event => {

                console.error(
                    "Global Error:",
                    event.error
                );
            }
        );

        window.addEventListener(
            "unhandledrejection",
            event => {

                console.error(
                    "Unhandled Promise:",
                    event.reason
                );
            }
        );
    }
};

/* =========================================================
   DAILY CHALLENGE ENGINE
   ========================================================= */

const DailyChallenge = {

    challengePool: [

        {
            id: 1,
            description:
                "Reach 50 WPM in a 60 second test.",
            reward: 100
        },

        {
            id: 2,
            description:
                "Complete 3 typing tests today.",
            reward: 75
        },

        {
            id: 3,
            description:
                "Achieve 98% accuracy.",
            reward: 150
        },

        {
            id: 4,
            description:
                "Type 500 words today.",
            reward: 125
        },

        {
            id: 5,
            description:
                "Complete a book excerpt test.",
            reward: 200
        },

        {
            id: 6,
            description:
                "Maintain 95% accuracy.",
            reward: 175
        },

        {
            id: 7,
            description:
                "Complete 5 tests today.",
            reward: 225
        },

        {
            id: 8,
            description:
                "Reach a peak WPM above 70.",
            reward: 250
        }
    ],
       generate() {

        const today =
            new Date()
                .toISOString()
                .split("T")[0];

        const stored =
            localStorage.getItem(
                "twf_daily_challenge"
            );

        if (stored) {

            try {

                const parsed =
                    JSON.parse(stored);

                if (
                    parsed.date === today
                ) {

                    return parsed.challenge;
                }

            } catch (error) {

                console.error(
                    "Challenge parse error",
                    error
                );
            }
        }

        const challenge =
            this.challengePool[
                new Date().getDate() %
                this.challengePool.length
            ];

        localStorage.setItem(
            "twf_daily_challenge",
            JSON.stringify({
                date: today,
                challenge
            })
        );

        return challenge;
    },

    completeChallenge() {

        const today =
            new Date()
                .toISOString()
                .split("T")[0];

        localStorage.setItem(
            "twf_completed_challenge",
            today
        );

        return true;
    },

    isCompletedToday() {

        const today =
            new Date()
                .toISOString()
                .split("T")[0];

        return (
            localStorage.getItem(
                "twf_completed_challenge"
            ) === today
        );
    }
};

/* =========================================================
   UTILITIES
   ========================================================= */

const Utils = {

    generateId() {

        if (
            window.crypto &&
            crypto.randomUUID
        ) {

            return crypto.randomUUID();
        }

        return (
            Date.now() +
            "-" +
            Math.random()
                .toString(36)
                .substring(2, 9)
        );
    },

    random(min, max) {

        return Math.floor(
            Math.random() *
            (max - min + 1)
        ) + min;
    },

    clamp(
        value,
        min,
        max
    ) {

        return Math.min(
            Math.max(value, min),
            max
        );
    },

    formatDate(dateString) {

        const date =
            new Date(dateString);

        return date.toLocaleDateString(
            undefined,
            {
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );
    },

    formatJoinedDate(dateString) {

        const date =
            new Date(dateString);

        return date.toLocaleDateString(
            undefined,
            {
                year: "numeric",
                month: "long"
            }
        );
    },

    debounce(
        callback,
        delay = 300
    ) {

        let timeout;

        return (...args) => {

            clearTimeout(timeout);

            timeout =
                setTimeout(
                    () =>
                        callback(...args),
                    delay
                );
        };
    },

    safeJsonParse(
        value,
        fallback = null
    ) {

        try {

            return JSON.parse(value);

        } catch {

            return fallback;
        }
    }
};

/* =========================================================
   NAVIGATION HELPERS
   ========================================================= */

const Navigation = {

    goHome() {

        const currentPath =
            window.location.pathname;

        if (
            currentPath.includes(
                "/pages/"
            )
        ) {

            window.location.href =
                "../index.html";

        } else {

            window.location.href =
                "index.html";
        }
    },

    goBack() {

        window.history.back();
    },

    redirect(url) {

        window.location.href =
            url;
    }
};

/* =========================================================
   THEME MANAGER
   ========================================================= */

const ThemeManager = {

    toggleTheme() {

        if (
            typeof SettingsStorage ===
            "undefined"
        ) {
            return;
        }

        const settings =
            SettingsStorage.getSettings();

        settings.theme =
            settings.theme === "dark"
                ? "light"
                : "dark";

        SettingsStorage.saveSettings(
            settings
        );

        App.applyTheme(
            settings.theme
        );

        return settings.theme;
    }
};

/* =========================================================
   PERFORMANCE HELPERS
   ========================================================= */

const PerformanceMonitor = {

    mark(label) {

        if (
            window.performance &&
            performance.mark
        ) {

            performance.mark(label);
        }
    },

    measure(
        name,
        start,
        end
    ) {

        if (
            window.performance &&
            performance.measure
        ) {

            performance.measure(
                name,
                start,
                end
            );
        }
    }
};

/* =========================================================
   PAGE DETECTION
   ========================================================= */

const Page = {

    current() {

        const path =
            window.location.pathname;

        if (
            path.includes(
                "profile.html"
            )
        ) {
            return "profile";
        }

        if (
            path.includes(
                "leaderboard.html"
            )
        ) {
            return "leaderboard";
        }

        if (
            path.includes(
                "practice.html"
            )
        ) {
            return "practice";
        }

        if (
            path.includes(
                "settings.html"
            )
        ) {
            return "settings";
        }

        return "home";
    }
};

/* =========================================================
   APP INFO
   ========================================================= */

const AppInfo = {

    name: "TypeWithFun",

    version: "1.0.0",

    storagePrefix: "twf_"
};

/* =========================================================
   GLOBAL EXPORTS
   ========================================================= */

window.App = App;

window.Utils = Utils;

window.Navigation =
    Navigation;

window.ThemeManager =
    ThemeManager;

window.DailyChallenge =
    DailyChallenge;

window.PerformanceMonitor =
    PerformanceMonitor;

window.Page = Page;

window.AppInfo =
    AppInfo;

/* =========================================================
   START APPLICATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        try {

            App.initialize();

        } catch (error) {

            console.error(
                "Fatal Startup Error",
                error
            );

            if (
                typeof showToast ===
                "function"
            ) {

                showToast(
                    "Failed to start application.",
                    "error"
                );
            }
        }
    }
);
