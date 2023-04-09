
//右2 表格移动js
$(function () {
    $('.scrollDiv').liMarquee({
        direction: 'up',
        scrollamount: 30,
        runshort: false
    });
});

// 左上仪表盘a1
(function () {
    // 1.实例化对象
    a1chartData = $("#websocketUrl").val();

    var myChart = echarts.init(document.querySelector(".a1 .chart"));
    // 2.指定配置项和数据
    option = {
        tooltip: {
            trigger: 'item'
        },
        series: [{
            min: 0,
            max: 10,
            radius: '100%',
            type: 'gauge',
            axisLine: {
                lineStyle: {
                    width: 20,
                    color: [
                        [0.3, '#67e0e3'],
                        [0.7, '#37a2da'],
                        [1, 'rgba(245,114,108,1)'],

                    ]
                }
            },
            pointer: {
                itemStyle: {
                    color: 'auto'
                }
            },
            axisTick: {
                distance: -30,
                length: 6,
                lineStyle: {
                    color: '#fff',
                    width: 2
                }
            },
            splitLine: {
                distance: -30,
                length: 25,
                lineStyle: {
                    color: '#fff',
                    width: 3
                }
            },
            axisLabel: {
                color: 'auto',
                distance: 5,
                fontSize: 10
            },
            detail: {
                valueAnimation: true,
                formatter: '{value}%',
                color: 'auto',
                fontSize: 23
            },
            data: [{
                'name': '',
                'value': a1chartData
            }]

        }]
    };
    option && myChart.setOption(option);
})();



// 左上折线图a2
(function () {

    var myChart = echarts.init(document.querySelector(".a2 .chart"));

    var year = [];

    var importedCase = [];

    var localConfirmadd = [];

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/china-twomonths-add/list",

        dataType: 'json',
        cache: false,

        success: function (data) {


            for (var i = 0; i<= data.length -1; i++) {
                year.push(data[i].yeardate.substring(0, 10));
                importedCase.push(data[i].importedCase);
                localConfirmadd.push(data[i].localConfirmadd);

            }
            var index = 20;
            var option = {
                xAxis: [{
                    type: 'category',
                    data: function () {
                        var list = [];
                        for (var i = 0; i < index; i++) {
                            list.push(year[i]);
                        }
                        return list;
                    }(),
                    splitLine: {show: false},//去除网格线

                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            color: "#4c9bfd",//左边线的颜色
                            width: '1.5'//坐标线的宽度
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: "#4c9bfd",//坐标值得具体的颜色

                        }
                    }
                }],
                yAxis: [{
                    type: 'value',

                    splitLine: {show: false},//去除网格线
                    splitArea: {show: false},//保留网格区域
                    axisLine: {
                        show: false,//去除轴线
                        lineStyle: {
                            type: 'solid',
                            color: "#4c9bfd",
                            width: '1'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: "#4c9bfd",
                        }
                    }

                },
                    {
                        type: 'value',
                        max:120,
                        splitLine: {show: false},//去除网格线
                        splitArea: {show: false},//保留网格区域
                        axisLine: {
                            show: false,//去除轴线
                            lineStyle: {
                                type: 'solid',
                                color: "#4c9bfd",
                                width: '1'
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: "#4c9bfd",
                            }
                        }

                    }
                ],
                tooltip: {
                    trigger: 'axis',
                    textStyle: {
                        fontSize: 15,
                        color: '#fff'
                    }
                },
                grid: {
                    top: '5%',
                    left: '2%',
                    right: '4%',
                    bottom: '1%',
                    containLabel: true
                },

                legend: {
                    data: ['境外新增确诊人数', '本土新增确诊人数'],
                    textStyle: {//图例文字的样式
                        color: "rgba(255,255,255,.5)",
                        fontSize: 12
                    }
                },
                series: [
                    {
                        // stack: 'Total',
                        name: '境外新增确诊人数',
                        data: function () {
                            var list = [];

                            for (var i = 0; i < index; i++) {
                                list.push(importedCase[i]);
                            }
                            return list;
                        }(),
                        yAxisIndex: '1',
                        symbol: 'none',
                        type: 'line',
                        color: '#ff0000'
                    },
                    {
                        name: '本土新增确诊人数',
                        data: function () {
                            var list = [];

                            for (var i = 0; i < index; i++) {
                                list.push(localConfirmadd[i]);
                            }
                            return list;
                        }(),

                        symbol: 'none',
                        type: 'bar',
                        color: '#59EEF2'

                    }
                ]
            };

            setInterval(function () {
                if (index == year.length - 1) {
                    index = 0;
                }
                var data = option.series[0].data;
                data.shift();
                data.push(importedCase[index]);
                var data1 = option.series[1].data;
                data1.shift();
                data1.push(localConfirmadd[index]);
                option.xAxis[0].data.shift();
                option.xAxis[0].data.push(year[index++]);
                myChart.setOption(option);
            }, 700);
            myChart.setOption(option);
            // 4.让图表随屏幕自适应
            window.addEventListener('resize', function () {
                myChart.resize();
            })


        },
        error: function (e) {

        }
    });


})();




// var totaldata = [];
function getAreaWithVariousData(){
var areaNameAndCityRate = [];
var gdpAndConfirmed =[];
var studentsInSchoolAndConfirmed =[];
var areaName = [];
var doctor =[];
var areaWithVariousData = {};
$.ajax({
    type: "POST",
    contentType: "application/json",
    url: "/area-with-various-data/list",
    async:false,
    dataType: 'json',
    cache: false,
    success: function (data) {
        // console.log(data);
        for (var i = 0; i<= data.length -1; i++) {
            areaNameAndCityRate.push({"name":data[i].areaname,"value":data[i].cityrate});
            gdpAndConfirmed.push({"name":data[i].areaname,"value":data[i].gdp});
            studentsInSchoolAndConfirmed.push({"name":data[i].areaname,"value":data[i].students});
            areaName.push(data[i].areaname);
            doctor.push(data[i].doctor);
        }
        areaWithVariousData["areaNameAndCityRate"] = areaNameAndCityRate;
        areaWithVariousData["gdpAndConfirmed"] = gdpAndConfirmed;
        areaWithVariousData["studentsInSchoolAndConfirmed"] = studentsInSchoolAndConfirmed;
        areaWithVariousData["areaName"] = areaName;
        areaWithVariousData["doctor"] = doctor;
        // console.log(areaWithVariousData);

    },
    error: function (e) {

    }
});
return areaWithVariousData;
}

