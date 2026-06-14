/* =========================================================
   TypeWithFun
   leaderboard.js
   ========================================================= */

"use strict";

const LeaderboardController = {

    leaderboard: [],

    initialize() {

        this.loadLeaderboard();

        this.render();

        this.bindEvents();
    },

    /* =====================================================
       LOAD
       ===================================================== */

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

        if (
            this.leaderboard.length === 0
        ) {

            this.generateDemoData();
        }
    },

    /* =====================================================
       DEMO DATA
       ===================================================== */

    generateDemoData() {

        this.leaderboard = [

            {
                username: "SpeedMaster",
                avatar:
                    "../assets/avatars/default-avatar.png",
                visibility:
                    "public",
                bestWPM: 124,
                accuracy: 99,
                tests: 312,
                joinedDate:
                    "2026-01-01"
            },

            {
                username: "LightningKeys",
                avatar:
                    "../assets/avatars/default-avatar.png",
                visibility:
                    "public",
                bestWPM: 118,
                accuracy: 98,
                tests: 201,
                joinedDate:
                    "2026-02-10"
            },

            {
                username: "KeyboardPro",
                avatar:
                    "../assets/avatars/default-avatar.png",
                visibility:
                    "public",
                bestWPM: 110,
                accuracy: 97,
                tests: 156,
                joinedDate:
                    "2026-03-05"
            }
        ];

        localStorage.setItem(
            "twf_leaderboard",
            JSON.stringify(
                this.leaderboard
            )
        );
    },

    /* =====================================================
       EVENTS
       ===================================================== */

    bindEvents() {

        document
            .getElementById(
                "sortFilter"
            )
            ?.addEventListener(
                "change",
                () => {

                    this.render();
                }
            );

        document
            .getElementById(
                "periodFilter"
            )
            ?.addEventListener(
                "change",
                () => {

                    this.render();
                }
            );
    },

    /* =====================================================
       SORTING
       ===================================================== */

    getSortedLeaderboard() {

        const sortType =
            document.getElementById(
                "sortFilter"
            )?.value || "wpm";

        const data =
            [...this.leaderboard];

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
                        new Date(
                            a.joinedDate
                        ) -
                        new Date(
                            b.joinedDate
                        )
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

    /* =====================================================
       RENDER
       ===================================================== */

    render() {

        const tbody =
            document.getElementById(
                "leaderboardBody"
            );

        if (!tbody) {
            return;
        }

        const data =
            this.getSortedLeaderboard();

        tbody.innerHTML =
            data
            .map(
                (
                    user,
                    index
                ) => {

                    const privateUser =
                        user.visibility ===
                        "private";

                    return `

                    <tr>

                        <td>
                            #${index + 1}
                        </td>

                        <td>

                            ${
                                privateUser
                                    ? "🔒"
                                    : `<img
                                        src="${user.avatar}"
                                        class="leaderboard-avatar"
                                        alt="Avatar">`
                            }

                        </td>

                        <td>

                            ${
                                privateUser
                                    ? "Anonymous User"
                                    : user.username
                            }

                        </td>

                        <td>
                            ${user.bestWPM}
                        </td>

                        <td>
                            ${user.accuracy}%
                        </td>

                        <td>
                            ${user.tests}
                        </td>

                    </tr>

                `;
                }
            )
            .join("");
    }
};

/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        try {

            LeaderboardController
                .initialize();

        } catch (error) {

            console.error(
                "Leaderboard error",
                error
            );
        }
    }
);
