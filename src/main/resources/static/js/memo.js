function post () {
  const submit = document.getElementById("submit");//indexのid=submitを変数submitに入れる
  submit.addEventListener("click", (e) => {//eイベントオブジェクト、イベント発生時の情報を持ったオブジェクト、eじゃなくていい
    e.preventDefault();//ブラウザとjavascriptで2回リクエストが送信されるからブラウザをキャンセルしたい
    const form = document.getElementById("form");
    const formData = new FormData(form);//formDataオブジェクト、フォームに入力した値を取得、変数formを引数formに入れる
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);//openメソッド(postかget, パス, 非同期通信するかしないか)
    XHR.responseType = "json";
    XHR.send(formData);
  });
};

window.addEventListener('load', post);