$(document).ready(function() {

	/*$.ajax({

		 	async : false,//是否异步请求
		    cache : false,
		    type : 'POST',
		    url : '/qrypreWedding',
		    dataType:'json',
		    success : function(data) {
		    /!**重点：前台接收到返回值，直接处理就行*!/
              console.log(data);

		            $.each(data, function(i,v) {
		            	 console.log(i+'....'+data[i].id);
		            	// alert(value.weddingName);
						$('#detid'+[i]).attr('id',data[i].id);
						$('#weddingName'+[i]).html(data[i].weddingName);
						$('#weddingStyle'+[i]).html(data[i].weddingStyle);
		                $('#pic'+[i]).attr('src',"/"+ data[i].weddingPicture);
		                $('#yj'+[i]).html("¥  "+data[i].weddingPrice+" /天");
		            });
		    },
		     error : function() {
		 		alert('获取婚纱列表失败 ');
		}
	 });*/
	/*$.post("/getname", function (obj) {
		$("#username").html("欢迎您:"+obj[0].username);
		$("#userphoto").attr('src','/'+obj[0].photo);
	},"json");
	$('.loginuser1').css('display','none');
	$('.loginuser').css('display','block');*/
	$.ajax({
		type : 'post',
		url : '/getname',
		dataType:'json',
		success : function(obj) {
			console.log(obj[0].username);
			if (obj[0].username!=null) {
				$('.loginuser').css('display','block');
				$('.loginuser1').css('display','none');
				$("#username").html("欢迎您:"+obj[0].username);
				$("#userphoto").attr('src','/'+obj[0].photo);
			}else {
				$('.loginuser1').css('display','block');
				$('.loginuser').css('display','none');
			}
		},
		error: function(ress){
			alert("失败2！");
		}
	});

});
