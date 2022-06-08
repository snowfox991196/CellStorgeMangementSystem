<?php

error_reporting(0);

require 'DBHelper.php';

$arr = null;
$bsk = $_GET["bsk"];
$box = $_GET["box"];
$dbhelper = new DBHelper();

$sql = 'SELECT row,col from boxes where bsk = ' . $bsk . ' and box = ' . $box;
$data = $dbhelper->sqlSelect($sql);
if ($data->num_rows > 0) {
    $datarow = $data->fetch_assoc();
}

$sql2 = 'SELECT pos from stocks where bsk = ' . $bsk . ' and box = ' . $box;
$data2 = $dbhelper->sqlSelect($sql2);
$arr2 = [];
if ($data2->num_rows > 0) {
    while ($row = $data2->fetch_assoc()) {
        array_push($arr2, $row["pos"]);
    }
}
$arr = array('cols' => $datarow['col'], 'rows' => $datarow['row'], 'stock' => $arr2);

echo json_encode($arr);
