<?php 

	include '../connection/connect.php';

	$user = json_decode(file_get_contents("php://input"));

	$id = $user->id;

	$data = array();

	$query = mysqli_query($conn, "SELECT * FROM rooms WHERE hostelry_id='$id' AND room_status='available'");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>