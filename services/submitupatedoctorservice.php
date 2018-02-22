<?php 

	include '../connection/connect.php';

	$admin = json_decode(file_get_contents("php://input"));

	$id = $admin->id;
	$firstname = $admin->firstname;
	$middlename = $admin->middlename;
	$lastname = $admin->lastname;
	$age = $admin->age;
	$gender = $admin->gender;
	$address = $admin->address;
	$doctortype = $admin->doctortype;
	$username = $admin->username;
	$password = $admin->password;

	$data = array();
	$usernameexist = false;

	$checkusername = mysqli_query($conn, "SELECT doctorid FROM doctor WHERE username='$username'");

	if(mysqli_num_rows($checkusername)) {
		$usernameexist = true;
	} else {
			$query = mysqli_query($conn, "UPDATE doctor SET firstname='$firstname', middlename='$middlename', lastname='$lastname', age='$age', gender='$gender', address='$address, doctortype='$doctortype, username='$username', password='$password' WHERE doctorid='$id'");
	}

	$data["usernameexist"] = $usernameexist;

	echo json_encode($data);




 ?>