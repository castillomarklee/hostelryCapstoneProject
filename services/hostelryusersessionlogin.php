<?php 

	include '../connection/connect.php';

	$formLogin = json_decode(file_get_contents("php://input"));

	$data = array();
	$check_UsernameLogin = false;

	$username = $formLogin->username;
	$password = $formLogin->password;

	$login = mysqli_query($conn, "SELECT hostelry_username FROM hostelryacc WHERE hostelry_username='$username' AND hostelry_password='$password'");

	$check_username = mysqli_num_rows($login);

	if($check_username == 0) {
		$check_UsernameLogin = true;
	} else {
		$check_UsernameLogin = false;
		session_start();
		$_SESSION['hostelrylogin'] = $username;
	}

	$data["UsernameLogin"] = $check_UsernameLogin;

	echo json_encode($data);

 ?>