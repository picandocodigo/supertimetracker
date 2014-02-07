/*
    Copyright 2014 - Fernando Briano

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var date = new Date(0,0,0,0);
var running = false;
var interval;
var entries = new Array();

document.getElementById("time").addEventListener("click", startTimer);
document.getElementById("save").addEventListener("click", saveEntry);
document.getElementById("get-json").addEventListener("click", getJSON);
document.getElementById("get-csv").addEventListener("click", getCSV);
document.getElementById("menu").addEventListener("click", function(){
  toggleVisible("info");
});
document.getElementById("close-info").addEventListener("click", function(){
  toggleVisible("info");
});
document.getElementById("remove-entries").addEventListener("click", removeEntries);

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
  if ( date > new Date(0,0,0,0) ){
    description = document.getElementById("description").value;
    if (description == ''){
      alert("Please add a description to your current task.");
      return;
    }
    entry = new Entry(date.getHours() + ":" + date.getMinutes(), description);
    entries.push(entry);
    localStorage.setItem("entries", JSON.stringify(entries));

    document.getElementById("results").insertAdjacentHTML("afterend", printEntry(entry));
    if (document.getElementById("data").classList.contains("hidden") ){
      toggleVisible("data");
    }

    date = new Date(0,0,0,0);
    localStorage.setItem("time", date);
    document.getElementById("description").value = "";
    clearInterval(interval);
    running = false;
    setTimer();
  }
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
    toggleVisible("data");
    document.getElementById("data").style.display = "block";
    for (var i = 0; i < entries.length; i++){
      document.getElementById("results").insertAdjacentHTML("afterend", printEntry(entries[i]));
    }
  } else {
    toggleVisible("data");
    document.getElementById("results").innerHTML = "";
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

function removeEntries(){
  if (window.confirm("Do you really want to remove all saved entries? This can't be undone.")){
    entries = new Array();
    localStorage.setItem("entries", new Array() );
    getTable();
  }
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

function toggleVisible(id){
  var thing =  document.getElementById(id);
  if(thing.classList.contains("hidden")){
    thing.className = "visible";
  } else {
    thing.className = "hidden";
  }
}

// Analytics
if (location.host == "supertimetracker.com"){
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-2107177-11', 'supertimetracker.com');
  ga('send', 'pageview');
}
