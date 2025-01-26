<?php
header('Content-Type: application/json');
$pdo = new PDO('mysql:host=localhost;dbname=TaglineShore', 'root', '#Lensoni5lenson');
$query = $pdo->query("SELECT id, name, price, quantity FROM cart");
$cart = $query->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($cart);
?>
