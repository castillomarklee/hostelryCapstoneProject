<?php 

	include '../connection/connect.php';

	$data = array();

	session_start();
	$hid = $_SESSION['hostelrylogin'];

	$query = mysqli_query($conn, "SELECT COUNT(q.reservation_id) AS rescount, q.reservation_status FROM reservation q, rooms w, hostelryacc e WHERE q.room_id=w.room_id AND w.hostelry_id=e.hostelry_id AND e.hostelry_id='$hid' GROUP BY q.reservation_status");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>