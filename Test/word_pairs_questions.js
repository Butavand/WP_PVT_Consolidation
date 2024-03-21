function checkInput2(val, comparison, id, id2) {
    if (val==comparison) {
      document.getElementById(id).style.display = "block";
      document.getElementById(id).setAttribute('required','required');
      document.getElementById(id2).style.display = "block";
      document.getElementById(id2).setAttribute('required','required');
    } else {
      document.getElementById(id).style.display = "none";
      document.getElementById(id).removeAttribute('required');
      document.getElementById(id2).style.display = "none";
      document.getElementById(id2).removeAttribute('required');
    }
};

function checkInput3(val, comparison, id, id2, id3) {
    if (val==comparison) {
      document.getElementById(id).style.display = "block";
      document.getElementById(id).setAttribute('required','required');
      document.getElementById(id2).style.display = "block";
      document.getElementById(id2).setAttribute('required','required');
      document.getElementById(id3).style.display = "block";
      document.getElementById(id3).setAttribute('required','required');
    } else {
      document.getElementById(id).style.display = "none";
      document.getElementById(id).removeAttribute('required');
      document.getElementById(id2).style.display = "none";
      document.getElementById(id2).removeAttribute('required');
      document.getElementById(id3).style.display = "none";
      document.getElementById(id3).removeAttribute('required');
    }
  };

var intro_questions1 = {
    type: jsPsychHtmlButtonResponse,
    stimulus:
    `<div class="instructions" style="max-width:700px;"> 
    <p> <b> Willkommen zu diesem Gedächtnis-Experiment! </b></p>
    Bevor wir mit dem Experiment beginnen, werden wir Ihnen einige Fragen dazu stellen, wie Sie letzte Nacht geschlafen haben. <br>
    Wir werden Ihnen auch einige einfache Fragen zu Ihrem Kaffee- und Lebensmittelkonsum seit unserem letzten Termin stellen.  <br>
    </font>
    </div>
    <br>`,

    choices: ['Weiter'],
    data: { phase: 'intro_questions1' },
    on_finish: function(data){
      sendConfigurationStatusUpdate(
        "main_config",
        "participantID", // varwhere
        participantID, // vareqls
        ['status', `timestamp${session}${part}`], // colnames
        [`started ${session}${part}`, new Date()] // values ${part}
      );
      JSON.stringify(data.stimulus);
    }
};

var intro_questions2 = {
    type: jsPsychHtmlButtonResponse,
    stimulus:
    `<div class="instructions" style="max-width:700px;"> 
    Willkommen zurück! <br><br>
    Bevor wir mit dem Experiment beginnen, werden wir Ihnen einige Fragen dazu stellen, wie Sie letzte Nacht geschlafen haben. <br>
    Wir werden Ihnen auch einige einfache Fragen zu Ihrem Kaffee- und Essenskonsum heute Morgen stellen.  <br>
    Wir werden Sie auch nach der körperlichen Aktivität fragen, die Sie ausgeübt haben. <br><br>
    </font>
    </div>
    <br>`,

    choices: ['Weiter'],
    data: { phase: 'intro_questions2'},
    on_finish: function(data){
      sendConfigurationStatusUpdate(
        "main_config",
        "participantID", // varwhere
        participantID, // vareqls
        ['status', `timestamp${session}${part}`], // colnames
        [`started ${session}${part}`, new Date()] // values ${part}
      );
      JSON.stringify(data.stimulus);
    }
};

