<?php 

	include '../connection/connect.php';

	$data = array();

	session_start();

	$hostelry_idsession = $_SESSION['hostelrylogin'];

	$hostelry_idquery = mysqli_query($conn, "SELECT hostelry_id FROM hostelryacc WHERE hostelry_username='$hostelry_idsession'");

	$hostelry_id = "";

	while($querylist = mysqli_fetch_assoc($hostelry_idquery)) {
		$hostelry_id = $querylist['hostelry_id'];
	}

	$query = mysqli_query($conn, "SELECT room_id, room_number, room_name, room_type, room_description, capacity, room_status, room_price FROM rooms WHERE hostelry_id='$hostelry_id'");

	while ($querytable = mysqli_fetch_assoc($query)) {
		$data[] = $querytable;
	}

	echo json_encode($data);

 ?>