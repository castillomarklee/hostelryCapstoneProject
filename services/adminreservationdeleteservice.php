<?php 

	include '../connection/connect.php';

	$admin = json_decode(file_get_contents("php://input"));

	$data = array();

	$id = $admin->reservationid;

	$query = mysqli_query($conn, "DELETE FROM reservation WHERE reservation_id='$id'");

 ?>