// INSTRUCTIONS
var pvtStartScreen = {
    type: jsPsychInstructions,
    pages: 
    [
      `<br><br>
      <div class="instructions" style="max-width:${instructionsWidth}px;"> 
          Die n\u00e4chste Aufgabe testet Ihre Aufmerksamkeit. 
          Eine <b>Stoppuhr</b> in der Mitte des Bildschirms wird irgendwann beginnen, rasch hochzuz\u00e4hlen. 
          Wenn das passiert, ist es Ihre Aufgabe, so schnell wie m\u00f6glich die <b>Leertaste zu dr\u00fccken. 
          Bitte verwenden Sie Ihre dominante Hand</b> (die Hand, mit der Sie normalerweise schreiben). 
          Dann stoppt die Uhr, und Ihre Reaktionszeit wird f\u00fcr einen kurzen Moment angezeigt.
      </div>
      <br><br>`,
    
      `<br><br>
      <div class="instructions" style="max-width:${instructionsWidth}px;"> 
          <b>Sie müssen die Uhr innerhalb von ${lapseTime/1000} Sekunde stoppen</b>, aber "\u00fcbermenschliche" 
          Reaktionszeiten unter ${prematureTime/1000} Sekunden z\u00e4hlen ebenfalls als Fehler. 
          <p style="color:#8B0000"><b>Zu viele Fehler f\u00fchren zum Ausschluss von der Studie!</b></p>
          Aber keine Sorge, wenn Sie die Leertaste dr\u00fccken, sobald die Uhr beginnt hochzuz\u00e4hlen, 
          warden Sie auf jeden Fall rechtzeitig reagieren.<br>
          Sie können die Aufgabe nun kurz \u00fcben.
      </div>
      <br><br>`
      ],
      show_clickable_nav: true,
      button_label_next: ["Weiter"],
      button_label_previous: ["Zurück"],
    
      data: { trial: 'pvt_start_screen' },
      on_finish: () => {
        /* Turn background black for the PVT */
        disp = document.querySelector('.jspsych-display-element');
        disp.style.background = '#000000';
        
        /* Record that we are in the practice phase right now. */
        phase = "practice";
      }
  };
  
  var pvtStartScreen1 = {
        type: jsPsychHtmlButtonResponse,
        stimulus: `<br><br>
            <div class="instructions" style="max-width:${instructionsWidth}px;"> 
            Die n\u00e4chste Aufgabe testet Ihre Aufmerksamkeit. 
            Eine <b>Stoppuhr</b> in der Mitte des Bildschirms wird irgendwann beginnen, rasch hochzuz\u00e4hlen. 
            Wenn das passiert, ist es Ihre Aufgabe, so schnell wie m\u00f6glich die <b>Leertaste zu dr\u00fccken. 
            Bitte verwenden Sie Ihre dominante Hand</b> (die Hand, mit der Sie normalerweise schreiben). 
            Dann stoppt die Uhr, und Ihre Reaktionszeit wird f\u00fcr einen kurzen Moment angezeigt.
            </div>
            <br><br>`,
        choices: ['Weiter'],
        button_html: '<button class="jspsych-btn" tabindex="-1">%choice%</button>',
        data: { trial: 'pvt_start_screen' }
    };

  var pvtStartScreen2 = {
        type: jsPsychHtmlButtonResponse,
        stimulus: `<br><br>
            <div class="instructions" style="max-width:${instructionsWidth}px;"> 
            <b>Sie müssen die Uhr innerhalb von ${lapseTime/1000} Sekunde stoppen</b>, aber "\u00fcbermenschliche" 
            Reaktionszeiten unter ${prematureTime/1000} Sekunden z\u00e4hlen ebenfalls als Fehler. 
            <p style="color:#8B0000"><b>Zu viele Fehler f\u00fchren zum Ausschluss von der Studie!</b></p>
            Aber keine Sorge, wenn Sie die Leertaste dr\u00fccken, sobald die Uhr beginnt hochzuz\u00e4hlen, 
            warden Sie auf jeden Fall rechtzeitig reagieren.<br>
            Sie können die Aufgabe nun kurz \u00fcben.
            </div>
            <br><br>`,
        choices: ['Weiter'],
        button_html: '<button class="jspsych-btn" tabindex="-1">%choice%</button>',
        data: { trial: 'pvt_start_screen' },
        on_finish: function() {
            /* Turn background black for the PVT */
            disp = document.querySelector('.jspsych-display-element');
            disp.style.background = '#000000'; 
            /* Record that we are in the practice phase right now. */
            phase = "practice";
        }
    }

  /* Evaluate the practice phase - participants need to get at least 2 out of 3 trials correct. */
  var evalPvtPractice = {
    on_load: function() {
      disp = document.querySelector('.jspsych-display-element');
      disp.style.background = '#ffffff';
      disp.style.fontSize = "22px";
    },
    type: jsPsychHtmlButtonResponse,
    data: { trial: 'practice_pvt_evaluation' },
    stimulus: function () {
  
      /* Number of correct trials: Number of trials - lapses - prematures */
      var feedback = `<span style="font-size:40px">Sie haben ${pvtTrialsPractice - pvtLapseCount - pvtPrematureCount} ` + 
      `von ${pvtTrialsPractice} Stoppuhren rechtzeitig gestoppt!!</span><br><br>`;
  
      /* Add "well done" when they got at least 2 out of 3 correct (i.e. more than 1 correct) */
      if (pvtTrialsPractice - pvtLapseCount - pvtPrematureCount > 1) feedback = feedback + '<br> Gut gemacht!<br><br>'
  
      return(feedback);
    },
    choices: ['Weiter'],
    on_finish: function () {
      disp = document.querySelector('.jspsych-display-element');
      disp.style.background = '#000000';
      if (pvtTrialsPractice - pvtLapseCount - pvtPrematureCount > 1) {
        repeatPractice = false;
      } else {
        repeatPractice = true;
      };
    }
  };
  
  /* If participants failed the practice phase, they get one more try. */
  wrongPracticePVT = {
    on_load: () => {
      disp = document.querySelector('.jspsych-display-element');
      disp.style.background = '#ffffff';
    },
    type: jsPsychHtmlButtonResponse,
    data: { trial: 'failed_practice_pvt' },
    stimulus:
    `<div class="instructions" style="max-width:${instructionsWidth}px;">
      Tut uns leid, aber Sie müssen mindestens <b>2 von 3</b> Stoppuhren rechtzeitig stoppen!<br>
      Sie müssen die Uhr innerhalb von ${lapseTime/1000} Sekunde stoppen, aber übermenschliche 
      Reaktionszeiten (< ${prematureTime/1000} s) z\u00e4hlen als Fehler! 
      Bitte versuchen Sie es noch einmal.<br><br>
    </div>`,
    choices: ['Weiter'],
    button_html: '<button class="jspsych-btn" tabindex="-1">%choice%</button>',
  
    on_finish: function() {
      disp = document.querySelector('.jspsych-display-element');
      disp.style.background = '#000000';
      // Reset counter for correct practice trials so practice can be repeated
      pvtLapseCount = 0;
      pvtPrematureCount = 0;
    }
  };
  
  ifWrongPracticePVT = {
    timeline: [wrongPracticePVT],
    conditional_function: () => (pvtLapseCount + pvtPrematureCount) > 1 ? true : false
  }
  
  var pvtMainInstructions = {
    on_load: function() {
      // Reset counters after the practice phase
      pvtTrialCounter = 0;
      pvtLapseCount = 0;
      pvtPrematureCount = 0;
      disp = document.querySelector('.jspsych-display-element');
      disp.style.background = '#ffffff';
    },
    type: jsPsychHtmlButtonResponse,
    stimulus: 
    
    `<br><br>
    <div class="instructions" style="max-width:${instructionsWidth}px;"> 
      Super, Sie sind bereit f\u00fcr die Aufgabe!<br>
      Dr\u00fccken Sie die Leertaste mit Ihrer dominanten Hand. 
      Wenn Sie auf "Weiter" klicken, beginnt die Aufgabe. 
      Sie wird ${pvtTimeLimit/60000} Minuten in Anspruch nehmen.<br><br></b> 
    </div>`,
    choices: ['Weiter'],
    button_html: '<button class="jspsych-btn" tabindex="-1">%choice%</button>',
    data: { trial: 'pvt_instructions' },
    on_finish: function() {
      disp = document.querySelector('.jspsych-display-element');
      disp.style.background = '#000000';
      // Add time elapsed so far to time limit, because the time reading the instructions
      // and the practice trials doesn't count.
      var data = jsPsych.data.get().last(1).values()[0];
      pvtTimeLimit = pvtTimeLimit + data.time_elapsed;
      phase = "main";
    }
  };
  
  var pvtMainInstructionsAfterFirst = {
    on_load: function() {
      // Reset counters after the practice phase
      pvtTrialCounter = 0;
      pvtLapseCount = 0;
      pvtPrematureCount = 0;
      disp = document.querySelector('.jspsych-display-element');
      disp.style.background = '#ffffff';
    },
    type: jsPsychHtmlButtonResponse,
    stimulus: `<div class="instructions" style="max-width:${instructionsWidth}px;">` +
        "Wir werden die Aufmerksamkeitsaufgabe wiederholen!" +
        `<p>Denken Sie daran: Eine <b>Stoppuhr</b> in der Mitte des Bildschirms wird irgendwann beginnen, rasch hochzuz\u00e4hlen.  
        Wenn das passiert, ist es Ihre Aufgabe, so schnell wie m\u00f6glich die <b>Leertaste zu dr\u00fccken. 
        Bitte verwenden Sie Ihre dominante Hand</b> (die Hand, mit der Sie normalerweise schreiben). 
        Wenn Sie auf "Weiter" klicken, beginnt die Aufgabe. 
        Sie wird ${pvtTimeLimit/60000} Minuten in Anspruch nehmen.</p> `,
    choices: ['Weiter'],
    button_html: '<button class="jspsych-btn" tabindex="-1">%choice%</button>',
    data: { trial: 'pvt_instructions' },
    on_finish: function() {
      disp = document.querySelector('.jspsych-display-element');
      disp.style.background = '#000000';
      // Add time elapsed so far to time limit, because the time reading the instructions
      // and the practice trials doesn't count.
      var data = jsPsych.data.get().last(1).values()[0];
      pvtTimeLimit = pvtTimeLimit + data.time_elapsed;
      
      phase = "main";
    }
  };
  

  var pvtEnd = {
    on_load: function() {
      disp = document.querySelector('.jspsych-display-element');
      disp.style.background = '#ffffff';
    },
    type: jsPsychHtmlButtonResponse,
    stimulus: 
    
    `<br><br>
    <div class="instructions" style="max-width:${instructionsWidth}px;">
      Gut gemacht!
    </div>
    <br><br>`,
    choices: ['Weiter'],
    button_html: '<button class="jspsych-btn" tabindex="-1">%choice%</button>',
    data: { trial: 'pvt_instructions' }
  };