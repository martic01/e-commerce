let cart = JSON.parse(localStorage.getItem('cart')) || [];
let spinTime = 2500
// Save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
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
        }, 2000);

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