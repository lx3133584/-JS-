/**
 * Created by Liang Xu on 2017/1/22.
 */
$(function () {
    btnEvent();
    dataProcessing();
    setData();
});

//获取参数
var sum = Number(getCookie("sum"));
var role = ["平民","警察","杀手","医生","狙击手"];
var id = [];
//处理参数，随机分配角色
function dataProcessing() {
    for(var m=1;m<=5;m++){
        for(var n=0;n<getCookie("role"+m);n++){
            id.push(role[m]);
        }
    }
    for(var i=0;i<sum;i++){
        var random = Math.floor(Math.random()*sum);
        var num = id[random];
        id[random] = id[i];
        id[i] = num;
    }
}
//通过cookie储存参数
function setData() {
    for(var i=0;i<sum;i++){
        setCookie("num"+(i+1),id[i],3)
    }
    setCookie("stage",0,3);
}
//按钮事件
function btnEvent() {
    var flag = true;
    var n = 1;
    $(".footer button").on("click",function () {
        if(flag){
            if(n<sum){
                $(".footer button").html("隐藏并传递给<span>"+(n+1)+"</span>号");
                $(".role span").text(id[n-1]);
                if (id[n-1] == "杀手"){
                    $(".word span").text(getCookie("word1"));
                    $(".description").text("想办法杀光所有平民，同时还要注意不要暴露自己哦!")
                }
                else{
                    $(".word span").text(getCookie("word1"));
                    $(".description").text("想办法存活下去，同时还要注意找到杀手哦！")
                }
                $(".card").toggleClass("flipped");
                flag = false;
            }
            else {
                $(".card").toggleClass("flipped");
                $(".footer button").html("准备开始");
                flag = false;
            }

        }
        else{
            if(n<sum){
                $(".card h2").text(n+1);
                $(".footer button").html("查看<span>"+(n)+"</span>号身份").find("span").text(n+1);
                n++;
                $(".card").toggleClass("flipped");
                flag = true;
            }
            else {
                window.location.href="vote.html";
            }

        }
    })
}