// INITIALISE
// Initialise a few variables for experimental settings

var participantID, session, part, list, presentStatus;

const fixation_dur = 1000; //1000; real
const stimulus_duration = 2000;//2000;
const test_duration = 60000;//60000;
const warningAfter = 20000;//20000;

var numberOfRepetitions = 1; // 2 real

var counterCorrect = 0;
var counterEmpty = 0;

// Random number generator
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// draw random word pair order
// different onces for encoding and test
let sequence_no_enc = getRandomInt(0, 263);
let sequence_no_test = getRandomInt(0, 263);

// draw lists and capitalise all words

let words_a_enc = wordLists[0][sequence_no_enc];
let words_b_enc = wordLists[1][sequence_no_enc];
let words_a_test = wordLists[0][sequence_no_test];
let words_b_test = wordLists[1][sequence_no_test];

words_a_enc.forEach(item => {
    item.cueWord = item.cueWord.toUpperCase();
    item.targetWord = item.targetWord.toUpperCase();
});

words_b_enc.forEach(item => {
    item.cueWord = item.cueWord.toUpperCase();
    item.targetWord = item.targetWord.toUpperCase();
});

words_a_test.forEach(item => {
    item.cueWord = item.cueWord.toUpperCase();
    item.targetWord = item.targetWord.toUpperCase();
});

words_b_test.forEach(item => {
    item.cueWord = item.cueWord.toUpperCase();
    item.targetWord = item.targetWord.toUpperCase();
});
