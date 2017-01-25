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
    var id = getCookie("id").split(",");
    var die = getCookie("die").split(",");
    for(var i=0;i<sum;i++){
        if(die[i].indexOf("#")!=-1){
            var die_day = die[i].substr(-1,1); //截取死亡信息中的死亡日期
            switch (0){
                case die[i].indexOf("kill#"):
                    kill(i,id[i],die_day);
                    break;
                case die[i].indexOf("sniper#"):
                    sniper(i,id[i],die_day);
                    break;
                case die[i].indexOf("prick2#"):
                    prick(i,id[i],die_day);
                    break;
            }
        }
    }
}

//玩家死亡日志
function kill(num,role,day) {
    $(".log").append('<p>第'+day+'天：'+(num+1)+'号被杀手杀死了，真实身份是'+role+'</p>')
}
function sniper(num,role,day) {
    $(".log").append('<p>第'+day+'天：'+(num+1)+'号被狙击手狙死了，真实身份是'+role+'</p>')
}
function prick(num,role,day) {
    $(".log").append('<p>第'+day+'天：'+(num+1)+'号被医生毒死了，真实身份是'+role+'</p>')
}

//绑定事件、转换阶段
function bindEvent() {
    $(".footer button").on("click",function () {
        setCookie("stage",6,3);
        window.location.href = "judge-log.html";
    })
}
