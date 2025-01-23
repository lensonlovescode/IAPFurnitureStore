<?php
// Database connection details
$host = "localhost"; // Replace with your host
$username = "root"; // Replace with your DB username
$password = ""; // Replace with your DB password
$database = "my_shop"; // Replace with your database name

// Create a connection to the database
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set the response header to handle JSON
header("Content-Type: application/json");

try {
    // Get the raw POST data
    $jsonData = file_get_contents("php://input");
    
    // Decode the JSON data
    $data = json_decode($jsonData, true);
    
    // Check if the JSON data is valid
    if (!$data || !isset($data['id'], $data['name'], $data['price'], $data['image_path'])) {
        throw new Exception("Invalid input. Ensure 'id', 'name', 'price', and 'image_path' are provided.");
    }

    // Prepare and bind the SQL statement
    $stmt = $conn->prepare("INSERT INTO product (id, name, price, image_path) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("isds", $data['id'], $data['name'], $data['price'], $data['image_path']);

    // Execute the query
    if ($stmt->execute()) {
        // Send success response
        echo json_encode(["status" => "success", "message" => "Product added successfully."]);
    } else {
        // Handle execution failure
        throw new Exception("Error inserting product: " . $stmt->error);
    }

    // Close the prepared statement
    $stmt->close();
} catch (Exception $e) {
    // Send error response
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}

// Close the database connection
$conn->close();
?>
