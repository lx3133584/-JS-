/**
 * Created by Liang Xu on 2017/1/24.
 */
$(function () {
    init();
});

//通过cookie获取数据并加载页面
function init() {
    var settle = getCookie("settle");
    var day = getCookie("day");
    var roles = getCookie("roles").split(",");
    var id = getCookie("id").split(",");
    var die = getCookie("die").split(",");
    var sum = getCookie("sum");
    var word1 = getCookie("word1");
    var word2 = getCookie("word2");

    if(settle=="杀手胜利"){
        $(".prize").find("h1").text(settle)
            .end().find("p").text("太棒了!你知道么？在杀人游戏中只有20%的杀手取得游戏最终的胜利哦！");
    }
    else {
        $(".prize").find("h1").text(settle)
            .end().find("p").text(
                "本轮游戏共抓出杀手"+roles[2]+"人，" +
                "共经历了"+day+"个白天，" +
                "在杀人游戏中击败了"+Math.ceil(roles[2]/sum*100)+"%的玩家！");
    }
    //角色数量
    for(var i=0;i<5;i++){
        $(".settle>p:eq(1)>span:eq("+i+")>span").text(roles[i]);
    }
    //词组
    $(".settle>p:eq(2)>span:eq(0)").text("水民词组："+word1);
    $(".settle>p:eq(2)>span:eq(1)").text("幽灵词组："+word1);
    //日志
    for(var n=0;n<day;n++){
        $(".log").append("<div><i>0小时07分</i><h2>第"+(n+1)+"天</h2></div>")
    }
    var die_day = null;
    for(var m=0;m<sum;m++){
        if(die[m].indexOf("#")!=-1){
            die_day = die[m].substr(-1,1); //截取死亡信息中的死亡日期
            switch (0){
                case die[m].indexOf("kill#"):
                    kill(m,id[m],die_day);
                    break;
                case die[m].indexOf("sniper#"):
                    sniper(m,id[m],die_day);
                    break;
                case die[m].indexOf("prick2#"):
                    prick(m,id[m],die_day);
                    break;
            }
        }
    }
    for(var o=0;o<sum;o++){
        if(die[o].indexOf("#")!=-1){
            die_day = die[o].substr(-1,1); //截取死亡信息中的死亡日期
            if(die[o].indexOf("vote#")==0){
                vote(o,id[o],die_day);
            }
        }
    }

}

//玩家死亡日志
function kill(num,role,day) {
    $(".log>div:eq("+(day-1)+")").append('<p>晚上：'+(num+1)+'号被杀手杀死了，真实身份是'+role+'</p>')
}
function sniper(num,role,day) {
    $(".log>div:eq("+(day-1)+")").append('<p>晚上：'+(num+1)+'号被狙击手狙死了，真实身份是'+role+'</p>')
}
function prick(num,role,day) {
    $(".log>div:eq("+(day-1)+")").append('<p>晚上：'+(num+1)+'号被医生毒死了，真实身份是'+role+'</p>')
}
function vote(num,role,day) {
    $(".log>div:eq("+(day-1)+")").append('<p>白天：'+(num+1)+'号被全民投票投死了，真实身份是'+role+'</p>')
}
