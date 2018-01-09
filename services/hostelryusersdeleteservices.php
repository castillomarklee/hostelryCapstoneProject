<?php 

	include '../connection/connect.php';

	$hostelryuser = json_decode(file_get_contents("php://input"));

	$data = array();

	$id = $hostelryuser->id;

	$querysuccess = false;

	$query = mysqli_query($conn, "DELETE FROM rooms WHERE room_id='$id'");

 ?>