function getnameAndConfirmeddata() {

    var nameAndConfirmed = [];


    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/area-theday/list",
        async:false,
        dataType: 'json',
        cache: false,

        success: function (data) {

            for (var i = 0; i<= data.length -1; i++) {
                nameAndConfirmed.push({"name":data[i].area,"value":data[i].confirmed});
                // console.log(data[i].area);
            }
        },
        error: function (e) {

        }
    });


    return nameAndConfirmed;

}

areaWithVariousData = getAreaWithVariousData();
nameAndConfirmed = getnameAndConfirmeddata();
areaNameAndCityRate = areaWithVariousData["areaNameAndCityRate"];
// console.log(areaNameAndCityRate);

function getMapdata() {

    var yearData = [];
    var maplist = [];
    var mapData = [];
    var areaname = [];
    var allMapData = {};

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/area-history-confirm/list",
        async:false,
        dataType: 'json',
        cache: false,

        success: function (data) {

            for (var i = data.length -1; i>= 0 ; i--) {
                yearData.push(data[i].yeardate.substring(0, 10));
                delete data[i].yeardate;
                for (var key in data[i]){

                    maplist.push(data[i][key]);
                }
                mapData.push(maplist);
                maplist = [];
            }
            for (var key in data[1]){
                delete data[1].yeardate;
                areaname.push(key);
            }
            allMapData["yearData"] = yearData;
            allMapData["mapData"] = mapData;
            allMapData["areaname"] = areaname;

        },
        error: function (e) {

        }
    });


    return allMapData;

}


// 各省确诊比例饼图
(function () {

    var myChart = echarts.init(document.querySelector(".a5 .chart"));

    var areadata = [];
    var hubaiAndOtherData = [];

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/area-theday/list",
        dataType: 'json',
        cache: false,

        success: function (data) {

            for (var i = 0; i<= data.length -1; i++) {
                nameAndConfirmed.push({"name":data[i].area,"value":data[i].confirmed});
                if(data[i].area == "台湾" || data[i].area == "香港" || data[i].area == "湖北" || data[i].area == "上海" || data[i].area == "吉林"){
                    hubaiAndOtherData.push({"name":data[i].area,"value":data[i].confirmed});
                }else {
                    areadata.push({"name":data[i].area,"value":data[i].confirmed});
                }
            }
            option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },

                series: [
                    {
                        name: '省份',
                        type: 'pie',
                        selectedMode: 'single',
                        radius: [0, '40%'],

                        label: {
                            show: false,
                            position: 'inner',

                        },
                        labelLine: {
                            show: false
                        },
                        data: hubaiAndOtherData,
                        color: ['rgba(89,238,242,0.8)', '#37a2da','rgba(245,114,108,1)'],
                    },
                    {
                        name: '除湖北、香港外占比',
                        type: 'pie',
                        bottom: 0,
                        startAngle: 135,
                        radius: ['55%', '75%'],
                        center: ['50%', '52%'],

                        labelLine: {
                            normal: {
                                show: true,
                                length: 20,
                                length2: 20
                            }
                        },
                        label: {
                            show: true,
                            textStyle: {
                                fontSize: 11    //文字的字体大小
                            },
                        },

                        avoidLabelOverlap: true,
                        data: areadata,
                        color: [
                            '#8B0000', '#CD0000', '#EE0000', '#FF0000',
                            '#CD3700', '#EE4000', '#FF4500', '#EE5C42', '#FF6347',
                            '#EE9A00', '#FFA500',
                            '#EEB422', '#EEEE00', '#FFFF00',
                            '#32CD32', '#00FF00', '#7CFC00',
                            '#00FF7F', '#7FFFD4', '#00FFFF', '#40E0D0', '#00CED1',
                            '#AFEEEE', '#87CEFA', '#87CEEB', '#00BFFF', '#1E90FF', '#4169E1', '#8470FF', '#7B68EE', '#6A5ACD', '#483D8B',
                            '#9B30FF', '#912CEE', '#7D26CD', '#551A8B'

                        ],
                    }
                ]
            };

            myChart.setOption(option);
            //让图表随窗口大小自适应调整
            window.addEventListener('resize', function () {
                myChart.resize();
            });
        },
        error: function (e) {

        }
    });


    //各省份确诊占比

})();



