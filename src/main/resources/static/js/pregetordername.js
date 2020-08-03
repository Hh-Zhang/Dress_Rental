$(document).ready(function () {
    $.post("/getname",function(obj){
        $("#userid").val(obj[0].id);
        $("#username").html("欢迎您:"+obj[0].username);
        $("#userphoto").attr('src','/'+obj[0].photo);
    },"json");
});
