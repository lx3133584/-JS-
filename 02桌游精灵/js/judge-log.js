/**
 * Created by Liang Xu on 2017/1/23.
 */
$(function () {
    init();
    judgeStage();
});

var sum = Number(getCookie("sum"));
var id = [];
var stage = Number(getCookie("stage"));
var day = Number(getCookie("day"));

//初始化
function init() {
    $(".main h2 span").text(day);
    for(var i=0;i<sum;i++){
        id.push(getCookie("num"+(i+1)));
        switch (id[i]){
            case "杀手":$(".night ul li:eq(0)").show();break;
            case "警察":$(".night ul li:eq(1)").show();break;
            case "狙击手":$(".night ul li:eq(2)").show();break;
            case "医生":$(".night ul li:eq(3)").show();break;
        }
    }

}
//判断阶段
function judgeStage() {
    switch(stage){
        case 1:readyStage();break;
        case 2:nightStage();break;
        case 3:nightStage();break;
        case 4:nightStage();break;
        case 5:nightReveal();break;
        case 6:discussStage();break;
        case 7:voteStage();break;
        case 8:dayOver();break;

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
                setCookie("die"+n,getCookie("die"+n)+"#"+day,3)
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
                setCookie("die"+n,getCookie("die"+n)+"#"+day,3)
            }
        }
        setCookie("day",(day+1),3);
        setCookie("stage",1,3);
        window.location.reload();
    });
}