//右上城镇化率与确诊数量关系
function ShowCityRareRelationship() {

    var totaldata = [];

    var count = 0;
    var countdata = 0;
    for (var i = 0; i<= nameAndConfirmed.length -1; i++) {
        for (var j = 0; j<= areaNameAndCityRate.length -1; j++) {
            if (nameAndConfirmed[i].name == areaNameAndCityRate[j].name){
                count +=1;
                countdata += parseInt(nameAndConfirmed[i].value);
                totaldata.push({"name":nameAndConfirmed[i].name,"value":[parseInt(nameAndConfirmed[i].value),areaNameAndCityRate[j].value]});
            }
        }
    }
    var average_x = parseFloat(countdata/count).toFixed(2);

    var myChart = echarts.init(document.querySelector(".main2"));
    myChart.clear();
    var option = {
        title: {
            text: "各省城镇化率与确诊人数关系散点图",
            textStyle: {
                color: 'white'
            },
            left: '30%',
            top: '5%'

        },

        grid: {
            top: "20%",
            bottom: "15%",
            left: 0,
            right: "5%",
            containLabel: true,
            show: false

        },
        tooltip: {
            show: false,
            trigger: 'item'
        },
        axisPointer: {
            show: true,
            snap: true,
            lineStyle: {
                type: 'dashed'
            },
            label: {
                show: true,
                margin: 6,
                backgroundColor: '#556',
                textStyle: {
                    color: '#fff'
                }
            },
        },
        xAxis: {
            name: "累计确诊人数",
            nameLocation: 'center',
            nameTextStyle: {
                color: "white",
                padding: [5, 10, 0,]
            },
            axisLabel: {
                color: "white",
                fontSize: 8
            },
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'white'
                }
            }

        },
        yAxis: {
            name: "城镇化率（%）",
            nameTextStyle: {
                color: "white",
                fontSize: 12,
                padding: [10, 10, 0, 50]
            },
            nameLocation: "end",
            axisLabel: {
                color: "white",
                fontSize: 8
            },
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'white'
                }
            }


        },
        dataZoom: [
            {
                type: 'slider',
                show: true,
                xAxisIndex: [0],
                start: 0,
                end: 100
            },
            {
                type: 'slider',
                show: true,
                yAxisIndex: [0],
                left: '93%',
                start: 0,
                end: 100
            },
            {
                type: 'inside',
                xAxisIndex: [0],
                start: 0,
                end: 100
            },
            {
                type: 'inside',
                yAxisIndex: [0],
                start: 0,
                end: 100
            }
        ],
        series: [{
            symbolSize: 5,
            data: totaldata,
            markLine: {
                lineStyle: {
                    type: 'solid'
                },
                data: [
                    {type: 'average', name: '平均值'},
                    {xAxis: average_x}
                ]
            },
            label: {
                show: true,
                position: 'right',
                formatter: '{b}',
                color: 'rgba(89,238,242,0.8)',
            },
            type: 'effectScatter',
        }]
    };

    myChart.setOption(option);

    //让图表随窗口大小自适应调整
    window.addEventListener('resize', function () {
        myChart.resize();
    });

    // })
};
// 城镇化率与确诊数量关系
(function () {

    var totaldata = [];

    var count = 0;
    var countdata = 0;
    for (var i = 0; i<= nameAndConfirmed.length -1; i++) {
        for (var j = 0; j<= areaNameAndCityRate.length -1; j++) {
            if (nameAndConfirmed[i].name == areaNameAndCityRate[j].name){
                count +=1;
                countdata += parseInt(nameAndConfirmed[i].value);
                totaldata.push({"name":nameAndConfirmed[i].name,"value":[parseInt(nameAndConfirmed[i].value),areaNameAndCityRate[j].value]});
            }
        }
    }
    var average_x = parseFloat(countdata/count).toFixed(2);

    var myChart = echarts.init(document.querySelector(".bar2 .chart"));
    myChart.clear();
    var option = {

        grid: {
            top: '15%',
            left: '4%',
            right: '4%',
            bottom: '8%',
            containLabel: true,
            show: false
        },
        tooltip: {
            show: false,
            trigger: 'item'
        },
        axisPointer: {
            show: true,
            snap: true,
            lineStyle: {
                type: 'dashed'
            },
            label: {
                show: true,
                margin: 6,
                backgroundColor: '#556',
                textStyle: {
                    color: '#fff'
                }
            },
        },
        xAxis: {
            name: "累计确诊人数",
            nameLocation: 'center',
            nameTextStyle: {
                color: "rgba(255,255,255,.7)",
                padding: [5, 10, 0,]
            },
            axisLabel: {
                color: "#4c9bfd",
                fontSize: 8
            },
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#4c9bfd'
                }
            }

        },
        yAxis: {
            min: 30,
            name: "城镇化率（%）",
            nameTextStyle: {
                color: "rgba(255,255,255,.7)",
                fontSize: 12,
                padding: [10, 10, 0, 50]
            },
            nameLocation: "end",
            axisLabel: {
                color: "#4c9bfd",
                fontSize: 8
            },
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#4c9bfd'
                }
            }


        },
        dataZoom: [

            {
                type: 'inside',
                xAxisIndex: [0],
                start: 0,
                end: 100
            },
            {
                type: 'inside',
                yAxisIndex: [0],
                start: 0,
                end: 100
            }
        ],
        series: [{
            symbolSize: 5,
            data: totaldata,
            label: {
                show: true,
                position: 'right',
                formatter: '{b}',
                color: 'rgba(89,238,242,0.8)',
            },
            type: 'effectScatter',
        }]
    };

    myChart.setOption(option);

    //让图表随窗口大小自适应调整
    window.addEventListener('resize', function () {
        myChart.resize();
    });

    //})


    ShowCityRareRelationship();


})();


