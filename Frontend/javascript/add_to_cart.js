// Initialize cart
const cart = [];

// Select all "Add to Cart" buttons
const buttons = document.querySelectorAll('.button');

// Add event listener to each button
buttons.forEach(button => {
	button.addEventListener('click', () => {
		// Get product details
		const product = button.parentElement;
		const productName = product.querySelector('h2').innerText;
		const productPrice = parseFloat(product.querySelector('p').innerText.replace('$', ''));

		// Check if product is already in the cart
		const existingProduct = cart.find(item => item.name === productName);
		if (existingProduct) {
			existingProduct.quantity += 1;
		} else {
			cart.push({ name: productName, price: productPrice, quantity: 1 });
		}

		// Notify the user
		alert(`${productName} added to cart!`);

		// Log cart for debugging
		console.log(cart);
	});
});
