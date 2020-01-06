/**
 * 给添加按钮绑定点击事件
 */
function openAddDialog() {
    // 重置表单
    $("#addForm").form("reset");
    // 打开对话框
    $("#dd").dialog("open");
}

//取消按钮添加事件
function closeAddDialog() {
    $("#dd").dialog("close");
}

//给保存按钮添加事件
function addAccount() {
    //接收参数
    var accountName = $("#accountName").val();
    var accountType = $("#accountType").combo("getValue");
    var money = $("#money").val();
    var remark = $("#remark").val();
    //	非空判断
    if (isEmpty(accountName)) {
        $.messager.alert('添加账户', '添加失败，账户名称不能为空！', 'warning');
        return;
    }
    if (isEmpty(accountType)) {
        $.messager.alert('添加账户', '添加失败，账户类型不能为空！', 'warning');
        return;
    }
    if (isEmpty(money)) {
        $.messager.alert('添加账户', '添加失败，账户金额不能为空！', 'warning');
        return;
    }
    //	通过ajax将数据给前台
    $.ajax({
        type: 'post',
        url: 'account',
        data: {
            'accountName': accountName,
            'accountType': accountType,
            'money': money,
            'remark': remark,
            'actionName': 'addAccount'
        },
        success: function (result) {
            //	回调函数：result 
            if (result == 1) {
                //	=1 成功：提示添加成功消息框、刷新数据表格、关闭对话框
                $.messager.alert('添加账户', '添加成功！', 'info');
                $("#accountData").datagrid("reload");
                closeAddDialog()
            } else {
                //	=0失败：提示添加失败消息框
                $.messager.alert('添加账户', '添加失败！', 'warning');
            }

        }
    });
}

//添加账户end

//修改账户begin
function openUpdateDialog() {
    var obj = $("#accountData").datagrid("getSelected");
    if (obj != null) {
        //	弹出对话框
        $("#updateDialog").dialog("open");
        //	将数据表格中的数据填充到表单中
        $('#updateForm').form('load', {
            'accountNameUp': obj.accountName,
            'accountTypeUp': obj.accountType,
            'moneyUp': obj.money,
            'remarkUp': obj.remark,
            'accountIdUp': obj.id
        });

    } else {
        $.messager.alert('修改账户', '至少选中一条数据！', 'warning');
        return;
    }
}

//修改中的保存按钮
function UpdateAccount() {
    //	获取表单中的数据
    var accountName = $("#accountNameUp").val();
    var accountType = $("#accountTypeUp").combo("getValue");
    var money = $("#moneyUp").val();
    var remark = $("#remarkUp").val();
    //
    var accountId = $("#accountIdUp").val();
    //	非空判断
    //	空：	弹出警告框
    if (isEmpty(accountName)) {
        $.messager.alert('修改账户', '账户名称不能为空！', 'warning');
        return;
    }
    if (isEmpty(accountType)) {
        $.messager.alert('修改账户', '请选中账户类型！', 'warning');
        return;
    }
    if (isEmpty(money)) {
        $.messager.alert('修改账户', '账户金额不能为空！', 'warning');
        return;
    }
    //	不为空：	通过ajax将数据提交后台
    $.ajax({
        type: 'post',
        url: 'account',
        data: {
            'accountName': accountName,
            'accountType': accountType,
            'money': money,
            'remark': remark,
            'actionName': 'updateAccount',
            'accountId': accountId
        },
        success: function (result) {
            //	result=1：	成功：提示成功、刷新数据表格、关闭对话框
            if (result == 1) {
                $.messager.alert('修改账户', '修改成功！', 'info');
                //刷新数据表格
                $("#accountData").datagrid("reload");
                //关闭对话框
                closeUpdateDialog();
            } else {
                //	=0：	失败：提示失败
                $.messager.alert('修改账户', '修改失败！', 'warning');
            }
        }
    });
}

//修改中的取消按钮
function closeUpdateDialog() {
    $("#updateDialog").dialog("close");
}

//修改账户end

//删除账户begin
function openDeleteDialog() {
    var objs = $("#accountData").datagrid("getChecked");
    console.log(objs);
    if (objs.length < 1) {
        //没选中：	弹出警告框
        $.messager.alert('删除用户', '请选中至少一条数据', 'warning');
        return;
    }
    //获取要删除记录的id，并拼接成需要的格式
    var ids = "";
    for (var i = 0; i < objs.length; i++) {
        if (i == objs.length - 1) {
            ids += objs[i].id;
        } else {
            ids += objs[i].id + ",";
        }
    }
//	提示是否删除（使用missage的方法）
    $.messager.confirm('删除账户', '您真的确认要删除吗？', function (r) {
        if (r) {
            // ajax请求后台进行删除操作，回调函数接受后台的响应result;
            $.ajax({
                type: "post",
                url: "account",
                data: {
                    'actionName': 'deleteAccount',
                    'ids': ids
                },
                success: function (result) {
                    // =1 成功 提示成功、刷新数据表格
                    if (result == 1) {
                        // 提示成功
                        $.messager.alert('删除账户', '删除成功！', 'info');
                        // 刷新数据表格
                        $("#accountData").datagrid("reload");
                    } else {
                        // =0 失败 提示失败
                        $.messager.alert('删除账户', '删除失败！', 'error');
                    }

                }
            });

        }
    });
}

//删除账户end

//分页条件查询begin
function searchAccount() {
    //获取查询条件参数
    var accountName = $("#accountNameSearch").val();
    var accountType = $("#accountTypeSearch").combo("getValue");
    var createTime = $("#createTimeSearch").combo("getValue");
    //通过datagrid中load方法，将条件传给后台
    $('#accountData').datagrid('load', {
        'accountName': accountName,
        'accountType': accountType,
        'createTime': createTime
    });
}

//分页条件查询end
