document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded triggered');  // This should log when the page is fully loaded

    // Select all buttons with the class 'button'
    const addToCartButtons = document.querySelectorAll('.button');
    console.log(`Found ${addToCartButtons.length} buttons`);  // This should tell us if buttons were found

    // Add event listeners to all "Add To Cart" buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            console.log("Button clicked");  // This should log when the button is clicked

            // Find the closest product div to get the data
            const productDiv = button.closest('.product');
            console.log(productDiv);  // Check the closest product div

            // Get the product ID, name, price, and image path
            const productId = productDiv.querySelector('img').id;  // Using the id of the image
            const productName = productDiv.querySelector('h2').innerText;  // Product name from the <h2>
            const productPrice = productDiv.querySelector('p').innerText.replace('$', '');  // Price, removing the dollar sign
            const productImage = productDiv.querySelector('img').src;  // Image source path

            console.log(`Product Added: ${productName}, ID: ${productId}, Price: $${productPrice}, Image: ${productImage}`);

            // Get the current cart from cookies
            let cart = getCartFromCookies();

            // Prevent adding the same product more than once
            if (!cart.some(item => item.id === productId)) {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage
                });

                // Update the cart in cookies
                setCartInCookies(cart);

                // Display a success message or update the UI to reflect the addition
                alert(`${productName} has been added to your cart.`);
            } else {
                alert(`${productName} is already in your cart.`);
            }
        });
    });
});

// Get the cart from cookies
function getCartFromCookies() {
    const cartCookie = document.cookie.split('; ').find(row => row.startsWith('cart='));
    if (cartCookie) {
        const cartData = decodeURIComponent(cartCookie.split('=')[1]);
        return JSON.parse(cartData);
    }
    return [];
}

// Save the cart to cookies
function setCartInCookies(cart) {
    const cartData = encodeURIComponent(JSON.stringify(cart));
    document.cookie = `cart=${cartData}; path=/; max-age=${60 * 60 * 24 * 7}`; // Expire in 7 days
}
