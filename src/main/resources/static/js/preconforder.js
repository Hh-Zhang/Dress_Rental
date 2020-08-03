$(document).ready(function(){
		/*var id=getid();
		alert(id+"ok");
		var str={"id":id};*/
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
		url: '/qrypreWedding',
		dataType: 'json',
		success: function (data) {
			$.each(data, function (i, v) {
				var pri= new String(data[i].weddingPrice);
				var dpri= new String(data[i].weddingDeposit);
				$('#weddingId'+[i]).val(data[i].id);
				// console.log(data[i].id);
				$('#weddingName'+[i]).html(data[i].weddingName);
				// console.log(data[i].weddingName);
				$('#weddingStyle'+[i]).html(data[i].weddingStyle);
				$('#weddingDeposit'+[i]).val(data[i].weddingDeposit);
				$('#weddingPrice'+[i]).val(data[i].weddingPrice);
				// $('#topri'+[i]).val(Number(Number(pri)+Number(dpri)));
				// $('#dpri'+[i]).html("租金：￥" + data[i].weddingPrice+"/天");
				// $('#topri'+[i]).attr('value')
				$('#weddingPicture'+[i]).attr('src', "/" + data[i].weddingPicture);
			});
		},
		error: function () {
			alert('获取婚纱列表失败 ');
		}
	});
	getTotal();
});
//计算总价
function getTotal() {
	console.log("计算总计");
	var total=0;
	var yj=parseFloat($(".weddingDeposit").val());
	var dj=parseFloat($(".weddingPrice").val());
	var count =parseInt($("#rentalDays").val());
	total+=dj*count+yj;
	$("#topri").val(total);
}
