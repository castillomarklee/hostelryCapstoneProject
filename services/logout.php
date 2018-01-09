<?php 
	session_start();
	session_unset();
	session_destroy();

	$data = array();

	$data["logoutmessage"] = true;

	echo json_encode($data);

 ?>