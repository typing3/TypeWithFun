/* =========================================================
   TypeWithFun
   Modern Statistics Dashboard
   statistics.js
   ========================================================= */

"use strict";

const StatisticsController = {

    history: [],

    initialize() {

        this.loadHistory();

        this.updateStats();

        this.updateXP();

        this.generateInsights();

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
                            sum + (item.accuracy || 0),
                        0
                    ) / totalTests
                )
                : 0;

        const totalTime =
            this.history.reduce(
                (sum, item) =>
                    sum + (item.timeTaken || 0),
                0
            );

        const bestAccuracy =
            totalTests > 0
                ? Math.max(
                    ...this.history.map(
                        item => item.accuracy || 0
                    )
                )
                : 0;

        const streak =
            Math.min(
                totalTests,
                30
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
            "currentStreak",
            streak
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
            "totalTypingTime",
            Math.round(totalTime / 60) + "m"
        );
    },

    updateXP() {

        const tests =
            this.history.length;

        const xp =
            tests * 20;

        const maxXP =
            300;

        const percentage =
            Math.min(
                (xp / maxXP) * 100,
                100
            );

        const xpFill =
            document.getElementById(
                "xpFill"
            );

        if (xpFill) {

            xpFill.style.width =
                percentage + "%";
        }
    },

    generateInsights() {

        const box =
            document.getElementById(
                "insightsBox"
            );

        if (!box) {
            return;
        }

        if (
            this.history.length === 0
        ) {

            box.innerHTML =
                "🚀 Complete your first typing test to start tracking progress.";

            return;
        }

        const latest =
            this.history[
                this.history.length - 1
            ];

        const bestWPM =
            Math.max(
                ...this.history.map(
                    item => item.wpm || 0
                )
            );

        if (
            latest.wpm >= bestWPM
        ) {

            box.innerHTML =
                "🔥 New personal speed record! Keep pushing your limits.";

        } else if (
            latest.accuracy >= 95
        ) {

            box.innerHTML =
                "🎯 Excellent accuracy. Focus on speed now.";

        } else {

            box.innerHTML =
                "⚡ Practice daily to improve both speed and accuracy.";
        }
    },

    createWPMChart() {

        const canvas =
            document.getElementById(
                "wpmChart"
            );

        if (!canvas) {
            return;
        }

        new Chart(
            canvas,
            {
                type: "line",

                data: {

                    labels:
                        this.history.map(
                            (
                                _,
                                index
                            ) =>
                                "Test " +
                                (index + 1)
                        ),

                    datasets: [
                        {

                            label:
                                "WPM Progress",

                            data:
                                this.history.map(
                                    item =>
                                        item.wpm || 0
                                ),

                            fill: true,

                            borderWidth: 3,

                            tension: 0.4
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
            }
        );
    },

    setText(
        id,
        value
    ) {

        const el =
            document.getElementById(
                id
            );

        if (el) {

            el.textContent =
                value;
        }
    }
};

document.addEventListener(
    "DOMContentLoaded",
    () => {

        StatisticsController.initialize();
    }
);
