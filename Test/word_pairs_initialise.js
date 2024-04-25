// INITIALISE
// Initialise a few variables for experimental settings

var participantID, session, part, list, presentStatus;

const fixation_dur = 100; //1000; real
const stimulus_duration = 400;//4000;
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
let sequence_no = getRandomInt(0, 263);
