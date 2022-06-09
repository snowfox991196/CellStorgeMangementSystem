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
        optbtn1.onclick = function (){
            operations(this)
        }
        optc.appendChild(optbtn1)
        //确认按钮
        var optbtn3 = document.createElement("input")
        optbtn3.type = "button"
        optbtn3.value = "确认"
        optbtn3.name = "btnconfi"
        optbtn3.onclick = function (){
            operations(this)
        }
        optc.appendChild(optbtn3)
        //入库按钮
        var optbtn4 = document.createElement("input")
        optbtn4.type = "button"
        optbtn4.value = "入库"
        optbtn4.name = "btnstartopt"
        optbtn4.onclick = function (){
            operations(this)
        }
        optc.appendChild(optbtn4)
        //删除按钮
        var optbtn2 = document.createElement("input")
        optbtn2.type = "button"
        optbtn2.value = "删除"
        optbtn2.name = "btndelete"
        optbtn2.onclick = function (){
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
    $(".totalPage").attr("value", totalPage)
    information_display()
}

//上一页、下一页，首页和尾页的单击触发事件
function page_click(item) {
    console.log(item)
    //首页
    if ($(item).attr("class") === "firstPage") {
        console.log("firstPage")
        pageNumber = parseInt($('.currentPage').attr("value"));
        $(".currentPage").attr("value", 1)
    }
    //上一页
    else if ($(item).attr("class") === "beforePage") {
        console.log("beforePage")
        pageNumber = parseInt($('.currentPage').attr("value"));
        if (pageNumber > 1) {
            $(".currentPage").attr("value", pageNumber - 1)
            //information_display()
        } else {
            $(".beforePage").attr("disabled", false)
        }
    }
    //下一页
    else if ($(item).attr("class") === "nextPage") {
        console.log("nextPage")
        pageNumber = parseInt($('.currentPage').attr("value"));
        if (pageNumber < totalPage) {
            $(".currentPage").attr("value", pageNumber + 1)
            //information_display2()
        } else {
            $(".nextPage").attr("disabled", false)
        }
    }
    //尾页
    else {
        console.log("lastPage")
        pageNumber = parseInt($('.currentPage').attr("value"));
        $(".currentPage").attr("value", totalPage)
    }
    information_display()
    document.getElementById("jmpto").value = ""
}

function jmppge() {
    var tojmp = document.getElementById("jmpto")
    if (tojmp.value > 0 && tojmp.value <= totalPage) {
        document.getElementById("currentPage").value = tojmp.value
        information_display()
    } else {
        alert("无效的页码！")
    }
}

//创建新入库单代码
function neworder() {
    alert("neworder !")
}

//操作按钮动作函数
//orderid为当前行单号，element.name为操作类型，由按钮属性定义
//orderstat为当前行单据状态。
function operations(element) {
    var orderid = element.parentElement.parentElement.childNodes[0].innerText
    var orderstat = element.parentElement.parentElement.childNodes[6].innerText
    //此处替换操作代码，if-then-elseif-else
    alert(orderid+" -- "+orderstat+" -- " + element.name)
    //刷新显示
    information_display()
}
