<?php 

	include '../connection/connect.php';


	$data = array();

	$query = mysqli_query($conn, "SELECT hostelry_id, hostelry_name, hostelry_type, hostelry_description FROM hostelryacc");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>