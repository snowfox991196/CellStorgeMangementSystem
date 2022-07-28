<?php

error_reporting(0);

require 'DBHelper.php';

$stock = 0;
$plan_stock = 0;
$orderid = $_GET["orderid"];
$dbhelper = new DBHelper();

$sql = "SELECT count(t.serial) FROM csmsdb.stocks t where OrderID like '".$orderid."'";
$data = $dbhelper->sqlSelect($sql);
if ($data->num_rows > 0) {
    $datarow = $data->fetch_assoc();
}
$stock = $datarow['count(t.serial)'];

$sql = "select plan_stock from csmsdb.wi_order t where orderID like '".$orderid."'";
$data = $dbhelper->sqlSelect($sql);
if ($data->num_rows > 0) {
    $datarow = $data->fetch_assoc();
}
$plan_stock = $datarow['plan_stock'];

$left = $plan_stock - $stock;

echo $left;
