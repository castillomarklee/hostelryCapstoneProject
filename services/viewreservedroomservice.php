<?php 

	include '../connection/connect.php';

	$data= array();

	session_start();
	$userid = $_SESSION["userlogin"];

	$query = mysqli_query($conn, "SELECT q.reservation_id, w.room_name, q.reservation_code FROM reservation q, rooms w WHERE q.room_id=w.room_id AND q.customer_id='$userid' AND reservation_status='reserved'");

	while($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>