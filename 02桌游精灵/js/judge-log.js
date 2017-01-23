/**
 * Created by Liang Xu on 2017/1/23.
 */
$(function () {
    init();
    judgeStage();
});

var sum = Number(getCookie("sum"));
var id = [];
var stage = getCookie("stage");
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
        case "1":readyStage();break;
        case "2":nightStage();break;
        case "3":nightStage();break;
        case "4":nightStage();break;
        case "5":dayStage();break;
        case "6":dayStage();break;
        case "7":dayStage();break;
        case "8":dayStage();break;

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
//天亮阶段
function dayStage() {
    $(".main li").removeClass("active");
    $(".day li:eq("+(stage-5)+")").addClass("active");
    if(stage=='5'){
        $(".footer button").text("天亮请睁眼");
        $(".main ul li.active,.footer button").on("click",function () {
            window.location.href = "night-reveal.html";
        });
    }
    else if(stage=='6'){
        $(".footer button").text("讨论完成");
        $(".main ul li.active,.footer button").on("click",function () {
            setCookie("stage",7,3);
            window.location.reload();
        });
    }
    else if(stage=='7'){
        $(".footer button").text("进行投票");
        $(".main ul li.active,.footer button").on("click",function () {
            window.location.href = "vote.html";
        });
    }
    else if(stage=='8'){
        $(".footer button").text("第"+(day+1)+"天");
        $(".main ul li.active,.footer button").on("click",function () {
            setCookie("day",(day+1),3);
            setCookie("stage",1,3);
            window.location.reload();
        });
    }
}

