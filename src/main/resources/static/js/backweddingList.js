layui.config({
  version: '1515376178738' //为了更新 js 缓存，可忽略
});
 
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
	    ,id:'reloadWedding'
	    ,url: '/qrylistWedding' //数据接口
	    ,page: true //开启分页
    ,cols: [[ //表头
       {checkbox: true, fixed: true}
      ,{field: 'idd', title: 'ID', align:"center", width:80, sort: true, fixed: 'left'}
      ,{field: 'Id', title: 'ID',hide:"true"}
      ,{field: 'weddingName', title: '婚纱名',align:"center", width:180}
      ,{field: 'weddingStyle', title: '婚纱风格',align:"center", width:120}
      ,{field: 'weddingPrice', title: '租赁价格(元)',align:"center", width: 120, sort: true}
      ,{field: 'weddingDeposit', title: '押金(元)',align:"center", width: 120, sort: true}
      ,{field: 'weddingPicture', title: '婚纱图片',align:"center",templet:'<div><img src="/{{ d.weddingPicture}}"></div>',width:120}
      ,{field: 'rentalStatus', title: '租赁状态',align:"center", width:120,templet:'#titleTpl'}
      ,{field: 'promotion', title: '是否推荐',align:"center", width:120,templet:'#titleTp2'}
      ,{fixed: 'right', title:'操作',align:'center',cellMinWidth:80, toolbar: '#barDemo'}
    ]]
  });
  var $ = layui.$, active = {
		    reload: function(){
				var weddingName = $('#searchone').val();
				var weddingStyle = $('#searchtwo').val();
				var rentalStatus = $('#searchthree').val();
		      //执行重载
		      table.reload('reloadWedding', {
		        where: {
		        	weddingName: weddingName,
		        	weddingStyle:weddingStyle,
					rentalStatus:rentalStatus
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
    ,layEvent = obj.event;//获得 lay-event 对应的值
    if(layEvent === 'detail'){
    	layer.alert('<div><img style="width: 260px;height: 360px;" src="/'+data.weddingPicture+'"></div>');
    } else if(layEvent === 'del'){
    	var Id=data.Id;

      layer.confirm('是否确认删除？', function(index){
		  $.ajax({
			  url : '/deleteWeddingInfo',
			  data : {'ids': Id},
			  dataType : 'json',
			  success : function(r) {
				  layer.msg('删除成功',{icon:1,time:2000},function(){
					  location.reload();//刷新父窗口*!/
				  });
			  },
			  error: function(ress){
				  alert("删除失败！！！");
			  }
		  });

        /*obj.del(); //删除对应行（tr）的DOM结构
        layer.close(index);
        //向服务端发送删除指令*/
      });//行内编辑
    } else if(layEvent === 'edit'){

    	 var index = layer.open({
       	  type: 1,
       	  skin: 'layui-layer-rim', //加上边框
       	  area: ['280px', '400px'], //宽高
       	  content: '<div><i id="tubiao" style="cursor: pointer;" lay-event="tubiao" class="layui-icon">&#xe642;</i>  ' + '<img id="tubiaoimg" style="width: 150px;height: 150px;margin-left:24%;margin-top: 10px;" src="/'+data.weddingPicture+'"></div>' +
			  '<div><p style="margin-left:25px;">婚纱名：<input id="weddingName" type="text" name="weddingName" value="'+data.weddingName+'"/></p>' +
			  '<p style="margin-left:12px;margin-top:7px;">租赁价格：<input id="weddingPrice" name="weddingPrice" type="text" value="'+data.weddingPrice+'"/></p>' +
			  '<p style="margin-top:6px;margin-left:40px;">押金：<input id="weddingDeposit" name="weddingDeposit" type="text" value="'+data.weddingDeposit+'"/></p>' +
			  '<p style="margin-left:11px;margin-top:6px;">婚纱风格：<select id="weddingStyle" name="weddingStyle"><option value="0">复古</option><option value="1">时尚</option><option value="2">优雅</option><option value="3">公主</option></select></p>' +
			  '<p style="margin-left:11px;margin-top:6px;">是否推荐：<select id="promotion" name="promotion"><option value="1">是</option><option value="0">否</option></select></p></div>' +
			  '<div class="layuibtn"><button class="layui-btn layui-btn-sm layui-btn-normal" id="btn1" lay-submit lay-filter="formDemo" onclick="editAction()">保存</button>' +
			  '<input type="button" id="cancel" value="取消" class="layui-btn layui-btn-sm layui-btn-normal"/></div>' +
			  '<input type="hidden" id="Id" name="Id" value="'+data.Id+'"/>'
       	});
    	 $("#weddingStyle option[value='"+data.weddingStyle+"']").attr("selected","selected");
    	 $("#promotion option[value='"+data.promotion+"']").attr("selected","selected");
    	 $("#cancel").on('click', function(){
     		layer.close(index);
     	});
    	 //编辑提交按钮
    	 $("#btn1").on('click', function(){
     		var weddingName = $("#weddingName").val();
     		var weddingPrice = $("#weddingPrice").val();
     		var weddingDeposit = $("#weddingDeposit").val();
     		var weddingStyle = $("#weddingStyle").val();
     		var promotion = $("#promotion").val();
     		var Id = $("#Id").val();

     		$.ajax({
    			 url : '/editWeddingInfo',
                data : {'Id':Id,'weddingName': weddingName,'weddingPrice': weddingPrice,'weddingDeposit':weddingDeposit, 'weddingStyle':weddingStyle,'promotion':promotion},
                dataType : 'json',  
                type : "post",
                scriptCharset: 'UTF-8',
                success : function(ress) { 
               		if(ress>0){
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
    	 });//图片编辑
     		$("#tubiao").click(function(){
        		var index2 = layer.open({
        			  type: 1,
        	    	  skin: 'layui-layer-rim', //加上边框
        	    	  area: ['450px', '380px'], //宽高
        			 content:'<img style="width:197px;height:197px;margin-left: 4%;margin-top: 5%;" id="pic" src="/'+data.weddingPicture+'">' +
						 '<input type="hidden" id="Id2" name="Id" value="'+data.Id+'"/>' +
						 '<input type="hidden" id="weddingPicture" name="weddingPicture" required lay-verify="required" />' +
						 '<div style="position: absolute;left: 222px;top: 43%;">' +
						 '<button type="button" class="layui-btn layui-btn-primary"id="fileBtn"><i class="layui-icon">&#xe67c;</i>选择图像</button>' +
						 '<button type="button" class="layui-btn layui-btn-warm" id="uploadBtn">开始上传</button></div>' +
						 '<div class="layuibtn"><button class="layui-btn layui-btn-sm layui-btn-normal" id="btn2" lay-submit lay-filter="formDemo">保存</button>' +
						 '<input type="button" id="cancel2" value="取消" class="layui-btn layui-btn-sm layui-btn-normal"/></div>'
        		});
				//添加图片，获取图片地址
				upload.render({
					elem: '#fileBtn'
					,url: '/addWeddingPhoto'
					,accept: 'file'
					,auto: false
					,bindAction: '#uploadBtn'
					,before: function(obj){
						//返回地址，显示图片
						obj.preview(function(index, file, result){
							$('#pic').attr('src', result); //图片链接
						});
					}
					,done: function(res){
						console.log(res.data.src);
						$("[name=weddingPicture]").val(res.data.src);
					}
				});
        		//编辑图片提交
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

        	});
    }
  });
  
  //执行一个轮播实例
  carousel.render({
    elem: '#test1'
    ,width: '100%' //设置容器宽度
    ,height: 200
    ,arrow: 'none' //不显示箭头
    ,anim: 'fade' //切换动画方式
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
/*  laypage.render({
    elem: 'pageDemo' //分页容器的id
    ,count: 100 //总页数
    ,skin: '#1E9FFF' //自定义选中色值
    //,skip: true //开启跳页
    ,jump: function(obj, first){
      if(!first){
        layer.msg('第'+ obj.curr +'页');
      }
    }
  });*/
  
  //上传
  upload.render({
    elem: '#uploadDemo'
    ,url: '' //上传接口
    ,done: function(res){
      console.log(res)
    }
  });
 // 添加婚纱
 $('#add_btn').on('click', function(){
	 layer.open({
		  type: 2,
		  title:'上传婚纱',
		  area: ['350px', '450px'],
		  fixed: false, //不固定
		  maxmin: true,
		  content: 'addWedding.html'
		});
	});
 //批量删除
 $('#delAll_btn').on('click', function(){
	 var checkStatus = table.checkStatus('reloadWedding')
	 ,data = checkStatus.data;
     if( data.length <=0){  
    	 layer.msg('警告!您没有选择');
     }else{ 
    	 var ids = "";
    	 for(var i=0;i<data.length;i++){
     		if(i>0)
     			ids = ids + ",";
     		ids = ids + data[i].Id;
     		console.log(ids);
     	}
    	 if(ids!=''){
    		 layer.confirm('您确定要删除吗',{icon: 3, title:'提示'},function(f){ 
    			 layer.close(f);
              if(f){  
                  $.ajax({  
                      url : '/deleteWeddingInfo',
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
	document.getElementById("searchthree").value='';
}