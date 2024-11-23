let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Fetch and display categories in the dropdown
async function fetchCategories() {
    try {
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
    }
}

// Fetch and display products, optionally filtered by category
async function fetchAndDisplayProducts(category = null) {
    try {
        const res = await fetch('https://fakestoreapi.com/products');
        let products = await res.json();

        if (category && category !== 'all') {
            products = products.filter(product => product.category === category);
        }

        displayProducts(products);
    } catch (err) {
        console.error('Error fetching products:', err);
    }
}

// Display products in the UI
function displayProducts(productsToShow) {
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

// function displayProducts(productsToShow) {
//     const productList = document.getElementById('productList');
//     productList.innerHTML = ''; // Clear existing products

//     productsToShow.forEach(product => {
//         const productDiv = document.createElement('div');
//         productDiv.classList.add('col-4');
//         productDiv.innerHTML = `
//             <img src="${product.image}" alt="${product.title}" />
//             <h4>${product.title}</h4>
//             <p>₹${product.price.toFixed(2)}</p>
//             <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
//         `;
//         productList.appendChild(productDiv);
//     });
// }

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
    } catch (err) {
        console.error('Error fetching product details:', err);
    }
}

// Close the product modal
function closeProductModal() {
    const productModal = document.getElementById('productModal');
    productModal.style.display = 'none';
}

// Add product to the cart
async function addToCart(productId) {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const product = await res.json();

        const cartItem = cart.find(item => item.id === product.id);

        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        if (cart.length >= 1) {
            $('.cartcount').show();
            $('.cartcount').text(cart.length);
        } else {
            $('.cartcount').hide();
        }

        saveCartToLocalStorage();

        const addButton = $(`.addcart[data-id="${product.id}"]`);
        addButton.css('background-color', 'green');
        addButton.text('Added');
        setTimeout(function () {
            addButton.css('background-color', '');
            addButton.text('Add to cart');
        }, 5000);

        updateCartView();
    } catch (err) {
        console.error('Error adding product to cart:', err);
    }
}

// Remove product from the cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);

    if (cart.length <= 0) {
        $('.cartcount').hide();
    } else {
        $('.cartcount').text(cart.length);
    }

    saveCartToLocalStorage();
    updateCartView();
}

// Update the cart view
function updateCartView() {
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = ''; // Clear the cart items view

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty</p>';
        return;
    }

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.title}" width="50" class="cart-item-image" />
            <span class="cart-item-title" data-id="${item.id}">${item.title} - (x${item.quantity})</span>
            <span>₹${(item.price * item.quantity).toFixed(2)}</span>
            <button class="btn-remove bhover" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsDiv.appendChild(itemDiv);

        // Add event listener to the title and image to show product details
        itemDiv.querySelector('.cart-item-title').addEventListener('click', () => showProductDetails(item.id));
        itemDiv.querySelector('.cart-item-image').addEventListener('click', () => showProductDetails(item.id));
    });

    const totalDiv = document.createElement('div');
    totalDiv.classList.add('cart-total');
    totalDiv.innerHTML = `<strong>Total: ₹${total.toFixed(2)}</strong>`;
    cartItemsDiv.appendChild(totalDiv);
}
// Handle search functionality
async function handleSearch(query) {
    try {
        const res = await fetch('https://fakestoreapi.com/products');
        const products = await res.json();

        const filteredProducts = products.filter(product =>
            product.title.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );

        displayProducts(filteredProducts);
    } catch (err) {
        console.error('Error fetching products for search:', err);
    }
}

// Initialize the page
$(document).ready(() => {
    // Fetch and display categories
    fetchCategories();

    if (cart.length >= 1) {
        $('.cartcount').show();
        $('.cartcount').text(cart.length);
    } else {
        $('.cartcount').hide();
    }

    // Fetch and display all products initially
    fetchAndDisplayProducts();

    // Add search functionality
    document.getElementById('searchInput').addEventListener('input', function () {
        let input = $('#searchInput').val().trim();
        if (input !== "") {
            $('.rem').show();
        } else {
            $('.rem').hide();
        }
        handleSearch(this.value.toLowerCase());
    });

    $('.rem').on('click', function () {
        $('#searchInput').val('');
        $('.rem').hide();
    });

    // Handle category filter
    document.getElementById('categoryDropdown').addEventListener('change', function () {
        const selectedCategory = this.value;
        fetchAndDisplayProducts(selectedCategory);
    });

    // Show and hide cart
    document.getElementById('cartLink').addEventListener('click', function () {
        $('#cart').fadeToggle();
    });

    // Checkout button to hide cart
    document.getElementById('checkoutButton').addEventListener('click', function () {
        $('#cart').slideUp();
    });

    // Initialize cart view
    updateCartView();
});
