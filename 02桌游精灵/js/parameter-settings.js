/**
 * Created by Liang Xu on 2017/1/21.
 */
$(function () {
    clearCookie();
    bindNum();
    customSetting();
    setData();
    assignRole(6);
});
var sum = Number($(".num input[type='range']").val());

//设置玩家总人数，自动分配角色
function bindNum() {
    $(".num input[type='text']").on("keyup",function () {
        sum = Number($(this).val());
        $(".num input[type='range']").val(sum);
        assignRole(sum);
    });
    $(".num input[type='range']").on("change",function () {
        sum = Number($(this).val());
        $(".num input[type='text']").val(sum);
        assignRole(sum);
    });
}
//根据玩家总人数分配角色
function assignRole(sum) {
    switch (sum)
    {
        case 6:
            $(".role-1").find("span").text("4");
            $(".role-2").find("span").text("1");
            $(".role-3").find("span").text("1");
            break;
        case 7:
            $(".role-1").find("span").text("5");
            $(".role-2").find("span").text("1");
            $(".role-3").find("span").text("1");
            break;
        case 8:
            $(".role-1").find("span").text("4");
            $(".role-2").find("span").text("2");
            $(".role-3").find("span").text("2");
            break;
        case 9:
            $(".role-1").find("span").text("5");
            $(".role-2").find("span").text("2");
            $(".role-3").find("span").text("2");
            break;
        case 10:
            $(".role-1").find("span").text("6");
            $(".role-2").find("span").text("2");
            $(".role-3").find("span").text("2");
            break;
        case 11:
            $(".role-1").find("span").text("5");
            $(".role-2").find("span").text("3");
            $(".role-3").find("span").text("3");
            break;
        case 12:
            $(".role-1").find("span").text("6");
            $(".role-2").find("span").text("3");
            $(".role-3").find("span").text("3");
            break;
        case 13:
            $(".role-1").find("span").text("7");
            $(".role-2").find("span").text("3");
            $(".role-3").find("span").text("3");
            break;
        case 14:
            $(".role-1").find("span").text("8");
            $(".role-2").find("span").text("3");
            $(".role-3").find("span").text("3");
            break;
        case 15:
            $(".role-1").find("span").text("7");
            $(".role-2").find("span").text("4");
            $(".role-3").find("span").text("4");
            break;
        case 16:
            $(".role-1").find("span").text("8");
            $(".role-2").find("span").text("4");
            $(".role-3").find("span").text("4");
            break;
        case 17:
            $(".role-1").find("span").text("9");
            $(".role-2").find("span").text("4");
            $(".role-3").find("span").text("4");
            break;
        case 18:
            $(".role-1").find("span").text("10");
            $(".role-2").find("span").text("4");
            $(".role-3").find("span").text("4");
            break;

    }

}
// 玩家自定义分配角色
function customSetting() {
    var flag = false;
    $(".ratio-right ul li").find("span").after("<input type='text'>");//插入隐藏的输入框
    $(".ratio-right a").on("click",function () {
        var $sum = 0;
        if(flag){             //判断输入框是否显示
            $(".ratio-right ul li").find("input").hide().each(function () {
                $sum += Number($(this).val());
            })
                .end().find("span").show();
            if($sum>5&&$sum<19){    //判断输入的数字是否符合要求
                for(var i=1;i<=5;i++){
                    if(!$(".role-"+i).find("input").val()){   //判断是否输入数字
                        $(".role-"+i).find("span").text(0);  //未输入则置为0
                    }
                    else {
                        $(".role-"+i).find("span").text($(".role-"+i).find("input").val()); //把输入框的值赋给span
                    }
                }
                sum = $sum;                                         //改变range的值
                $(".num input[type='range']").val(sum);
                $(".num input[type='text']").val(sum);
                $(".ratio-right ul").css("background","#ffffff");
                $(".ratio-right a").html("点击设置  <i class='fa fa-cog'></i>");
                flag = false;
            }else if($(".ratio-right ul li").find("input").val().length<1){
                $(".ratio-right ul").css("background","#ffffff");
                $(".ratio-right a").html("点击设置  <i class='fa fa-cog'></i>");
                flag = false;
            }
            else {  //不符合要求则弹出警告
                alert("玩家人数在6-18之间");
                $(".ratio-right ul li").find("input").val('');
                $(".ratio-right ul").css("background","#ffffff");
                $(".ratio-right a").html("点击设置  <i class='fa fa-cog'></i>");
                flag = false;
            }

        }
        else{
            $(".ratio-right ul li").find("span").hide()
                .end().find("input").show().css("background","#dedddd");
            $(".ratio-right ul").css("background","#dedddd");
            $(".ratio-right a").html("确认设置  <i class='fa fa-check-square-o'></i>");
            flag = true;
        }
    })
}

//通过cookie储存参数
function setData() {
    $(".btn-parameter-settings").on("click",function (){
        for(var i=1;i<=5;i++){
            setCookie("role"+i,$(".role-"+i).find("span").text(),3)
        }
        for(var m=1;m<=2;m++){
            setCookie("word"+m,$(".phrase input:eq("+(m-1)+")").val(),3)
        }
        setCookie("sum",sum,3);
        window.location.href = "view-id.html";
    })
}
//清除残存cookie
function clearCookie(){
    var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;)
            document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString()
    }
}


