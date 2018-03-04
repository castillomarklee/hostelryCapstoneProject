<?php 

	include '../connection/connect.php';

	$data = array();

	session_start();
	$hosid = $_SESSION['hostelrylogin'];

	$query = mysqli_query($conn, "SELECT q.reservation_id, q.reservation_date, q.reservation_code, q.reservation_status, w.room_name, e.firstname, e.middlename, e.lastname FROM reservation q, rooms w , customer e, hostelryacc t WHERE q.room_id=w.room_id AND q.customer_id=e.customer_id AND w.hostelry_id=t.hostelry_id AND t.hostelry_id='$hosid'");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>