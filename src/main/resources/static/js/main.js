function openTab(text, url, iconCls) {
    if ($("#tabs").tabs("exists", text)) {
        $("#tabs").tabs("select", text);
    } else {
        var content = "<iframe frameborder=0 scrolling='auto' style='width:100%;height:100%' src='" + url + "'></iframe>";
        $("#tabs").tabs("add", {
            title: text,
            iconCls: iconCls,
            closable: true,
            content: content
        });
    }
}

//弹出修改表单
function openPasswordModifyDialog() {
    $("#dlg").dialog("open");
}

//修改密码
function modifyPassword() {
    $("#fm").form("submit", {
        url: ctx + "/user/updatePwd",
        onsubmit: function () {
            return $("#fm").form("validate");
        },
        success: function (data) {
            data = JSON.parse(data);

            if (data.code == 200) {
                $.messager.alert("crm系统", "修改成功,1s后退出系统后请重新登录", "info");
                setTimeout(function () {
                    $.removeCookie("userName");
                    $.removeCookie("trueName");
                    $.removeCookie("id");
                    window.location.href = "index";
                }, 1000)
            } else {
                $.messager.alert("crm系统", data.msg, "error");
            }
        }
    })
}

//关闭修改框
function closePasswordModifyDialog() {
    $("#dlg").dialog("close");
}

//退出
function logout() {
    $.messager.confirm("crm系统", "您确定退出系统吗", function (r) {
        if (r) {
            setTimeout(function () {
                $.removeCookie("userName");
                $.removeCookie("trueName");
                window.location.href = "index";
            }, 1000);
        }
    });

}




