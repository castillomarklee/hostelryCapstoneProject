<?php 

    // include '../connection/connect.php';

    // if(!empty($_FILES)) {
    //     $path = 'upload/' . $_FILES['file']['name'];
    //     if(move_uploaded_file($_FILES['file']['tmp_name'], $path)) {
    //         $id = "TSphoto-" . rand(1, 10000) . date("m-d-Y");
    //         session_start();
    //         $docid = $_SESSION['doctor'];
    //         $query = mysqli_query($conn, "INSERT INTO photos VALUES('$id', '$docid', '".$_FILES['file']['name']."')");
    //         if($query) {
    //             echo "Success";
    //         } else {
    //             echo "Errorqueryy";
    //         }
    //     }
    // } else {
    //     echo "Error";
    // }

    $target_dir = "../upload/";
     print_r($_FILES);
     $target_file = $target_dir . $_FILES["file"]["name"];

     $roomid = $_POST['roomid'];

     move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);

     //write code for saving to database 
     include '../connection/connect.php';

     $photoid = "photo-" . rand(1, 10000) . "-" . date("m-d-Y");

     $hostelrycheck = mysqli_query($conn, "SELECT * FROM photos WHERE userid='$roomid'");

     if(mysqli_num_rows($hostelrycheck)) {
        $updatephoto = mysqli_query($conn, "UPDATE photos SET photolink='".$_FILES["file"]["name"]."' WHERE userid='$roomid'");
     }else {
        $sql = "INSERT INTO photos VALUES ('$photoid', '$roomid','".$_FILES["file"]["name"]."', 'roomprofile')";

         if ($conn->query($sql) === TRUE) {
             echo json_encode($_FILES["file"]); // new file uploaded
         } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
         }
     }

     

     $conn->close();

 ?>