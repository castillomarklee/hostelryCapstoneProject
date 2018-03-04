<?php 

	include '../connection/connect.php';

	$roomid = json_decode(file_get_contents("php://input"));

	$id = $roomid->hostelryroomsid;

	$userid = "";

	$querysuccess = false;

	session_start();

	$usersession = $_SESSION['userlogin'];

	$useridquery = mysqli_query($conn, "SELECT customer_id FROM customer WHERE username='$usersession'");

	while($userquerylist = mysqli_fetch_assoc($useridquery)) {
		$userid = $userquerylist['customer_id'];
	}

	$data = array();

	$reservationid = "reserve-" . rand(1, 100) . "-" . rand();
	$reservationdescription = "RESERVE FOR CUSTOMER";
	$reservationdate = date("d-m-Y");
	$reservationcode = "HOSTELRY-" . $id . rand(1, 10) . rand(1, 50);
	$reservationstatus = "reserved";
	$roomstatus = "reserved";

	$query = mysqli_query($conn, "INSERT INTO reservation VALUES('$reservationid', '$reservationdescription', '$reservationdate',  '$reservationcode', '$reservationstatus', '$id', '$usersession')");

	$roomquery = mysqli_query($conn, "UPDATE rooms SET room_status='$roomstatus' WHERE room_id='$id'");

 ?>