<?php
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $pdo = new PDO('mysql:host=localhost;dbname=TaglineShore', 'root', '#Lensoni5lenson');
    $stmt = $pdo->prepare("DELETE FROM cart WHERE id = ?");
    $success = $stmt->execute([$id]);
    echo json_encode(['success' => $success]);
}
?>