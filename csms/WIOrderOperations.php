<?php

error_reporting(0);

require 'DBHelper.php';

$dbhelper = new DBHelper();

$orderid = $_GET["orderid"];
$ordersum = $_GET["operation"];

$sql = "SELECT count(t.orderID) FROM csmsdb.wi_order t where orderID = '".$orderid."'";
$data = $dbhelper->sqlSelect($sql);

if ($data->num_rows > 0) {
    $datarow = $data->fetch_assoc();
}
echo $datarow['count(t.orderID)'];

