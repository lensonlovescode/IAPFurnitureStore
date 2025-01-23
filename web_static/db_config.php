<?php
// db_config.php
$host = 'localhost';
$username = 'root'; // Default username for XAMPP
$password = '';     // Default password for XAMPP
$database = 'shipping_information';

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}
?>
