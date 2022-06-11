<?php

//error_reporting(0);

require 'DBHelper.php';

$dbhelper = new DBHelper();

$orderid = $_GET["orderid"];
$operation = $_GET["operation"];

$sql = "SELECT stat FROM csmsdb.wi_order t where orderID = '" . $orderid . "'";
$data = $dbhelper->sqlSelect($sql);

if ($data->num_rows > 0) {
    $datarow = $data->fetch_assoc();
}
echo "OrderID: " . $orderid . "<br>";
echo "stat: " . $datarow['stat'] . "<br>";
echo "operation: " . $operation . "<br>";

if ($datarow['stat'] == "制单" and $operation == "btnconfirm") {

    echo "正在设置..." . "<br>";
    $sql = "UPDATE csmsdb.wi_order t SET t.stat = '正在入库' WHERE t.orderID LIKE '" . $orderid . "' ESCAPE '#'";
    $data = $dbhelper->sqlSelect($sql);
    echo "设置完成！" . "<br>";
    echo "<script>history.go(-1)</script>";

} elseif ($datarow['stat'] == "制单" and $operation == "btndelete") {

    echo "正在删除..." . "<br>";
    $sql = "DELETE FROM csmsdb.wi_order WHERE orderID LIKE '" . $orderid . "' ESCAPE '#'";
    $data = $dbhelper->sqlSelect($sql);
    echo "删除成功！" . "<br>";
    echo "<script>history.go(-1)</script>";

}elseif ($datarow['stat'] == "正在入库" and $operation == "btnstartopt") {

    echo "<script>window.location.href = '/csms/WareInOperation.html?orderid=".$orderid."'</script>";

} else {

    echo "<script>alert('当前单据状态不正确！')</script>";
    echo "<script>history.go(-1)</script>";

}
