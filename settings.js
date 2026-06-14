"use strict";

const SettingsController = {

    initialize() {

        this.loadSettings();

        this.bindEvents();
    },

    loadSettings() {

        let settings;

        try {

            settings =
                JSON.parse(
                    localStorage.getItem(
                        "twf_settings"
                    )
                );

        } catch {

            settings = null;
        }

        if (!settings) {

            settings = {

                theme: "dark",

                fontSize: "medium",

                typingSounds: true,

                animations: true
            };
        }

        document.getElementById(
            "themeSelect"
        ).value =
            settings.theme;

        document.getElementById(
            "fontSizeSelect"
        ).value =
            settings.fontSize;

        document.getElementById(
            "soundSelect"
        ).value =
            settings.typingSounds
                .toString();

        document.getElementById(
            "animationSelect"
        ).value =
            settings.animations
                .toString();
    },

    saveSettings() {

        const settings = {

            theme:
                document.getElementById(
                    "themeSelect"
                ).value,

            fontSize:
                document.getElementById(
                    "fontSizeSelect"
                ).value,

            typingSounds:
                document.getElementById(
                    "soundSelect"
                ).value === "true",

            animations:
                document.getElementById(
                    "animationSelect"
                ).value === "true"
        };

        localStorage.setItem(
            "twf_settings",
            JSON.stringify(
                settings
            )
        );

        if (
            typeof showToast ===
            "function"
        ) {

            showToast(
                "Settings Saved",
                "success"
            );
        }

        location.reload();
    },

    bindEvents() {

        document
            .getElementById(
                "saveSettingsButton"
            )
            ?.addEventListener(
                "click",
                () =>
                    this.saveSettings()
            );
    }
};

document.addEventListener(
    "DOMContentLoaded",
    () => {

        SettingsController
            .initialize();
    }
);
