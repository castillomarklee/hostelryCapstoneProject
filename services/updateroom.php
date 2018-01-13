<?php 

	include '../connection/connect.php';

	$hostelry = json_decode(file_get_contents("php://input"));

	$data = array();

	$querysuccess = false;

	$id = $hostelry->room_id;
	$number = $hostelry->room_number;
	$name = $hostelry->room_name;
	$type = $hostelry->room_type;
	$description = $hostelry->room_description;
	$capacity = $hostelry->capacity;
	$status = $hostelry->room_status;
	$price = $hostelry->room_price;

	$query = mysqli_query($conn, "UPDATE rooms SET room_number='$number', room_name='$name', room_type='$type', room_description='$description', capacity='$capacity', room_status='$status', room_price='$price' WHERE room_id='$id'");

	if($query) {
		$querysuccess = false;
	} else {
		$querysuccess = true;
	}

	$data["querysuccess"] = $querysuccess;

	echo json_encode($data);

 ?>