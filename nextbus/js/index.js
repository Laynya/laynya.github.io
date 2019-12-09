let elCount = document.getElementById('count');
let elCountdown = document.getElementById('countdown');
let elTimer = document.getElementById('timer');
let elDescription = document.getElementById('description');

window.addEventListener('load', init);

function init() {
  // 初期化

  var title = document.createElement('a');
  title.id = "title";
  title.innerHTML = "Test";

  var countdown = document.createElement('div');
  countdown.id = "countdown";
  countdown.innerHTML = "";

  let objBody = document.getElementsByTagName("body").item(0);
  objBody.appendChild(title);

  navigator.geolocation.getCurrentPosition(test2);
}

function opening(){
    let objBody = document.getElementsByTagName("body").item(0);
    objBody.appendChild(title);
}

function test2(position) {

    var geo_text = "緯度:" + position.coords.latitude + "\n";
    geo_text += "経度:" + position.coords.longitude + "\n";
    geo_text += "高度:" + position.coords.altitude + "\n";
    geo_text += "位置精度:" + position.coords.accuracy + "\n";
    geo_text += "高度精度:" + position.coords.altitudeAccuracy  + "\n";
    geo_text += "移動方向:" + position.coords.heading + "\n";
    geo_text += "速度:" + position.coords.speed + "\n";

    var date = new Date(position.timestamp);

    geo_text += "取得時刻:" + date.toLocaleString() + "\n";

    alert(geo_text);

}
