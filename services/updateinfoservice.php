<?php 

	include '../connection/connect.php';

	$hostelry = json_decode(file_get_contents("php://input"));

	$name = $hostelry->hostelry_name;
	$type = $hostelry->hostelry_type;
	$description = $hostelry->hostelry_description;
	$username = $hostelry->hostelry_username;
	$password = $hostelry->hostelry_password;

	session_start();
	$id = $_SESSION['hostelrylogin'];

	$query = mysqli_query($conn, "UPDATE hostelryacc SET hostelry_name='$name', hostelry_type='$type', hostelry_description='$description', hostelry_username='$username', hostelry_password='$password' WHERE hostelry_id='$id'");

 ?>