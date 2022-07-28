var simplename
var orderid
var page
var totalpage

window.onload = function () {
    //读取GET参数
    simplename = getQueryVariable('simplename')
    orderid = getQueryVariable('orderid')
    page = getQueryVariable('page')
    console.log(simplename, orderid, page)
    document.getElementById('fiter_name').value = simplename
    document.getElementById('fiter_orderid').value = orderid

    //ajax查询记录-总数
    var gurl = 'getInnerStock.php?'
    if (simplename !== null) {
        gurl = gurl + 'simplename=' + simplename + '&'
    }
    if (orderid !== null) {
        gurl = gurl + 'orderid=' + orderid + '&'
    }
    $.ajax({
        url: gurl,
        type: 'GET',
        data: {},
        async: false,
        success: function (data) {
            totalpage = Math.ceil(JSON.parse(data) / 10)
        }
    })
    console.log(totalpage)
    //处理分页页数
    if (page !== null) {
        if (page > totalpage) {
            page = totalpage
        }
    } else {
        page = 1
    }
    var result;     //ajax查询记录-详细
    gurl = 'getInnerStock.php?page=' + page + '&'
    if (simplename !== null) {
        gurl = gurl + 'simplename=' + simplename + '&'
    }
    if (orderid !== null) {
        gurl = gurl + 'orderid=' + orderid + '&'
    }

    $.ajax({
        url: gurl,
        type: 'GET',
        data: {},
        async: false,
        success: function (data) {
            result = JSON.parse(data)
        }
    })
    console.log(result)

    //写入表格
    var optable = document.getElementById('maintable')
    for (var i = 0; i < result.length; i++) {
        var optr = document.createElement('tr')
        if (i % 2 === 0) {  //奇偶背景色不同显示
            optr.className = "r2css"
        } else {
            optr.className = "r1css"
        }
        for (var j = 0; j < result[i].length; j++) {
            var optd = document.createElement('td')
            optd.innerText = result[i][j]
            optr.appendChild(optd)
        }
        optable.appendChild(optr)
    }
    //显示当前页、总页数
    var optbtn
    optbtn=document.getElementById('currentPage')
    optbtn.innerText = page
    optbtn=document.getElementById('totalPage')
    optbtn.innerText = totalpage
}

//获取HTTP-GET参数
function getQueryVariable(variable) {
    var query = window.location.search.substring(1)
    var vars = query.split("&")
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=")
        if (pair[0] === variable) {
            return pair[1]
        }
    }
    return null
}

//跳转页面，查询也在此处刷新
function flushpage() {
    var tmporderid = document.getElementById('fiter_orderid').value
    var tmpname = document.getElementById('fiter_name').value
    var tmppage = document.getElementById('jmpto').value
    var curl = "/csms/StockTable.html?"
    if (tmpname !== ''){
        curl = curl + 'simplename=' + tmpname + '&'
    }
    if (tmporderid !== ''){
        curl = curl + 'orderid=' + tmporderid + '&'
    }
    if (tmppage === ''){
        tmppage = page
        curl = curl + 'page=' + tmppage
    }else {
        curl = curl + 'page=' + tmppage
    }
    window.location.href = curl
}
