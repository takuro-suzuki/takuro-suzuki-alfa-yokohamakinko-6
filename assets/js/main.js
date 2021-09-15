// 対象の要素を得る
var tabs = document.getElementById('tabcontrol').getElementsByTagName('a');
var pages = document.getElementById('tabbody').getElementsByClassName('tabpage');

var correctAnswers = ["","6YPE","ちち","むすめをよろしく"];             //正しい答え
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
// チェックボックスの中身を一つずつ調べて、チェックされている場所を入力
function check ( ){
  for (i=0;i<document.form1.cbox1.length;i++) {
　　   var flag=document.form1.cbox1[i].checked;
　　   if (flag){
　　　　    var value=document.form1.cbox1[i].value;
        if(value==1 && clear[0]==false){
          alert("入力機能が利用可能になりました");
          for(var i=1; i<tabs.length; i++) {
            answers[i].placeholder = "答えを入力してください";
            answers[i].disabled = false;
      }
      clear[0] = true;
      answers[currentPage].nextElementSibling.textContent = "";
　　    }else{
        answers[currentPage].nextElementSibling.textContent = "解答が間違っています";
      }
    }
  }
  return false;
}
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

  if(clear[1] && currentPage==1){
   var videoEle = document.getElementsByTagName("video");
   videoEle[0].style.display = "none";
   videoEle[1].style.display = "inline";
   alert("音声出力が有効になりました");
  }
  if(clear[2] && currentPage==2){//stage3をクリアしたら最終ステージを解放
    tabs[3].style.display = "inline-block";
    alert("よくぞこの終ノ間まで辿り着いた!");
  }
  if(clear[3] && currentPage==3){//stage4クリアでfinal.htmlに移動
   location.href = "final.html";
  }
}
