function onregister() {
   var username=$("#username").val();
   var password=$("#password").val();
    var sex = $(':radio[name="sex"]:checked').val();
    var phonenum=$("#phonenum").val();

   $.ajax({
        data:{"username":username,"password":password,"sex":sex,"phonenum":phonenum},
        url:"/Register",
        type:"post",
       dataType:"json",
        success:function (data) {
            console.log("注册测试");
            // alert("注册成功！" + data[0].username);
            location.href = "/login.html";
            alert("注册成功")

        },
       error:function () {
            alert("注册失败")
       }

   })


}