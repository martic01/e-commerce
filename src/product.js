
import { showLoader, hideLoader } from './loader.js';
import './css/bootstrap.css';
import './css/styles.css';
import $ from 'jquery';
import './bootstrap.min.js';
import { addToCart,removeFromCart } from './cart.js';
import { speak } from './ui.js';

window.addToCart = addToCart;
window.showProductDetails = showProductDetails;
window.removeFromCart = removeFromCart;
window.closeProductModal = closeProductModal;



let spinTime = 2500

export async function fetchCategories() {
    try {
        showLoader();
        const res = await fetch('https://fakestoreapi.com/products/categories');
        const categories = await res.json();

        const categoryDropdown = document.getElementById('categoryDropdown');
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            categoryDropdown.appendChild(option);
        });
    } catch (err) {
        console.error('Error fetching categories:', err);
        showLoader(true); // Show error message under the spinner
    } finally {
        setTimeout(hideLoader, spinTime); // Hide loader after 3 seconds
    }
}

// Fetch and display products, optionally filtered by category
export async function fetchAndDisplayProducts(category = null) {
    try {
        showLoader();
        const res = await fetch('https://fakestoreapi.com/products');
        let products = await res.json();

        if (category && category !== 'all') {
            products = products.filter(product => product.category === category);
            $('.firstsl').slideUp();
        }else{
             $('.firstsl').slideDown();
        }

        if (category) {
            $('.aplli').text(category);
        }

        displayProducts(products);
       
    } catch (err) {
        console.error('Error fetching products:', err);
        showLoader(true); // Show error message under the spinner
    } finally {
        setTimeout(hideLoader, spinTime); // Hide loader after 3 seconds
    }
}

// The rest of your code remains unchanged...

// Display products in the UI
export function displayProducts(productsToShow) {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Clear existing products

    productsToShow.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('col-4');
        productDiv.innerHTML = `
            <div class="product-card" onclick="showProductDetails(${product.id})">
                <img src="${product.image}" alt="${product.title}" />
                <h4>${product.title}</h4>
                <p>₹${product.price.toFixed(2)}</p>
                <button class="btn addcart" data-id="${product.id}" onclick="event.stopPropagation(); addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productList.appendChild(productDiv);
    });
}

// Show product details in a modal
async function showProductDetails(productId) {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const product = await res.json();

        // Create or update the product detail modal
        const productModal = document.getElementById('productModal');
        productModal.innerHTML = `
            <div class="modal-content">
                <span class="close" onclick="closeProductModal()">&times;</span>
                <img src="${product.image}" alt="${product.title}" class="product-image" />
                <h2>${product.title}</h2>
                <p><strong>Category:</strong> ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                <p>${product.description}</p>
                <p><strong>Price:</strong> ₹${product.price.toFixed(2)}</p>
                <button class="btn purchase-btn" onclick="addToCart(${product.id})">Purchase</button>
            </div>
        `;

        // Show the modal
        productModal.style.display = 'block';

        // Speak the product details
        speak(`You are viewing the product details for ${product.title}. 
            It belongs to the ${product.category} category. 
            Description: ${product.description}. 
            The price is ₹${product.price.toFixed(2)}.`);
    } catch (err) {
        console.error('Error fetching product details:', err);
    }
}


// Close the product modal
function closeProductModal() {
    const productModal = document.getElementById('productModal');
    productModal.style.display = 'none';
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
}

