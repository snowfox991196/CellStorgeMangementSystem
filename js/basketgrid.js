//入库操作页面JS
window.onload = function (){
    var orderid = getQueryVariable("orderid")
    if (orderid === null){
        alert("请选择单据！")
        history.go(-1)
    }
    //临时变量
    var stock_left = getOrderLeft(orderid);
    var opt_tmp;
    opt_tmp = document.getElementById("disp_orderid")
    opt_tmp.innerText = orderid;
    opt_tmp = document.getElementById("disp_ordersum")
    opt_tmp.innerText = stock_left;
    pageinit(6,5)
}
//初始化页面函数，参数：提篮数，层数，行数，列数
function pageinit(basket, box) {
    //临时变量
    var opt_tmp;
    //添加提篮下拉菜单
    var sele_basket = document.createElement("select")
    sele_basket.id = "basket_selecter"
    sele_basket.onchange = bb_change;
    for (i = 1; i <= basket; i++) {
        opt_tmp = document.createElement("option")
        opt_tmp.value = i.toString();
        opt_tmp.innerText = i.toString();
        sele_basket.appendChild(opt_tmp);
    }
    //添加蹭下拉菜单
    var sele_box = document.createElement("select")
    sele_box.id = "box_selecter"
    sele_box.onchange = bb_change
    for (i = 1; i <= box; i++) {
        opt_tmp = document.createElement("option")
        opt_tmp.value = i.toString();
        opt_tmp.innerText = i.toString();
        sele_box.appendChild(opt_tmp);
    }
    //写入页面div
    document.getElementById("select_basket").appendChild(sele_basket);
    document.getElementById("select_box").appendChild(sele_box);
    disp_gd2(0);
    search_in_db();
}

//初始化冻存盒栅格显示
function gridinit(cols, rows) {
    //
    if (document.getElementById("table_grid") !== null) {
        document.getElementById("table_grid").remove();
    }
    //创建主表格
    var table_grid = document.createElement("table");
    table_grid.setAttribute("border", "1");
    //写入行列，写入单选按钮
    for (var i = 0; i < rows; i++) {
        var tr = document.createElement("tr");
        for (var j = 0; j < cols; j++) {
            var td = document.createElement("td");
            var radio_input = document.createElement("input")

            radio_input.type = 'radio';
            radio_input.name = 'position';
            radio_input.value = (i * cols + j + 1).toString();
            radio_input.onchange = sele;
            td.appendChild(radio_input);
            tr.appendChild(td);
        }
        table_grid.appendChild(tr)
        table_grid.id = "table_grid";
    }
    document.getElementById("position_selecttable").appendChild(table_grid);
    disp_gd2(0);
}

//单选按钮选中事件
function sele() {
    var temp = document.getElementsByName('position');
    for (var i = 0; i < temp.length; i++) {
        if (temp[i].checked) {
            disp_gd2(temp[i].value);
            return temp[i].value;
        }
    }
}

