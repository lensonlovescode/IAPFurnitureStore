<?php
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $pdo = new PDO('mysql:host=localhost;dbname=shipping_information', 'root', '');
    $stmt = $pdo->prepare("DELETE FROM cart1 WHERE id = ?");
    $success = $stmt->execute([$id]);
    echo json_encode(['success' => $success]);
}
?>