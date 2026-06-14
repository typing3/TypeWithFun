    handleTyping(event) {

        if (
            !this.state.started ||
            this.state.paused ||
            this.state.completed
        ) {
            return;
        }

        const input =
            event.target.value;

        const spans =
            this.elements
                .typingText
                .querySelectorAll(
                    "span"
                );

        this.state.currentIndex =
            input.length;

        this.state.correctChars = 0;
        this.state.incorrectChars = 0;

        for (
            let i = 0;
            i < spans.length;
            i++
        ) {

            spans[i].classList.remove(
                "correct",
                "incorrect",
                "current"
            );

            const typedChar =
                input[i];

            const actualChar =
                this.state
                    .currentText[i];

            if (
                typedChar == null
            ) {

                continue;
            }

            if (
                typedChar ===
                actualChar
            ) {

                spans[i].classList.add(
                    "correct"
                );

                this.state
                    .correctChars++;

            } else {

                spans[i].classList.add(
                    "incorrect"
                );

                this.state
                    .incorrectChars++;
            }
        }

        this.state.totalKeystrokes =
            input.length;

        this.renderCursor();

        this.calculateStats();

        if (
            input.length >=
            this.state.currentText.length
        ) {

            this.finishTest();
        }
    },

    /* =====================================================
       TIMER
       ===================================================== */

    startTimer() {

        clearInterval(
            this.state.interval
        );

        this.state.interval =
            setInterval(
                () => {

                    if (
                        this.state.paused
                    ) {
                        return;
                    }

                    this.state
                        .remainingTime--;

                    this.updateDisplays();

                    if (
                        this.state
                            .remainingTime <= 0
                    ) {

                        this.finishTest();
                    }

                },
                1000
            );
    },

    pauseTest() {

        if (
            !this.state.started ||
            this.state.completed
        ) {
            return;
        }

        this.state.paused = true;
    },

    resumeTest() {

        if (
            !this.state.started ||
            this.state.completed
        ) {
            return;
        }

        this.state.paused = false;

        this.elements
            .typingInput
            ?.focus();
    },

    /* =====================================================
       CALCULATIONS
       ===================================================== */

    calculateStats() {

        const elapsedSeconds =
            Math.max(
                1,
                (
                    Date.now() -
                    this.state
                        .startTimestamp
                ) / 1000
            );

        const elapsedMinutes =
            elapsedSeconds / 60;

        this.state.currentWPM =
            Math.round(
                (
                    this.state
                        .correctChars / 5
                ) /
                elapsedMinutes
            );

        this.state.currentCPM =
            Math.round(
                this.state
                    .correctChars /
                elapsedMinutes
            );

        this.state.accuracy =
            this.state
                .totalKeystrokes > 0

                ? Math.round(
                      (
                          this.state
                              .correctChars /
                          this.state
                              .totalKeystrokes
                      ) * 100
                  )

                : 100;

        if (
            this.state.currentWPM >
            this.state.peakWPM
        ) {

            this.state.peakWPM =
                this.state.currentWPM;
        }

        this.updateDisplays();
    },

    updateDisplays() {

        if (
            this.elements.wpmDisplay
        ) {

            this.elements
                .wpmDisplay
                .textContent =
                this.state.currentWPM;
        }

        if (
            this.elements.cpmDisplay
        ) {

            this.elements
                .cpmDisplay
                .textContent =
                this.state.currentCPM;
        }

        if (
            this.elements
                .accuracyDisplay
        ) {

            this.elements
                .accuracyDisplay
                .textContent =
                `${this.state.accuracy}%`;
        }

        if (
            this.elements
                .errorDisplay
        ) {

            this.elements
                .errorDisplay
                .textContent =
                this.state
                    .incorrectChars;
        }

        if (
            this.elements
                .timerDisplay
        ) {

            this.elements
                .timerDisplay
                .textContent =
                this.state
                    .remainingTime;
        }

        const progress =
            this.state
                .currentText.length > 0

                ? Math.round(
                      (
                          this.state
                              .currentIndex /
                          this.state
                              .currentText
                              .length
                      ) * 100
                  )

                : 0;

        if (
            this.elements
                .progressDisplay
        ) {

            this.elements
                .progressDisplay
                .textContent =
                `${progress}%`;
        }
    },

    /* =====================================================
       FINISH TEST
       ===================================================== */

    finishTest() {

        if (
            this.state.completed
        ) {
            return;
        }

        this.state.completed =
            true;

        clearInterval(
            this.state.interval
        );

        this.state.endTimestamp =
            Date.now();

        this.calculateStats();

        const result = {

            date:
                new Date()
                .toISOString(),

            category:
                this.state
                    .category,

            wpm:
                this.state
                    .currentWPM,

            peakWPM:
                this.state
                    .peakWPM,

            accuracy:
                this.state
                    .accuracy,

            errors:
                this.state
                    .incorrectChars,

            timeTaken:
                this.state
                    .timerDuration -
                this.state
                    .remainingTime
        };

        this.saveResult(
            result
        );

        this.showResults(
            result
        );
    },

    saveResult(result) {

        let history = [];

        try {

            history =
                JSON.parse(
                    localStorage.getItem(
                        "twf_typing_history"
                    )
                ) || [];

        } catch {

            history = [];
        }

        history.push(
            result
        );

        localStorage.setItem(
            "twf_typing_history",
            JSON.stringify(
                history
            )
        );
    },

    showResults(result) {

        if (
            !this.elements
                .resultContent
        ) {
            return;
        }

        this.elements
            .resultContent
            .innerHTML = `

            <p><strong>Final WPM:</strong> ${result.wpm}</p>

            <p><strong>Peak WPM:</strong> ${result.peakWPM}</p>

            <p><strong>Accuracy:</strong> ${result.accuracy}%</p>

            <p><strong>Errors:</strong> ${result.errors}</p>

            <p><strong>Time Taken:</strong> ${result.timeTaken}s</p>

            <p><strong>Category:</strong> ${result.category}</p>

        `;

        this.elements
            .resultModal
            ?.classList.remove(
                "hidden"
            );
    },

    /* =====================================================
       RESET
       ===================================================== */

    restartTest() {

        clearInterval(
            this.state.interval
        );

        this.state.started =
            false;

        this.state.paused =
            false;

        this.state.completed =
            false;

        this.state.remainingTime =
            this.state
                .timerDuration;

        this.state.currentIndex =
            0;

        this.state.correctChars =
            0;

        this.state.incorrectChars =
            0;

        this.state.totalKeystrokes =
            0;

        this.state.currentWPM =
            0;

        this.state.currentCPM =
            0;

        this.state.peakWPM =
            0;

        this.state.accuracy =
            100;

        this.elements
            .resultModal
            ?.classList.add(
                "hidden"
            );

        this.renderText();

        this.resetInput();

        this.updateDisplays();
    },

    skipText() {

        this.restartTest();

        this.loadRandomText();
    }
};

/* =========================================================
   EXPORT
   ========================================================= */

window.TypingEngine =
    TypingEngine;

/* =========================================================
   AUTO START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        try {

            TypingEngine
                .initialize();

        } catch (error) {

            console.error(
                "Typing Engine Error",
                error
            );
        }
    }
);
