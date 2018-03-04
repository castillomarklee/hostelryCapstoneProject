<?php 

	include '../connection/connect.php';

	$hostelryfunction = json_decode(file_get_contents("php://input"));

	$querysuccess = false;

	$data = array();

	$id = $hostelryfunction->hostelrytableid; 

	$roomid = array();

	$query = mysqli_query($conn, "DELETE FROM hostelryacc WHERE hostelry_id='$id'");

	$roomdelete = mysqli_query($conn, "DELETE FROM rooms WHERE hostelry_id='$id'");

	$delete = mysqli_query($conn, "SELECT hostelry_id, hostelry_name, hostelry_type, hostelry_description, hostelry_username, hostelry_password FROM hostelryacc WHERE hostelry_id='$id'");

	while($tableupdatequery = mysqli_fetch_assoc($delete)) {
		$data[] = $tableupdatequery;
	}

	echo json_encode($data);

 ?>