<?php 

	include '../connection/connect.php';

	$user = json_decode(file_get_contents("php://input"));

	$hosid = $user->hosid;

	$data = array();

	$query = mysqli_query($conn, "SELECT * FROM hostelryacc WHERE hostelry_id='$hosid'");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>