/*数据-添加*/
function member_add(obj) {
    $("#add_menber_style").find("input").each(function () {
        if ($(this).attr("name") == "城市名称"){
            $(this).attr("value",'') ;
            $(this).removeAttr('disabled') ;
        }else if ($(this).attr("name") == "城镇化率"){
            $(this).attr("value",'') ;
        }else if ($(this).attr("name") == "G D P"){
            $(this).attr("value",'') ;
        }else if ($(this).attr("name") == "每千人卫生技术人员"){
            $(this).attr("value",'') ;
        }else if ($(this).attr("name") == "在校学生人数"){
            $(this).attr("value",'') ;
        }
    });
    layer.open({
        type: 1,
        title: '添加省份各类数据',
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
                if ($(this).val() == "") {

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
                if ($(this).attr("name") == "城市名称"){
                    adata["areaname"]=$(this).val();
                }else if ($(this).attr("name") == "城镇化率"){
                    adata["cityrate"]=parseFloat($(this).val());
                }else if ($(this).attr("name") == "G D P"){
                    adata["gdp"]=parseFloat($(this).val());
                }else if ($(this).attr("name") == "每千人卫生技术人员"){
                    adata["doctor"]=parseFloat($(this).val());
                }else if ($(this).attr("name") == "在校学生人数"){
                    adata["students"]=parseInt($(this).val());
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
                    url : "/areaWithVariousData/add",     //请求的url。与后端@Request Mapping注解中的值一致。
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
            if ($(this).attr("name") == "城市名称"){
                $(this).attr("value",$(obj).parents("tr").children("td").eq(2).text()) ;
                $(this).attr("disabled","disabled") ;
            }else if ($(this).attr("name") == "城镇化率"){
                $(this).attr("value",$(obj).parents("tr").children("td").eq(4).text()) ;
            }else if ($(this).attr("name") == "G D P"){
                $(this).attr("value",$(obj).parents("tr").children("td").eq(6).text()) ;
            }else if ($(this).attr("name") == "每千人卫生技术人员"){
                $(this).attr("value",$(obj).parents("tr").children("td").eq(3).text()) ;
            }else if ($(this).attr("name") == "在校学生人数"){
                $(this).attr("value",$(obj).parents("tr").children("td").eq(5).text()) ;
            }
    });

    layer.open({
        type: 1,
        title: '修改省份各类数据信息',
        maxmin: true,
        shadeClose: false, //点击遮罩关闭层
        area: ['800px', ''],
        content: $('#add_menber_style'),
        btn: ['提交', '取消'],
        yes: function (index, layero) {
            var num = 0;
            var str = "";
            $(".add_menber input[type$='text']").each(function (n) {

                if ($(this).val() == "") {

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
                if ($(this).attr("name") == "城市名称"){
                    adata["areaname"]=$(this).val();
                }else if ($(this).attr("name") == "城镇化率"){
                    adata["cityrate"]=parseFloat($(this).val());
                }else if ($(this).attr("name") == "G D P"){
                    adata["gdp"]=parseFloat($(this).val());
                }else if ($(this).attr("name") == "每千人卫生技术人员"){
                    adata["doctor"]=parseFloat($(this).val());
                }else if ($(this).attr("name") == "在校学生人数"){
                    adata["students"]=parseInt($(this).val());
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
                    url : "/areaWithVariousData/update",     //请求的url。与后端@Request Mapping注解中的值一致。
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

    var areaname = $(obj).parents("tr").children("td").eq(2).text();
    areaname = encodeURI(areaname);
    layer.confirm('确认要删除吗？', function (index) {

        $(obj).parents("tr").remove();//删除之后要将这个内容remove掉

        $.ajax({
            type:"GET",
            url:"/user_list.html/delete/"+areaname+"?pn="+pn,
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


