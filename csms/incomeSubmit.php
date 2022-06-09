<?php

error_reporting(0);

require 'DBHelper.php';

$dbhelper = new DBHelper();

$orderid = $_POST["OrderID"];
$ordersum = $_POST["OrderSUM"];

echo "ID:".$orderid."&sum:".$ordersum."<br>";

$json_string = $_POST["data_json"];
if(ini_get("magic_quotes_gpc")=="1")
{
    $json_string=stripslashes($json_string);
}
$dataincom = json_decode($json_string);

foreach($dataincom as $value){
    $arr = get_object_vars($value);
    $poss = explode("-",$arr[1]);
    $bsk = $poss[0];
    $box = $poss[1];
    $pos = $poss[2];

    echo $bsk . $box . $pos . "<br>";

    $sql = "INSERT INTO csmsdb.stocks (OrderID, bsk, box, pos, serial) VALUES ('". $orderid ."', ".$bsk.", ".$box.", ".$pos.", '".$arr[2]."')";
    $data = $dbhelper->sqlSelect($sql);

    echo $arr[2]."@".$arr[1]."插入成功<br>";
}


