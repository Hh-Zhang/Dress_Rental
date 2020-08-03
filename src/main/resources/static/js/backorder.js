
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
	    ,id:'reloadOrder'
	    ,url: '/qrylistOrder' //数据接口
	    ,page: true //开启分页
    ,cols: [[ //表头
              {checkbox: true, fixed: true}
              ,{field: 'idd', title: 'ID',align:"center", width:50, sort: true, fixed: 'left'}
		      ,{field: 'Id',hide:'true', title: 'ID',align:"center", width:50, sort: true}
              ,{field: 'orderNo', title: '订单号',align:"center", width:120}
              ,{field: 'orderDate', title: '订单日期',align:"center", width: 110, sort: true}
		      ,{field: 'username', title: '用户名',align:"center", width: 80, sort: true}
              ,{field: 'weddingName', title: '婚纱名',align:"center", width: 150, sort: true}
		      ,{field: 'weddingPicture', title: '婚纱图片',align:"center",templet:'<div><img src="/{{ d.weddingPicture}}"></div>',width:120}
              ,{field: 'weddingPrice', title: '婚纱价格（元）',align:"center", cellMinWidth:120, sort: true}
              ,{field: 'weddingDeposit', title: '押金（元）',align:"center", cellMinWidth:100, sort: true}
              ,{field: 'rentalDays', title: '天数',align:"center", width: 70, sort: true}
		      ,{field: 'topri', title: '总价',align:"center", width: 80, sort: true}
              ,{field: 'logisticsStatus', title: '物流状态',align:"center", cellMinWidth:90,templet:'#titleTp1'}
              ,{field: 'returnStatus', title: '归还状态',align:"center", cellMinWidth:90,templet:'#titleTp2'}
              // ,{field: 'dealState', title: '处理状态',align:"center", cellMinWidth:120,templet:'#titleTp3'}
              ,{fixed: 'right', title:'操作',align:'center',cellMinWidth:180, toolbar: '#barDemo'}
    ]]
  });
  var $ = layui.$, active = {
		    reload: function(){
				var weddingName = $('#searchone').val();
				var orderNo = $('#searchtwo').val();
				var logisticsStatus = $('#searchthree').val();
		      //执行重载
		      table.reload('reloadOrder', {
		        where: {
					weddingName:weddingName,
		        	orderNo: orderNo,
					logisticsStatus:logisticsStatus
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
    	layer.alert('<div><img style="width: 260px;height: 360px;" src="/'+data.weddingPicture+'"></div>');
    } else if(layEvent === 'del'){
    	var Id=data.Id;
		layer.confirm('是否确认删除？', function(index) {
			$.ajax({
				url: '/delOrderInfo',
				data: {'id': Id},
				dataType: 'json',
				success: function (ress) {
					if (ress>0) {
						layer.msg('删除成功', {icon: 1, time: 2000}, function () {
							location.reload();//刷新父窗口*!/
						});
					}else {
						alert("删除失败1！！！");
					}
				},
				error: function (ress) {
					alert("删除失败2！！！");
				}
			})
		});

    } else if(layEvent === 'edit'){
    	 var index = layer.open({
       	  type: 1,
       	  skin: 'layui-layer-rim', //加上边框
       	  area: ['280px', '400px'], //宽高
       	  content: '<div><img id="tubiaoimg" style="width: 150px;height: 150px;margin-left:24%;margin-top: 10px;" src="/'+data.weddingPicture+'"></div>' +
			  '<div><p style="margin-left: 11px;margin-top: 40px;">发货状态：<select style="width: 130px" id="logisticsStatus" name="logisticsStatus">' +
			  '<option value="1">开始发货</option>' +
			  '</select></p></div>' +
			  '<div class="layuibtn" style="margin-top: 29%;">' +
			  '<button class="layui-btn layui-btn-sm layui-btn-normal" id="btn1" lay-submit lay-filter="formDemo" onclick="editAction()">保存</button>' +
			  '<input type="button" id="cancel" value="取消" class="layui-btn layui-btn-sm layui-btn-normal"/></div><input type="hidden" id="Idd" name="Id" value="'+data.Id+'"/>'
       	});
    	 $("#cancel").on('click', function(){
     		layer.close(index);
     	});
    	 $("#btn1").on('click', function(){
     		var logisticsStatus = $("#logisticsStatus").val();
     		var Id = $("#Idd").val();
     		$.ajax({
    			 url : '/editOrder',
                data : {'Id':Id,'logisticsStatus':logisticsStatus},
                dataType : 'json',  
                type : "post",
                scriptCharset: 'UTF-8',
                success : function(ress) { 
               		if(ress>0){
						layer.msg('处理成功，开始发货',{icon:1,time:2000},function(){
							layer.close(index);
							location.reload();
						});

               		} else{
               			alert("失败1！");
               		}
                },
                error: function(ress){
               		alert("失败2！");
                }
    		 });
    	 });
     		$("#tubiao").click(function(){
        		var index2 = layer.open({
        			  type: 1,
        	    	  skin: 'layui-layer-rim', //加上边框
        	    	  area: ['450px', '380px'], //宽高
        			 content:'<img style="width:197px;height:197px;margin-left: 4%;margin-top: 5%;" id="hp" src="/'+data.weddingPicture+'"><input type="hidden" id="Id2" name="Id" value="'+data.Id+'"/><input type="hidden" id="weddingPicture" name="weddingPicture" required lay-verify="required" /><div style="position: absolute;left: 222px;top: 43%;"><button type="button" class="layui-btn layui-btn-primary"id="fileBtn"><i class="layui-icon">&#xe67c;</i>选择图像</button><button type="button" class="layui-btn layui-btn-warm"id="uploadBtn">开始上传</button></div><div class="layuibtn"><button class="layui-btn layui-btn-sm layui-btn-normal" id="btn2" lay-submit lay-filter="formDemo">保存</button><input type="button" id="cancel2" value="取消" class="layui-btn layui-btn-sm layui-btn-normal"/></div>'
        		});
        		$("#btn2").on('click', function(){
        			var Id = $("#Id2").val(); 
        			var weddingPicture = $("#weddingPicture").val();
        			$.ajax({
        				url : '/editWeddingInfo',
        				data : {'Id':Id,'weddingPicture': weddingPicture},
        				 dataType : 'json',  
        	               type : "post",
        	               scriptCharset: 'UTF-8',
        	               success : function(ress) { 
        	              		if(ress>0){
        	              			layer.close(index2);
        	              			layer.close(index);
        	              			location.reload();
        	              		} else{
        	              			alert("失败1！");
        	              		}
        	               },
        	               error: function(ress){
        	              		alert("失败2！");
        	               }
        			});
        		});
        		$("#cancel2").on('click', function(){
            		layer.close(index2);
            	});
        		//获取婚纱图片地址
        		  upload.render({
        		      elem: '#fileBtn'
        		      ,url: '/addWeddingPhoto'
        		      ,accept: 'file'
        		      ,auto: false
        		      ,bindAction: '#uploadBtn'
    		    	  ,before: function(obj){
    		    	      //预读本地文件示例，不支持ie8
    		    	      obj.preview(function(index, file, result){
    		    	        $('#hp').attr('src', result); //图片链接（base64）
    		    	      });
    		    	    }
        		      ,done: function(res){
        		          $("[name=weddingAdd]").val(res.data.src);
        		      }
        		  });
        	});
    }
  });
  

  
  //将日期直接嵌套在指定容器中
  var dateIns = laydate.render({
    elem: '#laydateDemo'
    ,position: 'static'
    ,calendar: true //是否开启公历重要节日
    ,mark: { //标记重要日子
      '0-10-14': '生日'
      ,'2017-11-11': '剁手'
      ,'2017-11-30': ''
    } 
    ,done: function(value, date, endDate){
      if(date.year == 2017 && date.month == 11 && date.date == 30){
        dateIns.hint('一不小心就月底了呢');
      }
    }
    ,change: function(value, date, endDate){
      layer.msg(value)
    }
  });
  
  //分页
  laypage.render({
    elem: 'pageDemo' //分页容器的id
    ,count: 100 //总页数
    ,skin: '#1E9FFF' //自定义选中色值
    //,skip: true //开启跳页
    ,jump: function(obj, first){
      if(!first){
        layer.msg('第'+ obj.curr +'页');
      }
    }
  });
  
  //上传
  upload.render({
    elem: '#uploadDemo'
    ,url: '' //上传接口
    ,done: function(res){
      console.log(res)
    }
  });
 $('#add_btn').on('click', function(){
	 layer.open({
		  type: 2,
		  title:'上传婚纱',
		  area: ['350px', '450px'],
		  fixed: false, //不固定
		  maxmin: true,
		  content: 'moduls/wedding/add.jsp'
		});
	}); 
 $('#delAll_btn').on('click', function(){
	 var checkStatus = table.checkStatus('reloadOrder')
	 ,data = checkStatus.data;
     if( data.length <=0){  
    	 layer.msg('警告!您没有选择');
     }else{ 
    	 var ids = "";
    	 for(var i=0;i<data.length;i++){
     		if(i>0)
     			ids = ids + ",";
     		ids = ids + data[i].Id;
     	}
    	 if(ids!=''){
    		 layer.confirm('您确定要删除吗',{icon: 3, title:'提示'},function(f){ 
    			 layer.close(f);
              if(f){  
                  $.ajax({  
                      url : '/delOrderInfo',
                      data : {'id': ids},
                      dataType : 'json',  
                      success : function(r) {
						  layer.msg('删除成功', {icon: 1, time: 2000}, function () {
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
	document.getElementById("searchthree").value='';
}