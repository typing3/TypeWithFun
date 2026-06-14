 "use strict";

const StatisticsController = {

    history: [],

    initialize() {

        this.loadHistory();

        this.renderCharts();
    },

    loadHistory() {

        try {

            this.history =
                JSON.parse(
                    localStorage.getItem(
                        "twf_typing_history"
                    )
                ) || [];

        } catch (error) {

            console.error(
                "Failed to load typing history",
                error
            );

            this.history = [];
        }
    },

    renderCharts() {

        if (
            typeof Chart ===
            "undefined"
        ) {

            console.error(
                "Chart.js not loaded."
            );

            return;
        }

        const labels =
            this.history.map(
                (
                    item,
                    index
                ) =>
                    `Test ${index + 1}`
            );

        const wpmData =
            this.history.map(
                item =>
                    item.wpm || 0
            );

        const accuracyData =
            this.history.map(
                item =>
                    item.accuracy || 0
            );

        const timeData =
            this.history.map(
                item =>
                    item.timeTaken || 0
            );

        const frequencyData =
            this.history.map(
                (
                    item,
                    index
                ) =>
                    index + 1
            );

        this.createChart(
            "wpmChart",
            "line",
            "WPM Progress",
            labels,
            wpmData
        );

        this.createChart(
            "accuracyChart",
            "line",
            "Accuracy Progress",
            labels,
            accuracyData
        );

        this.createChart(
            "frequencyChart",
            "bar",
            "Practice Frequency",
            labels,
            frequencyData
        );

        this.createChart(
            "timeChart",
            "line",
            "Typing Time (Seconds)",
            labels,
            timeData
        );
    },

    createChart(
        canvasId,
        chartType,
        datasetLabel,
        labels,
        data
    ) {

        const canvas =
            document.getElementById(
                canvasId
            );

        if (!canvas) {

            return;
        }

        new Chart(
            canvas,
            {

                type:
                    chartType,

                data: {

                    labels,

                    datasets: [

                        {
                            label:
                                datasetLabel,

                            data,

                            tension:
                                0.35,

                            fill:
                                false
                        }
                    ]
                },

                options: {

                    responsive:
                        true,

                    maintainAspectRatio:
                        false,

                    animation: {

                        duration:
                            1200
                    },

                    plugins: {

                        legend: {

                            display:
                                true
                        }
                    },

                    scales: {

                        y: {

                            beginAtZero:
                                true
                        }
                    }
                }
            }
        );
    }
};

document.addEventListener(
    "DOMContentLoaded",
    () => {

        try {

            StatisticsController
                .initialize();

        } catch (error) {

            console.error(
                "Statistics initialization failed",
                error
            );
        }
    }
);
