// INSTRUCTIONS

/*
Ü = \u00dc
ü = \u00fc
Ä = \u00c4
ä = \u00e4
Ö = \u00d6
ö = \u00f6
ss = \u00df
*/

var instructionsPractice = {
  type: jsPsychHtmlButtonResponse,
  stimulus: 
  `<br><br>
   <div class="instructions" style="max-width:${instructionsWidth}px;">
      <p> Gedächtnis-Experiment! </p>
      <p> Auf dem Bildschirm werden nun nacheinander 
      40 Wortpaare pr\u00e4sentiert. Bitte pr\u00e4gen Sie sich die 
      Wortpaare ein. Sp\u00e4ter wird jeweils das erste Wort 
      (Signalwort) gezeigt und Sie m\u00fcssen das 
      dazugeh\u00f6rige zweite Wort (Zielwort) eingeben. </p>
      <p> Jetzt folgt eine kurze Übungsphase (3 Beispiel-Wortpaare, die nicht zum eigentlichen Test zählen). </p>
  </div>
  <br><br>`,
  choices: ['Weiter'],
  on_finish: function(data){
    JSON.stringify(data.stimulus);
  } 
};

var instructionsFirstTrial = {
  type: jsPsychHtmlButtonResponse,
  stimulus: 
  '<br><br>' +
  `<div class="instructions" style="max-width:${instructionsWidth}px;">` +
  `<p> Gut gemacht! Jetzt können wir mit der eigentlichen Aufgabe beginnen. </p>` +
  `</div>` +
  '<br><br>',
  choices: ['Weiter'],
  on_finish: function(data){
    JSON.stringify(data.stimulus);
  }
};

var instructionsTrial = {
  type: jsPsychHtmlButtonResponse,
  stimulus: 
  '<br><br>' +
  `<div class="instructions" style="max-width:${instructionsWidth}px;">` +
  `Machen wir es noch einmal. <br><br>`,
  choices: ['Weiter'],
  on_finish: function(data){
    JSON.stringify(data.stimulus);
  }
};

var instructionsBreak = {
  type: jsPsychHtmlButtonResponse,
  stimulus: 
  '<br><br>' +
  `<div class="instructions" style="max-width:${instructionsWidth}px;">` +
  `<p> Machen wir eine Pause </p>`,
  choices: ['Weiter'],
  on_finish: function(data){
    JSON.stringify(data.stimulus);
  }
};

var instructionsTest = {
  type: jsPsychHtmlButtonResponse,
  stimulus: 
  '<br><br>' +
  `<div class="instructions" style="max-width:${instructionsWidth}px;">` +
  ` Geben Sie das gelernte, passende Wort ein. Sie haben dafür 60 Sekunden Zeit. ` +
  `Falls Sie ein Wort nicht wissen, können Sie das Feld leer lassen und die Eingabe überspringen.`+ 
  `Es spielt keine Rolle, ob Sie Großbuchstaben verwenden oder nicht.<br><br>`,
  choices: ['Weiter'] ,
  on_finish: function(data){
    JSON.stringify(data.stimulus);
  }
};

var instructionsTestDelay = {
  type: jsPsychHtmlButtonResponse,
  stimulus: 
  '<br><br>' +
  `<div class="instructions" style="max-width:${instructionsWidth}px;">` +
    'Im Folgenden werden wir die Aufmerksamkeitsaufgabe und die Testphase noch einmal wiederholen.<br><br>',
  choices: ['Weiter'],
  on_finish: function(data){
    JSON.stringify(data.stimulus);
  } 
};

var wait_for_save = {
    on_load: () => {
      display = document.querySelector('#dots');
      var btn0 = document.querySelector('#jspsych-html-button-response-button-0 button');
      btn0.style.visibility = "hidden";
      
      startCountdownDots(100000, display);
      
      serverComm.save_data_end(jsPsych.data.get().values(), 'php/save_data_end.php', 'wp_end', acallback)
    },
    type: jsPsychHtmlButtonResponse,
    trial_duration: 5 * 60000, // Abort after 5 min
    data: { trial: `wait_for_save` },
    stimulus: 
    `<div class="instructions" style="max-width:700px;">
      Das Experiment speichert gerade Ihre Daten - bitte warten Sie, bis der Vorgang abgeschlossen 
      ist.<br>
      <b>Schließen Sie das Browserfenster nicht, solange "BITTE WARTEN!" auf dem Bildschirm steht! 
      Der Prozess kann einige Minuten dauern.</b> Wenn das Speichern abgeschlossen ist, können Sie 
      fortfahren. Nach spätestens 5 Minuten werden Sie automatisch weitergeleitet, sollte das Speichern 
      fehlschlagen.
      
      <div id="wait">
        <span style="font-size: 30px; color: #a90b00;"><b>BITTE WARTEN </b></span>
        <div><span id="dots" style="font-size: 40px; color: #006106;">.</span></div>
      </div>
      
      <div id ="done" style ="display: none;">
        <span style="font-size: 30px; color: #006106;"><b>FERTIG!</b></span><br>
        <span style="font-size: 20px;">Sie können nun fortfahren.</span>
      </div>
    </div>`,
    
    choices: ['Weiter'],
    button_html: '<button class="jspsych-btn" tabindex="-1">%choice%</button>',
    on_finish: (data) => {
      clearInterval(timer_interval);
      JSON.stringify(data.stimulus);
    }
  };