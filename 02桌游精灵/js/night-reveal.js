/**
 * Created by Liang Xu on 2017/1/23.
 */
$(function () {
    init();
    bindEvent();
});
//获取数据并初始化
function init() {
    var sum = getCookie("sum");
    var id = [];
    for(var i=1;i<=sum;i++){
        id.push(getCookie("num"+i));
        if(getCookie("die"+i)){
            switch (getCookie("die"+i)){
                case "kill":kill(i,id[i-1]);break;
                case "sniper":sniper(i,id[i-1]);break;
                case "prick2":prick(i,id[i-1]);break;
            }
        }
    }
}
//玩家死亡日志
function kill(num,role) {
    $(".log").append('<p>'+num+'号被杀手杀死了，真实身份是'+role+'</p>')
}
function sniper(num,role) {
    $(".log").append('<p>'+num+'号被狙击手狙死了，真实身份是'+role+'</p>')
}
function prick(num,role) {
    $(".log").append('<p>'+num+'号被医生毒死了，真实身份是'+role+'</p>')
}

//绑定事件、转换阶段
function bindEvent() {
    $(".footer button").on("click",function () {
        setCookie("stage",6,3);
        window.location.href = "judge-log.html";
    })
}
