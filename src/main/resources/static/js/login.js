function onlogin() {
   var username=$("#username").val();
   var password=$("#password").val();

   $.ajax({
        data:{"username":username,"password":password},
        url:"/Login",
        type:"post",
       dataType:"json",
        success:function (data) {
            alert("登陆成功！欢迎您 " + data[0].username);
            if (data[0].type==1) {
                location.href="/adminLogin";
            }else {
                location.href = "/index.html";
            }
        },
       error:function () {
           $("loginuser").hide();
           $("loginuser1").show();
            alert("登录失败")
       }

   })


}