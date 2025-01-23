<?php
$conn = mysqli_connect("localhost", "root", "", "shipping_information");

if ($conn == false) {
    die("Connection Error: " . mysqli_connect_error());
} else {
    echo "Connection successful!";
}
?>
