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
        var die_val = getCookie("die"+i);
        if(die_val.indexOf("#")!=-1){
            var die_day = die_val.substr(-1,1); //截取死亡信息中的死亡日期
            switch (0){
                case die_val.indexOf("kill#"):
                    kill(i,id[i-1],die_day);
                    break;
                case die_val.indexOf("sniper#"):
                    sniper(i,id[i-1],die_day);
                    break;
                case die_val.indexOf("prick2#"):
                    prick(i,id[i-1],die_day);
                    break;
            }
        }
    }
}

//玩家死亡日志
function kill(num,role,day) {
    $(".log").append('<p>第'+day+'天：'+num+'号被杀手杀死了，真实身份是'+role+'</p>')
}
function sniper(num,role,day) {
    $(".log").append('<p>第'+day+'天：'+num+'号被狙击手狙死了，真实身份是'+role+'</p>')
}
function prick(num,role,day) {
    $(".log").append('<p>第'+day+'天：'+num+'号被医生毒死了，真实身份是'+role+'</p>')
}

//绑定事件、转换阶段
function bindEvent() {
    $(".footer button").on("click",function () {
        setCookie("stage",6,3);
        window.location.href = "judge-log.html";
    })
}
