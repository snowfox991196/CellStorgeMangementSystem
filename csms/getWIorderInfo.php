<?php

//error_reporting(0);

require 'DBHelper.php';

$arr = null;
$orderid = $_GET["orderid"];
$dbhelper = new DBHelper();

if ($orderid != null) {
    $sql = "SELECT t.* FROM csmsdb.wi_order t where orderID = '" . $orderid . "'";  #查询
    $data = $dbhelper->sqlSelect($sql);
    $arr = [];
    if ($data->num_rows > 0) {
        while ($row = $data->fetch_assoc()) {
            foreach ($row as $key => $value) {
                $arr = $arr + [$key => $value];
            }
        }
    }
    $sql = "SELECT count(t.serial) FROM csmsdb.stocks t where OrderID like '" . $orderid . "'";  #查询
    $data = $dbhelper->sqlSelect($sql);
    if ($data->num_rows > 0) {
        while ($row = $data->fetch_assoc()) {
            foreach ($row as $key => $value) {
                $arr["stock"] = $value;
            }
        }
    }
}

echo json_encode($arr);

//echo "<form style='display:none;' id='form1' name='form1' method='post' action='/csms/WareInOrderEditor.html'>
//    <input name='orderid' type='text' value='{$orderid}' />
//   </form>
//   <script type='text/javascript'>function load_submit(){document.form1.submit()}load_submit();</script>";
