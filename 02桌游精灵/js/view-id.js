/**
 * Created by Liang Xu on 2017/1/22.
 */
$(function () {
    btnEvent();
    dataProcessing();
    setData();
});

//获取参数
function getRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
        }
        for (x in theRequest){
            if(!isNaN(theRequest[x])){
                theRequest[x] = Number(theRequest[x])
            }
            else {
                theRequest[x] = decodeURI(theRequest[x])
            }
        }
    }
    return theRequest;
}
var data = getRequest();
var sum = data["role-1"]+data["role-2"]+data["role-3"]+data["role-4"]+data["role-5"];
var id = [];
//处理参数，随机分配角色
function dataProcessing() {
    for(var i=0;i<data["role-1"];i++){
        id.push("平民");
    }
    for(var m=0;m<data["role-2"];m++){
        id.push("警察");
    }
    for(var n=0;n<data["role-3"];n++){
        id.push("杀手");
    }
    for(var x=0;x<data["role-4"];x++){
        id.push("医生");
    }
    for(var y=0;y<data["role-5"];y++){
        id.push("狙击手");
    }
    for(var z=0;z<id.length;z++){
        var random = Math.floor(Math.random()*id.length);
        var num = id[random];
        id[random] = id[z];
        id[z] = num;
    }
}
//通过cookie储存参数
function setData() {
    for(var i=0;i<id.length;i++){
        setCookie("num"+(i+1),id[i],3)
    }
}
//按钮事件
function btnEvent() {
    var flag = true;
    var n = 1;
    $(".btn-view-id").on("click",function () {
        if(flag){
            if(n<id.length){
                $(".btn-view-id").html("隐藏并传递给<span>"+(n+1)+"</span>号");
                $(".role span").text(id[n-1]);
                if (id[n-1] == "杀手"){
                    $(".word span").text(data["word-2"]);
                    $(".description").text("想办法杀光所有平民，同时还要注意不要暴露自己哦!")
                }
                else{
                    $(".word span").text(data["word-1"]);
                    $(".description").text("想办法存活下去，同时还要注意找到杀手哦！")
                }
                $(".card").toggleClass("flipped");
                flag = false;
            }
            else {
                $(".card").toggleClass("flipped");
                $(".btn-view-id").html("查看法官日志");
                flag = false;
            }

        }
        else{
            if(n<id.length){
                $(".card h2").text(n+1);
                $(".btn-view-id").html("查看<span>"+(n)+"</span>号身份").find("span").text(n+1);
                n++;
                $(".card").toggleClass("flipped");
                flag = true;
            }
            else {
                window.location.href="judge-log-ready.html";
            }

        }
    })
}