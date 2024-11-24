function showLoader(showError = false) {
    const loader = document.getElementById('loader');
    const errorMessage = document.getElementById('errorMessage');

    loader.style.display = 'flex';
    if (showError) {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Please check your internet connection.';
    } else {
        errorMessage.style.display = 'none';
    }
}

function hideLoader() {
    const loader = document.getElementById('loader');
    const errorMessage = document.getElementById('errorMessage');

    loader.style.display = 'none';
    errorMessage.style.display = 'none'; // Ensure error message is hidden
}

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
            $('.firstsl').slideUp()
        } else {
            $('.rem').hide();
            $('.firstsl').slideDown()
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
