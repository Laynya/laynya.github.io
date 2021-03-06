let elCount = document.getElementById('count');
let elCountdown = document.getElementById('countdown');
let elTimer = document.getElementById('timer');
let elDescription = document.getElementById('description');
var ending = document.getElementById("end");
var none = document.getElementById("none");
let start = false;

let direction = 1;
let count = 0;

let intervalID = -1;
let time = 100;

window.addEventListener('devicemotion', deviceMotionHandler);
window.addEventListener('load', init);

function init() {
  // 初期化
  none.play();

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

      alert("当ゲームの使用中に生じたいかなる損害も一切の責任を負いかねます。");

      elDescription.innerHTML = "10秒間端末を上下に振る回数を記録します。";
      setTimeout(function() {elCountdown.innerHTML = 3;}, 1500);
      setTimeout(function() {elCountdown.innerHTML = 2;}, 2000);
      setTimeout(function() {elCountdown.innerHTML = 1;}, 2500);
      setTimeout(function() {elCountdown.innerHTML = "GO!";}, 3000);
      setTimeout(function() {
        elDescription.innerHTML = "";
        intervalID = setInterval(function() {
          time--;
          elTimer.innerHTML = (time / 10).toFixed(1);
        }, 100);
        elCountdown.innerHTML = ""
        elCount.innerHTML = 0;
        count = 0;
        start = true;
      }, 3500);

      setTimeout(function() {
        ending.play();
        Haptics.vibrate(500);
        clearInterval(intervalID);
        elTimer.innerHTML = "End!"
        intervalID = -1;
        start = false;

        let objBody = document.getElementsByTagName("body").item(0);
        objBody.appendChild(objEnding);

      }, 13500);
    }
  };

  var tweetButton = document.createElement('input');
  tweetButton.id = "tweetButton";
  tweetButton.type = "button";
  tweetButton.value = "Tweet";
  tweetButton.onclick = function() {
    var text = encodeURIComponent("10秒間で" + count + "回振りました。\n\n#ShakeShakeBattle https://laynya.github.io/shakeshake/");
    window.open("http://twitter.com/intent/tweet?text=" + text);
  };

  var restartButton = document.createElement('input');
  restartButton.id = "restartButton";
  restartButton.type = "button";
  restartButton.value = "Restart";
  restartButton.onclick = function() { location.reload(false); };

  let objEnding = document.createElement('var');
  objEnding.id = "endingButton";
  objEnding.appendChild(tweetButton);
  objEnding.appendChild(document.createElement('br'));
  objEnding.appendChild(document.createElement('br'));
  objEnding.appendChild(restartButton);

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
