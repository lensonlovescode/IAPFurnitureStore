<?php
session_start();
include 'db_config.php'; // Include the database configuration

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $product_id = $_POST['id'];
    $user_id = $_SESSION['user_id'] ?? 1; // Replace 1 with the actual logged-in user ID or handle guest users

    // Check if the cart1 table already has this product for the current user
    $check_sql = "SELECT quantity FROM cart2 WHERE product_id = ? AND user_id = ?";
    $stmt = $conn->prepare($check_sql);
    $stmt->bind_param('ii', $product_id, $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // If the product is already in the cart, update the quantity
        $row = $result->fetch_assoc();
        $new_quantity = $row['quantity'] + 1;
        $update_sql = "UPDATE cart2 SET quantity = ? WHERE product_id = ? AND user_id = ?";
        $stmt = $conn->prepare($update_sql);
        $stmt->bind_param('iii', $new_quantity, $product_id, $user_id);
        $stmt->execute();
    } else {
        // If the product is not in the cart, insert it as a new row
        $insert_sql = "INSERT INTO cart2 (user_id, product_id, quantity) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($insert_sql);
        $quantity = 1; // Default quantity when adding a new product
        $stmt->bind_param('iii', $user_id, $product_id, $quantity);
        $stmt->execute();
    }

    $stmt->close();
    $conn->close();

    header('Location: index.php'); // Redirect back to the catalogue page
    exit();
}
?>
