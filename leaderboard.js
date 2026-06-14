 "use strict";

const LeaderboardController = {

    leaderboard: [],

    initialize() {

        this.loadLeaderboard();

        this.render();

        this.bindEvents();
    },

    loadLeaderboard() {

        try {

            this.leaderboard =
                JSON.parse(
                    localStorage.getItem(
                        "twf_leaderboard"
                    )
                ) || [];

        } catch {

            this.leaderboard = [];
        }
    },

    bindEvents() {

        document
            .getElementById("sortFilter")
            ?.addEventListener(
                "change",
                () => this.render()
            );

        document
            .getElementById("periodFilter")
            ?.addEventListener(
                "change",
                () => this.render()
            );
    },

    getSortedLeaderboard() {

        const sortType =
            document.getElementById(
                "sortFilter"
            )?.value || "wpm";

        const data = [
            ...this.leaderboard
        ];

        switch (sortType) {

            case "accuracy":

                data.sort(
                    (a, b) =>
                        b.accuracy -
                        a.accuracy
                );

                break;

            case "tests":

                data.sort(
                    (a, b) =>
                        b.tests -
                        a.tests
                );

                break;

            case "date":

                data.sort(
                    (a, b) =>
                        new Date(a.joinedDate) -
                        new Date(b.joinedDate)
                );

                break;

            default:

                data.sort(
                    (a, b) =>
                        b.bestWPM -
                        a.bestWPM
                );
        }

        return data;
    },

    render() {

        const tbody =
            document.getElementById(
                "leaderboardBody"
            );

        if (!tbody) return;

        const data =
            this.getSortedLeaderboard();

        if (data.length === 0) {

            tbody.innerHTML = `
                <tr>
                    <td colspan="6">
                        No scores yet.
                        Complete a typing test first.
                    </td>
                </tr>
            `;

            return;
        }

        tbody.innerHTML = data
            .map((user, index) => {

                return `
                    <tr>

                        <td>
                            #${index + 1}
                        </td>

                        <td>
                            👤
                        </td>

                        <td>
                            ${user.username || "Player"}
                        </td>

                        <td>
                            ${user.bestWPM || 0}
                        </td>

                        <td>
                            ${user.accuracy || 0}%
                        </td>

                        <td>
                            ${user.tests || 0}
                        </td>

                    </tr>
                `;
            })
            .join("");
    }
};

document.addEventListener(
    "DOMContentLoaded",
    () => {

        LeaderboardController
            .initialize();
    }
);
