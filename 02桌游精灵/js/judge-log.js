/**
 * Created by Liang Xu on 2017/1/23.
 */
$(function () {
    init();
    judgeStage();
});

var sum = Number(getCookie("sum"));
var stage = Number(getCookie("stage"));
var day = Number(getCookie("day"));

//初始化
function init() {
    $(".main h2 span").text(day);
    for(var i=1;i-1<sum;i++){
        switch ('0'){
            case getCookie("role3"):$(".night ul li:eq(0)").hide();
            case getCookie("role2"):$(".night ul li:eq(1)").hide();
            case getCookie("role5"):$(".night ul li:eq(2)").hide();
            case getCookie("role4"):$(".night ul li:eq(3)").hide();
        }
    }

}
//判断阶段
function judgeStage() {
    switch(stage){
        case 1:readyStage();
            if(getCookie("role3")=="0"){
                setCookie("stage",stage+1,3);
                location.reload();
            }
            break;
        case 2:nightStage();
            if(getCookie("role2")=="0"){
                setCookie("stage",stage+1,3);
                location.reload();
            }
            break;
        case 3:nightStage();
            if(getCookie("role5")=="0"){
                setCookie("stage",stage+1,3);
                location.reload();
            }
            break;
        case 4:nightStage();
            if(getCookie("role4")=="0"){
                setCookie("stage",stage+1,3);
                location.reload();
            }
            break;
        case 5:nightReveal();break;
        case 6:discussStage();break;
        case 7:voteStage();break;
        case 8:dayOver();break;

    }
}
//角色死亡则角色数减一
function cancelRoleStage(num) {
    switch (getCookie("num"+num)){
        case "平民":
            setCookie("role1",getCookie("role1")-1,3);
            break;
        case "杀手":
            setCookie("role3",getCookie("role3")-1,3);
            break;
        case "警察":
            setCookie("role2",getCookie("role2")-1,3);
            break;
        case "狙击手":
            setCookie("role5",getCookie("role5")-1,3);
            break;
        case "医生":
            setCookie("role4",getCookie("role4")-1,3);
            break;
    }
}
//准备阶段
function readyStage() {
    $(".main li").removeClass("active");
    $(".night li:eq("+(stage-1)+")").addClass("active");
    $(".footer button").text("天黑请闭眼");
    $(".main ul li.active,.footer button").on("click",function () {
        window.location.href = "vote.html";
    });
}
//黑夜阶段
function nightStage() {
    $(".main li").removeClass("active");
    $(".night li:eq("+(stage-1)+")").addClass("active");
    $(".footer button").text("下一步");
    $(".main ul li.active,.footer button").on("click",function () {
        window.location.href = "vote.html";
    });
}
//白天阶段
//黑夜解密阶段
function nightReveal() {
    $(".main li").removeClass("active");
    $(".day li:eq("+(stage-5)+")").addClass("active");
    $(".footer button").text("天亮请睁眼");
    $(".main ul li.active,.footer button").on("click",function () {
        for(var n=1;n-1<sum;n++){        //结算时给死亡玩家(未确认死亡：没有死亡日期)加上死亡日期，确认死亡
            if(getCookie("die"+n)&&getCookie("die"+n)!="prick"&&getCookie("die"+n).indexOf("#")==-1){
                setCookie("die"+n,getCookie("die"+n)+"#"+day,3);
                cancelRoleStage(n);         //死亡角色数减一
            }
        }
        window.location.href = "night-reveal.html";
    });
}
//讨论阶段
function discussStage() {
    $(".main li").removeClass("active");
    $(".day li:eq("+(stage-5)+")").addClass("active");
    $(".footer button").text("讨论完成");
    $(".main ul li.active,.footer button").on("click",function () {
        setCookie("stage",7,3);
        window.location.reload();
    });
}
//投票阶段
function voteStage() {
    $(".main li").removeClass("active");
    $(".day li:eq("+(stage-5)+")").addClass("active");
    $(".footer button").text("进行投票");
    $(".main ul li.active,.footer button").on("click",function () {
        window.location.href = "vote.html";
    });
}
//结束阶段
function dayOver() {
    $(".main li").removeClass("active");
    $(".day li:eq("+(stage-5)+")").addClass("active");
    $(".footer button").text("第"+(day+1)+"天");
    $(".main ul li.active,.footer button").on("click",function () {
        for(var n=1;n-1<sum;n++){        //结算时给死亡玩家(未确认死亡：没有死亡日期)加上死亡日期，确认死亡
            if(getCookie("die"+n)&&getCookie("die"+n)!="prick"&&getCookie("die"+n).indexOf("#")==-1){
                setCookie("die"+n,getCookie("die"+n)+"#"+day,3);
                cancelRoleStage(n);         //死亡角色数减一
            }
        }
        setCookie("day",(day+1),3);
        setCookie("stage",1,3);
        window.location.reload();
    });
}

