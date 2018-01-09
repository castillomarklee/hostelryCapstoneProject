<?php 

	include '../connection/connect.php';

	$hostelry = json_decode(file_get_contents("php://input"));

	$data = array();

	$querycheck = false;

	$id = $hostelry->hostelryidupdate;

	$query = mysqli_query($conn, "SELECT * FROM hostelryacc WHERE hostelry_id='$id'");

	while ($queryarray = mysqli_fetch_assoc($query)) {
		$data[] = $queryarray;
	}

	echo json_encode($data);

 ?>