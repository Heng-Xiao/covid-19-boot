// jQuery(function ($) {
//     var oTable1 = $('#sample-table').dataTable({
//         "aaSorting": [[1, "desc"]],//默认第几个排序
//         "bStateSave": true,//状态保存
//         "aoColumnDefs": [
//             //{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
//             {"orderable": false, "aTargets": [0, 8, 9]}// 制定列不参与排序
//         ]
//     });
//
//
//     $('table th input:checkbox').on('click', function () {
//         var that = this;
//         $(this).closest('table').find('tr > td:first-child input:checkbox')
//             .each(function () {
//                 this.checked = that.checked;
//                 $(this).closest('tr').toggleClass('selected');
//             });
//
//     });
//
//
//     $('[data-rel="tooltip"]').tooltip({placement: tooltip_placement});
//
//     function tooltip_placement(context, source) {
//         var $source = $(source);
//         var $parent = $source.closest('table')
//         var off1 = $parent.offset();
//         var w1 = $parent.width();
//
//         var off2 = $source.offset();
//         var w2 = $source.width();
//
//         if (parseInt(off2.left) < parseInt(off1.left) + parseInt(w1 / 2)) return 'right';
//         return 'left';
//     }
// })
/*用户-添加*/
// $('#member_add').on('click', function () {
//
//     console.log(111);
//     layer.open({
//         type: 1,
//         title: '添加用户',
//         maxmin: true,
//         shadeClose: true, //点击遮罩关闭层
//         area: ['800px', ''],
//         content: $('#add_menber_style'),
//         btn: ['提交', '取消'],
//         yes: function (index, layero) {
//             var num = 0;
//             var str = "";
//             $(".add_menber input[type$='text']").each(function (n) {
//                 if ($(this).val() == "") {
//
//                     layer.alert(str += "" + $(this).attr("name") + "不能为空！\r\n", {
//                         title: '提示框',
//                         icon: 0,
//                     });
//                     num++;
//                     return false;
//                 }
//             });
//             if (num > 0) {
//                 return false;
//             } else {
//                 layer.alert('添加成功！', {
//                     title: '提示框',
//                     icon: 1,
//                 });
//                 layer.close(index);
//             }
//         }
//     });
// });


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


/*用户-查看*/
function member_show(title, url, id, w, h) {
    layer_show(title, url + '#?=' + id, w, h);
}

/*用户-停用*/
function member_stop(obj, id) {
    layer.confirm('确认要停用吗？', function (index) {
        $(obj).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" class="btn btn-xs " onClick="member_start(this,id)" href="javascript:;" title="启用"><i class="icon-ok bigger-120"></i></a>');
        $(obj).parents("tr").find(".td-status").html('<span class="label label-defaunt radius">已停用</span>');
        $(obj).remove();
        layer.msg('已停用!', {icon: 5, time: 1000});
    });
}

/*用户-启用*/
function member_start(obj, id) {
    layer.confirm('确认要启用吗？', function (index) {
        $(obj).parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" class="btn btn-xs btn-success" onClick="member_stop(this,id)" href="javascript:;" title="停用"><i class="icon-ok bigger-120"></i></a>');
        $(obj).parents("tr").find(".td-status").html('<span class="label label-success radius">已启用</span>');
        $(obj).remove();
        layer.msg('已启用!', {icon: 6, time: 1000});
    });
}

/*用户-编辑*/
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

/*用户-删除*/
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

/*新闻-删除*/
function member_del_newlist(obj,id,pn) {

    // var areaname = $(obj).parents("tr").children("td").eq(2).text();
    // areaname = encodeURI(areaname);
    layer.confirm('确认要删除吗？', function (index) {

        $(obj).parents("tr").remove();//删除之后要将这个内容remove掉

        $.ajax({
            type:"GET",
            url:"/newslist.html/delete/"+id+"?pn="+pn,
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


/*中国疫情总数据-删除*/
function member_del_chinaTotalList(obj,nowtime,pn) {

    // var areaname = $(obj).parents("tr").children("td").eq(2).text();
    // areaname = encodeURI(areaname);
    layer.confirm('确认要删除吗？', function (index) {

        $(obj).parents("tr").remove();//删除之后要将这个内容remove掉

        $.ajax({
            type:"GET",
            url:"/china_totallist.html/delete/"+nowtime+"?pn="+pn,
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
/*中国疫情累计总数据-删除*/
function member_del_chinatwomonthsList(obj,yeardate,pn) {

    layer.confirm('确认要删除吗？', function (index) {

        $(obj).parents("tr").remove();//删除之后要将这个内容remove掉

        $.ajax({
            type:"GET",
            url:"/china_twomonthslist.html/delete/"+yeardate+"?pn="+pn,
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

/*中国疫情新增总数据-删除*/
function member_del_chinatwomonthsaddList(obj,yeardate,pn) {

    layer.confirm('确认要删除吗？', function (index) {

        $(obj).parents("tr").remove();//删除之后要将这个内容remove掉

        $.ajax({
            type:"GET",
            url:"/china_twomonthsaddlist.html/delete/"+yeardate+"?pn="+pn,
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

/*省份今日疫情-删除*/
function member_del_areathedayList(obj,area,pn) {

    layer.confirm('确认要删除吗？', function (index) {

        $(obj).parents("tr").remove();//删除之后要将这个内容remove掉

        $.ajax({
            type:"GET",
            url:"/area_thedaylist.html/delete/"+area+"?pn="+pn,
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

/*省份历史累计数据-删除*/
function member_del_areahistoryconfirmlist(obj,yeardate,pn) {

    layer.confirm('确认要删除吗？', function (index) {

        $.ajax({
            type:"GET",
            url:"/area_history_confirmlist.html/delete/"+yeardate+"?pn="+pn,
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


/*省份历史新增数据-删除*/
function member_del_areahistoryconfirmaddlist(obj,yeardate,pn) {

    layer.confirm('确认要删除吗？', function (index) {

        $.ajax({
            type:"GET",
            url:"/area_history_confirm_addlist.html/delete/"+yeardate+"?pn="+pn,
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






