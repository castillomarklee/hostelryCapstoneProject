<?php 

	include '../connection/connect.php';

	$data= array();

	session_start();
	$userid = $_SESSION["userlogin"];

	$date = date("Y-m-d");

	$query = mysqli_query($conn, "UPDATE reservation set reservation_status='cancelled' WHERE room_reservation='$date'");

 ?>