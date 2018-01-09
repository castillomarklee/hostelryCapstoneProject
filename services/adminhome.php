<?php 

	session_start();
	$data = array();
	$sessionCheck = false;

	if(isset($_SESSION['adminuser']) && !empty($_SESSION['adminuser'])) {
		$sessionCheck = true;
	}

	$data["adminsession"] = $sessionCheck;
	echo json_encode($data);

 ?>