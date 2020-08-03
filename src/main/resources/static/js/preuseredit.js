
function onedit() {
  var id=$('#userid').val();
  var photo=$('#userphoto').val();
  var username=$('#username').val();
  var realname=$('#realname').val();
  var password=$('#password').val();
  var sex = $(':radio[name="sex"]:checked').val();
  var phonenum=$('#phonenum').val();
  var receiveAdd=$('#receiveAdd').val();
  $.ajax({
      data:{"id":id,"photo":photo,"username":username,"realname":realname,
          "password":password,"sex":sex,"phonenum":phonenum,"receiveAdd":receiveAdd},
      url:"/editUsers",
      datatype:"json",
      type:"post",
      success:function (data) {
          if(data>0) {
              alert("提交成功");
              location.reload();
              location.href="/index.html"
          }else {alert("提交失败");}

      },
      error: function(data){
          alert("提交失败");
      }

  })
}