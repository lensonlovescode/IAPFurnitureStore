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
<<<<<<< HEAD
// document.addEventListener('DOMContentLoaded', () => {
//     fetch('../Backend/php/fetch_products.php')
//     .then(response => response.json())
//     .then(data => {
//         const container = document.querySelector('.container');
//         container.innerHTML = ''; // Clear static content
//         data.forEach(product => {
//             const productElement = document.createElement('div');
//             productElement.classList.add('product');
//             productElement.innerHTML = `
//                 <img class="images" src="${product.image_path}" alt="${product.name}">
//                 <h2>${product.name}</h2>
//                 <p>$${product.price}</p>
//                 <button class="button">Add To Cart</button>
//             `;
//             container.appendChild(productElement);
//         });
//     })
//     .catch(error => console.error('Error fetching products:', error));
// });
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost/IAPFurnitureStore/Backend/php/fetch_products.php')
    .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Data received:', data);
        if (!data || data.length === 0) {
            console.log('No products found in database');
            return;
        }
        
        const container = document.getElementById("products-container");
        console.log(container)
        container.innerHTML = ''; 
        
        data
            // .sort((a, b) => a.price - b.price)
            .forEach(product => {
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
        console.error('Error:', error);
        console.error('Error details:', error.message);
    });
});
=======
>>>>>>> 1d0624a3aac70ad4d6728d714b646442e3f14233
// document.addEventListener('DOMContentLoaded', () => {
//     fetch('../Backend/php/fetch_products.php')
//     .then(response => response.json())
//     .then(data => {
//         const container = document.querySelector('.container');
//         container.innerHTML = ''; // Clear static content
//         data.forEach(product => {
//             const productElement = document.createElement('div');
//             productElement.classList.add('product');
//             productElement.innerHTML = `
//                 <img class="images" src="${product.image_path}" alt="${product.name}">
//                 <h2>${product.name}</h2>
//                 <p>$${product.price}</p>
//                 <button class="button">Add To Cart</button>
//             `;
//             container.appendChild(productElement);
//         });
//     })
//     .catch(error => console.error('Error fetching products:', error));
// });
document.addEventListener('DOMContentLoaded', () => {
    const mockData = [
        {
            "id": "Galaxy_Seat",
            "image_path": "images/bucketset.avif",
            "name": "Galaxy Seat",
            "price": "1319.99"
        },
        {
            "id": "Tempest_Throne",
            "image_path": "images/officeseat.avif",
            "name": "Tempest Throne",
            "price": "2459.99"
        },
        {
            "id": "Quantum_Lounge",
            "image_path": "images/modern_arm_seat_with_lights.avif",
            "name": "Quantum Lounge",
            "price": "3200.99"
        },
        {
            "id": "oak_stool",
            "image_path": "images/oak_stool.avif",
            "name": "Oak Stool",
            "price": "49.99"
        },
        {
            "id": "Marry_Me_Two",
            "image_path": "images/two_seater_applewood.avif",
            "name": "Marry Me Two",
            "price": "1209.99"
        },

        
    ];

    const container = document.querySelector('.container');
    container.innerHTML = ''; // Clear static content

    mockData.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        const imagePath = product.image_path && product.image_path !== '' ? product.image_path : 'images/default_image.avif';
        productElement.innerHTML = `
            <img class="images" src="${product.image_path}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>$${product.price}</p>
            <button class="button">Add To Cart</button>
        `;
        container.appendChild(productElement);
        container.style.display = 'grid';
    });
});

	document.getElementById("filterby").addEventListener("change", function () {
		const container = document.querySelector(".container");
		const products = Array.from(container.children); // Get all product divs as an array
		const selectedOption = this.value; // Get selected filter option

		// Extract price, sort products, and rearrange
		products.sort((a, b) => {
			const priceA = parseFloat(a.querySelector("p").textContent.replace("$", ""));
			const priceB = parseFloat(b.querySelector("p").textContent.replace("$", ""));
			return selectedOption === "lowest_to_highest" ? priceA - priceB : priceB - priceA;
		});

		// Clear and append products in sorted order
		container.innerHTML = ""; 
		products.forEach(product => container.appendChild(product));
	});