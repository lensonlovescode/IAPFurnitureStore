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
