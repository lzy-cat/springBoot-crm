function formatterState(val) {
    if (val == 0) {
        return "未支付";
    }
    if (val == 1) {
        return "已支付";
    }
}

function formatterOp() {
    var href = "javascript:openOrderDetailById()";
    return "<a href=" + href + ">查看详情</a>";
}

//点击订单列表中的查看详情
function openOrderDetailById() {
    var rows = $("#dg").datagrid("getSelections")
    console.log(rows)
    $.ajax({
        type: "post",
        url: ctx + "/customer_order/queryOrderInfoById",
        data: "orderId=" + rows[0].orderNo,
        dataType: "json",
        success: function (data) {
            //填充查看详情中的状态
            if (data.state == 1) {
                data.state = '已支付';
            } else {
                data.state = '未支付';
            }
            //格式化日期，在填充
            data.orderDate = new Date(data.orderDate).format("yyyy-MM-dd hh:mm:ss");
            $("#fm").form("load", data);
        }
    })
    //打开客户订单详情
    $("#dg2").datagrid("load", {
        orderId: rows[0].orderNo
    });
    $("#dlg").dialog("open");
}

function closeOrderDetailDialog() {
    $("#dlg").dialog("close")
}