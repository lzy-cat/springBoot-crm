function formatterGrade(val) {
    if (val == 0) {
        return "根级";
    }
    if (val == 1) {
        return "第一级";
    }
    if (val == 2) {
        return "第二级";
    }
}

function searchModules() {
    $("#dg").datagrid("load", {
        moduleName: $("#moduleName").val(),
        optValue: $("#optValue").val(),
        parentModuleName: $("#parentModuleName").val()
    });
}

function openAddModuleDialog() {
    $("#dlg").dialog("open").dialog("setTitle", "添加模块");
    $("#fm").form("clear");
}

function closeDialog() {
    $("#dlg").dialog("close")
}

//先将上级目录隐藏，给层级框添加一个onchange事件若有父级目录则显示上级目录且加载父级名称
$(function () {
    $("#dlg").dialog({
        onClose: function () {
            initFormData();
        }
    });
    $("#parentMenu").hide();
    $("#grade").combobox({
        onChange: function (grade) {
            if (grade == 1 || grade == 2) {
                $("#parentMenu").show();
            }
            if (grade == 0) {
                $("#parentMenu").hide();
            }
            loadParentModules(grade - 1);
        }
    });
});

function initFormData() {
    $("#fm").form("clear");
}

function loadParentModules(grade) {
    //先将父级清空
    $("#parentId").combobox("clear");
    //根据grade查询父级名称，从后台获取数据，加载父级
    $("#parentId").combobox({
        url: ctx + "/module/queryModulesByGrade?grade=" + grade,

    })
    $("#parentId").combobox("clear");
    //下拉框的值的获取方式，要有valueField、textField
    $("#parentId").combobox({
        url: ctx + "/module/queryModulesByGrade?grade=" + grade,
        valueField: 'id',
        textField: 'moduleName'
    });
}

function saveOrUpdateModule() {
    var id = $("#id").val();
    var url = ctx + "/module/insert";
    if (!isEmpty(id)) {
        url = ctx + "/module/update";
    }
    $("#fm").form("submit", {
        url: url,
        onsubmit: function () {
            return $("#fm").form("invalidate");
        },
        success: function (data) {
            data = JSON.parse(data);
            if (data.code == 200) {
                $.messager.alert("Crm", data.msg, "info");
                searchModules();
                closeDialog();
            } else {
                $.messager.alert("Crm", data.msg, "error");
            }
        }
    })
}

function openModifyModuleDialog() {
    var rows = $("#dg").datagrid("getSelections");
    if (rows.length != 1) {
        $.messager.alert("Crm", "请选择一条数据", "warning");
        return;
    }
    $("#fm").form("load", rows[0]);
    $("#dlg").dialog("open").dialog("setTitle", "修改模块");
}

function deleteModule() {

    var rows = $("#dg").datagrid("getSelections");

    if (rows.length == 0) {
        $.messager.alert("来自crm", "请选中待删除记录!", "info");
        return;
    }

    // ids=1&ids=2&ids=3
    var ids = "id=";
    for (var i = 0; i < rows.length; i++) {
        if (i < rows.length - 1) {
            ids = ids + rows[i].id + "&id=";
        }
        if (i == rows.length - 1) {
            ids = ids + rows[i].id
        }
    }
    $.messager.confirm("来自crm", "确定删除选中的" + rows.length + "条记录?", function (r) {
        if (r) {
            $.ajax({
                type: "post",
                url: ctx + "/module/delete",
                data: ids,
                dataType: "json",
                success: function (data) {
                    $.messager.alert("来自crm", data.msg, "info");
                    if (data.code == 200) {
                        closeDialog();
                        searchModules();
                    }
                }
            });
        }
    });


}