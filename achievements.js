"use strict";

const AchievementController = {

    achievements: [

        {
            id: "first_test",
            name: "First Test",
            condition:
                stats =>
                    stats.tests >= 1
        },

        {
            id: "ten_tests",
            name: "10 Tests",
            condition:
                stats =>
                    stats.tests >= 10
        },

        {
            id: "fifty_tests",
            name: "50 Tests",
            condition:
                stats =>
                    stats.tests >= 50
        },

        {
            id: "hundred_tests",
            name: "100 Tests",
            condition:
                stats =>
                    stats.tests >= 100
        },

        {
            id: "wpm_50",
            name: "50 WPM",
            condition:
                stats =>
                    stats.bestWPM >= 50
        },

        {
            id: "wpm_80",
            name: "80 WPM",
            condition:
                stats =>
                    stats.bestWPM >= 80
        },

        {
            id: "wpm_100",
            name: "100 WPM",
            condition:
                stats =>
                    stats.bestWPM >= 100
        },

        {
            id: "perfect_accuracy",
            name: "100% Accuracy",
            condition:
                stats =>
                    stats.bestAccuracy >= 100
        }
    ],

    evaluate(stats) {

        let unlocked = [];

        try {

            unlocked =
                JSON.parse(
                    localStorage.getItem(
                        "twf_achievements"
                    )
                ) || [];

        } catch {

            unlocked = [];
        }

        this.achievements.forEach(
            achievement => {

                const alreadyUnlocked =
                    unlocked.some(
                        item =>
                            item.id ===
                            achievement.id
                    );

                if (
                    alreadyUnlocked
                ) {

                    return;
                }

                if (
                    achievement.condition(
                        stats
                    )
                ) {

                    unlocked.push({

                        id:
                            achievement.id,

                        name:
                            achievement.name,

                        unlockedAt:
                            new Date()
                            .toISOString()
                    });

                    if (
                        typeof showToast ===
                        "function"
                    ) {

                        showToast(
                            `🏆 ${achievement.name}`,
                            "success"
                        );
                    }
                }
            }
        );

        localStorage.setItem(
            "twf_achievements",
            JSON.stringify(
                unlocked
            )
        );
    }
};

window.AchievementController =
    AchievementController;
