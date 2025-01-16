function adjustQuantity(itemId, change) {
    const quantityInput = document.getElementById(`quantity-${itemId}`);
    let currentQuantity = parseInt(quantityInput.value);
    currentQuantity += change;
    if (currentQuantity < 1) {
        currentQuantity = 1; // Ensuring quantity doesn't go below 1
    }
    quantityInput.value = currentQuantity;
    updateCart();
}

function updateCart() {
    const cartItems = document.querySelectorAll('tr[data-id]');
    let total = 0;

    cartItems.forEach(item => {
        const itemId = item.dataset.id;
        const quantity = parseInt(document.getElementById(`quantity-${itemId}`).value);
        const price = parseFloat(item.querySelector('td:nth-child(2)').textContent.replace('$', ''));
        const itemTotal = price * quantity;
        item.querySelector(`#total-${itemId}`).textContent = `$${itemTotal.toFixed(2)}`;
        total += itemTotal;
    });

    document.getElementById('total-price').textContent = total.toFixed(2);
}

function checkout() {
    alert('Proceeding to checkout...');
    // You can link this to actual checkout logic
}
