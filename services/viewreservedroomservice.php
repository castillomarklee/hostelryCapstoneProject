<?php 

	include '../connection/connect.php';

	$data= array();

	$query = mysqli_query($conn, "SELECT q.reservation_id, w.room_name FROM reservation q, rooms w WHERE q.room_id=w.room_id");

	while($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>