/* =========================================================
   TypeWithFun
   paragraphs.js

   Paragraph Practice Dataset
   ========================================================= */

"use strict";

const PARAGRAPHS = [

    {
        id: 1,
        text: "Typing is one of the most valuable skills in the modern digital world. Whether you are writing emails, creating software, studying online, or communicating with friends, the ability to type quickly and accurately saves time and improves productivity."
    },

    {
        id: 2,
        text: "Consistency is more important than intensity when learning a new skill. Practicing for fifteen minutes every day often produces better results than spending several hours only once a week."
    },

    {
        id: 3,
        text: "Technology continues to evolve rapidly, creating new opportunities for people around the world. Those who embrace continuous learning are often better prepared for future challenges and innovations."
    },

    {
        id: 4,
        text: "Good habits are built through repetition. Small daily actions may seem insignificant at first, but over time they compound into meaningful progress and long term success."
    },

    {
        id: 5,
        text: "The internet has transformed how people access information. Knowledge that once required hours of research in libraries can now be found within seconds using a search engine."
    },

    {
        id: 6,
        text: "Reading regularly improves vocabulary, comprehension, and critical thinking. It also exposes readers to different perspectives and helps develop stronger communication skills."
    },

    {
        id: 7,
        text: "Professional athletes spend years refining their techniques through deliberate practice. Their success is often the result of discipline, patience, and a willingness to improve every day."
    },

    {
        id: 8,
        text: "Software development combines creativity and logic. Developers solve problems by designing systems, writing code, testing solutions, and continuously improving their applications."
    },

    {
        id: 9,
        text: "A productive workspace does not need to be complicated. A clean desk, proper lighting, and minimal distractions can significantly improve concentration and efficiency."
    },

    {
        id: 10,
        text: "Learning touch typing allows users to focus on ideas rather than keyboard keys. Over time, muscle memory develops naturally, making typing faster and more comfortable."
    },

    {
        id: 11,
        text: "The ability to adapt is one of the most important qualities in a changing world. Flexible thinkers often find creative solutions when faced with unexpected situations."
    },

    {
        id: 12,
        text: "Exercise benefits both physical and mental health. Regular activity improves energy levels, reduces stress, and supports long term wellbeing."
    },

    {
        id: 13,
        text: "Many successful projects begin with a simple idea. Through planning, collaboration, and persistence, small concepts can grow into impactful achievements."
    },

    {
        id: 14,
        text: "Strong communication skills are valuable in nearly every profession. Clear writing and effective speaking help people share ideas, solve problems, and build relationships."
    },

    {
        id: 15,
        text: "Artificial intelligence is influencing industries ranging from healthcare to transportation. As the technology evolves, understanding its strengths and limitations becomes increasingly important."
    },

    {
        id: 16,
        text: "Traveling introduces people to new cultures, traditions, and perspectives. Experiences gained through travel often inspire personal growth and broader understanding."
    },

    {
        id: 17,
        text: "Creative work often requires experimentation. Writers, artists, and designers frequently explore multiple ideas before discovering their strongest solution."
    },

    {
        id: 18,
        text: "Building confidence takes time. Each completed challenge provides evidence that progress is possible and encourages continued effort toward larger goals."
    },

    {
        id: 19,
        text: "Time management is an essential skill for students and professionals alike. Prioritizing important tasks helps maintain focus and reduce unnecessary stress."
    },

    {
        id: 20,
        text: "The most effective learners remain curious. They ask questions, seek feedback, and continuously look for ways to expand their knowledge and improve their abilities."
    }
];

/* =========================================================
   PARAGRAPH MANAGER
   ========================================================= */

const ParagraphManager = {

    getAll() {

        return PARAGRAPHS;
    },

    getById(id) {

        return PARAGRAPHS.find(
            paragraph => paragraph.id === id
        );
    },

    getRandom() {

        return PARAGRAPHS[
            Math.floor(
                Math.random() *
                PARAGRAPHS.length
            )
        ];
    }
};

/* =========================================================
   EXPORTS
   ========================================================= */

window.PARAGRAPHS =
    PARAGRAPHS;

window.ParagraphManager =
    ParagraphManager;
