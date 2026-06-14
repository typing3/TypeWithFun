 ```javascript
/* =========================================================
   TypeWithFun
   statistics.js
   Modern Dashboard
   ========================================================= */

"use strict";

const StatisticsController = {

    history: [],

    initialize() {

        this.loadHistory();

        this.updateStats();

        this.updateRank();

        this.updateAchievements();

        this.updateInsights();

        this.createWPMChart();
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

    updateStats() {

        const totalTests =
            this.history.length;

        const bestWPM =
            totalTests > 0
                ? Math.max(
                      ...this.history.map(
                          item => item.wpm || 0
                      )
                  )
                : 0;

        const averageAccuracy =
            totalTests > 0
                ? Math.round(
                      this.history.reduce(
                          (sum, item) =>
                              sum +
                              (item.accuracy || 0),
                          0
                      ) / totalTests
                  )
                : 0;

        const bestAccuracy =
            totalTests > 0
                ? Math.max(
                      ...this.history.map(
                          item =>
                              item.accuracy || 0
                      )
                  )
                : 0;

        const totalSeconds =
            this.history.reduce(
                (sum, item) =>
                    sum +
                    (item.timeTaken || 0),
                0
            );

        const totalMinutes =
            Math.round(
                totalSeconds / 60
            );

        this.setText(
            "bestWPM",
            bestWPM
        );

        this.setText(
            "averageAccuracy",
            averageAccuracy + "%"
        );

        this.setText(
            "totalTests",
            totalTests
        );

        this.setText(
            "totalTypingTime",
            totalMinutes + "m"
        );

        this.setText(
            "recordWPM",
            bestWPM
        );

        this.setText(
            "recordAccuracy",
            bestAccuracy + "%"
        );

        this.setText(
            "recordTests",
            totalTests
        );
    },

    updateRank() {

        const bestWPM =
            this.history.length
                ? Math.max(
                      ...this.history.map(
                          item => item.wpm || 0
                      )
                  )
                : 0;

        let rank =
            "Beginner";

        if (bestWPM >= 30)
            rank = "Bronze";

        if (bestWPM >= 50)
            rank = "Silver";

        if (bestWPM >= 80)
            rank = "Gold";

        if (bestWPM >= 120)
            rank = "Master";

        this.setText(
            "rankTitle",
            rank
        );

        const xp =
            this.history.reduce(
                (sum, item) =>
                    sum +
                    (item.wpm || 0),
                0
            );

        const fill =
            document.getElementById(
                "xpFill"
            );

        if (fill) {

            fill.style.width =
                Math.min(
                    100,
                    xp / 10
                ) + "%";
        }

        this.setText(
            "xpText",
            xp + " XP"
        );
    },

    updateAchievements() {

        const bestWPM =
            this.history.length
                ? Math.max(
                      ...this.history.map(
                          item => item.wpm || 0
                      )
                  )
                : 0;

        const bestAccuracy =
            this.history.length
                ? Math.max(
                      ...this.history.map(
                          item =>
                              item.accuracy || 0
                      )
                  )
                : 0;

        if (bestWPM >= 50) {

            const achievement =
                document.getElementById(
                    "achievement50"
                );

            if (achievement) {

                achievement.textContent =
                    "✅ Reach 50 WPM";

                achievement.classList.add(
                    "unlocked"
                );
            }
        }

        if (bestWPM >= 100) {

            const achievement =
                document.getElementById(
                    "achievement100"
                );

            if (achievement) {

                achievement.textContent =
                    "✅ Reach 100 WPM";

                achievement.classList.add(
                    "unlocked"
                );
            }
        }

        if (bestAccuracy >= 95) {

            const achievement =
                document.getElementById(
                    "achievement95"
                );

            if (achievement) {

                achievement.textContent =
                    "✅ 95% Accuracy";

                achievement.classList.add(
                    "unlocked"
                );
            }
        }
    },

    updateInsights() {

        const box =
            document.getElementById(
                "insightsBox"
            );

        if (!box) return;

        if (
            this.history.length === 0
        ) {

            box.textContent =
                "Take your first typing test to generate insights.";

            return;
        }

        const latest =
            this.history[
                this.history.length - 1
            ];

        let message =
            "Keep practicing daily.";

        if (
            latest.accuracy >= 95
        ) {

            message =
                "Excellent accuracy. Focus on increasing speed.";
        }

        if (
            latest.wpm >= 60
        ) {

            message =
                "Your speed is strong. Push for consistency.";
        }

        if (
            latest.wpm >= 100
        ) {

            message =
                "Elite typing performance. Maintain accuracy while increasing endurance.";
        }

        box.textContent =
            message;
    },

    createWPMChart() {

        const canvas =
            document.getElementById(
                "wpmChart"
            );

        if (
            !canvas ||
            typeof Chart ===
                "undefined"
        ) {
            return;
        }

        new Chart(canvas, {

            type: "line",

            data: {

                labels:
                    this.history.map(
                        (_, i) =>
                            `#${i + 1}`
                    ),

                datasets: [

                    {

                        label:
                            "WPM",

                        data:
                            this.history.map(
                                item =>
                                    item.wpm || 0
                            ),

                        borderWidth: 4,

                        tension: 0.4,

                        fill: true
                    }
                ]
            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    }
                },

                scales: {

                    x: {

                        grid: {
                            display: false
                        }
                    },

                    y: {

                        beginAtZero: true
                    }
                }
            }
        });
    },

    setText(id, value) {

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

document.addEventListener(
    "DOMContentLoaded",
    () => {

        StatisticsController
            .initialize();
    }
);
```
