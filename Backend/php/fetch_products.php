<?php
header('Access-Control-Allow-Origin: http://127.0.0.1:5500');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Max-Age: 86400');

$host = "localhost";
$username = "root";
$password = "WS%*N**8xJ";
$database = "TaglineShore";

// Connect to the database
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    header('HTTP/1.1 500 Internal Server Error');
    die("Database connection failed: " . $conn->connect_error);
}

// Query to fetch products
$query = "SELECT id, name, image_path, price FROM products";
$result = $conn->query($query);

// Check if the query was successful
if ($result === false) {
    header('HTTP/1.1 500 Internal Server Error');
    die("Query failed: " . $conn->error);
}

// Fetch the results into an array
$products = [];
while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

// Send JSON response
header('Content-Type: application/json');
echo json_encode($products);

// Close the database connection
$conn->close();
?>

