# CellStorgeMangementSystem
web management system for Liquid N2 cell storge system<br>
CSMS系统设计与实现<br>
给细胞库（液氮罐）用的。算是个挑战，做到哪算哪吧。<br>
系统环境：xampp。大概可以兼容Ubuntu的Apache2+mariadb+php。<br>
主要应用技术：HTML+JS构建页面，其中应用部分JQuery；PHP做后端，接收前端传入参数，操作数据库并给返回；数据库MariaDB，基本等同于MySQL。<br>
目前设计分出库单据，出库操作，入库单据，入库操作四大基础模块，其他查询暂时通过数据库访问来直接查询，之后可做交互式查询页面。<br>
入库操作设计为冻存盒图示，选择单据后，扫描冻存管条码入库。冻存盒现有库存和submit操作为ajax异步操作。<br>
入库单据为页面在线编辑，使用iframe框架搭建嵌套网页编辑单据详细信息。iframe使用ajax异步加载单据信息数据。<br>
出库单据预计采用与入库单据类似结构，但指定待出库细胞种类，为出库操作做校验用。<br>
出库操作管理计划采用选择单据后直接扫码出库，扫描条码校验细胞种类，种类不符则出库失败需重新绑定。<br>

