/*数据-添加*/
function member_add(obj) {
    $("#add_menber_style").find("input").each(function () {
            $(this).attr("value",'') ;
        if ($(this).attr("name") == "风险地区名称"){
            $(this).removeAttr('disabled') ;
        }
    });
    layer.open({
        type: 1,
        title: '添加风险地区数据',
        maxmin: true,
        shadeClose: true, //点击遮罩关闭层
        area: ['800px', ''],
        content: $('#add_menber_style'),
        btn: ['提交', '取消'],
        yes: function (index, layero) {
            var num = 0;
            var str = "";
            // console.log($(obj).html());
            $(".add_menber input[type$='text']").each(function (n) {
                if ($(this).val() == "" && $(this).attr("name") != "1") {

                    layer.alert(str += "" + $(this).attr("name") + "不能为空！\r\n", {
                        title: '提示框',
                        icon: 0,
                    });
                    num++;
                    return false;
                }
            });

            var adata = {};
            $("#add_menber_style").find("input").each(function () {
                if ($(this).attr("name") == "风险地区名称"){
                    adata["areasName"]=$(this).val();
                }else if ($(this).attr("name") == "风险程度"){
                    adata["areasDegree"]=$(this).val();
                }
            });
            // console.log(adata);
            var data = JSON.stringify(adata);
            if (num > 0) {
                return false;
            } else {
                $.ajax({
                    type : "POST",                           //通过POST方式上传请求
                    contentType : "application/json",//上传内容格式为json结构
                    data : data,
                    async:false,//上传的参数
                    url : "/RiskAreas/add",     //请求的url。与后端@Request Mapping注解中的值一致。
                    success : function(data) {
                        if (data.code == '200'){
                            //请求成功的回调函数
                            layer.alert(data.msg, {
                                title: '提示框',
                                icon: 1,
                            },function () {
                                window.location.reload();
                            });
                            layer.close(index);
                        }else {
                            //请求成功的回调函数
                            layer.alert(data.msg, {
                                title: '提示框',
                                icon: 2,
                            });
                        }

                    },
                    error : function(e) {		      //请求失败的回调函数
                        layer.msg('添加失败!', {icon: 2, time: 1000});
                    }
                });
            }
        }
    });
}


/*数据-编辑*/
function member_edit(obj) {

    $("#add_menber_style").find("input").each(function () {
            if ($(this).attr("name") == "风险地区名称"){
                $(this).attr("value",$(obj).parents("tr").children("td").eq(2).text()) ;
                $(this).attr("disabled","disabled");
            }else if ($(this).attr("name") == "风险程度"){
                $(this).attr("value",$(obj).parents("tr").children("td").eq(3).text()) ;
            }
    });

    layer.open({
        type: 1,
        title: '修改风险地区数据信息',
        maxmin: true,
        shadeClose: false, //点击遮罩关闭层
        area: ['800px', ''],
        content: $('#add_menber_style'),
        btn: ['提交', '取消'],
        yes: function (index, layero) {
            var num = 0;
            var str = "";
            $(".add_menber input[type$='text']").each(function (n) {

                if ($(this).val() == "" && $(this).attr("name") != "1") {

                    layer.alert(str += "" + $(this).attr("name") + "不能为空！\r\n", {
                        title: '提示框',
                        icon: 0,
                    });
                    num++;
                    return false;
                }
            });

            var adata = {};
            $("#add_menber_style").find("input").each(function () {
                if ($(this).attr("name") == "风险地区名称"){
                    adata["areasName"]=$(this).val();

                }else if ($(this).attr("name") == "风险程度"){
                    adata["areasDegree"]=$(this).val();
                }
            });
            // console.log(adata);
            var data = JSON.stringify(adata);


            if (num > 0) {
                return false;
            } else {
                $.ajax({
                    type : "POST",                           //通过POST方式上传请求
                    contentType : "application/json",//上传内容格式为json结构
                    data : data,
                    async:false,//上传的参数
                    url : "/RiskAreas/update",     //请求的url。与后端@Request Mapping注解中的值一致。
                    success : function(data) {
                        layer.alert("修改成功", {
                            title: '提示框',
                            icon: 1,
                        },function () {
                                window.location.reload();
                        });
                        layer.close(index);
                    },
                    error : function(e) {

                        layer.msg('修改失败!', {icon: 2, time: 1000});
                    }
                });
            }
        }
    });
}

/*数据-删除*/
function member_del(obj,pn) {

    var areasName = $(obj).parents("tr").children("td").eq(2).text();
    areasName = encodeURI(areasName);
    layer.confirm('确认要删除吗？', function (index) {

        $(obj).parents("tr").remove();//删除之后要将这个内容remove掉

        $.ajax({
            type:"GET",
            url:"/risk_areaslist.html/delete/"+areasName+"?pn="+pn,
            success:function(data){
                layer.msg('删除成功!', {icon: 1, time: 1000});
                setTimeout(function () {
                    window.location.reload();

                }, 1000);


            },

            error : function() {
                layer.msg('删除失败!', {icon: 2, time: 1000});
            },
        });

    });

}

/*数据-查询*/
function member_select(obj) {

    // console.log($(obj).parents("li").prev().find("input").val());
    var str = $(obj).parents("li").prev().find("input").val();

    ids = str.split(',');
    // for(var i=0;i<arr.length;i++)
    // {
    //     alert(arr[i]);
    // }


    $.ajax({
        url:"/RiskAreas/select",
        type:"post",
        // dateType:'json',
        dataType :'html',
        data:{
            ids:ids
        },
        success:function(res){
            // var objs=eval(res); //解析json对象
            // //console.log("数据=="+JSON.stringify(objs));
            // console.log("数据=="+objs);
            console.log(res);
            // console.log($(res).find('.page-content clearfix').html());
            // window.location.reload();
            //新打开一个页面（about:blank是打开浏览器空白页的命令）, _blank：打开一个新的窗口
            // var newPage = window.open("about:blank", "_blank");
            // //将后台传过来的html页面写到新打开的浏览器窗口中显示
            // newPage.document.write(res);

        },
        error:function(err){
            alert("网络连接失败,稍后重试",err);
        }
    })


}

