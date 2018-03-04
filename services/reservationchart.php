<?php 

	include '../connection/connect.php';

	$data = array();

	$query = mysqli_query($conn, "SELECT COUNT(*) AS rescount, reservation_status FROM reservation GROUP BY reservation_status");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>