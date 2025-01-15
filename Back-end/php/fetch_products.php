<?php
// Database connection details
$host = "localhost";
$username = "root";
$password = "";
$database = "your_database_name";

// Connect to the database
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
	header('HTTP/1.1 500 Internal Server Error');
	die("Database connection failed: " . $conn->connect_error);
}

// Query to fetch products
$query = "SELECT id, name FROM products";
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
