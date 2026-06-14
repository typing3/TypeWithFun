/* =========================================================
   TypeWithFun
   quotes.js

   Quote Practice Dataset
   ========================================================= */

"use strict";

const QUOTES = [

    {
        id: 1,
        text: "Success is the sum of small efforts repeated day after day."
    },

    {
        id: 2,
        text: "The future depends on what you do today."
    },

    {
        id: 3,
        text: "Do not wait for opportunity. Create it."
    },

    {
        id: 4,
        text: "Consistency beats intensity when intensity is inconsistent."
    },

    {
        id: 5,
        text: "Discipline is choosing between what you want now and what you want most."
    },

    {
        id: 6,
        text: "The best way to predict the future is to create it."
    },

    {
        id: 7,
        text: "Small progress is still progress."
    },

    {
        id: 8,
        text: "Dream big. Start small. Act now."
    },

    {
        id: 9,
        text: "Your habits shape your future."
    },

    {
        id: 10,
        text: "Focus on progress, not perfection."
    },

    {
        id: 11,
        text: "Great things are built one step at a time."
    },

    {
        id: 12,
        text: "Every accomplishment begins with the decision to try."
    },

    {
        id: 13,
        text: "The harder you work, the luckier you become."
    },

    {
        id: 14,
        text: "A goal without action is only a wish."
    },

    {
        id: 15,
        text: "Learning never exhausts the mind."
    },

    {
        id: 16,
        text: "The secret of getting ahead is getting started."
    },

    {
        id: 17,
        text: "Believe you can and you are halfway there."
    },

    {
        id: 18,
        text: "Patience and persistence have a magical effect."
    },

    {
        id: 19,
        text: "Stay positive. Work hard. Make it happen."
    },

    {
        id: 20,
        text: "Success is built on daily discipline."
    },

    {
        id: 21,
        text: "Every expert was once a beginner."
    },

    {
        id: 22,
        text: "The only limit to growth is the one you accept."
    },

    {
        id: 23,
        text: "Action turns ideas into reality."
    },

    {
        id: 24,
        text: "Persistence can transform ordinary effort into extraordinary results."
    },

    {
        id: 25,
        text: "Confidence grows through consistent practice."
    }
];

/* =========================================================
   HELPERS
   ========================================================= */

const QuoteManager = {

    getAll() {

        return QUOTES;
    },

    getById(id) {

        return QUOTES.find(
            quote => quote.id === id
        );
    },

    getRandom() {

        const index =
            Math.floor(
                Math.random() *
                QUOTES.length
            );

        return QUOTES[index];
    }
};

/* =========================================================
   EXPORTS
   ========================================================= */

window.QUOTES = QUOTES;
window.QuoteManager =
    QuoteManager;