var q_day1 = {
    type: jsPsychSurveyHtmlForm,
    html: 
    `<div class="questions" style="max-width:700px;">
    <p> <b> 1. </b> Bitte geben Sie an, was Sie seit dem Verlassen des Labors bis jetzt gegessen haben. <br>
              <input class="large-input" type="text" id="food" required="required" name="food">
                  
    </p>

    <p> <b> 2. </b> Haben Sie Kaffee getrunken, seit Sie das Labor verlassen haben? <br>
              <select class="large-select" id="coffee" required="required" name="coffee"
              onchange="checkInput2(this.value, 'ja', 'q2extended', 'q2extended2')">
                  <option value=""></option>
                  <option value="ja">ja</option>
                  <option value="nein">nein</option>
              </select>
    </p>
    <p>
      <input class="large-input" type="number" min="1" name="q2extended" id="q2extended" style="display:none;"
      placeholder="Wie viele?" size ="40">
    </p>
    <p>
      <input class="large-input" type="text" name="q2extended2" id="q2extended2" style="display:none;"
      placeholder="Um welche Uhrzeit?" size ="40">
    </p>
    
    </div>`,
    data: { phase: 'q 1st morning' },
    button_label: ['Weiter'],
    on_finish:(data) => {
        data.q1 = data.response.food;
        data.q2 = data.response.coffee + ", " + data.response.q2extended + ", " + data.response.q2extended2;
        data.response = JSON.stringify(data.response);
    }
};

var q_day2 = {
    type: jsPsychSurveyHtmlForm,
    html: 
    `<div class="questions" style="max-width:700px;">

    <p> <b> 1 </b> Bitte geben Sie an, was Sie heute Morgen gegessen haben. <br>
              <input class="large-input" type="text" id="food" required="required" name="food">
                  
    </p>

    <p> <b> 2 </b> Haben Sie heute Morgen schon Kaffee getrunken? <br>
              <select class="large-select" id="coffee" required="required" name="coffee"
              onchange="checkInput2(this.value, 'ja', 'q2extended', 'q2extended2')">
                  <option value=""></option>
                  <option value="ja">ja</option>
                  <option value="nein">nein</option>
              </select>
    </p>
    <p>
      <input class="large-input" type="number" min="1" name="q2extended" id="q2extended" style="display:none;"
      placeholder="Wie viele?" size ="40">
    </p>
    <p>
      <input class="large-input" type="text" name="q2extended2" id="q2extended2" style="display:none;"
      placeholder="Um welche Uhrzeit?" size ="40">
    </p>

    <p> <b> 3 </b>Haben Sie sich in den letzten 24 Stunden körperlich betätigt? <br>
              <select class="large-select" id="pa" required="required" name="pa"
              onchange="checkInput3(this.value, 'ja', 'q3extended', 'q3extended2', 'q3extended3')">
                  <option value=""></option>
                  <option value="ja">ja</option>
                  <option value="nein">nein</option>
              </select>
    </p>
    <p>
      <input class="large-input" type="text" name="q3extended" id="q3extended" style="display:none;"
      placeholder="Welche" size ="40">
    </p>
    <p>
      <input class="large-input" type="number" min="1" name="q3extended2" id="q3extended2" style="display:none;"
      placeholder="Für wie viele Minuten?" size ="40">
    </p>
    <p>
      <input class="large-input" type="text" name="q3extended3" id="q3extended3" style="display:none;"
      placeholder="Um welche Uhrzeit?" size ="40">
    </p>

    <p> <b> 4 </b> Haben Sie in den letzten 24 Stunden ein Fahrrad als Verkehrsmittel benutzt? <br>
              <select class="large-select" id="bike" required="required" name="bike"
              onchange="checkInput2(this.value, 'ja', 'q4extended', 'q4extended2')">
                  <option value=""></option>
                  <option value="ja">ja</option>
                  <option value="nein">nein</option>
              </select>
    </p>
    <p>
      <input class="large-input" type="number" min="1" name="q4extended" id="q4extended" style="display:none;"
      placeholder="Für wie viele Minuten?" size ="40">
    </p>
    <p>
      <input class="large-input" type="text" name="q4extended2" id="q4extended2" style="display:none;"
      placeholder="Um welche Uhrzeit?" size ="40">
    </p>
    
    </div>`,
    data: { phase: 'q 2nd morning' },
    button_label: ['Weiter'],
    on_finish:(data) => {
        data.q1 = data.response.food;
        data.q2 = data.response.coffee + ", " + data.response.q2extended + ", " + data.response.q2extended2;
        data.q3 = data.response.pa + ", " + data.response.q3extended + ", " + data.response.q3extended2 + ", " + data.response.q3extended3;
        data.q4 = data.response.bike + ", " + data.response.q4extended + ", " + data.response.q4extended2;
        data.response = JSON.stringify(data.response);
    }
};
