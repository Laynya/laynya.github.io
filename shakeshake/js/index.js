let elCount = document.getElementById('count');
let elCountdown = document.getElementById('countdown');
let elTimer = document.getElementById('timer');
let start = false;

let direction = 1;
let count = 0;

let intervalID = -1;
let time = 100;

window.addEventListener('devicemotion', deviceMotionHandler);
window.addEventListener('load', init);

function init() {
  // 初期化

  var title = document.createElement('a');
  title.id = "title";
  title.innerHTML = "Shake Shake Battle";

  var countdown = document.createElement('div');
  countdown.id = "countdown";
  countdown.innerHTML = "";

  var startButton = document.createElement('input');
  startButton.id = "startButton";
  startButton.type = "button";
  startButton.value = "Start";
  startButton.onclick = function() {
    if(title != null && startButton != null){
      //console.log("remove node=" + node.id);
      title.parentNode.removeChild(title);
      startButton.parentNode.removeChild(startButton);

      elCountdown.innerHTML = 3;
      setTimeout(function() {elCountdown.innerHTML = 2;}, 500);
      setTimeout(function() {elCountdown.innerHTML = 1;}, 1000);
      setTimeout(function() {elCountdown.innerHTML = "GO!";}, 1500);
      setTimeout(function() {
        intervalID = setInterval(function() {
          time--;
          elTimer.innerHTML = time / 10;
        }, 100);
        elCountdown.innerHTML = ""
        elCount.innerHTML = 0;
        count = 0;
        start = true;
      }, 2000);

      setTimeout(function() {
        clearInterval(intervalID);
        elTimer.innerHTML = "End!"
        intervalID = -1;
        start = false;
      }, 12000);
    }
  };

  let objBody = document.getElementsByTagName("body").item(0);
  objBody.appendChild(title);
  objBody.appendChild(startButton);

}

function opening(){
    let objBody = document.getElementsByTagName("body").item(0);
    objBody.appendChild(title);
    objBody.appendChild(startButton);
}

function gameStart(){
  intervalID = setInterval(function() {
    time--;
    elTimer.innerHTML = time / 10;
  }, 100);
  elCountdown.innerHTML = ""
  elCount.innerHTML = 0;
  count = 0;
  start = true;
}

function gameEnd(){
  clearInterval(intervalID);
  elTimer.innerHTML = "End!"
  intervalID = -1;
  start = false;
}

function deviceMotionHandler(event) {
  if(start){
    const y = event.acceleration.y;
    const bound = 7;

    if (y > bound) {
      if (direction == -1) {
        count++;
        direction = 1;
      }
      elCount.innerHTML = count;
    } else if (y < -bound) { // 下
      if (direction == 1) direction = -1;
      elCount.innerHTML = count;
    }
  }
}
