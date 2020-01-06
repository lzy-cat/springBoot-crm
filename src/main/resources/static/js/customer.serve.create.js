function saveCustomerService() {
    $("#fm").form("submit", {
        url: ctx + "/customer_serve/insert",
        onsubmit: function (params) {
            //将创建人传给后台，在服务分配中需要
            params.createPeople = $.cookie("trueName");
            $("#fm").form("validate");
        },
        success: function (data) {
            data = JSON.parse(data);
            if (data.code == 200) {
                $.messager.alert("Crm系统", data.msg, "info");
                $("#fm").form("clear");
            }
        }
    })
}