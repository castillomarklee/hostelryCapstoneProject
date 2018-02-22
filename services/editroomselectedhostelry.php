<?php 

	include '../connection/connect.php';

	$admin = json_decode(file_get_contents("php://input"));

	$data = array();

	$id = $admin->hostelryselected;

	$query = mysqli_query($conn, "SELECT q.room_id, q.room_number, q.room_name, q.room_type, q.room_description, q.capacity, q.room_status, q.room_price FROM rooms q, hostelryacc w WHERE q.hostelry_id=w.hostelry_id AND q.hostelry_id='$id' AND q.room_status='available'");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);
 ?>