$(function () {
    loadCustomerServeType()
})

function loadCustomerServeType() {
    $.ajax({
        type: "post",
        url: ctx + "/customer_serve/queryCustomerServeType",
        dataType: "json",
        success: function (data) {
            if (data.code == 200) {
                var datas = data.datas;
                var chart = echarts.init(document.getElementById("main"));
                option = {
                    backgroundColor: '#F7BE81',

                    title: {
                        text: '客户服务分析',
                        left: 'center',
                        top: 20,
                        textStyle: {
                            color: '#58FA58'
                        }
                    },

                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },

                    visualMap: {
                        show: false,
                        min: 80,
                        max: 600,
                        inRange: {
                            colorLightness: [0, 1]
                        }
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: datas.sort(function (a, b) {
                                return a.value - b.value;
                            }),
                            roseType: 'radius',
                            label: {
                                normal: {
                                    textStyle: {
                                        color: 'rgba(255, 255, 255, 0.3)'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 0.3)'
                                    },
                                    smooth: 0.2,
                                    length: 10,
                                    length2: 20
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#c23531',
                                    shadowBlur: 200,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },

                            animationType: 'scale',
                            animationEasing: 'elasticOut',
                            animationDelay: function (idx) {
                                return Math.random() * 200;
                            }
                        }
                    ]
                };
                //设置图表的配置项和数据项
                chart.setOption(option);
            } else {
                $.messager.alert("crm", "暂无数据", "info");
            }
        }
    })
}