//城镇化与确诊感染关系
(function () {

    var totaldata = [];

    var count = 0;
    var countdata = 0;
    for (var i = 0; i<= nameAndConfirmed.length -1; i++) {
        for (var j = 0; j<= areaNameAndCityRate.length -1; j++) {
            if (nameAndConfirmed[i].name == areaNameAndCityRate[j].name){
                count +=1;
                countdata += parseInt(nameAndConfirmed[i].value);
                totaldata.push({"name":nameAndConfirmed[i].name,"value":[parseInt(nameAndConfirmed[i].value),areaNameAndCityRate[j].value]});
            }
        }
    }
    var average_x = parseFloat(countdata/count).toFixed(2);

    var myChart = echarts.init(document.querySelector(".main2"));
    myChart.clear();
    var option = {
        title: {
            text: "各省城镇化率与确诊人数关系散点图",
            textStyle: {
                color: 'white'
            },
            left: '30%',
            top: '5%'

        },

        grid: {
            top: "20%",
            bottom: "15%",
            left: 0,
            right: "5%",
            containLabel: true,
            show: false

        },
        tooltip: {
            show: false,
            trigger: 'item'
        },
        axisPointer: {
            show: true,
            snap: true,
            lineStyle: {
                type: 'dashed'
            },
            label: {
                show: true,
                margin: 6,
                backgroundColor: '#556',
                textStyle: {
                    color: '#fff'
                }
            },
        },
        xAxis: {
            name: "累计确诊人数",
            nameLocation: 'center',
            nameTextStyle: {
                color: "white",
                padding: [5, 10, 0,]
            },
            axisLabel: {
                color: "white",
                fontSize: 8
            },
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'white'
                }
            }

        },
        yAxis: {
            name: "城镇化率（%）",
            nameTextStyle: {
                color: "white",
                fontSize: 12,
                padding: [10, 10, 0, 50]
            },
            nameLocation: "end",
            axisLabel: {
                color: "white",
                fontSize: 8
            },
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'white'
                }
            }


        },
        dataZoom: [
            {
                type: 'slider',
                show: true,
                xAxisIndex: [0],
                start: 0,
                end: 100
            },
            {
                type: 'slider',
                show: true,
                yAxisIndex: [0],
                left: '93%',
                start: 0,
                end: 100
            },
            {
                type: 'inside',
                xAxisIndex: [0],
                start: 0,
                end: 100
            },
            {
                type: 'inside',
                yAxisIndex: [0],
                start: 0,
                end: 100
            }
        ],
        series: [{
            symbolSize: 5,
            data: totaldata,
            markLine: {
                lineStyle: {
                    type: 'solid'
                },
                data: [
                    {type: 'average', name: '平均值'},
                    {xAxis: average_x}
                ]
            },
            label: {
                show: true,
                position: 'right',
                formatter: '{b}',
                color: 'rgba(89,238,242,0.8)',
            },
            type: 'effectScatter',
        }]
    };

    myChart.setOption(option);

    //让图表随窗口大小自适应调整
    window.addEventListener('resize', function () {
        myChart.resize();
    });
})();

//gdp与确诊人数
function showRL_GDP() {

    var totaldata = [];
    var gdpAndConfirmed = areaWithVariousData["gdpAndConfirmed"];
    var count = 0;
    var countdata = 0;
    for (var i = 0; i<= nameAndConfirmed.length -1; i++) {
        for (var j = 0; j<= gdpAndConfirmed.length -1; j++) {
            if (nameAndConfirmed[i].name == gdpAndConfirmed[j].name){
                count +=1;
                countdata += parseInt(nameAndConfirmed[i].value);
                totaldata.push({"name":nameAndConfirmed[i].name,"value":[parseInt(nameAndConfirmed[i].value),gdpAndConfirmed[j].value]});
            }
        }
    }
    var average_x = parseFloat(countdata/count).toFixed(2);

    var myChart = echarts.init(document.querySelector(".main2"));
    myChart.clear();
    var option = {
        title: {
            text: "各省GDP与确诊人数关系散点图",
            textStyle: {
                color: 'white'
            },
            left: '30%',
            top: '5%'

        },

        grid: {
            top: "20%",
            bottom: "15%",
            left: 0,
            right: "5%",
            containLabel: true,
            show: false

        },
        tooltip: {
            show: false,
            trigger: 'item'
        },
        axisPointer: {
            show: true,
            snap: true,
            lineStyle: {
                type: 'dashed'
            },
            label: {
                show: true,
                margin: 6,
                backgroundColor: 'rgba(89,238,242,0.8)',
                textStyle: {
                    color: '#fff'
                }
            },
        },
        xAxis: {
            name: "累计确诊人数",
            nameLocation: 'center',
            nameTextStyle: {
                color: "white",
                padding: [5, 10, 0,]
            },
            axisLabel: {
                color: "white",
                fontSize: 8
            },
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'white'
                }
            }

        },
        yAxis: {
            name: "GDP(亿元 数据来源-国家统计局)",
            nameTextStyle: {
                color: "white",
                fontSize: 12,
                padding: [10, 10, 0, 110]
            },
            nameLocation: "end",
            axisLabel: {
                color: "white",
                fontSize: 8
            },
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'white'
                }
            }


        },
        dataZoom: [
            {
                type: 'slider',
                show: true,
                xAxisIndex: [0],
                start: 0,
                end: 100
            },
            {
                type: 'slider',
                show: true,
                yAxisIndex: [0],
                left: '93%',
                start: 0,
                end: 100
            },
            {
                type: 'inside',
                xAxisIndex: [0],
                start: 0,
                end: 100
            },
            {
                type: 'inside',
                yAxisIndex: [0],
                start: 0,
                end: 100
            }
        ],
        series: [{
            symbolSize: 5,
            data: totaldata,
            markLine: {
                lineStyle: {
                    type: 'solid'
                },
                data: [
                    {type: 'average', name: '平均值'},
                    {xAxis: average_x}
                ]
            },
            label: {
                show: true,
                position: 'right',
                formatter: '{b}',
                color: 'rgba(89,238,242,1)'
            },
            type: 'effectScatter'
        }]
    };

    myChart.setOption(option);

    //让图表随窗口大小自适应调整
    window.addEventListener('resize', function () {
        myChart.resize();
    });

}

