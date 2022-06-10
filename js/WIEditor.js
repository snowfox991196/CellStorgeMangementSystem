var method = ""      //页面新增、修改标志，“edit”编辑/“insert”新增
//取消按钮
function canclef() {
    parent.window.document.getElementById("topFrame").remove()
}
//页面初始化
window.onload = function() {
    var oid = getQueryVariable("orderid")
    var opt = document.getElementById("orderID")
    if (oid !== false){
        method = "edit"
        opt.value = oid
        //添加查询单据详情代码，AJAX
        var data = getOrderInfo(oid)
        for (var key in data){
            //console.log(key)
            opt = document.getElementById(key)
            if (opt !== null){
                opt.value = data[key]
            }
        }
    }else{
        method = "insert"
        var d = new Date()
        var s = d.getTime()
        opt = document.getElementById("orderID")
        opt.value = "CI" + dateFormat("YYYYmmdd",d)+ s.toString().substring(5)
        var opt2 = document.getElementById("plandate")
        opt2.value = dateFormat("YYYY-mm-dd",d)
    }
}
//获取HTTP-GET参数
function getQueryVariable(variable) {
    var query = window.location.search.substring(1)
    var vars = query.split("&")
    for (var i = 0;i<vars.length;i++){
        var pair = vars[i].split("=")
        if (pair[0] === variable){
            return pair[1]
        }
    }
    return false
}

//格式化输出时间日期
function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
    }
    return fmt;
}

//ajax查询
function getOrderInfo(orderid) {
    var result;
    var gurl = 'getWIorderInfo.php?orderid=' + orderid;
    $.ajax({
        url: gurl,
        type: 'GET',
        data: {},
        async: false,
        success: function (data) {
            result = JSON.parse(data);
        }
    })
    return result;
}

function submitf() {
    alert("submit")
    parent.window.document.getElementById("topFrame").remove()
}

