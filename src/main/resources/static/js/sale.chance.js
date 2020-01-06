//没有写这个方法，sal_chance.ftl页面会出现布局错误 formatterState是在sal_chance.ftl中 <th field='state' formatter="formatterState">分配状态</th>
function formatterState(val) {
    if (val == 0) {
        return "未分配";
    } else if (val == 1) {
        return "已分配";
    } else {
        return "未定义";
    }
}

//页面加载时，加载数据、将分页条件传给后台
function searchSaleChances() {
    $("#dg").datagrid("load", {
        createMan: $("#createMan").val(),
        customerName: $("#customerName").val(),
        createDate: $("#createDate").datebox("getValue"),
        state: $("#state").combobox("getValue")
    })
}

//打开添加营销机会弹框同时修改标题、在清空表单数据
function openAddAccountDialog() {
    $("#fm").form("clear");
    $("#dlg").dialog("open").dialog("setTitle", '添加营销机会记录');

}

function closeDialog() {
    $("#dlg").dialog("close");
}

//添加营销机会
function saveAccount() {
    $("#fm").form("submit", {
        url: ctx + "/sale_chance/insert",
        onsubmit: function (params) {
            params.createMan = $.cookie("trueName");
            return $("#fm").form("validate");
        },
        success: function (data) {
            data = JSON.parse(data);
            console.log(data);
            console.log(data.code);
            if (data.code == 200) {
                //弹出保存成功
                $.messager.alert("保存营销机会", data.msg, "info");
                closeDialog();
                //刷新数据表格
                searchSaleChances();
            } else {
                $.messager.alert("保存营销机会", data.msg, "error");
            }
        }
    })
}

//修改营销机会记录
function openModifyAccountDialog() {
    //判断是否选中
    var rows = $("#dg").datagrid("getSelections");
    if (rows.length == 0) {
        $.messager.alert("Crm系统", "请选择一条记录", "warning");
        return;
    }
    if (rows.length > 1) {
        $.messager.alert("Crm系统", "最多选择一条记录", "warning");
        return;
    }
    //填充到表单
    $("#fm").form('load', rows[0]);
    //打开弹框后修改标题
    $("#dlg").dialog("open").dialog("setTitle", '修改营销机会记录');

}

//删除营销机会记录
function deleteAccount() {
    var rows = $("#dg").datagrid("getSelections");
    if (rows.length < 1) {
        $.messager.alert("Crm系统", "请至少选择一条记录", "warning");
        return;
    }
    //获取拼接的id

    var params = "id=";
    for (var i = 0; i < rows.length; i++) {
        if (i < rows.length - 1) {
            params += rows[i].id + "&id=";
        } else {
            params += rows[i].id;
        }
    }
    console.log(params)
    $.messager.confirm("Crm系统", "您确定删除该记录吗", function (r) {
        //点击确认
        if (r) {
            $.ajax({
                url: ctx + "/sale_chance/delete",
                data: params,
                dataType: "json",
                success: function (data) {
                    console.log(data)
                    if (data.code == 200) {
                        $.messager.alert("Crm系统", data.msg, "info");
                        //刷新数据表格
                        searchSaleChances();
                    } else {
                        $.messager.alert("来自crm", data.msg, "error");
                    }
                }
            });
        }
    })


}
