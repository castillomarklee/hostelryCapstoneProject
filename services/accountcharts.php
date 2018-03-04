<?php 

	include '../connection/connect.php';

	$data = array();

	$query = mysqli_query($conn, "SELECT COUNT(q.reservation_id) AS hcount, w.hostelry_name FROM reservation q, hostelryacc w, rooms e WHERE q.room_id=e.room_id AND e.hostelry_id=w.hostelry_id GROUP BY w.hostelry_id");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>