//绑定记录按钮事件
function bind() {
    var pos_basket;
    var pos_box;
    var tbsket = document.getElementById("basket_selecter");
    pos_basket = tbsket.selectedIndex + 1;
    var tbox = document.getElementById("box_selecter");
    pos_box = tbox.selectedIndex + 1;
    var pox = pos_basket + '-' + pos_box + '-' + padding(sele(), 3);
    var tubeid = document.getElementById("bar_input").value;
    var temp2 = document.getElementById("bind_cache");
    var flag = true;

    for (var i = 0; i < temp2.rows.length; i++) {
        if (pox === temp2.rows[i].cells[1].innerHTML) {
            alert("货位号" + pox + "已存在！");
            flag = false;
            break;
        }
        if (tubeid === temp2.rows[i].cells[2].innerHTML) {
            alert("管号" + tubeid + "已存在！");
            flag = false;
            break;
        }
    }

    if (pox === null) {
        alert("请选择货位！");
    }

    if (tubeid === "") {
        alert("请输入或扫描管号！");
    }

    if (pox !== null && tubeid !== "" && flag) {

        var tmp = Number(sele() - 1);
        var temp = document.getElementsByName('position');
        var tr = document.createElement("tr");
        tr.tagName = "cache_document"

        var td1 = document.createElement("td");
        td1.innerText = temp2.rows.length;
        tr.appendChild(td1);
        var td2 = document.createElement("td");
        td2.innerText = pox;
        tr.appendChild(td2);
        var td3 = document.createElement("td");
        td3.innerText = tubeid;
        tr.appendChild(td3);
        var td4 = document.createElement("td");
        var deleteid = "delete_btn_" + (document.getElementById("bind_cache").rows.length);
        td4.innerHTML = '<input type="button" id=' + deleteid + ' onclick="del_cache(id)" value="删除">';
        tr.appendChild(td4);
        temp2.appendChild(tr);
    }
    if (document.getElementById("autonext").checked === true) {
        temp[tmp + 1].checked = true;
        document.getElementById('bar_input').value = "";
        document.getElementById('bar_input').focus();
        sele();
    }

    for (i = 1; i < temp2.rows.length; i++) {
        var tmppos = temp2.rows[i].cells[1].innerText;
        if (tmppos.slice(0, 1) === pos_basket.toString()) {
            if (tmppos.slice(2, 3) === pos_box.toString()) {
                for (j = 0; j < temp.length; j++) {
                    if (temp[j].value === parseInt(tmppos.slice(4, 7)).toString()) {
                        temp[j].parentElement.style.backgroundColor = "yellow";
                    }
                }
            }

        }
    }

    flush_id();
    //disp_gd2(temp[tmp].value)
    //document.getElementById("position_display").innerText = '当前货位：' + padding(temp[tmp].value,3) + '  ';
}

//格式化输出数字函数
function padding(num, length) {
    //这里用slice和substr均可
    return (Array(length).join("0") + num).slice(-length);
}

//刷新页面显示函数
function disp_gd2(position) {
    if (position !== 0) {

        var pos_basket;
        var pos_box;
        var tbsket = document.getElementById("basket_selecter");
        pos_basket = tbsket.selectedIndex + 1;
        var tbox = document.getElementById("box_selecter");
        pos_box = tbox.selectedIndex + 1;
        var position_str = pos_basket + '-' + pos_box + '-' + padding(position, 3);
        document.getElementById("position_display").innerText = '当前货位：' + position_str + '  ';

        var bar_operation = document.createElement("div");
        var bar_input = document.createElement("input");
        bar_input.id = "bar_input"
        var bar_next = document.createElement("button");
        var tr = document.createElement("tr");
        var td = document.createElement("td");
        var table = document.createElement("table");

        tr.appendChild(bar_input);
        td.appendChild(tr);
        tr.appendChild(bar_next);
        td.appendChild(tr);
        table.appendChild(td);
        bar_operation.appendChild(table);

        bar_operation.id = "bar_operation_r";
        bar_next.innerText = '绑定';
        bar_next.onclick = bind;
        if (!document.getElementById("bar_operation_r")) {
            document.getElementById("bar_operation").appendChild(bar_operation);
        }
    } else {
        document.getElementById("position_display").innerText = '请选择货位';
        if (document.getElementById("bar_operation_r")) {
            document.getElementById("bar_operation_r").remove();
        }
    }
    flush_id();
}

//提篮/层变化函数
function bb_change() {
    if (document.getElementById("table_grid") !== null) {
        document.getElementById("table_grid").remove();
    }

    disp_gd2(0);
    search_in_db();

    var tbsket = document.getElementById("basket_selecter");
    var pos_basket = tbsket.selectedIndex + 1;
    var tbox = document.getElementById("box_selecter");
    var pos_box = tbox.selectedIndex + 1;
    var temp2 = document.getElementById("bind_cache");
    var temp = document.getElementsByName('position');

    for (var i = 1; i < temp2.rows.length; i++) {
        var tmppos = temp2.rows[i].cells[1].innerText;
        if (tmppos.slice(0, 1) === pos_basket.toString()) {
            if (tmppos.slice(2, 3) === pos_box.toString()) {
                for (var j = 0; j < temp.length; j++) {
                    if (temp[j].value === parseInt(tmppos.slice(4, 7)).toString()) {
                        temp[j].parentElement.style.backgroundColor = "yellow";
                    }
                }
            }

        }
    }
}

