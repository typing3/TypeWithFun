 /* =========================================================
   TypeWithFun
   statistics.js
   ========================================================= */

"use strict";

const StatisticsController = {

    history: [],

    charts: {},

    initialize() {

        this.loadHistory();

        this.updateSummaryCards();

        this.createCharts();
    },

    /* =====================================================
       LOAD HISTORY
       ===================================================== */

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
       SUMMARY
       ===================================================== */

    updateSummaryCards() {

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
                          (total, item) =>
                              total +
                              (item.accuracy || 0),
                          0
                      ) / totalTests
                  )
                : 0;

        const totalTime =
            this.history.reduce(
                (total, item) =>
                    total +
                    (item.timeTaken || 0),
                0
            );

        const totalMinutes =
            Math.round(totalTime / 60);

        const totalTestsEl =
            document.getElementById(
                "totalTests"
            );

        const bestWPMEl =
            document.getElementById(
                "bestWPM"
            );

        const averageAccuracyEl =
            document.getElementById(
                "averageAccuracy"
            );

        const totalTypingTimeEl =
            document.getElementById(
                "totalTypingTime"
            );

        if (totalTestsEl) {
            totalTestsEl.textContent =
                totalTests;
        }

        if (bestWPMEl) {
            bestWPMEl.textContent =
                bestWPM;
        }

        if (averageAccuracyEl) {
            averageAccuracyEl.textContent =
                averageAccuracy + "%";
        }

        if (totalTypingTimeEl) {
            totalTypingTimeEl.textContent =
                totalMinutes + "m";
        }
    },

    /* =====================================================
       CHART DATA
       ===================================================== */

    getLabels() {

        return this.history.map(
            (_, index) =>
                `Test ${index + 1}`
        );
    },

    /* =====================================================
       CHARTS
       ===================================================== */

    createCharts() {

        this.createWPMChart();

        this.createAccuracyChart();

        this.createFrequencyChart();

        this.createTimeChart();
    },

    createWPMChart() {

        const canvas =
            document.getElementById(
                "wpmChart"
            );

        if (!canvas) return;

        new Chart(canvas, {

            type: "line",

            data: {

                labels:
                    this.getLabels(),

                datasets: [

                    {
                        label: "WPM",

                        data:
                            this.history.map(
                                item =>
                                    item.wpm || 0
                            ),

                        tension: 0.3
                    }
                ]
            },

            options: {

                responsive: true,

                maintainAspectRatio: false
            }
        });
    },

    createAccuracyChart() {

        const canvas =
            document.getElementById(
                "accuracyChart"
            );

        if (!canvas) return;

        new Chart(canvas, {

            type: "line",

            data: {

                labels:
                    this.getLabels(),

                datasets: [

                    {
                        label: "Accuracy %",

                        data:
                            this.history.map(
                                item =>
                                    item.accuracy || 0
                            ),

                        tension: 0.3
                    }
                ]
            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                scales: {

                    y: {

                        min: 0,

                        max: 100
                    }
                }
            }
        });
    },

    createFrequencyChart() {

        const canvas =
            document.getElementById(
                "frequencyChart"
            );

        if (!canvas) return;

        const dailyCounts = {};

        this.history.forEach(
            item => {

                const day =
                    new Date(
                        item.date
                    ).toLocaleDateString();

                dailyCounts[day] =
                    (dailyCounts[day] || 0) + 1;
            }
        );

        new Chart(canvas, {

            type: "bar",

            data: {

                labels:
                    Object.keys(
                        dailyCounts
                    ),

                datasets: [

                    {
                        label:
                            "Tests Per Day",

                        data:
                            Object.values(
                                dailyCounts
                            )
                    }
                ]
            },

            options: {

                responsive: true,

                maintainAspectRatio: false
            }
        });
    },

    createTimeChart() {

        const canvas =
            document.getElementById(
                "timeChart"
            );

        if (!canvas) return;

        new Chart(canvas, {

            type: "bar",

            data: {

                labels:
                    this.getLabels(),

                datasets: [

                    {
                        label:
                            "Time Taken (seconds)",

                        data:
                            this.history.map(
                                item =>
                                    item.timeTaken || 0
                            )
                    }
                ]
            },

            options: {

                responsive: true,

                maintainAspectRatio: false
            }
        });
    }
};

/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        try {

            StatisticsController
                .initialize();

        } catch (error) {

            console.error(
                "Statistics Error",
                error
            );
        }
    }
);
