<?php 

	include '../connection/connect.php';

	$hostelryroom = json_decode(file_get_contents("php://input"));

	$id = $hostelryroom->hostelryroomsid;

	$data= array();

	$query = mysqli_query($conn, "SELECT room_id, room_number, room_name, room_type, capacity FROM rooms WHERE hostelry_id='$id' AND room_status='available'");

	while ($querytable = mysqli_fetch_assoc($query)) {
		$data[] = $querytable;
	}

	echo json_encode($data);

 ?>