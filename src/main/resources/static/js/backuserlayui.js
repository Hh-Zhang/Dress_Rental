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
    ,id:'idtest1'
    ,url: '/selectAllUsers' //数据接口
    ,page: true //开启分页
    ,cols: [[ //表头
       {checkbox: true, fixed: true}
      ,{field: 'idd', title: 'ID',align:'center', width:60,sort: true}
      ,{field: 'id', title: 'ID1',hide:"true"}
      ,{field: 'username', title: '账号',align:'center', width:80}
      ,{field: 'realname', title: '用户名',align:'center', width:80}
      ,{field: 'photo', title: '头像',align:'center',templet:'<div STYLE="border-radius:50%"><img STYLE="width: 50px;height:38px;border-radius: 50%" src="/{{ d.photo}}"></div>',width:85}
      ,{field: 'sex', title: '性别',align:'center', width:60}
      ,{field: 'type', title: '用户类型',align:'center', width:110}
      ,{field: 'receiveAdd', title: '收货地址',align:'center', event: 'setSign', style:'cursor: pointer;', width: 220}
      ,{field: 'phonenum', title: '电话',align:'center', width: 130, sort: true}
      ,{field: 'addTime', title: '登记时间',align:'center', width: 120, sort: true}
      ,{fixed: 'right',title:'操作', align:'center',cellMinWidth:180, toolbar: '#barDemo'}
    ]]
  });
  var $ = layui.$, active = {
		    reload: function(){
		      var search1 = $('#searchone').val();
		      console.log(search1);
		      var search2 = $('#searchtwo').val();
		      var search3 = $('#searchthree').val();
		      //执行重载
		      table.reload('idtest1', {

		        where: {
		        	  username: search1,
		        	  realname: search2,
                      phonenum: search3
		        },
                  page : {
                      curr :1
                  }
		      });
		    }
		  };
		  
		  $('#sousuo').on('click', function(){
		    var type = $(this).data('type');
		    active[type] ? active[type].call(this) : '';
		  });
  //操作按钮，监听工具条
  table.on('tool(demo)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
    var data = obj.data //获得当前行数据
    ,$ = layui.$
    ,layEvent = obj.event; //获得 lay-event 对应的值
    if(layEvent === 'detail'){
   	   layer.alert('<span>头像：</span><p style="float: right;width: 120px;">'+'<div style="width:50px;height:50px;border-radius:50%;">' +
		   '<img style="width: 90px;height: 90px;border-radius: 50%;margin-left: 137%;margin-top: -54%;" src="/'+data.photo+'"></div>'+"</p><br>"
		   +'<span>账号：</span><p style="float: right;width: 120px;">'+ data.username+"</p><br>"
		   + '<span>昵称：</span><p style="float: right;width: 120px;">'+ data.realname+"</p><br>"
		   +'<span>性别：</span><p style="float: right;width: 120px;">'+data.sex+"</p><br>"
		   + '<span>电话：</span><p style="float: right;width: 120px;">'+data.phonenum+"</p><br>"
		   + '<span>用户类型：</span><p style="float: right;width: 120px;">'+data.type+"</p><br>"
		   +'<span>收获地址：</span><p style="float: right;width: 120px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">'+data.receiveAdd+"</p><br>"
		   +'<span>登记时间：</span><p style="float: right;width: 120px;">'+data.addTime+"</p><br>");
    } else if(layEvent === 'del'){

        /*obj.del(); //删除对应行（tr）的DOM结构
        //         layer.close(index);
        //         //向服务端发送删除指令*/
		  var id=data.id;
		  layer.confirm('是否确认删除？', function(index){
			  $.ajax({
				  type:'post',
				  url : '/deleteUsersById',
				  data : {'id': id},
				  dataType : 'json',
				  success : function(r) {
					  alert("删除成功！！！");
					  location.reload();

				  },
				  error: function(ress){
					  alert("删除失败！！！");
				  }
			  });

		  });

    } else if(layEvent === 'edit'){
    	//页面层
    var index = layer.open({
    	  type: 1,
		  title:'编辑用户信息',
    	  skin: 'layui-layer-rim', //加上边框
    	  area: ['280px', '400px'], //宽高
    	  content: '<div style="width:50px;height:115px;border-radius:50%;">头像：<i id="tubiao" style="cursor: pointer;" lay-event="tubiao" class="layui-icon">&#xe642;</i> ' +
			  ' <img id="tubiaoimg" style="width: 90px;height: 90px;border-radius: 50%;margin-left:199%;" src="/'+data.photo+'"></div>' +
			  '<div class="editfaddish"><p style="margin-left:17px;">账号：<input style="width: 140px;margin-left:36px" id="username" type="text" name="username" value="'+data.username+'"/></p>' +
			  '<p style="margin-left:17px;margin-top:7px;">昵称：<input style="width: 140px;margin-left:36px" id="realname" name="realname" type="text" value="'+data.realname+'"/></p>' +
			  '<p style="margin-left:17px;">性别：<input style="width:40px;margin-left:26px" id="sex" type="radio" name="sex" value="1" class="男"/>男<input style="margin-left:17px" type="radio"  name="sex" value="0" class="女"/>女</p>' +
			  '<p style="margin-left:17px;">用户类型：<input style="width:40px;margin-left:-2px"id="type" type="radio" name="type" value="0" class="管理员"/>管理员<input style="margin-left:17px;" type="radio" name="type" value="1" class="普通用户"/>普通用户</p>' +
			  '<p style="margin-left:17px;margin-top:6px;">联系电话：<input style="width:140px;margin-left:9px" id="phonenum" name="phonenum" type="text" value="'+data.phonenum+'"/></p>' +
			  '<p style="margin-left:17px;margin-top:6px;">收获地址：<input style="width:140px;margin-left:9px" id="receiveAdd" name="receiveAdd" type="text" value="'+data.receiveAdd+'"/></p>' +
			  '<p style="margin-left:17px;margin-top:6px;">登记时间：<input style="width:140px;margin-left:9px" id="addTime" name="addTime" type="text" value="'+data.addTime+'" placeholder="yyyy-MM-dd"></p>' +
			  '</div><div class="layuibtn"><button class="layui-btn layui-btn-sm layui-btn-normal" id="btn1" lay-submit lay-filter="formDemo" onclick="editAction()">保存</button>' +
			  '<input type="button" id="cancel" value="取消" class="layui-btn layui-btn-sm layui-btn-normal"/></div>' +
			  '<input type="hidden" id="Id1" name="Id" value="'+data.id+'"/>'
    	});
        //  获取值将单选框选中
    	$("input[name='sex'][class='"+data.sex+"']").attr("checked",true);
		$("input[name='type'][class='"+data.type+"']").attr("checked",true);
		$("#cancel").on('click', function(){
    		layer.close(index);
    	});
    	//编辑提交
    	$("#btn1").on('click', function(){
    		var username = $("#username").val();
    		var realname=$("#realname").val();
    		var sex = $(':radio[name="sex"]:checked').val();
    		var type = $(':radio[name="type"]:checked').val();
    		var receiveAdd = $("#receiveAdd").val();
    		var phonenum = $("#phonenum").val();
    		var addTime = $("#addTime").val();
    		var id = $("#Id1").val();
    		$.ajax({
   			 url : '/editUsers',
               data : {'id':id,'username': username,'realname':realname,'sex': sex,'type':type, 'receiveAdd':receiveAdd, 'phonenum':phonenum, 'addTime':addTime},
               dataType : 'json',  
               type : "post",
               scriptCharset: 'UTF-8',
               success : function(ress) { 
              		if(ress>0){
              			alert("编辑成功");
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
    	//图片编辑
    	$("#tubiao").click(function(){
    		var index2 = layer.open({
    			  type: 1,
    	    	  skin: 'layui-layer-rim', //加上边框
    	    	  area: ['450px', '380px'], //宽高
    			 content:'<img style="width:197px;height:197px;margin-left: 4%;margin-top: 5%;" id="hp" src="/'+data.photo+'">' +
					 '<input type="hidden" id="Id2" name="Id" value="'+data.id+'"/>' +
					 '<input type="hidden" id="photo" name="photo" required lay-verify="required" />' +
					 '<div style="position: absolute;left: 222px;top: 43%;">' +
					 '<button type="button" class="layui-btn layui-btn-primary"id="fileBtn"><i class="layui-icon">&#xe67c;</i>选择图像</button>' +
					 '<button type="button" class="layui-btn layui-btn-warm"id="uploadBtn">开始上传</button></div>' +
					 '<div class="layuibtn"><button class="layui-btn layui-btn-sm layui-btn-normal" id="btn2" lay-submit lay-filter="formDemo">保存</button>' +
					 '<input type="button" id="cancel2" value="取消" class="layui-btn layui-btn-sm layui-btn-normal"/></div>'
    		});
    		//图片提交
    		$("#btn2").on('click', function(){
    			var id = $("#Id2").val();
    			var photo = $("#photo").val();
    			$.ajax({
    				url : '/editUsers',
    				data : {'id':id,'photo': photo},
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
    		//编辑添加图片上传
    		  upload.render({
    		      elem: '#fileBtn'
    		      ,url: '/addUserPhoto'
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
    		          $("[name=photo]").val(res.data.src);
    		          
    		         // $("#hp").attr("src",res.data.src);
    		      }
    		  });
    	});
       }
    	//日期常规用法
    	laydate.render({
    		elem: '#addTime'
    	});
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
  laypage.render({
    elem: 'pageDemo' //分页容器的id
    ,count: 100 //总页数
    ,skin: '#1E9FFF' //自定义选中色值
    ,skip: true //开启跳页
    ,jump: function(obj, first){
      if(!first){
        layer.msg('第'+ obj.curr +'页');
      }
    }
  });
  //添加用户
 $('#add_btn').on('click', function(){
	 layer.open({
		  type: 2,
		  title:'添加用户',
		  area: ['420px', '480px'],
		  fixed: false, //不固定
		  maxmin: true,
		  content: '/back/useradd.html'
		});
	});
 //批量删除
 $('#delAll_btn').on('click', function(){
	 var checkStatus = table.checkStatus('idtest1')
	 ,data = checkStatus.data;
	 console.log(data);
     if( data.length <=0){  
    	 layer.msg('警告!您没有选择');
     }else{ 
    	 var ids ="";
    	 for(var i=0;i<data.length;i++){
     		if(i>0)
     			  ids = ids + ",";
     		  ids = ids + data[i].id;
     		 // ids=ids.push(data[i].val().id);
     	}
    	 console.log(ids);
    	 if(ids!=''){
    		 layer.confirm('您确定要删除吗',{icon: 3, title:'提示'},function(f){ 
    			 layer.close(f);
              if(f){  
                  $.ajax({  
                      url : '/deleteUsersById',
					  type:'post',
                      data : {id:ids},
                      dataType : 'json',  
                      success : function(r) {  
                    	  location.reload();
                    	  layer.msg('删除成功');
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