//与在校学生人数关系
function showRL_StudentsInSchool() {
    var totaldata = [];
    var studentsInSchoolAndConfirmed = areaWithVariousData["studentsInSchoolAndConfirmed"];
    var count = 0;
    var countdata = 0;
    for (var i = 0; i<= nameAndConfirmed.length -1; i++) {
        for (var j = 0; j<= studentsInSchoolAndConfirmed.length -1; j++) {
            if (nameAndConfirmed[i].name == studentsInSchoolAndConfirmed[j].name){
                count +=1;
                countdata += parseInt(nameAndConfirmed[i].value);
                totaldata.push({"name":nameAndConfirmed[i].name,"value":[parseInt(nameAndConfirmed[i].value),studentsInSchoolAndConfirmed[j].value]});
            }
        }
    }
    var average_x = parseFloat(countdata/count).toFixed(2);

    var myChart = echarts.init(document.querySelector(".main2"));
    myChart.clear();
    var option = {
        title: {
            text: "各省在校学生人数与确诊人数关系散点图",
            textStyle: {
                color: 'white'
            },
            left: '30%',
            top: '5%'

        },

        grid: {
            top: "20%",
            bottom: "15%",
            left: 0,
            right: "5%",
            containLabel: true,
            show: false

        },
        tooltip: {
            show: false,
            trigger: 'item'
        },
        axisPointer: {
            show: true,
            snap: true,
            lineStyle: {
                type: 'dashed'
            },
            label: {
                show: true,
                margin: 6,
                backgroundColor: '#556',
                textStyle: {
                    color: '#fff'
                }
            },
        },
        xAxis: {
            name: "累计确诊人数",
            nameLocation: 'center',
            nameTextStyle: {
                color: "white",
                padding: [5, 10, 0,]
            },
            axisLabel: {
                color: "white",
                fontSize: 8
            },
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'white'
                }
            }

        },
        yAxis: {
            name: "在校学生人数",
            nameTextStyle: {
                color: "white",
                fontSize: 12,
                padding: [10, 10, 0, 110]
            },
            nameLocation: "end",
            axisLabel: {
                color: "white",
                fontSize: 8
            },
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'white'
                }
            }


        },
        dataZoom: [
            {
                type: 'slider',
                show: true,
                xAxisIndex: [0],
                start: 0,
                end: 100
            },
            {
                type: 'slider',
                show: true,
                yAxisIndex: [0],
                left: '93%',
                start: 0,
                end: 100
            },
            {
                type: 'inside',
                xAxisIndex: [0],
                start: 0,
                end: 100
            },
            {
                type: 'inside',
                yAxisIndex: [0],
                start: 0,
                end: 100
            }
        ],
        series: [{
            symbolSize: 5,
            data: totaldata,

            markLine: {
                lineStyle: {
                    type: 'solid'
                },
                data: [
                    {type: 'average', name: '平均值'},
                    {xAxis: average_x}
                ]
            },
            label: {
                show: true,
                position: 'right',
                formatter: '{b}',
                color: 'rgba(89,238,242,0.8)',
            },
            type: 'effectScatter',
        }]
    };

    myChart.setOption(option);

    //让图表随窗口大小自适应调整
    window.addEventListener('resize', function () {
        myChart.resize();
    });
}

//卫生水平
function showMedical() {
    var xdata = areaWithVariousData["areaName"];
    var data = areaWithVariousData["doctor"];
    var myChart = echarts.init(document.querySelector(".main2"));
    myChart.clear();
    var option = {
        title: {
            text: "各省卫生水平",
            textStyle: {
                color: 'white'
            },
            left: '40%',
            top: '5%'

        },
        color: ['rgba(89,238,242,1)'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '0%',
            right: '4%',
            bottom: '5%',
            containLabel: true
        },
        xAxis: [
            {

                type: 'category',
                data: xdata,
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    color: 'white',
                    interval: 0
                }
            }
        ],
        yAxis: [
            {
                name: "每千人拥有卫生技术人员（人）",
                nameTextStyle: {
                    color: 'white',
                    padding: [10, 10, 0, 130]
                },
                type: 'value',
                axisLabel: {
                    color: 'white'
                }
            }
        ],
        series: [
            {
                name: '每千人拥有卫生技术人员',
                type: 'bar',
                barWidth: '60%',
                barCategoryGap: '1%',
                data: data
            }
        ]
    };
    myChart.setOption(option);
    //让图表随窗口大小自适应调整
    window.addEventListener('resize', function () {
        myChart.resize();
    });
}

//窗口点击按钮
(function () {
    $("#education").click(function () {
        showRL_StudentsInSchool()
    });

    $("#citypopulationrate").click(function () {
        ShowCityRareRelationship();
    });
    $("#gdp").click(function () {
        showRL_GDP();
    });
    $("#doctor").click(function () {
        showMedical();
    });
})();

allMapData = getMapdata();
//中间地图
class MapComponent {


    constructor(container) {
        this.container = container || null;
        this.province = allMapData["areaname"];
        this.data = allMapData["mapData"];
        this.dateChange = allMapData["yearData"];
        this.option = null;
        this.myChart = null;
    }

