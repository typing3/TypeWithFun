/* =========================================================
   TypeWithFun
   profile.js

   User Profile Controller
   ========================================================= */

"use strict";

const ProfileController = {

    user: null,

    history: [],

    initialize() {

        this.loadUser();

        this.loadHistory();

        this.renderProfile();

        this.renderStatistics();

        this.renderHistory();

        this.bindEvents();
    },

    /* =====================================================
       USER
       ===================================================== */

    loadUser() {

        try {

            if (
                typeof Auth !==
                "undefined" &&
                Auth.getCurrentUser
            ) {

                this.user =
                    Auth.getCurrentUser();
            }

        } catch (error) {

            console.error(
                "User load failed",
                error
            );
        }

        if (!this.user) {

            window.location.href =
                "../index.html";
        }
    },

    loadHistory() {

        try {

            this.history =
                JSON.parse(
                    localStorage.getItem(
                        "twf_typing_history"
                    )
                ) || [];

        } catch {

            this.history = [];
        }
    },

    /* =====================================================
       PROFILE INFO
       ===================================================== */

    renderProfile() {

        const username =
            document.getElementById(
                "profileUsername"
            );

        const joined =
            document.getElementById(
                "profileJoinedDate"
            );

        const avatar =
            document.getElementById(
                "profileAvatar"
            );

        const visibility =
            document.getElementById(
                "visibilitySelect"
            );

        if (username) {

            username.textContent =
                this.user.username ||
                "User";
        }

        if (joined) {

            const date =
                new Date(
                    this.user.joinedDate
                );

            joined.textContent =
                `Joined: ${date.toLocaleDateString(
                    undefined,
                    {
                        month: "long",
                        year: "numeric"
                    }
                )}`;
        }

        if (
            avatar &&
            this.user.avatar
        ) {

            avatar.src =
                this.user.avatar;
        }

        if (
            visibility
        ) {

            visibility.value =
                this.user
                    .profileVisibility ||
                "public";
        }
    },

    /* =====================================================
       STATS
       ===================================================== */

    renderStatistics() {

        const tests =
            this.history.length;

        let bestWPM = 0;

        let highestAccuracy = 0;

        let totalWPM = 0;

        let totalAccuracy = 0;

        let totalTime = 0;

        this.history.forEach(
            test => {

                bestWPM =
                    Math.max(
                        bestWPM,
                        test.wpm || 0
                    );

                highestAccuracy =
                    Math.max(
                        highestAccuracy,
                        test.accuracy || 0
                    );

                totalWPM +=
                    test.wpm || 0;

                totalAccuracy +=
                    test.accuracy || 0;

                totalTime +=
                    test.timeTaken || 0;
            }
        );

        const averageWPM =
            tests
                ? Math.round(
                    totalWPM / tests
                )
                : 0;

        const averageAccuracy =
            tests
                ? Math.round(
                    totalAccuracy /
                    tests
                )
                : 0;

        const totalWordsTyped =
            this.history.reduce(
                (
                    sum,
                    item
                ) =>
                    sum +
                    Math.round(
                        (item.wpm || 0) *
                        (
                            (
                                item.timeTaken ||
                                0
                            ) / 60
                        )
                    ),
                0
            );

        this.setText(
            "bestWPM",
            bestWPM
        );

        this.setText(
            "averageWPM",
            averageWPM
        );

        this.setText(
            "highestAccuracy",
            `${highestAccuracy}%`
        );

        this.setText(
            "averageAccuracy",
            `${averageAccuracy}%`
        );

        this.setText(
            "testsCompleted",
            tests
        );

        this.setText(
            "totalWordsTyped",
            totalWordsTyped
        );

        this.setText(
            "typingTime",
            `${Math.round(
                totalTime / 60
            )} min`
        );

        this.setText(
            "practiceStreak",
            this.calculateStreak()
        );
    },

    calculateStreak() {

        if (
            !this.history.length
        ) {

            return 0;
        }

        const uniqueDays =
            new Set();

        this.history.forEach(
            entry => {

                const day =
                    new Date(
                        entry.date
                    )
                    .toISOString()
                    .split("T")[0];

                uniqueDays.add(day);
            }
        );

        return uniqueDays.size;
    },

    /* =====================================================
       HISTORY
       ===================================================== */

    renderHistory() {

        const container =
            document.getElementById(
                "historyContainer"
            );

        if (!container) {
            return;
        }

        if (
            this.history.length === 0
        ) {

            container.innerHTML = `
                <p>No typing tests completed yet.</p>
            `;

            return;
        }

        const recent =
            [...this.history]
            .reverse()
            .slice(0, 15);

        container.innerHTML =
            recent
            .map(
                item => `

                <div class="history-item">

                    <strong>
                        ${item.wpm} WPM
                    </strong>

                    •

                    ${item.accuracy}% Accuracy

                    •

                    ${item.category}

                    •

                    ${new Date(
                        item.date
                    ).toLocaleString()}

                </div>

            `
            )
            .join("");
    },

    /* =====================================================
       ACHIEVEMENTS
       ===================================================== */

    renderAchievements() {

        const container =
            document.getElementById(
                "achievementContainer"
            );

        if (!container) {
            return;
        }

        let achievements = [];

        try {

            achievements =
                JSON.parse(
                    localStorage.getItem(
                        "twf_achievements"
                    )
                ) || [];

        } catch {

            achievements = [];
        }

        if (
            achievements.length === 0
        ) {

            container.innerHTML =
                "<p>No achievements unlocked yet.</p>";

            return;
        }

        container.innerHTML =
            achievements
            .map(
                achievement => `

                <div class="achievement-card">

                    🏆

                    <h4>
                        ${achievement.name}
                    </h4>

                </div>

            `
            )
            .join("");
    },

    /* =====================================================
       EVENTS
       ===================================================== */

    bindEvents() {

        const visibility =
            document.getElementById(
                "visibilitySelect"
            );

        const logout =
            document.getElementById(
                "logoutButton"
            );

        visibility
            ?.addEventListener(
                "change",
                event => {

                    this.user
                        .profileVisibility =
                        event.target.value;

                    localStorage.setItem(
                        "twf_current_user",
                        JSON.stringify(
                            this.user
                        )
                    );
                }
            );

        logout
            ?.addEventListener(
                "click",
                () => {

                    localStorage.removeItem(
                        "twf_current_user"
                    );

                    window.location.href =
                        "../index.html";
                }
            );
    },

    /* =====================================================
       HELPERS
       ===================================================== */

    setText(
        id,
        value
    ) {

        const element =
            document.getElementById(
                id
            );

        if (element) {

            element.textContent =
                value;
        }
    }
};

/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        try {

            ProfileController.initialize();

            ProfileController.renderAchievements();

        } catch (error) {

            console.error(
                "Profile initialization failed",
                error
            );
        }
    }
);
