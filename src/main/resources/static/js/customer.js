//通过datagrid中load将查询条件传给后台，进行条件分页查询
function searchCustomer() {
    $("#dg").datagrid("load", {
        khno: $("#s_khno").val(),
        name: $("#s_name").val()
    })
}

//打开添加客户信息框
function openCustomerAddDialog() {
    $("#dlg").dialog("open").dialog("setTitle", "添加客户信息");
    $("#fm").form("clear")

}

function closeCustomerDialog() {
    $("#dlg").dialog("close");
}

//更新或修改客户信息(根据是否有id来判断执行哪个操作)
function saveOrUpdateCustomer() {
    //获取id
    var id = $("#id").val();
    var url = ctx + "/customer/update";
    if (isEmpty(id)) {
        url = ctx + "/customer/insert";
    }
    //表单提交，将数据传给后台
    $("#fm").form("submit", {
        url: url,
        onsubmit: function () {
            return $("#fm").from("validate")
        },
        success: function (data) {
            data = JSON.parse(data)
            if (data.code == 200) {
                $.messager.alert("来自crm", data.msg, "info");
                searchCustomer();
                closeCustomerDialog();
            } else {
                $.messager.alert("来自crm", data.msg, "error");
            }
        }
    })
}

//修改客户信息
function openCustomerModifyDialog() {
    var rows = $("#dg").datagrid("getSelections");
    if (rows.length == 0) {
        $.messager.alert("Crm系统", "请选择一条记录", "warning")
        return;
    }
    if (rows.length > 1) {
        $.messager.alert("Crm系统", "只能选择一条记录", "warning")
        return;
    }
    //填充数据
    $("#fm").form("load", rows[0])
    //修改标题
    $("#dlg").dialog("open").dialog("setTitle", "修改客户信息")
}

//删除客户信息
function deleteCustomer() {
    var rows = $("#dg").datagrid("getSelections");
    if (rows.length < 1) {
        $.messager.alert("Crm系统", "请至少选择一条记录", "warning");
        return;
    }
    //获取拼接的id
    var ids = "id=";
    for (var i = 0; i < rows.length; i++) {
        if (i < rows.length - 1) {
            ids += rows[i].id + "&id="
        }
        if (i == rows.length - 1) {
            ids += rows[i].id
        }
    }
    $.messager.confirm("Crm系统", "您确定删除该记录吗", function (r) {
        //点击确认
        if (r) {
            $.ajax({
                url: ctx + "/customer/delete",
                data: ids,
                dataType: "json",
                success: function (data) {
                    if (data.code == 200) {
                        $.messager.alert("Crm系统", data.msg, "info");
                        //刷新数据表格
                        searchCustomer();
                    } else {
                        $.messager.alert("来自crm", data.msg, "error");
                    }
                }
            });
        }
    })
}

//查看历史订单
function openCustomerOtherInfo(title, type) {
    var rows = $("#dg").datagrid("getSelections");
    if (rows.length == 0) {
        $.messager.alert("Crm系统", "请选择一条记录", "warning");
        return;
    }
    if (rows.length > 1) {
        $.messager.alert("Crm系统", "只能选择一条记录", "warning")
        return;
    }
    window.parent.openTab(title, ctx + "/customer/openCustomerOtherInfo/" + type + "/" + rows[0].id);
}