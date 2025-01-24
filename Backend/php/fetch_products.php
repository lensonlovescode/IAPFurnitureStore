<?php

// Database setup
$host = "localhost";
$username = "root";
$password = "]B*GOSA!NE86)zGp";
$database = "TaglineShore";

$conn = new mysqli($host, $username, $password, $database);

// Check database connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit;
}

// Fetch products
$query = "SELECT * FROM products";
$result = $conn->query($query);

if (!$result) {
    http_response_code(500);
    echo json_encode(["error" => "Query failed: " . $conn->error]);
    exit;
}

// Build product array
$products = [];
while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

// Output results
http_response_code(200);
echo json_encode($products, JSON_PRETTY_PRINT);

$conn->close();
?>
