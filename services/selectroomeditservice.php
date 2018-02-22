<?php 

	include '../connection/connect.php';

	$admin = json_decode(file_get_contents("php://input"));

	$id = $admin->roomadinid;

	$query

 ?>