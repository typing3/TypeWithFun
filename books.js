/* =========================================================
   TypeWithFun
   books.js

   Long Reading Practice Dataset

   Public-domain inspired and original
   family-friendly typing passages.
   ========================================================= */

"use strict";

const BOOKS = [

    {
        id: 1,
        title: "Wonderland Journey",
        source: "Public Domain Inspired",
        text: "Alice was beginning to feel tired of sitting beside her sister on the bank and of having nothing to do. The afternoon was warm and peaceful. As she looked around, she wondered whether anything exciting might happen. Curiosity soon led her toward an unexpected adventure that would change an ordinary day into something remarkable."
    },

    {
        id: 2,
        title: "Island Adventure",
        source: "Public Domain Inspired",
        text: "The sea stretched toward the horizon beneath a bright sky. Every wave carried the promise of discovery. The travelers believed that courage, preparation, and teamwork would help them overcome whatever challenges waited beyond the distant shore."
    },

    {
        id: 3,
        title: "The Hidden Garden",
        source: "Public Domain Inspired",
        text: "The garden had been forgotten for years. Vines covered the walls and weeds filled the paths. Yet beneath the overgrowth remained beauty and potential. With patience and care, the neglected place slowly began to bloom once again."
    },

    {
        id: 4,
        title: "Learning Every Day",
        source: "Original",
        text: "Knowledge grows through curiosity and effort. Students who ask questions and seek understanding often discover that learning becomes more enjoyable over time. Small improvements made each day eventually lead to meaningful progress."
    },

    {
        id: 5,
        title: "The Mountain Trail",
        source: "Original",
        text: "The path climbed steadily through the forest. Birds sang among the trees while sunlight filtered through the leaves. Every step required determination, but the travelers knew the view from the summit would make the journey worthwhile."
    },

    {
        id: 6,
        title: "A Day in the Library",
        source: "Original",
        text: "The library was quiet except for the gentle turning of pages. Shelves filled with books offered endless opportunities to learn something new. Readers explored history, science, literature, and countless other subjects."
    },

    {
        id: 7,
        title: "Tom's New Plan",
        source: "Public Domain Inspired",
        text: "Tom always preferred adventure to routine. Whenever he faced a challenge, he searched for creative solutions. His enthusiasm often encouraged others to join him, turning ordinary tasks into memorable experiences."
    },

    {
        id: 8,
        title: "The Village Clock",
        source: "Original",
        text: "The old clock tower stood at the center of the village. Generations had listened to its bells mark the passing hours. Though technology changed around it, the clock remained a symbol of community and tradition."
    },

    {
        id: 9,
        title: "Ocean Voyage",
        source: "Original",
        text: "Sailing across open water requires preparation and confidence. The crew worked together to navigate changing weather and shifting currents. Their success depended on communication, skill, and trust."
    },

    {
        id: 10,
        title: "The Curious Student",
        source: "Original",
        text: "A curious student never stops asking questions. Every lesson becomes an opportunity to understand the world more deeply. Curiosity transforms information into meaningful knowledge."
    },

    {
        id: 11,
        title: "Forest Morning",
        source: "Original",
        text: "Morning light spread across the forest floor as animals began their daily activities. The sounds of nature created a peaceful atmosphere that encouraged observation and reflection."
    },

    {
        id: 12,
        title: "Building Good Habits",
        source: "Original",
        text: "Success rarely happens overnight. Good habits develop through repetition and consistency. People who focus on steady improvement often achieve remarkable results over time."
    },

    {
        id: 13,
        title: "A Journey by Train",
        source: "Original",
        text: "The train traveled through fields, hills, and towns. Passengers watched changing landscapes through the windows while anticipating new destinations and experiences."
    },

    {
        id: 14,
        title: "Innovation and Progress",
        source: "Original",
        text: "Innovation begins with a willingness to explore new ideas. Many important discoveries started with simple questions and careful observation. Progress depends on creativity as well as persistence."
    },

    {
        id: 15,
        title: "The School Project",
        source: "Original",
        text: "Working together on a project teaches valuable skills. Team members learn how to communicate effectively, solve problems, and support one another while pursuing a shared goal."
    },

    {
        id: 16,
        title: "Anne's Perspective",
        source: "Public Domain Inspired",
        text: "Anne viewed the world with imagination and enthusiasm. Ordinary places seemed extraordinary when seen through creative eyes. Her optimism inspired those around her."
    },

    {
        id: 17,
        title: "The Value of Practice",
        source: "Original",
        text: "Practice improves performance in nearly every field. Musicians, athletes, writers, and programmers all benefit from consistent effort. Skill develops through repetition combined with thoughtful reflection."
    },

    {
        id: 18,
        title: "Exploring Science",
        source: "Original",
        text: "Science helps people understand natural phenomena through observation and experimentation. By testing ideas and analyzing evidence, researchers expand human knowledge."
    },

    {
        id: 19,
        title: "Community Helpers",
        source: "Original",
        text: "Communities depend on people working together. Teachers, healthcare workers, engineers, and many others contribute their skills to improve daily life for everyone."
    },

    {
        id: 20,
        title: "Looking Ahead",
        source: "Original",
        text: "The future is shaped by decisions made today. Setting goals, learning continuously, and maintaining a positive attitude can create opportunities for growth and success."
    }
];

/* =========================================================
   BOOK MANAGER
   ========================================================= */

const BookManager = {

    getAll() {

        return BOOKS;
    },

    getById(id) {

        return BOOKS.find(
            book => book.id === id
        );
    },

    getRandom() {

        return BOOKS[
            Math.floor(
                Math.random() *
                BOOKS.length
            )
        ];
    }
};

/* =========================================================
   EXPORTS
   ========================================================= */

window.BOOKS = BOOKS;
window.BookManager = BookManager;
