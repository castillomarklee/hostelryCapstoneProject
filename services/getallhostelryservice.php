<?php 

	include '../connection/connect.php';

	$query = mysqli_query($conn, "SELECT * FROM hostelryacc");

	$data = array();

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>