    init() {
        this.myChart = echarts.init(this.container);
        this.option = {
            baseOption: {
                timeline: {
                    axisType: 'category',
                    autoPlay: true,
                    playInterval: 100,
                    symbolSize: 0,
                    left: '5%',
                    right: '5%',
                    bottom: '0%',
                    width: '90%',
                    lineStyle: {
                        color: "white"
                    },
                    label: {
                        color: "white"
                    },
                    controlStyle: {
                        position: 'center'
                    },
                    data: this.dateChange,
                    tooltip: {
                        show: true,
                        formatter: this.dateChange
                    },
                },
                tooltip: {
                    show: true,
                    formatter: function (params) {
                        // console.log(params);
                        return params.name + '：' + params.data['value']
                    },
                },
                visualMap: {
                    type: 'piecewise',

                    pieces: [
                        {
                            min: 10000,
                            color: 'rgba(245,114,108,0.8)'
                        },
                        {
                            min: 2000,
                            max: 9999,
                            color: 'rgba(89,238,242,0.8)'
                        },
                        {
                            min: 1000,
                            max: 1999,
                            color: 'rgba(128,241,244,0.9)'
                        },
                        {
                            min: 500,
                            max: 999,
                            color: 'rgba(186,247,248,0.8)'
                        },
                        {
                            min: 100,
                            max: 499,
                            color: 'rgba(210,250,251,0.9)'
                        },
                        {
                            min: 10,
                            max: 99,
                            color: 'rgba(233,253,253,0.8)'
                        },
                        {
                            min: 1,
                            max: 9,
                            color: 'rgba(255,255,255,0.9)'
                        }
                    ],
                    orient: 'vertical',
                    itemWidth: 25,
                    itemHeight: 15,
                    showLabel: true,
                    seriesIndex: [0],

                    textStyle: {
                        color: '#7B93A7'
                    },
                    bottom: '10%',
                    left: "5%",
                },
                grid: {
                    right: '5%',
                    top: '20%',
                    bottom: '10%',
                    width: '20%'
                },
                xAxis: {
                    show: false
                },
                yAxis: {
                    show: false
                },
                geo: {
                    map: 'china',
                    right: '5%',
                    left: '5%',
                    label: {
                        emphasis: {
                            show: false,
                        }
                    },
                    itemStyle: {
                        normal: {
                            //地图省份的颜色
                            areaColor: 'rgba(20,41,87,0.5)',
                            borderColor: '#0e94ea'

                        },
                        emphasis: {
                            areaColor: 'rgba(11,28,45,0.2)'
                        }
                    }
                },
                series: [{
                    name: 'mapSer',
                    type: 'map',
                    map: 'china',
                    roam: false,
                    geoIndex: 0,
                    label: {
                        show: false,
                    },
                },
                ],
            },
            animationDurationUpdate: 3000,
            animationEasingUpdate: 'quinticInOut',
            options: []
        };
        // for(var i=0;i<dateChange.length;i++){
        //    this.option.options.push({
        //         title:{
        //             text:dateChange[i]
        //         }
        //     })
        // }
        for (let n = 0; n < 365; n++) {
            var res = [];
            for (let j = 0; j < this.data[n].length; j++) {
                res.push({
                    name: this.province[j],
                    value: this.data[n][j],
                    date: this.dateChange[n],
                });
            }
            res.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 6);
            res.sort(function (a, b) {
                return a.value - b.value;
            });
            var res1 = [];
            var res2 = [];
            for (t = 0; t < 10; t++) {
                res1[t] = res[res.length - 1 - t].name;
                res2[t] = res[res.length - 1 - t].value;
            }
            this.option.options.push({
                title: {
                    text: this.dateChange[n],
                    textStyle: {
                        color: "white"
                    },
                    bottom: "10%",
                    left: "20%"
                },
                series: [{
                    type: 'map',
                    data: res
                }]
            });
        }
        this.myChart.setOption(this.option);
        console.log(this.myChart);
    }
}

let mapNode = new MapComponent(document.querySelector(".map .chart"));
mapNode.init();

function getChinaTwoMonthsData(){
    var yeardate = [];
    var confirm =[];
    var dead =[];
    var heal = [];
    var nowConfirm =[];
    var chinaTwoMonthsData = {};
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/china-twomonths/list",
        async:false,
        dataType: 'json',
        cache: false,
        success: function (data) {
            // console.log(data);
            for (var i = 0; i<= data.length -1; i++) {
                yeardate.push(data[i].yeardate.substring(0, 10));
                confirm.push(data[i]["confirm"]);
                dead.push(data[i].dead);
                heal.push(data[i].heal);
                nowConfirm.push(data[i].nowConfirm);
            }
            chinaTwoMonthsData["yeardate"] = yeardate;
            chinaTwoMonthsData["confirm"] = confirm;
            chinaTwoMonthsData["dead"] = dead;
            chinaTwoMonthsData["heal"] = heal;
            chinaTwoMonthsData["nowConfirm"] = nowConfirm;
            // console.log(chinaTwoMonthsData);

        },
        error: function (e) {

        }
    });
    return chinaTwoMonthsData;
}

chinaTwoMonthsData = getChinaTwoMonthsData();


function getAreaHistoryConfirmAddData() {

    var year = [];
    var confirmAddlist = [];
    var confirmAddData = [];
    var areaname = [];
    var AreaHistoryConfirmAddData = {};

    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/area-history-confirm-add/list",
        async:false,
        dataType: 'json',
        cache: false,

        success: function (data) {

            for (var i = data.length -1; i>= 0 ; i--) {
                year.push(data[i].yeardate.substring(0, 10));
                delete data[i].yeardate;
                for (var key in data[i]){

                    confirmAddlist.push(data[i][key]);
                }
                confirmAddData.push(confirmAddlist);
                confirmAddlist = [];
            }
            for (var key in data[1]){
                delete data[1].yeardate;
                areaname.push(key);
            }
            AreaHistoryConfirmAddData["year"] = year;
            AreaHistoryConfirmAddData["confirmAddData"] = confirmAddData;
            AreaHistoryConfirmAddData["areaname"] = areaname;

        },
        error: function (e) {

        }
    });


    return AreaHistoryConfirmAddData;

}

areaHistoryConfirmAddData =getAreaHistoryConfirmAddData();



