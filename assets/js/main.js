// 対象の要素を得る
var tabs = document.getElementById('tabcontrol').getElementsByTagName('a');
var pages = document.getElementById('tabbody').getElementsByTagName('div');

var correctAnswers = ["FAMICOM","おんせい",""];             //正解
var answers =  document.getElementsByClassName('answer'); //入力された答え
var currentPage = 0;                                     //開いているタブ。1が0
var clear = [false,false,false];  //[問1の正誤、問2の正誤、問3の正誤]

//タブ切り替え
function changeTab() {
  // href属性値から対象のid名を抜き出す
  var targetid = this.href.substring(this.href.indexOf('#')+1,this.href.length);

  // 指定のページだけを表示する
  for(var i=0; i<pages.length; i++) {
    if( pages[i].id != targetid ) {
      pages[i].style.display = "none";
      tabs[i].style.zIndex = "0"; //タブを背面に
    }
    else {  //開こうとしたページが
      if(i == 0){ //最初のページなら無条件で表示
        pages[i].style.display = "block";
        tabs[i].style.zIndex = "10";
        currentPage = i;
      }else if(clear[i-1]){ //そうでないなら前のページをクリアしていたら表示
        pages[i].style.display = "block";
        tabs[i].style.zIndex = "10";
        currentPage = i;
      }else{                  //上のどちらでもないなら現在のページに留まる
        pages[currentPage].style.display = "block";
        tabs[currentPage].style.zIndex = "10";
        alert("まだ先へは進めません");
      }
    }
  }

  // ページ遷移しないようにfalseを返す
  return false;
}
// すべてのタブに対して、クリック時にchangeTab関数が実行されるよう指定する
for(var i=0; i<tabs.length; i++) {
  tabs[i].onclick = changeTab;
}
// 最初は先頭のタブを選択
tabs[0].onclick();
//ここまでタブ切り替え

//問題正誤判定
//送信ボタンが押された時に実行
function answerInput() {
  if(answers[currentPage].value == correctAnswers[currentPage]){
    if(clear[currentPage]){
      return false;
    }
    clear[currentPage] = true;
    answers[currentPage].nextElementSibling.textContent = "";
  }
  else{
    answers[currentPage].nextElementSibling.textContent = "解答が間違っています";
  }
  if(clear[0] && currentPage==0){
    alert("入力機能が利用可能になりました");
    for(var i=1; i<tabs.length; i++) {
      answers[i].placeholder = "答えを入力してください";
      answers[i].disabled = false;
    }
  }
  if(clear[2] && currentPage==2){
    tabs[3].style.display = "inline-block";
  }
}