//删除记录按钮事件
function del_cache(row_id) {
    if (window.confirm("确认删除此记录？")) {
        var temp2 = document.getElementById("bind_cache");
        var tr = document.getElementById(row_id).parentElement.parentElement
        var dcol = tr.getElementsByTagName("td")[1].innerHTML;
        var temp = document.getElementsByName('position');
        var pos_basket;
        var pos_box;
        var tbsket = document.getElementById("basket_selecter");
        pos_basket = tbsket.selectedIndex + 1;
        var tbox = document.getElementById("box_selecter");
        pos_box = tbox.selectedIndex + 1;
        if (dcol.slice(0, 1) === pos_basket.toString()) {
            if (dcol.slice(2, 3) === pos_box.toString()) {
                for (j = 0; j < temp.length; j++) {
                    if (temp[j].value === parseInt(dcol.slice(4, 7)).toString()) {
                        temp[j].parentElement.style.backgroundColor = "white";
                    }
                }
            }

        }
        temp2.deleteRow(tr.rowIndex);
        flush_id();
    }
}

//刷新序号
function flush_id() {
    var temp2 = document.getElementById("bind_cache");
    for (var i = 1; i < temp2.rows.length; i++) {
        temp2.rows[i].cells[0].innerText = i;
    }
}

//刷新货位颜色函数

//查询数据库段
function search_in_db() {

    var pos_basket;
    var pos_box;
    var tbsket = document.getElementById("basket_selecter");
    pos_basket = tbsket.selectedIndex + 1;
    var tbox = document.getElementById("box_selecter");
    pos_box = tbox.selectedIndex + 1;

    var ret = getColRow(pos_basket, pos_box);
    gridinit(ret.cols, ret.rows);

    var tmp = document.getElementsByName("position")
    for (var i = 0; i < tmp.length; i++) {
        for (var j = 0; j < ret.stock.length; j++) {
            if (tmp[i].value === ret.stock[j].toString()) {
                tmp[i].parentElement.style.backgroundColor = "blue";
            }
        }
    }

}

//提交，查询数据库段
function submit_f() {
    //alert("building...1")
    var opt_orderid = document.getElementById("disp_orderid")
    var opt_ordersum = document.getElementById("disp_ordersum")

    var datatosend = {};
    var tabletmp = document.getElementById("bind_cache");
    var rows = tabletmp.rows.length

    var flag = false;

    if (rows !== (parseInt(opt_ordersum.innerText) + 1)) {
        alert("请注意：入库数量不等于单据数量！")
    }

    for (var i = 1; i < rows; i++) {
        var cells = tabletmp.rows[i].cells.length;
        for (j = 0; j < cells; j++) {
            if (!datatosend[i]) {
                datatosend[i] = {};
            }
            datatosend[i][j] = tabletmp.rows[i].cells[j].innerText;
        }
    }

    var datajson = JSON.stringify(datatosend);
    var params = {
        "OrderID": opt_orderid.innerText,
        "OrderSUM": opt_ordersum.innerText,
        "data_json": datajson.toString()
    };

    var temp = document.createElement("form");
    temp.action = "./incomeSubmit.php";
    temp.method = "post";
    temp.style.display = "none";

    for (var x in params) {
        var opt = document.createElement("textarea");
        opt.name = x;
        opt.value = params[x];
        temp.appendChild(opt);
    }
    document.body.appendChild(temp);
    temp.submit();
}

//取消
function cancle_btn_f() {
    history.go(0);
}

//ajax查询
function getColRow(bsk, box) {
    var result;
    var gurl = 'getgrid.php?bsk=' + bsk + '&box=' + box;
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

function getOrderLeft(orderid){
    var result;
    var gurl = 'getOrderLeft.php?orderid=' + orderid
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
