function searchPayOut() {
    var outName = $("#outNameSearch").val();
    var outType = $("#outTypeSearch").combo("getVaule");
    var createTime = $("#createTimeSearch").combo("getVaule");
    //将参数传到后台
    $("#payOutData").datagrid('load', {
        'outName': outName,
        'outType': outType,
        'createTime': createTime
    });
}

/*添加支出*/
function openAddDialog() {
    //重置表单
    $("#addForm").form("reset");
    //加载支出类型
    $("#outType").combobox({
        url: 'payOut?actionName=queryPayOutType',
        valueFile

    });
}
