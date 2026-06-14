/* =========================================================
   TypeWithFun
   words.js

   Random Word Practice Dataset
   ========================================================= */

"use strict";

const WORDS = [

    "ability","able","about","above","accept","access","account","across","action","active",
    "activity","actual","add","address","adjust","advance","adventure","advice","after","again",
    "against","age","agent","agree","ahead","air","alert","alive","allow","almost",
    "alone","along","already","also","always","amazing","among","amount","analysis","animal",
    "answer","any","apart","appear","apple","apply","approach","area","argue","around",

    "arrive","article","artist","aspect","assign","assist","assume","attack","attempt","attention",
    "author","auto","available","average","avoid","aware","away","awesome","balance","basic",
    "become","before","begin","behind","believe","below","benefit","best","better","between",

    "beyond","billion","block","blue","board","body","bonus","book","boost","both",
    "brain","brand","break","bridge","bright","bring","build","business","button","camera",

    "campaign","capital","career","carry","case","catch","cause","center","challenge","change",
    "character","charge","check","choice","choose","circle","class","clean","clear","client",
    "close","cloud","coach","code","collect","college","color","combine","come","comfort",

    "common","company","compare","complete","computer","concept","condition","connect","consider","consistent",
    "contact","content","continue","control","convert","correct","cost","could","count","country",

    "course","create","credit","culture","current","custom","daily","data","decide","decision",
    "deep","define","degree","deliver","design","detail","develop","device","digital","direction",

    "discover","discuss","distance","document","dream","drive","during","dynamic","early","earth",
    "easy","economy","edge","education","effect","effort","either","element","email","emotion",

    "employee","energy","engine","enjoy","enough","enter","entire","environment","equal","error",
    "escape","essential","event","every","evidence","exact","example","exchange","exciting","exercise",

    "exist","expect","experience","expert","explore","express","extra","factor","family","famous",
    "fast","feature","feedback","field","final","finance","find","finish","focus","follow",

    "force","form","forward","free","friend","future","game","general","generate","goal",
    "good","great","group","growth","guide","habit","happy","health","help","history",

    "home","honest","hope","human","idea","image","imagine","impact","improve","include",
    "increase","industry","inspire","interest","invest","issue","journey","judge","knowledge","language",

    "large","learn","level","library","light","limit","listen","local","logic","machine",
    "manage","market","master","measure","memory","message","method","mobile","modern","moment",

    "money","month","motivate","movement","music","nature","network","never","normal","notice",
    "number","object","offer","office","online","option","order","organize","original","output",

    "page","parent","partner","passion","pattern","people","perfect","performance","personal","phone",
    "picture","plan","platform","player","popular","positive","possible","practice","prepare","present",

    "process","product","professional","profile","progress","project","protect","provide","public","quality",
    "quick","reach","react","ready","reason","receive","record","reduce","reflect","regular",

    "relationship","remember","remove","report","research","resource","result","review","right","risk",
    "road","role","routine","save","school","science","search","secure","select","service",

    "session","share","simple","skill","smart","social","software","solution","source","special",
    "speed","spirit","start","state","step","strategy","strong","study","success","support",

    "system","table","target","teach","team","technology","test","theme","think","through",
    "today","together","tool","track","training","travel","trend","trust","understand","unique",

    "update","value","version","video","vision","visit","voice","want","watch","water",
    "welcome","while","window","winner","wisdom","word","work","world","write","writer",

    "year","young","yourself","zone"
];

/* =========================================================
   WORD MANAGER
   ========================================================= */

const WordManager = {

    getAll() {

        return WORDS;
    },

    getRandom(count = 50) {

        const result = [];

        for (
            let i = 0;
            i < count;
            i++
        ) {

            const word =
                WORDS[
                    Math.floor(
                        Math.random() *
                        WORDS.length
                    )
                ];

            result.push(word);
        }

        return result.join(" ");
    },

    getRandomWord() {

        return WORDS[
            Math.floor(
                Math.random() *
                WORDS.length
            )
        ];
    }
};

/* =========================================================
   EXPORTS
   ========================================================= */

window.WORDS = WORDS;
window.WordManager =
    WordManager;
