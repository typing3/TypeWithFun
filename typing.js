/* =========================================================
   TypeWithFun
   typing.js

   Part 1 / 2
   ========================================================= */

"use strict";

/* =========================================================
   TYPING ENGINE
   ========================================================= */

const TypingEngine = {

    /* =====================================================
       STATE
       ===================================================== */

    state: {

        started: false,

        paused: false,

        completed: false,

        category: "quotes",

        timerDuration: 60,

        remainingTime: 60,

        currentText: "",

        currentIndex: 0,

        correctChars: 0,

        incorrectChars: 0,

        totalKeystrokes: 0,

        currentWPM: 0,

        peakWPM: 0,

        currentCPM: 0,

        accuracy: 100,

        interval: null,

        startTimestamp: null,

        endTimestamp: null
    },

    /* =====================================================
       DOM
       ===================================================== */

    elements: {},

    /* =====================================================
       INITIALIZE
       ===================================================== */

    initialize() {

        this.cacheElements();

        this.bindEvents();

        this.loadInitialText();

        this.updateDisplays();
    },

    /* =====================================================
       CACHE ELEMENTS
       ===================================================== */

    cacheElements() {

        this.elements = {

            categorySelect:
                document.getElementById(
                    "categorySelect"
                ),

            textSelect:
                document.getElementById(
                    "textSelect"
                ),

            timerSelect:
                document.getElementById(
                    "timerSelect"
                ),

            customTimerContainer:
                document.getElementById(
                    "customTimerContainer"
                ),

            customTimerInput:
                document.getElementById(
                    "customTimerInput"
                ),

            typingText:
                document.getElementById(
                    "typingText"
                ),

            typingInput:
                document.getElementById(
                    "typingInput"
                ),

            startButton:
                document.getElementById(
                    "startButton"
                ),

            pauseButton:
                document.getElementById(
                    "pauseButton"
                ),

            resumeButton:
                document.getElementById(
                    "resumeButton"
                ),

            restartButton:
                document.getElementById(
                    "restartButton"
                ),

            skipButton:
                document.getElementById(
                    "skipButton"
                ),

            timerDisplay:
                document.getElementById(
                    "timerDisplay"
                ),

            wpmDisplay:
                document.getElementById(
                    "wpmDisplay"
                ),

            cpmDisplay:
                document.getElementById(
                    "cpmDisplay"
                ),

            accuracyDisplay:
                document.getElementById(
                    "accuracyDisplay"
                ),

            errorDisplay:
                document.getElementById(
                    "errorDisplay"
                ),

            progressDisplay:
                document.getElementById(
                    "progressDisplay"
                ),

            resultModal:
                document.getElementById(
                    "resultModal"
                ),

            resultContent:
                document.getElementById(
                    "resultContent"
                ),

            retryButton:
                document.getElementById(
                    "retryButton"
                ),

            newPracticeButton:
                document.getElementById(
                    "newPracticeButton"
                )
        };
    },

    /* =====================================================
       EVENTS
       ===================================================== */

    bindEvents() {

        this.elements.categorySelect
            ?.addEventListener(
                "change",
                () =>
                    this.onCategoryChange()
            );

        this.elements.timerSelect
            ?.addEventListener(
                "change",
                () =>
                    this.onTimerChange()
            );

        this.elements.startButton
            ?.addEventListener(
                "click",
                () =>
                    this.startTest()
            );

        this.elements.pauseButton
            ?.addEventListener(
                "click",
                () =>
                    this.pauseTest()
            );

        this.elements.resumeButton
            ?.addEventListener(
                "click",
                () =>
                    this.resumeTest()
            );

        this.elements.restartButton
            ?.addEventListener(
                "click",
                () =>
                    this.restartTest()
            );

        this.elements.skipButton
            ?.addEventListener(
                "click",
                () =>
                    this.skipText()
            );

        this.elements.retryButton
            ?.addEventListener(
                "click",
                () =>
                    this.restartTest()
            );

        this.elements.newPracticeButton
            ?.addEventListener(
                "click",
                () =>
                    this.loadRandomText()
            );

        this.elements.typingInput
            ?.addEventListener(
                "input",
                event =>
                    this.handleTyping(event)
            );
    },

    /* =====================================================
       CATEGORY
       ===================================================== */

    onCategoryChange() {

        this.state.category =
            this.elements
                .categorySelect
                .value;

        this.populateTextSelector();

        this.loadRandomText();
    },

    /* =====================================================
       TIMER
       ===================================================== */

    onTimerChange() {

        const value =
            this.elements
                .timerSelect
                .value;

        if (
            value === "custom"
        ) {

            this.elements
                .customTimerContainer
                .style.display =
                "block";

            this.state.timerDuration =
                parseInt(
                    this.elements
                        .customTimerInput
                        .value,
                    10
                ) || 60;

        } else {

            this.elements
                .customTimerContainer
                .style.display =
                "none";

            this.state.timerDuration =
                parseInt(
                    value,
                    10
                );
        }

        this.state.remainingTime =
            this.state.timerDuration;

        this.updateDisplays();
    },

    /* =====================================================
       TEXT LOADING
       ===================================================== */

    loadInitialText() {

        this.populateTextSelector();

        this.loadRandomText();
    },

    populateTextSelector() {

        const select =
            this.elements.textSelect;

        if (!select) {
            return;
        }

        select.innerHTML = "";

        const option =
            document.createElement(
                "option"
            );

        option.value = "random";

        option.textContent =
            "Random Selection";

        select.appendChild(
            option
        );
    },

    loadRandomText() {

        let text = "";

        switch (
            this.state.category
        ) {

            case "quotes":

                text =
                    QuoteManager
                        .getRandom()
                        .text;

                break;

            case "words":

                text =
                    WordManager
                        .getRandom(
                            50
                        );

                break;

            case "paragraphs":

                text =
                    ParagraphManager
                        .getRandom()
                        .text;

                break;

            case "books":

                text =
                    BookManager
                        .getRandom()
                        .text;

                break;

            default:

                text =
                    QuoteManager
                        .getRandom()
                        .text;
        }

        this.state.currentText =
            text;

        this.renderText();

        this.resetInput();
    },

    /* =====================================================
       TEXT RENDERING
       ===================================================== */

    renderText() {

        const container =
            this.elements
                .typingText;

        if (!container) {
            return;
        }

        container.innerHTML = "";

        this.state.currentText
            .split("")
            .forEach(
                character => {

                    const span =
                        document.createElement(
                            "span"
                        );

                    span.textContent =
                        character;

                    container.appendChild(
                        span
                    );
                }
            );

        this.renderCursor();
    },

    renderCursor() {

        const spans =
            this.elements
                .typingText
                ?.querySelectorAll(
                    "span"
                );

        if (!spans) {
            return;
        }

        spans.forEach(
            span =>
                span.classList.remove(
                    "current"
                )
        );

        if (
            spans[
                this.state
                    .currentIndex
            ]
        ) {

            spans[
                this.state
                    .currentIndex
            ].classList.add(
                "current"
            );
        }
    },

    /* =====================================================
       TEST START
       ===================================================== */

    startTest() {

        if (
            this.state.started
        ) {
            return;
        }

        this.state.started =
            true;

        this.state.paused =
            false;

        this.state.completed =
            false;

        this.state.startTimestamp =
            Date.now();

        this.elements
            .typingInput
            ?.focus();

        this.startTimer();
    },

    resetInput() {

        this.state.currentIndex =
            0;

        if (
            this.elements
                .typingInput
        ) {

            this.elements
                .typingInput
                .value = "";
        }

        this.renderCursor();
    },
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
