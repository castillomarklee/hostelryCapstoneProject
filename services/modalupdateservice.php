<?php 

	include '../connection/connect.php';

	$hostelry = json_decode(file_get_contents("php://input"));

	$data = array();

	$querycheck = false;

	$id = $hostelry->hostelryidmodal;
	$name = $hostelry->hostelrynamemodal;
	$type = $hostelry->hostelrytypemodal;
	$description = $hostelry->hostelrydescriptionmodal;
	$username = $hostelry->hostelryusernamemodal;
	$password = $hostelry->hostelrypasswordmodal;
	$hosaddress = $hostelry->hosaddress;

	$query = mysqli_query($conn, "UPDATE hostelryacc SET hostelry_name='$name', hostelry_type='$type', hostelry_description='$description', hostelry_address='$hosaddress', hostelry_username='$username', hostelry_password='$password' WHERE hostelry_id='$id'");

	if($query) {
		$querycheck = false;
	} else {
		$querycheck = true;
	}

	$data["querycheck"] = $querycheck;

	echo json_encode($data);


 ?>