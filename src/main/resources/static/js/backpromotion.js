
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
	    ,url: '/qrybackpromlist' //数据接口
	    ,page: true //开启分页
    ,cols: [[ //表头
       {checkbox: true, fixed: true}
      ,{field: 'idd', title: 'ID', width:80, sort: true, fixed: 'left',align:'center'}
      ,{field:"Id",hide:"true"}
      ,{field: 'weddingName', title: '婚纱名',align:'center',cellMinWidth:160}
      ,{field: 'weddingStyle', title: '婚纱风格',align:'center'}
      ,{field: 'weddingPrice', title: '租赁价格(元)/天', sort: true,align:'center'}
      ,{field: 'weddingDeposit', title: '押金(元)',sort: true,align:'center'}
      ,{field: 'weddingPicture', title: '婚纱图片',templet:'<div><img src="/{{ d.weddingPicture}}"></div>',width:120,align:'center'}
      ,{field: 'rentalStatus', title: '租赁状态',align:'center',templet:'#titleTpl'}
      ,{fixed: 'right',title:'操作', align:'center',cellMinWidth:80, toolbar: '#barDemo'}

    ]]
  });
  var $ = layui.$, active = {
		    reload: function(){
		      var searchone = $('#searchone');
		      var searchtwo = $('#searchtwo');
		      var searchthree = $('#searchthree');
		      //执行重载
		      table.reload('reloadWedding', {
		        where: {
		        	weddingName: searchone.val(),
		        	weddingStyle:searchtwo.val(),
		        	rentalStatus:searchthree.val()
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
            layer.alert('<span style="margin-top: 30%">婚纱图片：</span><p style="float: right;width: 120px;">'+'<div style="width:50px;height:50px;">' +
                '<img style="width: 90px;height: 90px;margin-left: 137%;margin-top: -54%;" src="/'+data.weddingPicture+'"></div>'+"</p><br>"
                +'<span>婚纱名：</span><p style="float: right;width: 140px;">'+ data.weddingName+"</p><br>"
                + '<span>婚纱风格：</span><p style="float: right;width: 140px;">'+ data.weddingStyle+"</p><br>"
                +'<span>租赁价格：</span><p style="float: right;width: 140px;">'+data.weddingPrice+"</p><br>"
                +'<span>租赁价格：</span><p style="float: right;width: 140px;">'+data.weddingDeposit+"</p><br>"
                + '<span>租赁状态：</span><p style="float: right;width: 140px;">'+data.rentalStatus+"</p><br>");
        } else if(layEvent === 'del'){

            /*obj.del(); //删除对应行（tr）的DOM结构
            //         layer.close(index);
            //         //向服务端发送删除指令*/
            var Id=data.Id;
            layer.confirm('是否确认删除？', function(index){
                $.ajax({
                    type:'post',
                    url : '/deletepromInfo',
                    data : {'Id': Id},
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
                title:'编辑爆款信息',
                skin: 'layui-layer-rim', //加上边框
                area: ['280px', '400px'], //宽高
                content: '<div style="width:90px;height:115px;">婚纱图片：<i id="tubiao" style="cursor: pointer;position: absolute;top: 24.5%;left: 64%" lay-event="tubiao" class="layui-icon">&#xe642;</i> ' +
                    ' <img id="tubiaoimg" style="width: 90px;height: 90px;margin-left:120%;" src="/'+data.weddingPicture+'"></div>' +
                    '<div><p style="margin-left:30px;margin-top: 5px">婚纱名：<input style="width:140px; margin-left: 27px" id="weddingName" type="text" name="weddingName" value="'+data.weddingName+'"/></p>' +
                    '<p style="margin-left:30px;margin-top:6px;">婚纱风格：<select style="width:143px;margin-left: 14px" id="weddingStyle" name="weddingStyle"><option value="0">复古</option><option value="1">时尚</option><option value="2">优雅</option><option value="3">公主</option></select></p>'+
                    '<p style="margin-top: 6px;margin-left:30px;">租赁价格：<input style="width:140px;margin-left: 14px" id="weddingPrice" name="weddingPrice" type="text" value="'+data.weddingPrice+'"/></p>' +
                    '<p style="margin-left:30px;margin-top:6px;">押金（元）<input style="width:140px;margin-left: 14px" id="weddingDeposit" name="weddingPurchase" type="text" value="'+data.weddingDeposit+'"/></p>' +
                    '<p style="margin-left:30px;margin-top:6px;">租赁状态：<input style="width:140px;margin-left: 14px" id="rentalStatus" name="rentalStatus" type="text" value="'+data.rentalStatus+'" ></p>' +
                    '<p style="margin-left:30px;margin-top:6px;">是否推荐：<select style="width:143px;margin-left: 14px" id="promotion" name="promotion"><option value="1">是</option><option value="0">否</option></select></p></div>' +
                    '<div class="layuibtn" id="editprombtn">' + '<button class="layui-btn layui-btn-sm layui-btn-normal" id="btn1" lay-submit lay-filter="formDemo" onclick="editAction()">保存</button>' +
                    '<input type="button" id="cancel" value="取消" class="layui-btn layui-btn-sm layui-btn-normal"/></div>' +
                    '<input type="hidden" id="Id1" name="Id" value="'+data.Id+'"/>'
            });
            //  获取值将单选框选中
            $("#weddingStyle option[value='"+data.weddingStyle+"']").attr("selected","selected");
            $("#faddish option[value='"+data.promotion+"']").attr("selected","selected");
            $("#cancel").on('click', function(){
                layer.close(index);
            });
            //编辑提交
            $("#btn1").on('click', function(){
                var weddingName = $("#weddingName").val();
                var weddingStyle=$("#weddingStyle").val();
                var weddingPrice = $("#weddingPrice").val();
                var weddingDeposit = $("#weddingDeposit").val();
                var rentalStatus = $("#rentalStatus").val();
                var promotion=$("promotion").val();
                var Id = $("#Id1").val();
                $.ajax({
                    url : '/editpromInfo',
                    data : {'Id':Id,'weddingName': weddingName,'weddingStyle':weddingStyle,'weddingPrice': weddingPrice,'weddingDeposit':weddingDeposit, 'rentalStatus':rentalStatus,'promotion':promotion},
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
                    content:'<img style="width:197px;height:197px;margin-left: 4%;margin-top: 5%;" id="hp" src="/'+data.weddingPicture+'">' +
                        '<input type="hidden" id="Id2" name="Id" value="'+data.Id+'"/>' +
                        '<input type="hidden" id="weddingPicture" name="weddingPicture" required lay-verify="required" />' +
                        '<div style="position: absolute;left: 222px;top: 43%;">' +
                        '<button type="button" class="layui-btn layui-btn-primary"id="fileBtn"><i class="layui-icon">&#xe67c;</i>选择图像</button>' +
                        '<button type="button" class="layui-btn layui-btn-warm"id="uploadBtn">开始上传</button></div>' +
                        '<div class="layuibtn"><button class="layui-btn layui-btn-sm layui-btn-normal" id="btn2" lay-submit lay-filter="formDemo">保存</button>' +
                        '<input type="button" id="cancel2" value="取消" class="layui-btn layui-btn-sm layui-btn-normal"/></div>'
                });
                //图片提交
                $("#btn2").on('click', function(){
                    var Id = $("#Id2").val();
                    var weddingPicture = $("#weddingPicture").val();
                    $.ajax({
                        url : '/editpromInfo',
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
                //编辑添加图片上传
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
                        $("[name=weddingPicture]").val(res.data.src);

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
    //,skip: true //开启跳页
    ,jump: function(obj, first){
      if(!first){
        layer.msg('第'+ obj.curr +'页');
      }
    }
  });
});
//清除
function cleanBtn(){
	document.getElementById("searchone").value='';
	document.getElementById("searchtwo").value='';
	document.getElementById("searchthree").value='';
}
