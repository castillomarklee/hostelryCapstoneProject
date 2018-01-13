<?php 

	include '../connection/connect.php';

	$data = array();

	$query = mysqli_query($conn, "SELECT q.reservation_id, q.reservation_date, q.reservation_code, q.reservation_status, w.room_name, e.firstname, e.middlename, e.lastname FROM reservation q, rooms w , customer e WHERE q.room_id=w.room_id AND q.customer_id=e.customer_id");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>