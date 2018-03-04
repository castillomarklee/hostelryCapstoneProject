<?php 

	include '../connection/connect.php';

	$res = json_decode(file_get_contents("php://input"));

	$resid = $res->resid;

	session_start();

	$id = $_SESSION['userlogin'];

	$query = mysqli_query($conn, "UPDATE reservation SET reservation_status='cancelled' WHERE reservation_id='$resid'");

	$getroom = mysqli_query($conn, "SELECT * FROM reservation WHERE reservation_id='$resid'");

	$roomid = "";

	while ($querylist = mysqli_fetch_assoc($getroom)) {
		$room_id = $querylist["room_id"];
	}

	$queryroom = mysqli_query($conn, "UPDATE rooms SET room_status='available' WHERE room_id='$room_id'");

 ?>