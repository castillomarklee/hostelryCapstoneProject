<?php 

	include '../connection/connect.php';

	$data = array();

	session_start();
	$id = $_SESSION['hostelrylogin'];

	$query = mysqli_query($conn, "SELECT * FROM hostelryacc WHERE hostelry_id='$id'");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>