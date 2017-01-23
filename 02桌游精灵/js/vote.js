/**
 * Created by Liang Xu on 2017/1/23.
 */
$(function () {
    init();
    judgeStage();
});

//初始化角色
function init() {
   var sum = getCookie("sum");
   var id = [];
   for(var i=0;i<sum;i++){
       id.push(getCookie("num"+(i+1)));
       $(".boxes").append('<div><div class="box"><div>警察</div><img src="img/Vines.jpg" alt="身份牌"><div>2号</div></div><div class="operate"><img src="img/knife.png"/><img src="img/magnifier.png"/><img src="img/sight.png"/><img src="img/cross.png"/></div></div>')
       $(".box:eq("+i+") div:first-child").text(id[i]);
       $(".box:eq("+i+") div:last-child").text(i+1+"号");
   }
}
//查看身份
function view() {
        $(".box").on("mouseenter click",function () {
            $(".box").find("img").show();
            $(this).find("img").hide();
        })
}
//点击box激活红色边框
function clickActive() {
    $(".box").on("click",function () {
        if($(this).parent().hasClass("activated")){
            alert("该玩家已死亡");
        }else{
            if($(this).parent().hasClass("active")){
                $(".boxes>div").removeClass("active");
            }
            else {
                $(".boxes>div").removeClass("active");
                $(this).parent().addClass("active");
            }
        }
    });
}

//判断阶段
function judgeStage() {
    switch(getCookie("stage")){
        case "0":readyStage();break;
        case "1":killStage();break;
        case "2":verifyStage();break;
        case "3":sniperStage();break;
        case "4":prickStage();break;
        case "7":voteStage();break;

        

    }
}
//准备阶段
function readyStage() {
    view();
    $(".header span").text("准备开始");
    $(".talk>p").text("身份发放结束，法官可查看玩家身份");
    $(".main>p").text("点击头像查看身份");
    $(".footer button").text("开始游戏")
        .on("click",function () {
            setCookie("stage",1,3);
            setCookie("day",1,3);
            window.location.href = "judge-log.html";
        });
}
//杀手杀人阶段
function killStage() {
    $(".header span").text("杀手杀人");
    $(".talk>p").text("杀手请睁眼，请选择要杀的对象");
    $(".main>p").text("点击下方玩家头像，对玩家进行标记");
    clickActive();
    $(".footer button").text("确定").on("click",function () {
        var num = $(".boxes>div.active").index();
        if(num!=-1){
            setCookie("die"+(num+1),"kill",3);
            setCookie("stage",2,3);
            judgeEnd();
            window.location.href = "judge-log.html";
        }
        else{
            alert("请点击玩家头像，对玩家进行标记")
        }
    })
}
//警察验人阶段
function verifyStage() {
    var flag = false;
    $(".header span").text("警察验人");
    $(".talk>p").text("警察请睁眼，请选择要验证的对象");
    $(".main>p").text("点击下方玩家头像，验证玩家身份");
    clickActive();
    $(".footer button").text("确定").on("click",function () {
        if(flag){
            setCookie("stage",3,3);
            window.location.href = "judge-log.html";
        }
        else {
            var num = $(".boxes>div.active").index();
            if(num!=-1){
                $(".boxes>div.active").find("img").css("visibility","hidden");
                $(".box").off("click");
                $(this).text("下一步");
                flag = true;
            }
            else{
                alert("请点击玩家头像，验证玩家身份")
            }

        }

    })
}

//狙击手狙击阶段
function sniperStage() {
    $(".header span").text("狙击手狙击");
    $(".talk>p").text("狙击手请睁眼，请选择要狙击的对象");
    $(".main>p").text("点击下方玩家头像，对玩家进行标记(再次点击取消选中)");
    clickActive();
    $(".footer button").text("确定").on("click",function () {
        var num = $(".boxes>div.active").index();
        setCookie("die"+(num+1),"sniper",3);
        setCookie("stage",4,3);
        judgeEnd();
        window.location.href = "judge-log.html";
    })
}
//医生扎人阶段
function prickStage() {
    $(".header span").text("医生救人");
    $(".talk>p").text("医生请睁眼，请选择要救治的对象");
    $(".main>p").text("点击下方玩家头像，对玩家进行救治（扎两针空针该玩家被毒死）");
    clickActive();
    $(".footer button").text("确定").on("click",function () {
        var num = $(".boxes>div.active").index();
        if(getCookie("die"+(num+1))=="prick"){
            setCookie("die"+(num+1),"prick2",3);
        }
        else if(getCookie("die"+(num+1))==""){
            setCookie("die"+(num+1),"prick",3);
        }
        else {
            setCookie("die"+(num+1),"",3);
        }
        setCookie("stage",5,3);
        judgeEnd();
        window.location.href = "judge-log.html";
    })
}
//投票阶段
function voteStage() {
    $(".header span").text("投票");
    $(".talk>p").text("发言讨论结束，大家请投票");
    $(".main>p").text("点击得票数最多人的头像(相同票数则不死人)");
    clickActive();
    $(".footer button").text("投死").on("click",function () {
        var num = $(".boxes>div.active").index();
        setCookie("die"+(num+1),"vote",3);
        setCookie("stage",8,3);
        judgeEnd();
        window.location.href = "judge-log.html";
    })
}
//判断是否游戏结束
function judgeEnd(){
    var sum = Number(getCookie("sum"));
    var sum_die = 0;
    var num_bandit = 0;
    var num_bandit_die = 0;
    for(var i=1;i<=sum;i++){
        if(getCookie("num"+i)=="杀手"){
            num_bandit++;
            if(getCookie("die"+i)&&getCookie("die"+i)!="prick"){
                num_bandit_die++;
            }
        }
    }
    for(var m=1;m<=sum;m++) {
        if (getCookie("die" + i) && getCookie("die" + i) != "prick") {
            sum_die++;
        }
    }
    var num_bandit_alive = num_bandit-num_bandit_die;
    var sum_alive = sum-sum_die;
    var num_police_alive = sum_alive-num_bandit_alive;
    if(num_bandit_alive>=num_police_alive){
        setCookie("settle","杀手胜利",3);
        window.location.href = "settle.html";
    }
    else if(num_bandit_alive==0){
        setCookie("settle","平民胜利",3);
        window.location.href = "settle.html";
    }
    else {
        for(var n=0;n<sum;n++){         //如果玩家死亡则加上黑框
            if(getCookie("die"+(n+1))&&getCookie("die"+(n+1))!="prick"){
                $(".boxes>div:eq("+n+")").addClass("activated");
            }
        }
    }
}
