<?php 

	include '../connection/connect.php';

	$huser = json_decode(file_get_contents("php://input"));

	$hid = $huser->roomphotoid;

	$query = mysqli_query($conn, "DELETE FROM photos WHERE photoid='$hid'");

 ?>