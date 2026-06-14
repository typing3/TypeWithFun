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

        } catch {

            this.history = [];
        }
    },

    renderCharts() {

        if (
            typeof Chart ===
            "undefined"
        ) {

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
                    item.wpm
            );

        const accuracyData =
            this.history.map(
                item =>
                    item.accuracy
            );

        const wpmCanvas =
            document.getElementById(
                "wpmChart"
            );

        if (wpmCanvas) {

            new Chart(
                wpmCanvas,
                {

                    type: "line",

                    data: {

                        labels,

                        datasets: [

                            {
                                label:
                                    "WPM",

                                data:
                                    wpmData
                            }
                        ]
                    }
                }
            );
        }

        const accuracyCanvas =
            document.getElementById(
                "accuracyChart"
            );

        if (
            accuracyCanvas
        ) {

            new Chart(
                accuracyCanvas,
                {

                    type: "line",

                    data: {

                        labels,

                        datasets: [

                            {
                                label:
                                    "Accuracy",

                                data:
                                    accuracyData
                            }
                        ]
                    }
                }
            );
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
