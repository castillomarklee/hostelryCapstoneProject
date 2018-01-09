<?php 
	session_start();
	$data = array();
	$user = false;

	if(isset($_SESSION['userlogin']) && !empty($_SESSION['userlogin'])) {
		$user = true;
	}

	$data["userSession"] = $user;
	echo json_encode($data);

 ?>