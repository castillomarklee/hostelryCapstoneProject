<?php 

	include '../connection/connect.php';

	$data = array();

	$query = mysqli_query($conn, "SELECT COUNT(q.room_id) AS rcount, w.hostelry_name FROM rooms q, hostelryacc w WHERE q.hostelry_id=w.hostelry_id GROUP BY w.hostelry_name");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>