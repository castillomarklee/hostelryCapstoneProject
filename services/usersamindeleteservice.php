<?php 

	include '../connection/connect.php';

	$users = json_decode(file_get_contents("php://input"));

	$data = array();

	$id = $users->usersadminid;

	$query = mysqli_query($conn, "DELETE FROM customer WHERE customer_id='$id'");

 ?>