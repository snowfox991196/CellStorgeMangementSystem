<?php
#csmsdb
#csmsd

class DBHelper
{

    //执行SQL
    function sqlSelect($sqlstring)
    {
        $db_host = "localhost";
        $db_database = "csmsdb";
        $db_username = "csmsdb";
        $db_password = "csmsdb";

        $connection = mysqli_connect($db_host, $db_username, $db_password);//创建链接

        if (!$connection)
            die("数据库连接失败：" . mysqli_error($connection));//输入具体错误信息
        mysqli_select_db($connection, $db_database);//选择数据库

        $result = $connection->query($sqlstring);

        $connection->close();

        return $result;
    }
}