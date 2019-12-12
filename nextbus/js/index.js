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

  let objBody = document.getElementsByTagName("body").item(0);
  objBody.appendChild(title);

  //ユーザーの現在の位置情報を取得
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

/***** ユーザーの現在の位置情報を取得 *****/
function successCallback(position) {
  var gl_text = "緯度：" + position.coords.latitude + "<br>";
    gl_text += "経度：" + position.coords.longitude + "<br>";
    gl_text += "高度：" + position.coords.altitude + "<br>";
    gl_text += "緯度・経度の誤差：" + position.coords.accuracy + "<br>";
    gl_text += "高度の誤差：" + position.coords.altitudeAccuracy + "<br>";
    gl_text += "方角：" + position.coords.heading + "<br>";
    gl_text += "速度：" + position.coords.speed + "<br>";
    gl_text += "判定：" + LocationAnaly(position.coords.latitude, position.coords.longitude, position.coords.altitude) + "<br>";
  document.getElementById("show_result").innerHTML = gl_text;

}

/***** 位置情報が取得できない場合 *****/
function errorCallback(error) {
  var err_msg = "";
  switch(error.code)
  {
    case 1:
      err_msg = "位置情報の利用が許可されていません";
      break;
    case 2:
      err_msg = "デバイスの位置が判定できません";
      break;
    case 3:
      err_msg = "タイムアウトしました";
      break;
  }
  document.getElementById("show_result").innerHTML = err_msg;
  //デバッグ用→　document.getElementById("show_result").innerHTML = error.message;
}

function LocationAnaly(lat, long, accuracy){
  if(lat < 35.629000 && lat > 35.622000){
    if(long < 139.346000 && long > 139.338000){
      return true;
    }
  }else{
    return false;
  }
}
