const buildHTML = (XHR) => {
  const item = XHR.response;
  const html = `
  <div class="post">
    <div class="post-date">
      投稿日時：${item.createAt}
    </div>
    <div class="post-content">
      ${item.content}
    </div>`;
  return html;//3-10行のhtml
};

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
    XHR.onload = () => {//onloadプロパティ、リクエストが聖子したときに呼び出される
      if (XHR.status != 200) {//200以外のとき
        alert(`Error ${XHR.status}: ${XHR.response.error}`);
        return null;//抜け出すため、29行目以降の処理を行わないため
      };
      const list = document.getElementById("list");
      const formText = document.getElementById("content"); 
      list.insertAdjacentHTML("afterend", buildHTML(XHR));//afterendは要素直後にhtml挿入 
      formText.value = "";
    };
  });
};

window.addEventListener('load', post);