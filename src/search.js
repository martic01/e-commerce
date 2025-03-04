// search.js
import { displayProducts } from './product.js';
import { speak } from './ui.js';
import './css/bootstrap.css';
import './css/styles.css';
import './bootstrap.min.js';

export async function handleSearch(query) {
    try {
        const res = await fetch('https://fakestoreapi.com/products');
        const products = await res.json();

        const filteredProducts = products.filter(product =>
            product.title.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );

        if (filteredProducts.length === 0) {
            displayNoResultsMessage();
        } else {
            displayProducts(filteredProducts);
        }
    } catch (err) {
        console.error('Error fetching products for search:', err);
    }
}

function displayNoResultsMessage() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '<p class="no-results">No results found for your search.</p>';
    speak('No results found for your search.')
}
