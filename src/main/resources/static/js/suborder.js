$('.submit').on('click',function () {
    var userId=$('#userid').val();
    console.log(userId);
    var weddingId=$('.weddingId').val();
    console.log(weddingId);
    var topri=$('.topri').val();
     console.log(topri);
     var rentalDays=$('#rentalDays').val();


    $.ajax({
        url : '/addOrder',
        data : {'userId':userId,'weddingId': weddingId,'topri':topri,'rentalDays':rentalDays},
        dataType : 'json',
        type : "post",
        scriptCharset: 'UTF-8',
        success : function(data) {
            if(data>0){
                alert("提交成功！");
                location.href="/index.html";
            }else {
                alert("提交失败！");
            }
        },
        error: function(data){
            alert("提交失败！");
        }
    });
});