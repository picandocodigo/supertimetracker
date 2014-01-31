var date = new Date(0,0,0,0);

var time = document.getElementById("time");
var save = document.getElementById("save");

time.addEventListener("click", startTimer);
save.addEventListener("click", saveEntry);

function startTimer(){
  window.setInterval(function(){
    date.setSeconds(date.getSeconds() + 1);
    document.getElementById("seconds").innerHTML = (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds();
    document.getElementById("minutes").innerHTML = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes();
    document.getElementById("hours").innerHTML = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours();
  }, 1000)
}

function saveEntry(){
  var result = new Array();
  result = "<tr>";
  result += "<td>";
  result += document.getElementById("description").value;
  result += "</td>"
  result += "<td>";
  result += date.getHours() + ":" + date.getMinutes();
  result += "</td>"
  result += "</tr>"

  document.getElementById("results").innerHTML = result;
  document.getElementById("results-table").style.display = "block";

  date = new Date(0,0,0,0);
  document.getElementById("description").value = "";

}
