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
var die = getCookie("die").split(",");
var id = getCookie("id").split(",");
var roles_alive = [];
for(var m=0;m<5;m++){
    roles_alive.push(Number(getCookie("roles_alive").split(",")[m]))
}

//初始化
function init() {
    $(".main h2 span").text(day);
    for(var i=1;i-1<sum;i++){
        switch (0){
            case roles_alive[2]:$(".night ul li:eq(0)").hide();
            case roles_alive[1]:$(".night ul li:eq(1)").hide();
            case roles_alive[4]:$(".night ul li:eq(2)").hide();
            case roles_alive[3]:$(".night ul li:eq(3)").hide();
        }
    }

}
//判断阶段
function judgeStage() {
    switch(stage){
        case 1:readyStage();
            if(roles_alive[2]==0){
                setCookie("stage",stage+1,3);
                location.reload();
            }
            break;
        case 2:nightStage();
            if(roles_alive[1]==0){
                setCookie("stage",stage+1,3);
                location.reload();
            }
            break;
        case 3:nightStage();
            if(roles_alive[4]==0){
                setCookie("stage",stage+1,3);
                location.reload();
            }
            break;
        case 4:nightStage();
            if(roles_alive[3]==0){
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
    switch (id[num]){
        case "平民":
            roles_alive[0]--;
            setCookie("roles_alive",roles_alive.join(","),3);
            break;
        case "警察":
            roles_alive[1]--;
            setCookie("roles_alive",roles_alive.join(","),3);
            break;
        case "杀手":
            roles_alive[2]--;
            setCookie("roles_alive",roles_alive.join(","),3);
            break;
        case "医生":
            roles_alive[3]--;
            setCookie("roles_alive",roles_alive.join(","),3);
            break;
        case "狙击手":
            roles_alive[4]--;
            setCookie("roles_alive",roles_alive.join(","),3);
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
        for(var n=0;n<sum;n++){        //结算时给死亡玩家(未确认死亡：没有死亡日期)加上死亡日期，确认死亡
            if(die[n]!="false"&&die[n]!="prick"&&die[n].indexOf("#")==-1){
                die[n] = die[n]+"#"+day;
                setCookie("die",die.join(","),3);
                cancelRoleStage(n);         //死亡角色数减一
            }
        }
        judgeEnd();
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
    $(".footer button").text("第"+(day)+"天结束");
    $(".main ul li.active,.footer button").on("click",function () {
        for(var n=0;n<sum;n++){        //结算时给死亡玩家(未确认死亡：没有死亡日期)加上死亡日期，确认死亡
            if(die[n]!="false"&&die[n]!="prick"&&die[n].indexOf("#")==-1){
                die[n] = die[n]+"#"+day;
                setCookie("die",die.join(","),3);
                cancelRoleStage(n);         //死亡角色数减一
            }
        }
        setCookie("day",(day+1),3);
        judgeEnd();
    });
}

//判断是否游戏结束
function judgeEnd(){
    var num_bandit_alive = roles_alive[2];
    var num_police_alive = roles_alive[0]+roles_alive[1]+roles_alive[3]+roles_alive[4];
    if(num_bandit_alive==0){
        setCookie("settle","平民胜利",3);
        window.location.href = "settle.html";
    }
    else if(num_police_alive<=num_bandit_alive){
        setCookie("settle","杀手胜利",3);
        window.location.href = "settle.html";
    }
    else {
        switch (stage){
            case 5:window.location.href = "night-reveal.html";break;
            case 8:setCookie("stage",1,3);window.location.reload();break;
        }
    }
}
