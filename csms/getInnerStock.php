<?php

error_reporting(0);

require 'DBHelper.php';

$arr = null;
$page = $_GET["page"];
$simplename = $_GET["simplename"];
$orderid = $_GET["orderid"];
$dbhelper = new DBHelper();

if ($page != null) {
    $sql = "SELECT t.* FROM csmsdb.instock t where simple_name like '%"
        .$simplename."%' and t.orderID like '%".$orderid."%' LIMIT "
        . (($page - 1) * 10) . ",10";  #分页查询

    $data = $dbhelper->sqlSelect($sql);
    $arr = [];
    $arr2 = [];
    if ($data->num_rows > 0) {
        while ($row = $data->fetch_assoc()) {
            $arr = [$row["orderID"], $row["simple_name"], $row["batch"], $row["user"], $row["stat"], $row["stock"]];
            array_push($arr2, $arr);   #双数组构建JSON
        }
    }

    echo json_encode($arr2);
} else {
    $sql = "select count(t.simple_name) from instock t where simple_name like '%"
        .$simplename."%' and t.orderID like '%".$orderid."%'";
    $data = $dbhelper->sqlSelect($sql);
    if ($data->num_rows > 0) {
        $datarow = $data->fetch_assoc();
    }
    echo $datarow['count(t.simple_name)'];
}


