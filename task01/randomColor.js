/**
 * Created by Liang Xu on 2017/1/17.
 */
var btn1 = document.getElementsByTagName('button')[0];
var btn2 = document.getElementsByTagName('button')[1];
var boxes = document.getElementById('boxes');
var squares = boxes.getElementsByTagName('div');
var flag = [];
var time = null;

btn1.addEventListener('click',function () {
    time = setInterval(
        function () {
            for(var i=0,n=3;i<n;i++){
                var randomNum = Math.floor(Math.random()*9);
                var randomColor = '#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6);
                if(flag[randomNum]){
                    n++;
                }else {
                    squares[randomNum].style.background = randomColor;
                    flag[randomNum] = true;
                }
            }
            flag = [];
        },1000)
});
btn2.addEventListener('click',function () {
    for(var i=0;i<9;i++){
        squares[i].style.background = '#e78326';
    }
    clearTimeout(time);
});
