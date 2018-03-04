<?php 

	include '../connection/connect.php';

	$data = array();

	$user = json_decode(file_get_contents("php://input"));

	$roomid = $user->roomid;

	$query = mysqli_query($conn, "SELECT * FROM photos WHERE userid='$roomid'");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>