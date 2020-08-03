
/*function getid() {
	var id1=$('.more')[0].getAttribute('id');
	alert(id1);
	return id1;
}*/
$(document).ready(function(){
		/*var id=getid();
		alert(id+"ok");
		var str={"id":id};*/
    //获取当前URL
    var local_url = document.location.href;

    //截取get字符串
    var getstr = local_url.substr(local_url.indexOf('?')+1);

    //解析成get数组
    // var get = getstr.split('&');
    console.log(get);

    //查找要找到参数（par）
    for(var i in get){
        /*if(get[i].indexOf(par+'=')>=0){
            return get[i].replace(par+'=','');
        }*/
        // console.log(get[0]);
		$('#weddingName').attr("id",get[0]);
		$('#weddingStyle').attr("id",get[1]);
		$('#pri').attr("id",get[2]);
		$('#dpri').attr("id",get[3]);
		$('#pic').attr("id",get[4]);
    }

	$.ajax({
		async: false,//是否异步请求
		cache: false,
		type: 'POST',
		url: '/qrypreWedding',
		dataType: 'json',
		success: function (data) {
			// 重点：前台接收到返回值，直接处理就行
			// console.log(data);

			$.each(data, function (i, v) {
				// console.log(i + '....' + data[i].weddingName);
				// alert(value.weddingName);
				$('#weddingName'+[i]).html("婚纱名："+data[i].weddingName);
				$('#weddingStyle'+[i]).html("类型："+data[i].weddingStyle);
				$('#pri'+[i]).html("押金：￥"+data[i].weddingPurchase);
				$('#dpri'+[i]).html("租金：￥" + data[i].weddingPrice+"/天");
				$('#pic'+[i]).attr('src', "/" + data[i].weddingAdd);
			});
		},
		error: function () {
			alert('获取婚纱列表失败 ');
		}
	});
})
