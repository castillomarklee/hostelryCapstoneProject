<?php 

	session_start();
	$data = array();
	$user = false;

	if(isset($_SESSION['hostelrylogin']) && !empty($_SESSION['hostelrylogin'])) {
		$user = true;
	}

	$data["userSession"] = $user;
	echo json_encode($data);

 ?>