document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function () {
        const productElement = this.closest('.product');
        const productName = productElement.querySelector('h2').textContent; // Product name inside <h2>
        const productPrice = productElement.querySelector('p').textContent.replace('$', ''); // Price inside <p>
        const productImage = productElement.querySelector('img').getAttribute('src'); // Image source path

        const productData = {
            name: productName,
            price: productPrice,
            image: productImage
        };

        fetch('add_to_cart.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Product added:', data);
            })
            .catch(error => {
                console.error('Error adding product:', error);
            });
    });
});
