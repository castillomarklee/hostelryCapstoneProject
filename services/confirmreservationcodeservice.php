<?php 

	include '../connection/connect.php';

	$reservation = json_decode(file_get_contents("php://input"));

	$id = $reservation->reservation_id;

	$query = mysqli_query($conn, "UPDATE reservation SET reservation_status='confirmed' WHERE reservation_id='$id'");
	
 ?>