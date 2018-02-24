<?php 

	include '../connection/connect.php';

	$data = array();

	session_start();
	$photoid = $_SESSION['hostelrylogin'];

	$query = mysqli_query($conn, "SELECT * FROM photos WHERE userid='$photoid'");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[]= $querylist;
	}

	echo json_encode($data);

 ?>