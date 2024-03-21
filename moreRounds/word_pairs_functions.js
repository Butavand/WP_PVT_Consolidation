function sendId(table, data) {
  var data = Object.assign({'tblname': table}, data)
  data = JSON.stringify(data);
  
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", "php/send_id.php");
  xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlhttp.send("x=" + data)
}

function getList(list,callback){
  list = jsPsych.data.get().last(1).values()[0].response;
    callback()
}

// Server config update
function sendConfigurationStatusUpdate(tblname, varwher, vareqls, columns, values) {
    let data = [];
    if (values.length != columns.length) {
        throw console.error('varnames and columns need to have the same length.');
    }

    for (let i = 0; i < values.length; i++) {
        data.push({
            'tblname':tblname, 'colname':columns[i], 'varname':values[i], 
            'varwher':varwher, 'vareqls':vareqls
        })
    }

    data = JSON.stringify(data);

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "php/update_configuration.php");
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send("x=" + data)
}

// Send data on every trial update.
var serverComm = {};

serverComm.save_data = function(data, script, table) {
    var data = Object.assign({'tblname': table}, data)
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', script);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
}

// Send data again to backup data base at the end of the study
serverComm.save_data_end = function(data, script, table, callback) {
    var data = Object.assign({'tblname': table}, data)
    
    var xhr = new XMLHttpRequest();
    xhr.open('POST', script);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        if(xhr.status == 200){
            var response = JSON.parse(xhr.responseText);
        }
        callback(response);
    };
    xhr.send(JSON.stringify(data));
}

function acallback(json) {
  saveStatus = json;
  // Set "done" element to visible to display it to the participant
  allDone = document.getElementById("done");
  allDone.style.display = 'block';
  wait = document.getElementById("wait");
  wait.style.display = 'none';
  // Show continue button
  btn0 = document.querySelector('#jspsych-html-button-response-button-0 button');
  btn0.style.visibility = "visible";
}

function startCountdownDots(duration, display) {
    var start = Date.now();
    var diff;

    // Start timer
    timer_interval = setInterval(timerDots, 1000);

    function timerDots() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = (((Date.now() - start) / 1000) | 0);
        diff = duration - diff;

        var dots = diff % 5;
        dots = (dots * -1) + 5
        dots = ".".repeat(dots);

        display.innerHTML = dots;
    };
    // we don't want to wait a full second before the timer starts
    dots = timerDots();
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
    data: { phase: `wait_for_save` },
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

Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h*60*60*1000));
    return this;
}

Date.prototype.addMinutes = function(m) {
  this.setTime(this.getTime() + (m*60*1000));
  return this;
}