<?php 

	include '../connection/connect.php';

	$formdata = json_decode(file_get_contents("php://input"));

	$data = array();
	$error = array();

	$data["firstname"] = $formdata->firstname;

	$empty = false;
	$emailError = false;
	$validation = false;
	$validateage = false;
	$validateUsername = false;
	$validatePassword = false;
	$registerSuccess = false;

	$firstname = $formdata->firstname;
	$middlename = $formdata->middlename;
	$lastname = $formdata->lastname;
	$age = $formdata->age;
	$gender = $formdata->gender;
	$address = $formdata->address;
	$nationality = $formdata->nationality;
	$username = $formdata->username;
	$password = $formdata->password;
	$email = $formdata->useremail;

	if(isset($firstname) && isset($username) && isset($password) && isset($email)) {

		if(empty($firstname) && empty($middlename) && empty($lastname) && empty($address) && empty($username) && empty($password) && empty($email)) {
			$empty = true;
		} else if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
			$emailError = true;
		} else {
			$validation = mysqli_query($conn, "SELECT username FROM customer WHERE username='$username'");
			$check_validation = mysqli_num_rows($validation);

			if($check_validation) {
				$validation = true;
			} else {
				if(strlen($username) < 5) {
					$validateUsername = true;
				} else if(strlen($password) < 5) {
					$validatePassword = true;
				} else if(!filter_var($age, FILTER_VALIDATE_INT)) {
					$validateage = true;
				} else {
					$id =  "HOSTELRY-" . rand(10, 100) . "-" . rand();
					$date = date("m-d-Y");
					$register = mysqli_query($conn, "INSERT INTO customer VALUES('$id', '$firstname', '$middlename', '$lastname', '$age', '$gender', '$address', '$nationality', '$username', '$password', '$email', '$date')");

					if($register) {
						$registerSuccess = false;
					} else {
						$registerSuccess = true;
					}
				}
			}
		} 

	}


	$data["empty"] = $empty;
	$data["emailError"] = $emailError;
	$data["validation"] = $validation;
	$data["validateUsername"] = $validateUsername;
	$data["validatePassword"] = $validatePassword;
	$data["registerSuccess"] =  $registerSuccess;
	$data["validateage"] = $validateage;



	echo json_encode($data);

 ?>