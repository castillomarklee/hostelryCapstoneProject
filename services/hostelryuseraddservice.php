<?php 

	include '../connection/connect.php';

	$hostelryuser = json_decode(file_get_contents("php://input"));

	session_start();
	$hostelry_idsession = $_SESSION['hostelrylogin'];

	$number = $hostelryuser->roomnumber;
	$name = $hostelryuser->roomname;
	$type = $hostelryuser->roomtype;
	$description = $hostelryuser->roomdescription;
	$capacity = $hostelryuser->roomcapacity;
	$price = $hostelryuser->roomprice;

	$data = array();

	$checkroomexist = false;

	$querysuccess = false;

	$checkroom = mysqli_query($conn, "SELECT room_name FROM rooms WHERE room_name='$name'");

	$hostelry_idquery = mysqli_query($conn, "SELECT hostelry_id FROM hostelryacc WHERE hostelry_username='$hostelry_idsession'");

	$hostelry_id = "";

	while($querylist = mysqli_fetch_assoc($hostelry_idquery)) {
		$hostelry_id = $querylist['hostelry_id'];
	}


	$validatecheckroom = mysqli_num_rows($checkroom);

	if($validatecheckroom) {
		$checkroomexist = true;
	} else {

		$id = $hostelry_idsession . "-ROOMS-" . rand(10, 100) . rand();

		$status = 'available';

		$query = mysqli_query($conn, "INSERT INTO rooms VALUES('$id', '$number', '$name', '$type', '$description', '$capacity','$status', '$price', '$hostelry_id')");

		if($query) {
			$querysuccess = false;
		} else {
			$querysuccess = true;
		}

	}

	$data["hostelryuserroomexist"] = $checkroomexist;
	$data["querysuccess"] = $querysuccess;
	$data["id"] = $id;
	$data["hostelry_id"] = $hostelry_id;

	echo json_encode($data);

 ?>