//正下疫情人数变化曲线
(function () {
    var myChart = echarts.init(document.querySelector(".linecountry .chart"));
    var yeardate = chinaTwoMonthsData["yeardate"];

    var confirm = chinaTwoMonthsData["confirm"];

    var dead = chinaTwoMonthsData["dead"];

    var heal = chinaTwoMonthsData["heal"];

    var nowConfirm = chinaTwoMonthsData["nowConfirm"];

    var yearConfirmAdd = areaHistoryConfirmAddData["year"];

    var areanameConfirmAdd = areaHistoryConfirmAddData["areaname"];

    var confirmAddlist1 = areaHistoryConfirmAddData["confirmAddData"];


    var confirmAddlist = confirmAddlist1[0].map(function (col, i) {
        return confirmAddlist1.map(function (row) {
            return row[i];
        })
    });
    var option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            top: "0%",
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: 12
            },
            data: ['累计确诊数', '治愈总人数', '死亡总人数', '现存确诊']
        },
        grid: {
            left: '10',
            top: "30",
            right: '10',
            bottom: '10',
            containLabel: true
        },

        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: yeardate,
            axisLabel: {
                color: "#4c9bfd",//文本颜色,
                fontSize: 8
            }
        },
        yAxis: [{
            type: 'value',


    axisLabel: {
        color: "#4c9bfd"//文本颜色
    },
    axisLine: {
        show: false//去除轴线
    },
    splitLine: {
        lineStyle: "#012f4a" //分割线颜色
    }
},
    {
        type: 'value',

        axisLabel: {
            color: "#4c9bfd"//文本颜色
        },
        axisLine: {
            show: false//去除轴线
        },
        splitLine: {
            lineStyle: "#012f4a" //分割线颜色
        }
    }
],
    series: [
        {
            name: '累计确诊数',
            type: 'line',
            smooth: true,
            data: confirm,
            color: 'rgba(245,114,108,1)'
        },

        {
            name: '治愈总人数',
            type: 'line',
            smooth: true,
            color:      'rgba(89,238,242,1)',
            data: heal
        },
        {
            name: '死亡总人数',
            type: 'line',
            smooth: true,
            color: 'rgba(139,137,137,0.8)',
            yAxisIndex: '1',
            data: dead
        },
        {
            name: '现存确诊',
            type: 'line',
            smooth: true,
            yAxisIndex: '1',
            color: '#37a2da',
            data: nowConfirm
        }

    ]
};

    myChart.setOption(option);
    //让图表跟随屏幕在自动的去适应
    window.addEventListener('resize', function () {
        myChart.resize();
    });

    $(".linecountry h2").on("click", "a", function () {
        //console.log($(this).index());
        //点击a之后根据a的索引号找到对应的yearData的相关对象
        //console.log(yearData[$(this).index()]);


        function showGraph(graphname) {

            //显示
            if (graphname == "全国疫情人数变化曲线") {
                //console.log(totalCountChange);
                myChart.clear();

                var option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        top: "0%",
                        textStyle: {
                            color: "rgba(255,255,255,.5)",
                            fontSize: 12
                        },
                        data: ['累计确诊数', '治愈总人数', '死亡总人数', '现存确诊']
                    },
                    grid: {
                        left: '10',
                        top: "30",
                        right: '10',
                        bottom: '10',
                        containLabel: true
                    },

                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: yeardate,
                        axisLabel: {
                            color: "#4c9bfd",//文本颜色,
                            fontSize: 8
                        }
                    },
                    yAxis: [{
                        type: 'value',


                axisLabel: {
                    color: "#4c9bfd"//文本颜色
                },
                axisLine: {
                    show: false//去除轴线
                },
                splitLine: {
                    lineStyle: "#012f4a" //分割线颜色
                }
            },
                {
                    type: 'value',

                    axisLabel: {
                        color: "#4c9bfd"//文本颜色
                    },
                    axisLine: {
                        show: false//去除轴线
                    },
                    splitLine: {
                        lineStyle: "#012f4a" //分割线颜色
                    }
                }
            ],
                series: [
                    {
                        name: '累计确诊数',
                        type: 'line',
                        smooth: true,
                        data: confirm,
                        color: 'rgba(255,0,0,0.8)'
                    },

                    {
                        name: '治愈总人数',
                        type: 'line',
                        smooth: true,
                        color: 'MediumSpringGreen',
                        data: heal
                    },
                    {
                        name: '死亡总人数',
                        type: 'line',
                        smooth: true,
                        color: 'rgba(139,137,137,0.8)',
                        yAxisIndex: '1',
                        data: dead
                    },
                    {
                        name: '现存确诊',
                        type: 'line',
                        smooth: true,
                        yAxisIndex: '1',
                        color: 'MediumOrchid',
                        data: nowConfirm
                    }

                ]
            };

                myChart.setOption(option);
                //让图表跟随屏幕在自动的去适应
                window.addEventListener('resize', function () {
                    myChart.resize();
                });
            } else {
                myChart.clear();//清理画布，重绘堆叠条形图

                var option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        },
                        textStyle: {
                            fontSize: 10
                        }
                    },
                    legend: {
                        data: areanameConfirmAdd,
                        textStyle: {
                            color: 'white'
                        },
                        orient: 'horizontal',
                        itemWidth: 2
                    },
                    dataZoom: [
                        {
                            show: true,
                            start: 0,
                            end: 100,
                            height: 10,
                            bottom: 0
                        },
                        {
                            type: 'inside',
                            start: 0,
                            end: 100
                        },
                        {
                            show: true,
                            yAxisIndex: 0,
                            filterMode: 'empty',
                            top: 0,
                            width: 10,
                            height: '70%',
                            showDataShadow: false,
                            left: '99%'
                        }
                    ],
                    grid: {

                        left: '0%',
                        right: '0',
                        bottom: '0%',
                        containLabel: true
                    },

                    yAxis: {
                        type: 'value',
                        splitLine: {
                            show: false
                        },
                        axisLabel: {
                            color: 'white'
                        }
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            color: 'white'
                        },
                        splitLine: {
                            show: false
                        },
                        data: yearConfirmAdd,
                    },
                    series: [
                        {
                            name: areanameConfirmAdd[0],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[0],
                        },
                        {
                            name: areanameConfirmAdd[1],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[1],
                        },
                        {
                            name: areanameConfirmAdd[2],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[2],
                        },
                        {
                            name: areanameConfirmAdd[3],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[3],
                        },
                        {
                            name: areanameConfirmAdd[4],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[4],
                        },
                        {
                            name: areanameConfirmAdd[5],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[5],
                        },
                        {
                            name: areanameConfirmAdd[6],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[6],
                        },
                        {
                            name: areanameConfirmAdd[7],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[7],
                        },
                        {
                            name: areanameConfirmAdd[8],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[8],
                        },
                        {
                            name: areanameConfirmAdd[9],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[9],
                        },
                        {
                            name: areanameConfirmAdd[10],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[10],
                        },
                        {
                            name: areanameConfirmAdd[11],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[11],
                        },
                        {
                            name: areanameConfirmAdd[12],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[12],
                        },
                        {
                            name: areanameConfirmAdd[13],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[13],
                        },
                        {
                            name: areanameConfirmAdd[14],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[14],
                        },
                        {
                            name: areanameConfirmAdd[15],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[15],
                        },
                        {
                            name: areanameConfirmAdd[16],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[16],
                        },
                        {
                            name: areanameConfirmAdd[17],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[17],
                        },
                        {
                            name: areanameConfirmAdd[18],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[18],
                        },
                        {
                            name: areanameConfirmAdd[19],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[19],
                        },
                        {
                            name: areanameConfirmAdd[20],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[20],
                        },
                        {
                            name: areanameConfirmAdd[21],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[21],
                        },
                        {
                            name: areanameConfirmAdd[22],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[22],
                        },
                        {
                            name: areanameConfirmAdd[23],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[23],
                        },
                        {
                            name: areanameConfirmAdd[24],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[24],
                        },
                        {
                            name: areanameConfirmAdd[25],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[25],
                        },
                        {
                            name: areanameConfirmAdd[26],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[26],
                        },
                        {
                            name: areanameConfirmAdd[27],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[27],
                        },
                        {
                            name: areanameConfirmAdd[28],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[28],
                        },
                        {
                            name: areanameConfirmAdd[29],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[29],
                        },
                        {
                            name: areanameConfirmAdd[30],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[30],
                        },
                        {
                            name: areanameConfirmAdd[31],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[31],
                        },
                        {
                            name: areanameConfirmAdd[32],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[32],
                        },
                        {
                            name: areanameConfirmAdd[33],
                            type: 'bar',
                            stack: '总量',

                            data: confirmAddlist[33],
                        }
                    ]
                };

                myChart.setOption(option);

            }
        };
        showGraph($(this).text());//根据点击状况重新渲染图表

    })


})();


