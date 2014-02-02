var date = new Date(0,0,0,0);
var running = false;
var interval;
var entries = new Array();

document.getElementById("time").addEventListener("click", startTimer);
document.getElementById("save").addEventListener("click", saveEntry);
document.getElementById("get-json").addEventListener("click", getJSON);
document.getElementById("get-csv").addEventListener("click", getCSV);

// Check if we have entries on our local storage
if (localStorage.getItem("entries")){
  entries = JSON.parse(localStorage.getItem("entries"));
  getTable();
}

// Timer was running, check local storage
if (localStorage.getItem("time")){
  date = new Date(localStorage.getItem("time"));
  setTimer();
  if (localStorage.getItem("running") == "true"){
    startTimer();
  }
}

function startTimer(){
  document.getElementById("time").style.background = "#0f0";
  window.setTimeout(function(){
    document.getElementById("time").style.background = "#000";
  }, 150);

  if (running){
    clearInterval(interval);
    running = false;
    localStorage.setItem("running", false);
    localStorage.setItem("time", date);
  }else{
    runTimer();
    localStorage.setItem("running", true);
  }
}

function saveEntry(){
  entry = new Entry(date.getHours() + ":" + date.getMinutes(), document.getElementById("description").value);
  entries.push(entry);
  localStorage.setItem("entries", JSON.stringify(entries));

  document.getElementById("results").insertAdjacentHTML("afterend", printEntry(entry));
  document.getElementById("data").style.display = "block";

  date = new Date(0,0,0,0);
  localStorage.setItem("time", date);
  document.getElementById("description").value = "";
  clearInterval(interval);
  running = false;
  setTimer();
}

function runTimer(){
  running = true;
  interval = window.setInterval(function(){
    date.setSeconds(date.getSeconds() + 1);
    setTimer();
    localStorage.setItem("time", date);
  }, 1000);
}

function getTable(){
  if(entries.length > 0){
    document.getElementById("data").style.display = "block";
    for (var i = 0; i < entries.length; i++){
      document.getElementById("results").insertAdjacentHTML("afterend", printEntry(entries[i]));
    }
  }
}

function getJSON(){
  if(entries.length > 0){
    document.getElementById("value").innerHTML = "";
    for (var i = 0; i < entries.length; i++){
      document.getElementById("value").innerHTML += JSON.stringify(entries[i]) + "</br>";
    }
  }
}

function getCSV(){
  if(entries.length > 0){
    document.getElementById("value").innerHTML = "Date; Description; Time<br/>";
    for (var i = 0; i < entries.length; i++){
      document.getElementById("value").innerHTML += getFormattedDate(entries[i].date) + ";" + entries[i].description + ";" + formatNumber(entries[i].time) + "<br/>";
    }
  }
}

// Entry object

function Entry(time, description){
  this.date = new Date();
  this.time = time;
  this.description = description;
}

function printEntry(entry){
  var result = new Array();
  result = "<tr>";
  result += "<td>";
  result += getFormattedDate(entry.date);
  result += "</td>"
  result += "<td>";
  result += entry.description
  result += "</td>"
  result += "<td>";
  result += formatNumber(entry.time);
  result += "</td>"
  result += "</tr>"
  return result;
}

// Auxiliar

function formatNumber(number){
  var result = number.toString().split(":");
  for(var i = 0; i < result.length; i++){
    result[i] = (parseInt(result[i]) < 10) ? '0' + result[i] : result[i];
  }
  return result.join(":");
}

function setTimer(){
  document.getElementById("seconds").innerHTML = formatNumber(date.getSeconds());
  document.getElementById("minutes").innerHTML = formatNumber(date.getMinutes());
  document.getElementById("hours").innerHTML = formatNumber(date.getHours());
}

function getFormattedDate(date){
  date = new Date(date);
  return date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
}
