$.ajax({
    url: "http://wthrcdn.etouch.cn/weather_mini",
    type: "GET",
    dataType: 'json',
    data: {
        city: (returnCitySN.cname).split('省')[1]
    }, //(returnCitySN.cname).split('省')[1]：获取所在的市
    error: function () {
        alert('网络错误');
    },
    success: function (res) {
        console.log(res);
        // console.log(res.week);
        // document.getElementById("weatherImg").innerHTML=type_img;
        var city = res.data.city; //所在城市
        var maxTemperature = res.data.forecast[0].high; //最高温度
        var minTemperature = res.data.forecast[0].low; //最低温度
        var weather = minTemperature.split(' ')[1] + '~' + maxTemperature.split(' ')[1];
        var type = res.data.forecast[0].type; //天气状态
        document.getElementById("tiqnqi").innerHTML = type;
        document.getElementById("wendu").innerHTML = weather;
        document.getElementById("diqu").innerHTML = city;
        if (type == "阴") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/阴.png');
        } else if (type == "多云") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/weather_img01.png');
        } else if (type == "小雨") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/小雨.png');
        } else if (type == "暴雪") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/暴雪.png');
        } else if (type == "暴雨") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/暴雨.png');
        } else if (type == "暴雨转大暴雨") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/暴雨转大暴雨.png');
        } else if (type == "大雪") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/大雪.png');
        } else if (type == "大雪转暴雪") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/大雪转暴雪.png');
        } else if (type == "大雨") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/大雨.png');
        } else if (type == "大雨转暴雨") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/大雨转暴雨.png');
        } else if (type == "冻雨") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/冻雨.png');
        } else if (type == "浮尘") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/浮尘.png');
        } else if (type == "雷阵雨") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/雷阵雨.png');
        } else if (type == "雷阵雨加冰雹") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/雷阵雨加冰雹.png');
        } else if (type == "霾") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/霾.png');
        } else if (type == "强沙尘暴") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/强沙尘暴.png');
        } else if (type == "晴") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/晴.png');
        } else if (type == "沙尘暴") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/沙尘暴.png');
        } else if (type == "特大暴雨") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/特大暴雨.png');
        } else if (type == "雾") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/雾.png');
        } else if (type == "小雪") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/小雪.png');
        } else if (type == "小雪转中雪") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/小雪转中雪.png');
        } else if (type == "小雨转中雨") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/小雨转中雨.png');
        } else if (type == "扬沙") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/扬沙.png');
        } else if (type == "雨加雪") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/雨加雪.png');
        } else if (type == "阵雪") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/阵雪.png');
        } else if (type == "阵雨") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/阵雨.png');
        } else if (type == "中雪") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/中雪.png');
        } else if (type == "中雪转大雪") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/中雪转大雪.png');
        } else if (type == "中雨") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/中雨.png');
        } else if (type == "中雨转大雨") {
            document.getElementById("weatherImg").setAttribute('src', '/risk/img/中雨转大雨.png');
        }

    }
});

