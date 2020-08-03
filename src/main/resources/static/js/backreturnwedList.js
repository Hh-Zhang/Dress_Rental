/*layui.config({
  version: '1515376178738' //为了更新 js 缓存，可忽略
});*/
 
layui.use(['laydate', 'laypage', 'layer', 'table', 'carousel', 'upload', 'element','form'], function(){
	 var laydate = layui.laydate //日期
	  ,laypage = layui.laypage //分页
	  ,layer = layui.layer //弹层
	  ,table = layui.table //表格
	  ,carousel = layui.carousel //轮播
	  ,upload = layui.upload //上传
	  ,form = layui.form
	  ,element = layui.element; //元素操作
  //向世界问个好
  //layer.msg('数据加载中...');
  //监听Tab切换
  element.on('tab(demo)', function(data){
    layer.msg('切换了：'+ this.innerHTML);
    console.log(data);
  });
  
  //执行一个 table 实例
  table.render({
	  elem: '#idtest'
	    ,height: 'full-100'
	    ,limit:30
	    ,id:'returnwedList'
	    ,url: '/qryreturnwedList' //数据接口
	    ,page: true //开启分页
    ,cols: [[ //表头
              {checkbox: true, fixed: true}
              ,{field: 'iid', hide:'ture', title: 'ID',align:'center', width:80, sort: true, fixed: 'left'}
              ,{field: 'idd', title: 'ID',align:'center', width:80, sort: true, fixed: 'left'}
              ,{field: 'orderNo', title: '订单流水号',align:'center', width: 150, sort: true}
              ,{field: 'username', title: '用户名',align:'center', width: 150}
		      ,{field: 'weddingName', title: '婚纱名',align:'center', width: 150, sort: true}
		      ,{field: 'weddingStyle', title: '婚纱款式',align:'center', width: 150, sort: true}
		      ,{field: 'yajin', title: '押金（元）',align:'center', width: 150, sort: true}
              ,{fixed: 'right', title:'操作',align:'center',cellMinWidth:180, toolbar: '#barDemo'}

    ]]
  });
  var $ = layui.$, active = {
		    reload: function(){
				var username = $('#searchone').val();
				var retxpressNum = $('#searchtwo').val();
		      //执行重载
		      table.reload('returnwedList', {
		        where: {
					username: username,
					retexpressNum:retxpressNum
		        }
		      });
		    }
		  };
		  $('#search').on('click', function(){
		    var type = $(this).data('type');
		    active[type] ? active[type].call(this) : '';
		  });
  
  //监听工具条
  table.on('tool(demo)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
    var data = obj.data //获得当前行数据
    ,layEvent = obj.event; //获得 lay-event 对应的值
    if(layEvent === 'detail'){
    	layer.alert('<div><img style="width: 260px;height: 360px;" src='+data.weddingAdd+'></div>');
    } else if(layEvent === 'del'){
    	var ids=data.iid;
		layer.confirm('是否确认删除？', function(index) {
			$.ajax({
				url: '/delretwedInfo',
				data: {'ids': ids},
				dataType: 'json',
				success: function (r) {
					layer.msg('删除成功', {icon: 1, time: 2000}, function () {
						location.reload();//刷新父窗口*!/
					});
				},
				error: function (ress) {
					alert("删除失败！！！");
				}
			})
		});
	//	处理婚纱归还
    } else if(layEvent === 'edit'){
    	 var index = layer.open({
       	  type: 1,
       	  skin: 'layui-layer-rim', //加上边框
       	  area: ['300px', '150px'], //宽高
       	  content: '<div><p style="margin-left:12%;">是否退回押金？</p></div><div class="layuibtn" style="margin-top: 12%;margin-left:50%;"><button class="layui-btn layui-btn-sm layui-btn-normal" id="btn1" lay-submit lay-filter="formDemo">是</button><button class="layui-btn layui-btn-sm layui-btn-normal" id="btn2" lay-submit lay-filter="formDemo" onclick="editAction()">否</button><input type="button" id="cancel" value="取消" class="layui-btn layui-btn-sm layui-btn-normal"/></div><input type="hidden" id="Idd" name="Id" value="'+data.iid+'"/>'
       	});
    	 $("#cancel").on('click', function(){
     		layer.close(index);
     	});

    	 $("#btn1").on('click', function(){
     		var Id = $("#Idd").val();
     		$.ajax({
    			 url : '/upBackwedding',
                data : {'iid':Id},
                dataType : 'json',  
                type : "post",
                scriptCharset: 'UTF-8',
                success : function(ress) { 
               		if(ress>0){
						layer.msg('退理成功',{icon:1,time:2000},function(){
							layer.close(index);
							 location.reload();
					});

               		} else{
               			alert("退理失败1！");
               		}
                },
                error: function(ress){
               		alert("退理失败2！");
                }
    		 });
    	 });
    	 $("#btn2").on('click', function(){
    		 layer.close(index);
     	 });		      			 
    }

  }); 

 $('#delAll_btn').on('click', function(){
	 var checkStatus = table.checkStatus('returnwedList')
	 ,data = checkStatus.data;
     if( data.length <=0){  
    	 layer.msg('警告!您没有选择');
     }else{ 
    	 var ids = "";
    	 for(var i=0;i<data.length;i++){
     		if(i>0)
     			ids = ids + ",";
     		ids = ids + data[i].iid;
     	}
    	 if(ids!=''){
    		 layer.confirm('您确定要删除吗',{icon: 3, title:'提示'},function(f){ 
    			 layer.close(f);
              if(f){  
                  $.ajax({  
                      url : '/delretwedInfo',
                      data : {'ids': ids},
                      dataType : 'json',  
                      success : function(r) {
						  layer.msg('删除成功',{icon:1,time:2000},function(){
							  location.reload();
						  });
                      },
                      error: function(ress){
  	              		alert("删除失败！！！");
  	               }
                  });
              }else {
            	  layer.msg('警告!您没有选择');  
              }	
          });  
     }
     }
	});
});
function cleanBtn(){
	document.getElementById("searchone").value='';
	document.getElementById("searchtwo").value='';
}
