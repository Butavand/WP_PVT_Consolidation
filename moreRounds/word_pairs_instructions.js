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

var instructionsTrial = {
  type: jsPsychHtmlButtonResponse,
  stimulus: 
  '<br><br>' +
  `<div class="instructions" style="max-width:${instructionsWidth}px;">` +
  `Es folgt eine weitere Runde der Wortpaare. <br><br>`,
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
  `Geben Sie das gelernte, passende Wort ein. Sie haben dafür 60 Sekunden Zeit. ` +
  `Falls Sie ein Wort nicht wissen, können Sie das Feld leer lassen und die Eingabe überspringen. `+ 
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

var instructionsThanksMessage = {
  type: jsPsychHtmlButtonResponse,
  stimulus: 
  '<br><br>' +
  `<div class="instructions" style="max-width:${instructionsWidth}px;">` +
    'Vielen Dank für Ihre Teilnahme!<br><br>',
  choices: ['Weiter'],
  on_finish: function(data){
    JSON.stringify(data.stimulus);
  } 
};
