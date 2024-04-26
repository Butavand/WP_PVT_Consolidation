// INITIALISE
// Initialise a few variables and functions

var participantID, session, part, list, presentStatus;

const fixation_dur = 1000; //1000; real
const stimulus_duration = 4000;//4000;
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