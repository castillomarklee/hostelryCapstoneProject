<?php 

	include '../connection/connect.php';

	$user = json_decode(file_get_contents("php://input"));

	$firstname = $user->firstname;
	$middlename = $user->middlename;
	$lastname = $user->lastname;
	$age = $user->age;
	$gender = $user->gender;
	$address = $user->address;
	$nationality = $user->nationality;
	$username = $user->username;
	$password = $user->password;
	$email = $user->email;

	$data = array();
	$usernameexist = false;
	$usernamelength = false;
	$passwordlength = false;
	$emailcorrect = false;
	$querysuccess = false;

	$checkuser = mysqli_query($conn, "SELECT * FROM customer WHERE username='$username'");

	if(mysqli_num_rows($checkuser)) {
		$usernameexist = true;
	} else {
		if(strlen($username) < 5) {
			$usernamelength = true;
		} else if(strlen($password) < 5) {
			$passwordlength = true;
		} else if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
			$emailcorrect = true;
		} else {
			$id =  "HOSTELRY-" . rand(10, 100) . "-" . rand();
					$date = date("m-d-Y");
			$query = mysqli_query($conn, "INSERT INTO customer VALUES('$id', '$firstname', '$middlename', '$lastname', '$age', '$gender', '$address', '$nationality', '$username', '$password', '$email', '$date')");
			if($query) {
				$querysuccess = false;
			} else {
				$querysuccess = true;
			}
		}
	}

	$data["usernameexist"] = $usernameexist;
	$data["usernamelength"] = $usernamelength;
	$data["passwordlength"] = $passwordlength;
	$data["emailcorrect"] = $emailcorrect;
	$data["customer_id"] = $id;
	$data["querysuccess"] = $querysuccess;

	echo json_encode($data);

 ?>