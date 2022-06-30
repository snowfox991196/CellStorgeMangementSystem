<?php

//error_reporting(0);

require 'DBHelper.php';

$dbhelper = new DBHelper();

$method = $_POST["method"];
$orderid = $_POST["orderID"];
$simple_name = $_POST["simple_name"];
$batch = $_POST["batch"];
$user = $_POST["user"];
$plan_stock = $_POST["plan_stock"];
$plandate = $_POST["plandate"];
$stock = $_POST["stock"];
$stat = $_POST["stat"];
$others = $_POST["others"];

echo $method . "<br>" . $orderid . "<br>" . $simple_name . "<br>" . $batch . "<br>" . $user
    . "<br>" . $plan_stock . "<br>" . $plandate . "<br>" . $stat . "<br>" . $others . "<br><br>";

$sql = "SELECT t.stat FROM csmsdb.wi_order t WHERE orderID LIKE '".$orderid."';";
$data = $dbhelper->sqlSelect($sql);

if ($data->num_rows >0) {
    while ($row = $data->fetch_assoc()) {
        foreach ($row as $key => $value) {
            $stat_sql = $value;
        }
    }
}else{
    $stat_sql = "0";
}

echo $stat_sql . "<br>";

if ($method == "insert" and $stat_sql == 0) {
    //插入模式，新简单据
    echo "ins mode". "<br>";

    $sql = "INSERT INTO csmsdb.wi_order 
    (orderID, plandate, simple_name, batch, user, plan_stock, stat, others) VALUES 
    ('".$orderid."', '".$plandate."', '".$simple_name."', '".$batch."', '".$user."', ".$plan_stock.", '制单', '".$others."')";

    $data = $dbhelper->sqlSelect($sql);

} elseif ($method == "edit" and $stat_sql == "制单") {
    //修改模式 UPDATE csmsdb.wi_order t SET t.plandate = '2022-06-29', t.simple_name = 'test21', t.batch = '0112243', t.user = '朱璐', t.plan_stock = 50, t.others = 'NA2' WHERE t.orderID LIKE 'CI2022063058186579' ESCAPE '#'
    echo "edt mode". "<br>";

    $sql = "UPDATE csmsdb.wi_order t SET 
                             t.plandate = '".$plandate."', 
                             t.simple_name = '".$simple_name."', 
                             t.batch = '".$batch."', 
                             t.user = '".$user."', 
                             t.plan_stock = ".$plan_stock.", 
                             t.others = '".$others."' 
                         WHERE 
                             t.orderID LIKE '".$orderid."' ESCAPE '#'";

    $data = $dbhelper->sqlSelect($sql);

}else{
    echo "警告：单据状态不正确！". "<br>";
}

echo "<script>history.go(-1)</script>";
