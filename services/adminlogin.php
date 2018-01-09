<?php 
	
	$adminlogin = json_decode(file_get_contents("php://input"));	

	$data = array();
	
	$adminusername = 'hostelryadminlogin';
	$adminpassword = 'hostelrytravelers';

	$username = $adminlogin->username;
	$password = $adminlogin->password;

	$login = false;

	if($adminusername == $username && $adminpassword == $password) {
		$login = true;
		session_start();
		$_SESSION['adminuser'] = $adminusername;
	} else {
		$login = false;
	}

	$data["login"] = $login;

	echo json_encode($data);

 ?>