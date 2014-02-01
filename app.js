var date = new Date(0,0,0,0);
var time = document.getElementById("time");
var save = document.getElementById("save");
var running = false;
var interval;
var entries = new Array();

time.addEventListener("click", startTimer);
save.addEventListener("click", saveEntry);
document.getElementById("get-json").addEventListener("click", getJSON);
document.getElementById("get-csv").addEventListener("click", getCSV);

function startTimer(){
  if (running){
    clearInterval(interval);
    running = false;
  }else{
    running = true;
    interval = window.setInterval(function(){
      date.setSeconds(date.getSeconds() + 1);
      setTimer();
    }, 1000);
  }
}

function saveEntry(){
  entry = new Entry(date.getHours() + ":" + date.getMinutes(), document.getElementById("description").value);
  entries.push(entry);

  document.getElementById("results").insertAdjacentHTML("afterend", entry.print());
  document.getElementById("data").style.display = "block";

  date = new Date(0,0,0,0);
  document.getElementById("description").value = "";
  clearInterval(interval);
  running = false;
  setTimer();
}

function getJSON(){
  if(entries.length > 0){
    document.getElementById("value").innerHTML = "";
    for (var i = 0; i < entries.length; i++){
      document.getElementById("value").innerHTML += JSON.stringify(entries[i]);
    }
  }
}

function getCSV(){
  if(entries.length > 0){
    document.getElementById("value").innerHTML = "Date; Description; Time<br/>";
    for (var i = 0; i < entries.length; i++){
      document.getElementById("value").innerHTML += getFormattedDate(entries[i].date) + ";" + entries[i].description + ";" + entries[i].time + "<br/>";
    }
  }
}

// Entry object

function Entry(time, description){
  this.date = new Date();
  this.time = time;
  this.description = description;
}

Entry.prototype.print = function(){
  var result = new Array();
  result = "<tr>";
  result += "<td>";
  result += getFormattedDate(this.date);
  result += "</td>"
  result += "<td>";
  result += this.description
  result += "</td>"
  result += "<td>";
  result += this.time;
  result += "</td>"
  result += "</tr>"
  return result;
}

// Auxiliar
function formatNumber(number){
  return (number < 10) ? '0' + number : number;
}

function setTimer(){
  document.getElementById("seconds").innerHTML = formatNumber(date.getSeconds());
  document.getElementById("minutes").innerHTML = formatNumber(date.getMinutes());
  document.getElementById("hours").innerHTML = formatNumber(date.getHours());
}

function getFormattedDate(date){
  return date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
}
