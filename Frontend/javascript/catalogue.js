const searchInput = document.querySelector('.search');

// Handle focus event
searchInput.addEventListener('focus', () => {
    if (searchInput.dataset.previousValue) {
        searchInput.value = searchInput.dataset.previousValue;
    }
});

// Handle blur event
searchInput.addEventListener('blur', () => {
    searchInput.dataset.previousValue = searchInput.value;
    searchInput.value = '';
});

// Handle keyup event for searching
searchInput.addEventListener('keyup', function(event) {
    const query = event.target.value.trim();

    if (event.key === 'Enter') {
        const productElement = document.getElementById(query);

        if (productElement) {
            // Scroll to the element if it's found
            productElement.scrollIntoView({ behavior: 'smooth' });
            window.location.hash = query;  // Optionally update the URL with the element ID
        } else {
            // If no match is found, show "No results"
            searchInput.placeholder = `No results for "${query}"`;
            setTimeout(() => {
                searchInput.placeholder = 'Search...';  // Reset placeholder after a short delay
            }, 1500);
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('Fetching product data...');
    fetch('http://localhost/IAPFurnitureStore/Backend/php/fetch_products.php')
        .then(response => {
            console.log('Response:', response);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Fetched products:', data);

            const container = document.getElementById("products_container"); // Updated ID
            if (!container) {
                console.error('#products_container not found in the DOM');
                return;
            }
            container.innerHTML = '';

            if (!data || !Array.isArray(data) || data.length === 0) {
                container.innerHTML = '<p>No products available.</p>';
                return;
            }

            data.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                productElement.innerHTML = `
                    <img class="images" src="/IAPFurnitureStore/${product.image_path}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p>$${product.price}</p>
                    <button class="button">Add To Cart</button>
                `;
                container.appendChild(productElement);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
});

document.getElementById("filterby").addEventListener("change", function () {
	const container = document.getElementById("product_container"); // Correct container ID
	const products = Array.from(container.children); // Get all product divs as an array
	const selectedOption = this.value; // Get selected filter option

	// Extract price, sort products, and rearrange
	products.sort((a, b) => {
		const priceA = parseFloat(a.querySelector("p").textContent.replace("$", "").trim());
		const priceB = parseFloat(b.querySelector("p").textContent.replace("$", "").trim());
		return selectedOption === "lowest_to_highest" ? priceA - priceB : priceB - priceA;
	});

	// Clear and append products in sorted order
	products.forEach(product => container.appendChild(product)); // Reappending automatically rearranges
});