function getNewsValueData(){
    var newsData = [];
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/news-value/list",
        async:false,
        dataType: 'json',
        cache: false,
        success: function (data) {
            // console.log(data);
            for (var i = 0; i<= data.length -1; i++) {
                newsData.push({"name":data[i].name,"value":data[i].value});
            }
        },
        error: function (e) {

        }
    });
    return newsData;
}

newsData = getNewsValueData();
// 左上词云图a7
(function () {

    var colors = [ '#59eef2',
        '#80f1f4', '#9ff4f6','#2fd1d5','#d5a9a0',
        '#d2fafb', '#ffffff', '#87CEEB','#8cffff','#4c68ff'];
    // var maskImage = new Image();
    // maskImage.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAGUExURUxpcQMAAJgaH0QAAAABdFJOUwBA5thmAAABz0lEQVR42u3cQVLDUBADUen+l2bDhgUph+h7xqL7AKN62UFiS0RERERERERERERERESPzD8LHh1UfG7JXvtE8cl69lqA8af17LUY493t8Lkg463t8Lm04+p29toJxrXt8Lkzjgvb9ozEjkqc/lzOOV5uh8+ddbyYDp877fh12lMQOyqxhyR2VGIPSeyoxJ6SZCH2lMTRaY9B7Oi2xySOSuwpiaPTfjbEh67d7vCZawMQR495zvG93QKx5yTR7UGIk9vugDh7bBDiQYiBLJO0QAwEyBkJkGUQAwHyHyEGAgQIECBAgAABAgQIf48A4b8oQJ7u6IHw/cg2R893iGpx9EDU4uiBqMWxUtICGfyV6QrHOkkLZO638XscmySTD5BscmyRzD0sts+xQTL5IOJGx7Rk8mHdrY5BieK1OGYkUoVEx2px3CrR4VocN0l0Sy2O4xLdWAnjJEWqkGikFkecosFKGEmK1CHRhkoYAYpUIdGqWhwafN/UDolUIdHWWhz59zk+QiJ1SKQOidQhkTokUoVEz6nFoRbHgbeZ75NIHRKpQyJ1SKQOidQhkTokArJLInVIpA6JgOySqAQilUhaICoJCBERERERERERERG93Rf5Gjg4VlYsigAAAABJRU5ErkJggg==";
    var optionFour = {
        tooltip: {
            show: true
        },
        series: [{
            name: '关键字占比',
            type: 'wordCloud',
            // drawOutOfBound:true,

    gridSize: 1,

    sizeRange: [8, 28],//文字范围

        rotationRange: [-45, 90],
        rotationStep: 45,
        textRotation: [0, 45, 90, -45],
        //形状

    // maskImage: maskImage,
        textStyle: {
        normal: {
            color: function () {
                return colors[parseInt(Math.random() * 10)];
            }
        },
        //悬停上去的字体的阴影设置
        emphasis: {
            shadowBlur: 10,
                shadowColor: '#1ce7ee'
        }
    },
    data: newsData
}]
};
    var myChart = echarts.init(document.querySelector('.a7 .chart'));
    // maskImage.onload = function(){myChart.setOption(optionFour)};

    myChart.setOption(optionFour);
    //让图表跟随屏幕在自动的去适应
    window.addEventListener('resize', function () {
        myChart.resize();
    });

})();

