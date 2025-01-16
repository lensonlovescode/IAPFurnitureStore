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
    fetch('../Backend/php/fetch_products.php')
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector('.container');
        container.innerHTML = ''; // Clear static content
        data.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img class="images" src="${product.image_path}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>$${product.price}</p>
                <button class="button">Add To Cart</button>
            `;
            container.appendChild(productElement);
        });
    })
    .catch(error => console.error('Error fetching products:', error));
});
// document.addEventListener('DOMContentLoaded', () => {
//     const mockData = [
//         {
//             "id": "Galaxy_Seat",
//             "image_path": "images/bucketset.avif",
//             "name": "Galaxy Seat",
//             "price": "1319.99"
//         },
//         {
//             "id": "Tempest_Throne",
//             "image_path": "images/officeseat.avif",
//             "name": "Tempest Throne",
//             "price": "2459.99"
//         },
//         {
//             "id": "Quantum_Lounge",
//             "image_path": "images/modern_arm_seat_with_lights.avif",
//             "name": "Quantum Lounge",
//             "price": "3200.99"
//         },
//         {
//             "id": "oak_stool",
//             "image_path": "images/oak_stool.avif",
//             "name": "Oak Stool",
//             "price": "49.99"
//         },
//         {
//             "id": "Marry_Me_Two",
//             "image_path": "images/two_seater_applewood.avif",
//             "name": "Marry Me Two",
//             "price": "1209.99"
//         },
//         {
//             "id": "New_Product",
//             "image_path": "images/oak_stool",
//             "name": "New Product",
//             "price": "999.99"
//         }
        
//     ];

//     const container = document.querySelector('.container');
//     container.innerHTML = ''; // Clear static content

//     mockData.forEach(product => {
//         const productElement = document.createElement('div');
//         productElement.classList.add('product');
//         const imagePath = product.image_path && product.image_path !== '' ? product.image_path : 'images/default_image.avif';
//         productElement.innerHTML = `
//             <img class="images" src="${product.image_path}" alt="${product.name}">
//             <h2>${product.name}</h2>
//             <p>$${product.price}</p>
//             <button class="button">Add To Cart</button>
//         `;
//         container.appendChild(productElement);
//         container.style.display = 'grid';
//     });
// });
