<?php 

	include '../connection/connect.php';

	$reservation = json_decode(file_get_contents("php://input"));

	$id = $reservation->id;

	$query = mysqli_query($conn, "DELETE FROM reservation WHERE reservation_id='$id'");

 ?>