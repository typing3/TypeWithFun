/* =========================================================
   TypeWithFun
   storage.js

   LocalStorage Database Layer
   GitHub Pages Compatible
   No Backend Required

   Responsibilities:
   - Database initialization
   - Safe localStorage access
   - User persistence
   - Session persistence
   - Statistics storage
   - Achievement storage
   - Settings storage
   - Leaderboards storage
   - Corruption recovery
   ========================================================= */

"use strict";

/* =========================================================
   DATABASE CONFIG
   ========================================================= */

const DB_KEYS = {
    USERS: "twf_users",
    SESSION: "twf_session",
    SETTINGS: "twf_settings",
    LEADERBOARD: "twf_leaderboard",
    CHALLENGES: "twf_challenges",
    VERSION: "twf_db_version"
};

const DB_VERSION = "1.0.0";

/* =========================================================
   STORAGE SERVICE
   ========================================================= */

const StorageService = {

    /* =====================
       SAFE JSON PARSE
       ===================== */

    safeParse(value, fallback = null) {
        try {
            return JSON.parse(value);
        } catch (error) {
            console.error("JSON Parse Error:", error);
            return fallback;
        }
    },

    /* =====================
       SAFE GET
       ===================== */

    get(key, fallback = null) {
        try {
            const value = localStorage.getItem(key);

            if (value === null) {
                return fallback;
            }

            return this.safeParse(value, fallback);

        } catch (error) {
            console.error(`Failed reading ${key}`, error);
            return fallback;
        }
    },

    /* =====================
       SAFE SET
       ===================== */

    set(key, value) {
        try {
            localStorage.setItem(
                key,
                JSON.stringify(value)
            );

            return true;

        } catch (error) {
            console.error(`Failed saving ${key}`, error);
            return false;
        }
    },

    /* =====================
       REMOVE
       ===================== */

    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(error);
        }
    },

    /* =====================
       EXISTS
       ===================== */

    exists(key) {
        return localStorage.getItem(key) !== null;
    }
};

/* =========================================================
   DEFAULT USER TEMPLATE
   ========================================================= */

function createUserTemplate({
    email,
    username,
    passwordHash
}) {

    return {

        id: crypto.randomUUID(),

        email,

        username,

        passwordHash,

        avatar:
            "https://ui-avatars.com/api/?background=4F46E5&color=fff&name=" +
            encodeURIComponent(username),

        joinedDate:
            new Date().toISOString(),

        profileVisibility: "public",

        achievements: [],

        statistics: {

            bestWPM: 0,

            averageWPM: 0,

            highestAccuracy: 0,

            averageAccuracy: 0,

            totalTestsCompleted: 0,

            totalWordsTyped: 0,

            totalTypingTime: 0,

            streak: 0,

            lastPracticeDate: null
        },

        typingHistory: []
    };
}

/* =========================================================
   DEFAULT SETTINGS
   ========================================================= */

function createDefaultSettings() {

    return {

        theme: "dark",

        fontSize: "medium",

        typingSounds: true,

        animations: true
    };
}

/* =========================================================
   DATABASE INITIALIZER
   ========================================================= */

const Database = {

    initialize() {

        try {

            if (!StorageService.exists(DB_KEYS.USERS)) {
                StorageService.set(
                    DB_KEYS.USERS,
                    []
                );
            }

            if (!StorageService.exists(DB_KEYS.LEADERBOARD)) {
                StorageService.set(
                    DB_KEYS.LEADERBOARD,
                    []
                );
            }

            if (!StorageService.exists(DB_KEYS.CHALLENGES)) {
                StorageService.set(
                    DB_KEYS.CHALLENGES,
                    []
                );
            }

            if (!StorageService.exists(DB_KEYS.SETTINGS)) {
                StorageService.set(
                    DB_KEYS.SETTINGS,
                    createDefaultSettings()
                );
            }

            StorageService.set(
                DB_KEYS.VERSION,
                DB_VERSION
            );

            console.log(
                "TypeWithFun Database Initialized"
            );

        } catch (error) {

            console.error(
                "Database initialization failed",
                error
            );
        }
    }
};

/* =========================================================
   USER STORAGE
   ========================================================= */

const UserStorage = {

    getAllUsers() {

        return StorageService.get(
            DB_KEYS.USERS,
            []
        );
    },

    saveUsers(users) {

        return StorageService.set(
            DB_KEYS.USERS,
            users
        );
    },

    createUser(data) {

        const users =
            this.getAllUsers();

        const newUser =
            createUserTemplate(data);

        users.push(newUser);

        this.saveUsers(users);

        return newUser;
    },

    findByEmail(email) {

        return this.getAllUsers().find(
            user =>
                user.email.toLowerCase() ===
                email.toLowerCase()
        );
    },

    findByUsername(username) {

        return this.getAllUsers().find(
            user =>
                user.username.toLowerCase() ===
                username.toLowerCase()
        );
    },

    findById(id) {

        return this.getAllUsers().find(
            user => user.id === id
        );
    },

    updateUser(updatedUser) {

        const users =
            this.getAllUsers();

        const index =
            users.findIndex(
                user =>
                    user.id === updatedUser.id
            );

        if (index === -1) {
            return false;
        }

        users[index] = updatedUser;

        return this.saveUsers(users);
    },

    deleteUser(userId) {

        const users =
            this.getAllUsers().filter(
                user => user.id !== userId
            );

        return this.saveUsers(users);
    }
};

