$(document).ready(function(){
	$.ajax({
		 	async : false,//是否异步请求
		    cache : false,
		    type : 'post',
		    url : '/qryprepromotion',
		    dataType:'json',
		    success : function(data) {
		    /**重点：前台接收到返回值，直接处理就行*/

		            $.each(data, function(i,v) {
		                $('#pic'+[i]).attr('src',"/static/"+ data[i].weddingPicture);
		                $('#pri'+[i]).html("¥"+data[i].weddingPrice);
		                $('#weddingName'+[i]).html(data[i].weddingName);
		                $('#weddingStyle'+[i]).html(data[i].weddingStyle);
		            });
		    },
		error : function() {
			alert('获取爆款失败 ');
		}
	 });
});
