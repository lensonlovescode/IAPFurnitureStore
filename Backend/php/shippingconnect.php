<?php
$conn = mysqli_connect("localhost", "root", "#Lensoni5lenson", "TaglineShore");

if ($conn == false) {
    die("Connection Error: " . mysqli_connect_error());
} else {
    echo "Connection successful!";
}
?>
