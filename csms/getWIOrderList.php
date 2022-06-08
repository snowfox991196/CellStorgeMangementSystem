<?php

error_reporting(0);

require 'DBHelper.php';

$arr = null;
$page = $_GET["page"];
$dbhelper = new DBHelper();

if ($page != null){
    $sql = 'SELECT t.* FROM csmsdb.wi_order t ORDER BY plandate DESC LIMIT ' . (($page - 1) * 10) . ',10';  #分页查询
    $data = $dbhelper->sqlSelect($sql);
    $arr = [];
    $arr2 = [];
    if ($data->num_rows > 0) {
        while ($row = $data->fetch_assoc()) {
            $arr = [$row["orderID"], $row["plandate"], $row["simple_name"], $row["batch"], $row["user"], $row["plan_stock"], $row["stat"]];
            array_push($arr2, $arr);   #双数组构建JSON
        }
    }

    echo json_encode($arr2);
}else{
    $sql = 'SELECT count(t.orderID) FROM csmsdb.wi_order t ';
    $data = $dbhelper->sqlSelect($sql);
    if ($data->num_rows > 0) {
        $datarow = $data->fetch_assoc();
    }
    echo $datarow['count(t.orderID)'];
}


