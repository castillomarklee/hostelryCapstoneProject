<?php 

	include '../connection/connect.php';

	$adminhostelryform = json_decode(file_get_contents("php://input"));

	$data = array();

	$emptyform = false;
	$validateusername = false;
	$usernamelength = false;
	$passwordlength = false;
	$querysuccess = false;

	$hostelryqueryname = $adminhostelryform->hostelryname;
	$hostelryquerytype = $adminhostelryform->hostelrytype;
	$hostelryquerydescription = $adminhostelryform->hostelrydescription;
	$hosaddress = $adminhostelryform->address;
	$hostelryqueryusername = $adminhostelryform->hostelryusername;
	$hostelryquerypassword = $adminhostelryform->hostelrypassword;

	if(isset($hostelryqueryname) && isset($hostelryquerytype) && isset($hostelryquerydescription) && isset($hostelryqueryusername) && isset($hostelryquerypassword)) {

		if(empty($hostelryqueryname) && empty($hostelryquerytype) && empty($hostelryquerydescription) && empty($hostelryqueryusername) && empty($hostelryquerypassword)) {
			$emptyform = true;

		} else {

			$checkusername = mysqli_query($conn, "SELECT hostelry_username FROM hostelryacc WHERE hostelry_username='$hostelryqueryname'");
			$validate = mysqli_num_rows($checkusername);
			if($validate) {
				$validateusername = true;
			} else {

				if(strlen($hostelryqueryusername) < 5) {
					$usernamelength = true;
				} else if(strlen($hostelryquerypassword) < 5) {
					$passwordlength = true;
				} else {
					$id =  "hostelry-" . rand(10, 100) . "-" . rand();
					$queryqwe = mysqli_query($conn, "INSERT INTO hostelryacc VALUES('$id', '$hostelryqueryname', '$hostelryquerytype', '$hostelryquerydescription', '$hosaddress', '$hostelryqueryusername', '$hostelryquerypassword')");
					$photoid = "photo-" . rand(1, 10000) . "-" . date("m-d-Y");
					$photoquery = mysqli_query($conn, "INSERT INTO photos VALUES('$photoid', '$id', 'defaultprofile.jpg')");

					if($queryqwe) {
						$querysuccess = false;
					} else {
						$querysuccess = true;
					}

				}

			}

		}

	}

	$data["emptyform"] = $emptyform;
	$data["validateusername"] = $validateusername;
	$data["usernamelength"] = $usernamelength;
	$data["passwordlength"] = $passwordlength;
	$data["querysuccess"] = $querysuccess;
	$data["id"] = $id;

	echo json_encode($data);


 ?>