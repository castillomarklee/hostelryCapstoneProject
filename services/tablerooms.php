<?php 

	include '../connection/connect.php';

	$data = array();

	session_start();
	$id = $_SESSION['hostelrylogin'];

	$query = mysqli_query($conn, "SELECT q.room_id, q.room_name FROM rooms q, hostelryacc w WHERE q.hostelry_id=w.hostelry_id AND w.hostelry_id='$id'");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>