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
    var sum = getCookie("sum");

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
}