$(function () {
    //判断页面隐藏域中的devResult，(当开发失败或者开发成功就移除，就没必要执行该计划了)是否移除tootbar工具栏
    var devresult = $("#devResult").val();
    if (devresult == 2 || devresult == 3) {
        $("#toolbar").remove();
    }
    $("#dg").edatagrid({
        //在可编辑表格dg，先进行根据id分页查询
        url: ctx + "/cus_dev_plan/queryCusDevPlans?saleChanceId=" + $("#saleChanceId").val(),
        //保存计划开发项，
        saveUrl: ctx + "/cus_dev_plan/insert?saleChanceId=" + $("#saleChanceId").val(),
        //更新开发计划项，
        updateUrl: ctx + "/cus_dev_plan/update?saleChanceId=" + $("#saleChanceId").val()
    })
});

//保存开发计划项
function saveCusDevPlan() {
    $("#dg").edatagrid("saveRow");
    $("#dg").edatagrid("load");
}

//更新开发计划项
function updateCusDevPlan() {
    $("#dg").edatagrid("saveRow");
    //$("#dg").edatagrid("load");
}

function delCusDevPlan() {
    //返回选中的对象
    var row = $("#dg").datagrid("getSelected");
    if (row == null) {
        $.messager.alert("Crm系统", "请选中一条记录", "warning");
        return;
    }
    //执行删除
    $.messager.confirm("来自Crm", "你确定要删除这一行数据吗？", function (r) {
        if (r) {
            $.ajax({
                tye: 'post',
                url: ctx + "/cus_dev_plan/detele",
                dataType: 'json',
                data: "id=" + row.id,
                success: function (data) {
                    if (data.code == 200) {
                        $.messager.alert("Crm系统", data.msg, "info");
                        $("#dg").edatagrid("load");
                    } else {
                        $.messager.alert("Crm系统", data.msg, "error");
                    }
                }
            })
        }
    })
}

//更新营销机会开发结果
function updateSaleChanceDevResult(devResult) {
    $.messager.confirm("Crm系统", "确定执行该操作吗", function (r) {
        if (r) {
            $.ajax({
                type: "post",
                url: ctx + "/sale_chance/updateSaleChanceDevResult",
                data: "devResult=" + devResult + "&saleChanceId=" + $("#saleChanceId").val(),
                dataType: "json",
                success: function (data) {
                    $.messager.alert("来自crm", data.msg, "info");
                    if (data.code == 200) {
                        //更新成功后移除工具栏
                        $("#toolbar").remove();
                    }
                }
            });
        }
    })
}