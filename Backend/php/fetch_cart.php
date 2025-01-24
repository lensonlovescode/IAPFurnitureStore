<?php
header('Content-Type: application/json');
$pdo = new PDO('mysql:host=localhost;dbname=shipping_information', 'root', '');
$query = $pdo->query("SELECT id, name, price, quantity FROM cart1");
$cart = $query->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($cart);
?>
