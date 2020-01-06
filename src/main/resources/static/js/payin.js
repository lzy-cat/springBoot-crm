//查询按钮
function searchPayIn() {
    var inName = $("#inNameSearch").val();
    var inType = $("#inTypeSearch").combo("getValue");
    var createTime = $("#createTimeSearch").combo("getValue");
    //将参数传到后台
    $("#payInData").datagrid('load', {
        'inName': inName,
        'inType': inType,
        'createTime': createTime
    });
}

//添加收入
function openAddDialog() {
    $("#addForm").form("reset");
    //将所属账户信息加载到combobox
    $("#accountId").combobox({
        url: "account?actionName=queryAccountListByUid",
        valueField: 'id',
        textField: 'accountName',
        value: '请选择所属账户'
    });
    $("#addDialog").dialog("open");
}

//取消按钮
function closeAddDialog() {
    $("#addDialog").dialog("close");
}

//保存按钮
function addPayIn() {
    //获取表单参数
    var inName = $("#inName").val();
    var inType = $("#inType").combo("getValue");
    var accountId = $("#accountId").combo("getValue");
    var money = $("#money").val();
    var remark = $("#remark").val();
    // 进行非空判断
    if (isEmpty(inName)) {
        $.messager.alert("添加收入", "请输入收入名称！", "warning");
        return;
    }
    if (isEmpty(inType)) {
        $.messager.alert("添加收入", "请选择收入类型！", "warning");
        return;
    }
    if (accountId == "请选择所属账户") {
        $.messager.alert("添加收入", "请输入所属账户！", "warning");
        return;
    }
    if (isEmpty(money)) {
        $.messager.alert("添加收入", "请输入收入金额！", "warning");
        return;
    }
    $.ajax({
        type: "post",
        url: "payIn",
        data: {
            'inName': inName,
            'inType': inType,
            'accountId': accountId,
            'money': money,
            'remark': remark,
            'actionName': 'addPayIn'
        },
        success: function (result) {
            if (result == 1) {
                // 弹出提示框提示用户成功了
                $.messager.alert("添加收入", "添加成功！", "info");
                // 刷新数据表格
                $("#payInData").datagrid("reload");
                // 关闭对话框
                $("#addDialog").dialog("close");
            } else {
                $.messager.alert("添加收入", "添加失败！", "error");
            }
        }
    });
}

//修改收入模块
function openUpdateDialog() {
    var obj = $("#payInData").datagrid("getSelected");
    console.log(obj);
    if (obj == null) {
        $.messager.alert("修改收入", "至少选择一条记录！", "warning");
        return;
    }
    //加载所属账户
    $("#accountIdUp").combobox({
        url: "account?actionName=queryAccountListByUid",
        valueField: 'id',
        textField: 'accountName',
        value: '请选择所属账户'
    });
    //填充选中记录到表单
    $("#updateForm").form("load", {
        inNameUp: obj.inName,
        inTypeUp: obj.inType,
        accountIdUp: obj.accountId,
        moneyUp: obj.money,
        remarkUp: obj.remark,
        pid: obj.id
    });
    // 打开对话框
    $("#updateDialog").dialog("open");

}

//取消按钮
function closeUpdateDialog() {
    $("#updateDialog").dialog("close");
}

//保存按钮
function updatePayIn() {
    //获取表单数据
    var inName = $("#inNameUp").val();
    var inType = $("#inTypeUp").combo("getValue");
    var accountId = $("#accountIdUp").combo("getValue");
    var money = $("#moneyUp").val();
    var remark = $("#remarkUp").val();
    var pid = $("#pid").val();
    //非空判断
    if (isEmpty(inName)) {
        $.messager.alert('修改收入', '收入名称不能为空！', 'warning');
        return;
    }
    if (isEmpty(inType)) {
        // 提示用户
        $.messager.alert('修改收入', '请选中收入类型！', 'warning');
        return;
    }
    if (isEmpty(accountId)) {
        // 提示用户
        $.messager.alert('修改收入', '请选中所属账户！', 'warning');
        return;
    }
    if (isEmpty(money)) {
        // 提示用户
        $.messager.alert('修改收入', '请输入收入金额！', 'warning');
        return;
    }
    if (isEmpty(pid)) {
        // 提示用户
        $.messager.alert('修改收入', '系统错误！', 'warning');
        return;
    }
    $.ajax({
        type: 'post',
        url: 'payIn',
        data: {
            'inName': inName,
            'inType': inType,
            'accountId': accountId,
            'money': money,
            'remark': remark,
            'pid': pid,
            'actionName': 'updatePayIn',
        },
        success: function (result) {
            //==1 提示添加成功	刷新数据表格	关闭对话框
            if (result == 1) {
                $.messager.alert("修改收入", "修改成功", "info");
                $("#payInData").datagrid("reload");
                closeUpdateDialog();
            } else {
                $.messager.alert('修改收入', '修改失败！', 'error');
            }
        }

    });
}

//删除收入
function openDeleteDialog() {
    var objs = $("#payInData").datagrid("getChecked");
    console.log(objs);
    if (objs.length < 1) {
        $.messager.alert("删除收入", "请选中至少一条记录！", "warning");
        return;
    }
    //获取要删除的id	 需要拼接id 格式：1,2,3
    var ids = "";
    for (var i = 0; i < objs.length; i++) {
        if (i == objs.length - 1) {
            ids += objs[i].id;
        } else {
            ids += objs[i].id + ",";
        }
    }
    console.log(ids);
    // 提示用户是否要删除该记录（使用message的方法）
    $.messager.confirm('确认对话框', '您确认要删除吗？', function (r) {
        if (r) {
            // ajax请求后台进行删除操作，回调函数接受后台的响应result;
            $.ajax({
                type: "post",
                url: "payIn",
                data: {
                    'ids': ids,
                    'actionName': 'deletePayin'
                },
                success: function (result) {
                    if (result != 0) {
                        //提示成功删除几条记录、刷新数据表格
                        $.messager.alert("删除收入", "成功删除" + result + "条记录！", "info");
                        $("#payInData").datagrid("reload");
                    } else {
                        //=0 失败 提示失败
                        $.messager.alert("删除收入", "删除失败！", "error");
                    }
                }
            });
        }
    });
}