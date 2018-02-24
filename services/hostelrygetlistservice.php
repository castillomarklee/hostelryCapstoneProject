<?php 

	include '../connection/connect.php';


	$data = array();

	$query = mysqli_query($conn, "SELECT q.hostelry_id, q.hostelry_name, q.hostelry_type, q.hostelry_description, w.photolink FROM hostelryacc q, photos w WHERE q.hostelry_id=w.userid");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>