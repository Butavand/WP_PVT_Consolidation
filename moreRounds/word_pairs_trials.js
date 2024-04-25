// TRIALS
var whichParticipant = {
    type: jsPsychSurveyHtmlForm,
    html:
    `<b>Bitte geben Sie Ihren Identifikationscode ein:</b><br>
    <p><input class="large-input" type="text" id="participant" required="required" name="participant"></p>`,
    
    data: { phase: 'participant' },
    button_label: ['Weiter'],
    on_finish: function(data) {
        data.response = Object.values(data.response)[0];
        participantID = data.response;
        jsPsych.data.addProperties({
            participantID: participantID,
        });
    }
};

var whichVersion = {
    type: jsPsychSurveyHtmlForm,
    html:
    `<b>Liste wählen:</b><br>
    <p><select class="large-select" id="wordlist" required="required" name="wordlist">
        <option value=""></option>
        <option value="a">a</option>
        <option value="b">b</option></select></p>`,
  
    data: { phase: 'version' },
    button_label: ['Weiter'],
    on_finish: function(data) {
        data.response = Object.values(data.response)[0];
        list = data.response;
        jsPsych.data.addProperties({
            list: list,
        });

    }
};


// Fixation cross
var fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size:60px;"> </div>',
    choices: 'NO_KEYS', // it'll be for a fixed amount of time
    trial_duration: fixation_dur,
    data: {
        phase: 'fixation'
    },
    on_finish: function(data){
        JSON.stringify(data.stimulus);
    }
  };

// Warning: do it faster
var warning = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<div> Bitte antworten Sie schneller! </div>`,
    choices: "NO_KEYS",
    trial_duration: 1500,
    on_finish: function(data){
        JSON.stringify(data.stimulus);
    }
};

var ifWarning = {
    timeline: [warning],
    conditional_function: function(){
        var data = jsPsych.data.get().last(1).values()[0];
        if (data.rt >= warningAfter){
            return true;
        } else {
            return false;
        }
    }
};

// It shows cue and target words for the practice
var practiceEncoding = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function(){
        return `<p id="word1"> ${jsPsych.timelineVariable('cuePractice', true)} </p> <p id="dash"> - </p> <p id="word2">${jsPsych.timelineVariable('targetPractice', true)} </p>`;
    },
    trial_duration: stimulus_duration,
    data: {
        phase: 'practice encoding',
        pairs_showed: jsPsych.timelineVariable('cuePractice')
    },
    on_finish: function(data){
        JSON.stringify(data.stimulus);
    }
  };

  
// It runs practice + fixation  
var practiceRunEncodingA = {
    timeline: [practiceEncoding, fixation],
    timeline_variables: practiceStimuli[0],
    choices: 'NO_KEYS',
    radomize_order: true,
    conditional_function: () => list == 'a' ? true : false

};

var practiceRunEncodingB = {
    timeline: [practiceEncoding, fixation],
    timeline_variables: practiceStimuli[1],
    choices: 'NO_KEYS',
    radomize_order: true,
    conditional_function: () => list == 'b' ? true : false

};

var practiceTest = {
    type: jsPsychSurveyHtmlForm,
    html: function (){
        return `
            <div id="test-container">
            <p id="test-stimulus">
                ${jsPsych.timelineVariable('cuePractice', true)} - 
                <input type="text" id="test-resp-box-practice" name="resp">
                <br><br>
            </p>
            </div>
            `;
        },
    autofocus: 'test-resp-box-practice',
    preamble: 'So in etwa sieht die Abfrage aus:<br><br>',
    trial_duration: test_duration,
    data: {
        phase: 'practice test',
        correct_response: jsPsych.timelineVariable('targetPractice')
    },
    button_label: ['Weiter'],
    on_finish: function(data){  
        //let trials = jsPsych.data.get().filter({task: 'test'});
        let participant_response = data.response.resp;//trials.select('response').values[0].resp;
        data.participant_response = participant_response.toUpperCase();
        if (participant_response == data.correct_response || data.correct_response == participant_response.toUpperCase()) {
            data.correct_wp = 1
        } else {
            data.correct_wp = 0
        };
        data.response = data.response.resp; //JSON.stringify(data.response);
      }
  };

// It runs the practice Test
var practiceRunTestA = {
    timeline: [practiceTest, ifWarning],
    timeline_variables: practiceStimuli[0],
    randomize_order: true,
    conditional_function: () => list == 'a'? true : false
};

var practiceRunTestB = {
    timeline: [practiceTest, ifWarning],
    timeline_variables: practiceStimuli[1],
    randomize_order: true,
    conditional_function: () => list == 'b'? true : false
};

// Actual trials - Encoding
var encoding = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function(){
        return `<p id="word1"> ${jsPsych.timelineVariable('cueWord', true)} </p><p id="dash"> - </p><p id="word2"> ${jsPsych.timelineVariable('targetWord', true)}</p>`;
    },
    choices: 'NO_KEYS',
    data: {
        phase: 'encoding',
        pairs_showed: jsPsych.timelineVariable('cueWord')
    },
    trial_duration: stimulus_duration,
    on_finish: function(data){
        JSON.stringify(data.stimulus);
    }
};

// It runs encoding
var runEncodingA= {
    timeline: [fixation, encoding],
    timeline_variables: wordLists[0],
    randomize_order: true,
    conditional_function: () => list == 'a' || list == 'A'? true : false
};

var runEncodingB= {
    timeline: [fixation, encoding],
    timeline_variables: wordLists[1],
    randomize_order: true,
    conditional_function: () => list == 'b' || list == 'B'? true : false
};


// Actual trials - Test
var test = {
    type: jsPsychSurveyHtmlForm,
    html: function (){
        return `
            <div id="test-container">
            <p id="test-stimulus">
                ${jsPsych.timelineVariable('cueWord', true)} - 
                <input type="text" id="test-resp-box-practice" name="resp">
                <br><br>
            </p>
            </div>
            `;
        },
    autofocus: 'test-resp-box-practice',
//    preamble: 'Probando: <br><br>',
    trial_duration: test_duration,
    data: {
        phase: 'test',
        correct_response: jsPsych.timelineVariable('targetWord'),
        pairs_showed: jsPsych.timelineVariable('cueWord'),
    },
    button_label: ['Weiter'],
    on_finish: function(data){
        //let trials = jsPsych.data.get().filter({task: 'test'});
        let participant_response = data.response.resp;//trials.select('response').values[0].resp;
        data.participant_response = participant_response;
        if (participant_response == data.correct_response || data.correct_response == participant_response.toUpperCase()) {
            data.correct_wp = 1
        } else {
            data.correct_wp = 0
        };
        data.response = data.response.resp; //JSON.stringify(data.response);

    }
};

// It runs test with word of list 1
var runTestA = {
    timeline: [test, ifWarning],
    timeline_variables: wordLists[0], //trialStimuli,
    randomize_order: true,
    conditional_function: () => list == 'a' || list == 'A'? true : false
};

var runTestB = {
    timeline: [test, ifWarning],
    timeline_variables: wordLists[1], //trialStimuli,
    randomize_order: true,
    conditional_function: () => list == 'b' || list == 'B'? true : false
};