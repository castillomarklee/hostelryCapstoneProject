<?php 
	
	include '../connection/connect.php';

	$query = mysqli_query($conn, "SELECT hostelry_id, hostelry_name, hostelry_type, hostelry_description, hostelry_address, hostelry_username, hostelry_password FROM hostelryacc");

	$hostelry = array();

	while ($queryresult = mysqli_fetch_assoc($query)) {
		$hostelry[] = $queryresult;
	}

	echo json_encode($hostelry);

 ?>