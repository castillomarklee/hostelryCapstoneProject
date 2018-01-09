<?php 

	include '../connection/connect.php';

	$data = array();

	$query = mysqli_query($conn, "SELECT customer_id, firstname, middlename, lastname, age, gender, address, nationality, username, customer_password, user_email, date_created FROM customer");

	while($usersadmin = mysqli_fetch_assoc($query)) {
		$data[] = $usersadmin;
	}

	echo json_encode($data);

 ?>