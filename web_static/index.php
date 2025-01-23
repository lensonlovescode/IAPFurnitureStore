<?php
include 'db_config.php';

$sql = "SELECT * FROM products";
$result = $conn->query($sql);

$products = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}
$conn->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Catalogue</title>
    <link rel="stylesheet" href="styles/catalogue.css">
</head>
<body>
    <header>
        <h1>Product Catalogue</h1>
    </header>
    <main>
        <div class="container">
            <?php foreach ($products as $product): ?>
            <div class="product">
                <img src="images/<?php echo $product['image']; ?>" alt="<?php echo $product['name']; ?>">
                <h2><?php echo $product['name']; ?></h2>
                <p>$<?php echo $product['price']; ?></p>
                <button class="add-to-cart" data-id="<?php echo $product['id']; ?>">Add to Cart</button>
            </div>
            <?php endforeach; ?>
        </div>
    </main>
    <script>
        // Add event listeners to "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', event => {
                const productId = event.target.getAttribute('data-id');
                
                // Send a POST request to add the product to the cart
                fetch('add_to_cart.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: productId })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Product added to cart!');
                    } else {
                        alert('Failed to add product to cart.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            });
        });
    </script>
</body>
</html>