/* =========================================================
   SESSION STORAGE
   ========================================================= */

const SessionStorage = {

    setCurrentUser(userId) {

        return StorageService.set(
            DB_KEYS.SESSION,
            {
                userId,
                loginTime:
                    new Date().toISOString()
            }
        );
    },

    getSession() {

        return StorageService.get(
            DB_KEYS.SESSION,
            null
        );
    },

    clearSession() {

        StorageService.remove(
            DB_KEYS.SESSION
        );
    },

    getCurrentUser() {

        const session =
            this.getSession();

        if (!session) {
            return null;
        }

        return UserStorage.findById(
            session.userId
        );
    },

    isLoggedIn() {

        return !!this.getCurrentUser();
    }
};

/* =========================================================
   SETTINGS STORAGE
   ========================================================= */

const SettingsStorage = {

    getSettings() {

        return StorageService.get(
            DB_KEYS.SETTINGS,
            createDefaultSettings()
        );
    },

    saveSettings(settings) {

        return StorageService.set(
            DB_KEYS.SETTINGS,
            settings
        );
    },

    updateSetting(key, value) {

        const settings =
            this.getSettings();

        settings[key] = value;

        this.saveSettings(settings);
    }
};

/* =========================================================
   LEADERBOARD STORAGE
   ========================================================= */

const LeaderboardStorage = {

    getLeaderboard() {

        return StorageService.get(
            DB_KEYS.LEADERBOARD,
            []
        );
    },

    saveLeaderboard(data) {

        return StorageService.set(
            DB_KEYS.LEADERBOARD,
            data
        );
    },

    updateUserScore(userId, score) {

        const leaderboard =
            this.getLeaderboard();

        const existing =
            leaderboard.find(
                entry =>
                    entry.userId === userId
            );

        if (existing) {

            existing.bestWPM =
                Math.max(
                    existing.bestWPM,
                    score.bestWPM
                );

            existing.accuracy =
                Math.max(
                    existing.accuracy,
                    score.accuracy
                );

            existing.testsCompleted++;

        } else {

            leaderboard.push({
                userId,
                bestWPM:
                    score.bestWPM,
                accuracy:
                    score.accuracy,
                testsCompleted: 1,
                achievedAt:
                    new Date().toISOString()
            });
        }

        leaderboard.sort(
            (a, b) =>
                b.bestWPM - a.bestWPM
        );

        this.saveLeaderboard(
            leaderboard
        );
    }
};

/* =========================================================
   CHALLENGE STORAGE
   ========================================================= */

const ChallengeStorage = {

    getChallenges() {

        return StorageService.get(
            DB_KEYS.CHALLENGES,
            []
        );
    },

    saveChallenges(data) {

        return StorageService.set(
            DB_KEYS.CHALLENGES,
            data
        );
    }
};

/* =========================================================
   STATISTICS HELPERS
   ========================================================= */

const StatisticsStorage = {

    addTypingResult(userId, result) {

        const user =
            UserStorage.findById(userId);

        if (!user) return;

        user.typingHistory.push(result);

        const stats =
            user.statistics;

        stats.totalTestsCompleted++;

        stats.bestWPM =
            Math.max(
                stats.bestWPM,
                result.wpm
            );

        stats.highestAccuracy =
            Math.max(
                stats.highestAccuracy,
                result.accuracy
            );

        stats.totalWordsTyped +=
            result.wordsTyped || 0;

        stats.totalTypingTime +=
            result.duration || 0;

        stats.averageWPM =
            calculateAverage(
                user.typingHistory,
                "wpm"
            );

        stats.averageAccuracy =
            calculateAverage(
                user.typingHistory,
                "accuracy"
            );

        stats.lastPracticeDate =
            new Date().toISOString();

        UserStorage.updateUser(user);

        LeaderboardStorage.updateUserScore(
            userId,
            {
                bestWPM:
                    result.wpm,
                accuracy:
                    result.accuracy
            }
        );
    }
};

/* =========================================================
   HELPERS
   ========================================================= */

function calculateAverage(
    collection,
    key
) {

    if (!collection.length) {
        return 0;
    }

    const total =
        collection.reduce(
            (sum, item) =>
                sum + Number(item[key]),
            0
        );

    return Number(
        (
            total /
            collection.length
        ).toFixed(2)
    );
}

/* =========================================================
   DATABASE RECOVERY
   ========================================================= */

function recoverDatabase() {

    try {

        Database.initialize();

        console.log(
            "Database recovery complete"
        );

    } catch (error) {

        console.error(
            "Recovery failed",
            error
        );
    }
}

/* =========================================================
   EXPORTS
   ========================================================= */

window.DB_KEYS = DB_KEYS;

window.StorageService =
    StorageService;

window.Database =
    Database;

window.UserStorage =
    UserStorage;

window.SessionStorage =
    SessionStorage;

window.SettingsStorage =
    SettingsStorage;

window.StatisticsStorage =
    StatisticsStorage;

window.LeaderboardStorage =
    LeaderboardStorage;

window.ChallengeStorage =
    ChallengeStorage;

/* =========================================================
   AUTO INITIALIZE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        Database.initialize();
    }
);
