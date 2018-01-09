<?php 

	include '../connection/connect.php';

	$users = json_decode(file_get_contents("php://input"));

	$data = array();

	$id = $users->usersadminid;

	$query = mysqli_query($conn, "SELECT customer_id, firstname, middlename, lastname, age, gender, address, nationality, username, customer_password, user_email, date_created FROM customer WHERE customer_id='$id'");

	while ($usersquery = mysqli_fetch_assoc($query)) {
		$data[] = $usersquery;
	}

	echo json_encode($data);

 ?>