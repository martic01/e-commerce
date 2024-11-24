async function handleSearch(query) {
    try {
        const res = await fetch('https://fakestoreapi.com/products');
        const products = await res.json();

        const filteredProducts = products.filter(product =>
            product.title.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );

        if (filteredProducts.length === 0) {
            displayNoResultsMessage(); // Call the function to show the "no results found" message
        } else {
            displayProducts(filteredProducts);
        }
    } catch (err) {
        console.error('Error fetching products for search:', err);
    }
}

// Function to display a "No results found" message
function displayNoResultsMessage() {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Clear any existing products
    productList.innerHTML = '<p class="no-results">No results found for your search.</p>';
}