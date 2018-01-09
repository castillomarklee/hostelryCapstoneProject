<?php 

	include '../connection/connect.php';

	$users = json_decode(file_get_contents("php://input"));

	$id = $users->customer_id;
	$firstname = $users->firstname;
	$middlename = $users->middlename;
	$lastname = $users->lastname;
	$age = $users->age;
	$gender = $users->gender;
	$address = $users->address;
	$nationality = $users->nationality;
	$username = $users->username;
	$customer_password = $users->customer_password;
	$user_email = $users->user_email;
	$date_created = $users->date_created;

	$query = mysqli_query($conn, "UPDATE customer SET firstname='$firstname', middlename='$middlename', lastname='$lastname', age='$age', gender='$gender', address='$address', nationality='$nationality', username='$username', customer_password='$customer_password', user_email='$user_email', date_created='$date_created' WHERE customer_id='$id'");

 ?>