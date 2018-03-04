<?php 

	include '../connection/connect.php';

	session_start();
	$hid = $_SESSION['hostelrylogin'];

	$query = mysqli_query($conn, "SELECT q.firstname, q.middlename, q.lastname FROM customer q, reservation w, rooms e, hostelryacc r WHERE q.customer_id=w.customer_id AND e.room_id=w.room_id AND r.hostelry_id=e.hostelry_id AND r.hostelry_id='$hid' AND w.reservation_status='confirmed'");

	header("Content-type: application/vnd.ms-word");
	header("Content-Disposition: attachment;Filename=confirmed_list.doc");

	echo "<html>";
	echo "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=Windows-1252\">";
	echo "<body>";
	echo "<h1 style='text-align: center;'> Reserved Customers List</h1><br><br><br><br>";
	while ($row = mysqli_fetch_assoc($query)) {
		echo "<h5>Firstname: " . $row['firstname']. "</h5>";
		echo "<h5>Middlename: " . $row['middlename']. "</h5>";
		echo "<h5>Lastname: " . $row['lastname'] . "</h5><br><br>";
	}
	echo "</body>";
	echo "</html>";

 ?>