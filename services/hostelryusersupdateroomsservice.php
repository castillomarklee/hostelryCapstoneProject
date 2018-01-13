<?php 

	include '../connection/connect.php';

	$hostelry = json_decode(file_get_contents("php://input"));

	$data = array();

	$id = $hostelry->id;

	$query = mysqli_query($conn, "SELECT room_id, room_number, room_name, room_type, room_description, capacity, room_status, room_price FROM rooms WHERE room_id='$id'");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>