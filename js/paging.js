//入库单据管理页面JS

var totalPage = 1; //一共多少页
var currentPage = 1;//当前页码
var information_lenght = []

//前端获取后台数据并呈现方法
function information_display(page) {
    var frame = document.getElementById("currentPage")
    var disp = document.getElementById("dispgrid")

    var result;     //ajax查询记录
    var gurl = 'getWIOrderlist.php?page=' + frame.value
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
    //清除原数据
    disp.innerText = ""
    for (var i = 0; i < disp.childElementCount; i++) {
        disp.childNodes[i].remove()
    }
    //显示新数据
    var datatable = document.createElement("table")
    datatable.innerHTML = "<tr><th>单号</th><th>日期</th><th>品名</th><th>批号</th><th>寄存人</th><th>计划数量</th>" +
        "<th>单据状态</th><th>操作</th></tr>"
    for (i = 0; i < result.length; i++) {
        var optr = document.createElement("tr")
        var optc
        for (var j = 0; j < result[i].length; j++) {
            optc = document.createElement("td")
            optc.innerText = result[i][j]
            optr.appendChild(optc)
        }
        //添加操作按钮
        optc = document.createElement("td")
        //详细信息按钮
        var optbtn1 = document.createElement("input")
        optbtn1.type = "button"
        optbtn1.value = "详细信息/修改"
        optbtn1.name = "btnmoreinfo"
        optbtn1.onclick = function () {
            operations(this)
        }
        optc.appendChild(optbtn1)
        //确认按钮
        var optbtn3 = document.createElement("input")
        optbtn3.type = "button"
        optbtn3.value = "确认"
        optbtn3.name = "btnconfirm"
        optbtn3.onclick = function () {
            operations(this)
        }
        optc.appendChild(optbtn3)
        //入库按钮
        var optbtn4 = document.createElement("input")
        optbtn4.type = "button"
        optbtn4.value = "入库"
        optbtn4.name = "btnstartopt"
        optbtn4.onclick = function () {
            operations(this)
        }
        optc.appendChild(optbtn4)
        //删除按钮
        var optbtn2 = document.createElement("input")
        optbtn2.type = "button"
        optbtn2.value = "删除"
        optbtn2.name = "btndelete"
        optbtn2.onclick = function () {
            operations(this)
        }
        optc.appendChild(optbtn2)

        //添加格子
        optr.appendChild(optc)
        if (i % 2 === 0) {
            optr.className = "r2css"
        } else {
            optr.className = "r1css"
        }
        //刷训表格
        datatable.appendChild(optr)
    }
    disp.appendChild(datatable)

    //disp.innerHTML = result[1].length
}

//初始化加载，分页首页数据，输入：每页多少条数据，当前页（默认为1）；输出：当前页数据和总页数
window.onload = function () {
    var result;     //ajax查询记录数，计算页数
    var gurl = 'getWIOrderlist.php'
    $.ajax({
        url: gurl,
        type: 'GET',
        data: {},
        async: false,
        success: function (data) {
            result = JSON.parse(data)
        }
    })
    totalPage = Math.ceil(result / 10)
    //初始化页数
    document.getElementById("totalPage").value = totalPage
    var pge = getQueryVariable("page")
    if (pge !== null && pge <= totalPage && pge > 0) {
        currentPage = pge
    } else if (pge === null) {
        currentPage = 1
    } else if(pge > totalPage){
        currentPage = totalPage
    } else if(pge <=0 ){
        currentPage = 1
    }
    document.getElementById("currentPage").value = currentPage
    document.getElementById("firstPage").href = "/csms/WareInOrderList.html?page=1"
    document.getElementById("lastPage").href = "/csms/WareInOrderList.html?page=" + parseInt(totalPage)
    document.getElementById("nextPage").href = "/csms/WareInOrderList.html?page=" + (parseInt(currentPage) + 1)
    document.getElementById("beforePage").href = "/csms/WareInOrderList.html?page=" + (parseInt(currentPage) - 1)
    information_display()
}

//上一页、下一页，首页和尾页的单击触发事件

function jmppge() {
    var tojmp = document.getElementById("jmpto")
    if (tojmp.value > 0 && tojmp.value <= totalPage) {
        document.getElementById("currentPage").value = tojmp.value
        window.location.href = "/csms/WareInOrderList.html?page=" + tojmp.value
    } else {
        alert("无效的页码！")
    }
}

//创建新入库单代码
function neworder() {
    newframe(null)
}

//操作按钮动作函数
//orderid为当前行单号，element.name为操作类型，由按钮属性定义
//orderstat为当前行单据状态。
function operations(element) {
    var orderid = element.parentElement.parentElement.childNodes[0].innerText
    var operation =  element.name
    //此处替换操作代码，if-then-elseif-else
    if (operation === "btnmoreinfo") {
        newframe(orderid)
    } else {
        window.location.href = "/csms/WIOrderOperations.php?orderid=" + orderid + "&operation=" + operation
    }
    //刷新显示
    information_display()
}

function newframe(orderid) {
    var opt = document.getElementById("editor")
    var newframe = document.createElement("iframe")
    if (orderid !== null) {
        newframe.src = "../csms/WareInOrdereditor.html?orderid=" + orderid
    } else {
        newframe.src = "../csms/WareInOrdereditor.html"
    }
    newframe.width = "400px"
    newframe.height = "400px"
    newframe.id = "topFrame"
    opt.appendChild(newframe)
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
