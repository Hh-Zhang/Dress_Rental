$(document).ready(function(){

    //获取当前URL
    var local_url = document.location.href;
    //截取get字符串
    var getstr = local_url.substr(local_url.indexOf('?')+1);

    //解析成get数组
    var get = getstr.split('&');
    console.log(get);

    //查找要找到参数（par）
    for(var i in get){
		$('#weddingId').attr("id",get[0]);
		//提交哪款拼接超链接
		$('#aweddingId').attr('href','conforder.html?'+get[0]+'&'+get[1]+'&'+get[2]+'&'+get[3]+'&'+get[4]+'&'+get[5]);
		$('#weddingName').attr("id",get[1]);
		$('#weddingStyle').attr("id",get[2]);
		$('#weddingDeposit').attr("id",get[3]);
		$('#weddingPrice').attr("id",get[4]);
		$('#weddingPicture').attr("id",get[5]);
    }

	$.ajax({
		async: false,//是否异步请求
		cache: false,
		type: 'POST',
		url: '/qryprepromotion',
		dataType: 'json',
		success: function (data) {
			// 重点：前台接收到返回值，直接处理就行
			// console.log(data);

			$.each(data, function (i, v) {
				$('#weddingId'+[i]).val(data[i].Id);
				$('#weddingName'+[i]).html("婚纱名："+data[i].weddingName);
				$('#weddingStyle'+[i]).html("类型："+data[i].weddingStyle);
				$('#weddingDeposit'+[i]).html("押金：￥"+data[i].weddingDeposit);
				$('#weddingPrice'+[i]).html("租金：￥" + data[i].weddingPrice+"/天");
				$('#weddingPicture'+[i]).attr('src', "/static/" + data[i].weddingPicture);
			});
		},
		error: function () {
			alert('获取婚纱列表失败 ');
		}
	});
})
