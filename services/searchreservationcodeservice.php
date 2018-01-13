<?php 

	include '../connection/connect.php';

	$reservation = json_decode(file_get_contents("php://input"));

	$data = array();

	$code = $reservation->code;

	$query = mysqli_query($conn, "SELECT q.reservation_id, q.reservation_status, q.reservation_date, w.room_price, w.room_name, e.firstname, e.middlename, e.lastname FROM reservation q, rooms w, customer e WHERE q.room_id = w.room_id AND q.customer_id = e.customer_id AND q.reservation_code='$code'");

	while ($querylist = mysqli_fetch_assoc($query)) {
		$data[] = $querylist;
	}

	echo json_encode($data);

 ?>