// 対象の要素を得る
var tabs = document.getElementById('tabcontrol').getElementsByTagName('a');
var pages = document.getElementById('tabbody').getElementsByTagName('div');

var correctAnswers = ["FAMICOM","おんせい","",""];             //正しい答え
var answers =  document.getElementsByClassName('answer'); //入力された答え
var currentPage = 0;                                     //開いているタブ。1が0
var clear = [false,false,false,false];  //[問1の正誤、問2の正誤、問3の正誤,問4の正誤]

//タブ切り替え
function changeTab() {
  // href属性値から対象のid名を抜き出す
  var targetid = this.href.substring(this.href.indexOf('#')+1,this.href.length);

  // 指定のページだけを表示する
  for(var i=0; i<pages.length; i++) {
    if( pages[i].id != targetid ) {
      pages[i].style.display = "none";//タブを非表示
      tabs[i].style.zIndex = "0"; //タブを背面に
    }
    else {
      pages[i].style.display = "block"; //タブを表示
      tabs[i].style.zIndex = "10";
      currentPage = i;
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
  if(answers[currentPage].value == correctAnswers[currentPage]){//答えが合っている
    if(clear[currentPage]){                             //クリア済みなら何も起きない
      return false;
    }
    clear[currentPage] = true;
    answers[currentPage].nextElementSibling.textContent = "";
  }
  else{                                                       //答えが間違っている
    answers[currentPage].nextElementSibling.textContent = "解答が間違っています";
  }
  if(clear[0] && currentPage==0){ //stage1をクリアしたら2以降のtextboxを有効に
    alert("入力機能が利用可能になりました");
    for(var i=1; i<tabs.length; i++) {
      answers[i].placeholder = "答えを入力してください";
      answers[i].disabled = false;
    }
  }
  if(clear[1] && currentPage==1){
   //ここに動画の差し替え処理 
  }
  if(clear[2] && currentPage==2){//stage3をクリアしたら最終ステージを解放
    tabs[3].style.display = "inline-block";
  }
  if(clear[3] && currentPage==3){//stage4クリアでfinal.htmlに移動
    //final.htmlへ移動あるいはリンクを表示
  }
}
