<?php
if (isset($_GET['id']) && isset($_GET['action'])) {
    $id = $_GET['id'];
    $action = $_GET['action'];

    $pdo = new PDO('mysql:host=localhost;dbname=TaglineShore', 'root', '#Lensoni5lenson');

    if ($action === 'increase') {
        $stmt = $pdo->prepare("UPDATE cart1 SET quantity = quantity + 1 WHERE id = ?");
    } elseif ($action === 'decrease') {
        $stmt = $pdo->prepare("UPDATE cart1 SET quantity = GREATEST(quantity - 1, 1) WHERE id = ?");
    }

    $success = $stmt->execute([$id]);
    echo json_encode(['success' => $success]);
}
?>
