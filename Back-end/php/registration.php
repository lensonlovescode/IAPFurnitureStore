<?php
$servername = "localhost"; 
$username = "root"; 
$password = "xxxxxxx"; 
$dbname = "user_data"; 


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$fname = $_POST['fname'];
$sname = $_POST['sname'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT); 
$gender = $_POST['gender'];
$dateofbirth = $_POST['dateofbirth'];


$sql = "INSERT INTO users (fname, sname, email, phone, password, gender, dateofbirth) 
        VALUES ('$fname', '$sname', '$email', '$phone', '$password', '$gender', '$dateofbirth')";

if ($conn->query($sql) === TRUE) {
    echo "Registration successful!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
