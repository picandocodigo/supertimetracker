var date = new Date(0,0,0,0);

var time = document.getElementById("time");
var save = document.getElementById("save");

var running = false;
var interval;

time.addEventListener("click", startTimer);
save.addEventListener("click", saveEntry);

function startTimer(){
  if (running){
    clearInterval(interval);
    running = false;
  }else{
    running = true;
    interval = window.setInterval(function(){
      date.setSeconds(date.getSeconds() + 1);
      document.getElementById("seconds").innerHTML = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
      document.getElementById("minutes").innerHTML = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
      document.getElementById("hours").innerHTML = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
    }, 1000);
  }
}

function saveEntry(){
  entry = new Entry(date.getHours() + ":" + date.getMinutes(), document.getElementById("description").value);

  document.getElementById("results").insertAdjacentHTML("afterend", entry.print());
  document.getElementById("results-table").style.display = "block";

  date = new Date(0,0,0,0);
  document.getElementById("description").value = "";
}

function Entry(time, description){
  this.date = new Date();
  this.time = time;
  this.description = description;
}

Entry.prototype.print = function(){
  var result = new Array();
  result = "<tr>";
  result += "<td>";
  result += this.date.getMonth() + "/" + this.date.getDate() + "/" + this.date.getFullYear();
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
