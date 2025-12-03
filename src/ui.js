import './css/bootstrap.css';
import './css/styles.css';
import $ from 'jquery';
import './bootstrap.min.js';
import { fetchCategories, fetchAndDisplayProducts, closeProductModal } from './product.js';
import { handleSearch } from './search.js';
import { updateCartView, cartin } from './cart.js';

let currentcart = cartin()
let scrollTime = 15
let scrollInterval;
// function speak(text) {
export function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 3;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}
function wishMe() {
    const day = new Date();
    const hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning! Welcome to we shop.");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon! Welcome to we shop.");
    } else {
        speak("Good Evening! Welcome to we shop.");
    }
}

window.addEventListener('load', () => {
    speak("Initializing marticam Voice Assistant...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const content = document.querySelector('.content');
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript.toLowerCase();
    content.value = transcript;
    takeCommand(transcript);
};



function takeCommand(message) {
    // Assuming categories are stored in the dropdown for reference
    currentcart = cartin()

    const categoryDropdown = document.getElementById('categoryDropdown');
    const categories = Array.from(categoryDropdown.options).map(option => option.value);

    if (message.includes("category")) {
        // Extract the category name from the message
        const category = message.replace("category", "").trim().toLowerCase();

        // Check if the category exists in the list
        if (categories.includes(category)) {
            speak(`category: ${category}`);
            fetchAndDisplayProducts(category); // Call the function to filter products by category
        } else {
            speak(`Sorry, I could not find the category: ${category}`);
        }
    } else if (message.includes("product")) {
        const productName = message.replace("product", "").trim().toLowerCase();
        speak(`product: ${productName}`);
        handleSearch(productName);
        $('.firstsl').slideUp() // Call the function to search for products
    } else if (message.includes("refresh")) {
        speak("Refreshing the page...");
        location.reload();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (message.includes("scroll down")) {
        speak("Scrolling down...");
        window.scrollBy(0, window.innerHeight); // Scroll one screen down
    } else if (message.includes("scroll up")) {
        speak("Scrolling up...");
        window.scrollBy(0, -window.innerHeight); // Scroll one screen up
    } else if (message.includes("scroll to top")) {
        speak("Scrolling to the top...");
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top smoothly
    } else if (message.includes("scroll to bottom")) {
        speak("Scrolling to the bottom...");
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); // Scroll to the bottom smoothly
    } else if (message.includes("auto scroll top")) {
        speak("Starting gradual scroll to the top...");
        clearInterval(scrollInterval); // Ensure no other scroll interval is active
        scrollInterval = setInterval(() => {
            if (window.scrollY > 0) {
                window.scrollBy(0, -10); // Gradually scroll up
            } else {
                clearInterval(scrollInterval); // Stop scrolling at the top
                speak("Reached the top.");
            }
        }, scrollTime);
    } else if (message.includes("auto scroll bottom")) {
        speak("Starting gradual scroll to the bottom...");
        clearInterval(scrollInterval); // Ensure no other scroll interval is active
        scrollInterval = setInterval(() => {
            if (window.scrollY + window.innerHeight < document.body.scrollHeight) {
                window.scrollBy(0, 10); // Gradually scroll down
            } else {
                clearInterval(scrollInterval); // Stop scrolling at the bottom
                speak("Reached the bottom.");
            }
        }, scrollTime);
    } else if (message.includes("stop")) {
        speak("Stopping the scroll...");
        clearInterval(scrollInterval); // Stop any active scrolling
    } else if (message.includes("click c")) {
        speak('ok...');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        $('#cart').fadeToggle();
    } else if (message.includes("item in c")) {
        if (currentcart.length) {
            speak(`You have ${currentcart.length} product...`);
        } else {
            speak(`cart is empty...`);
        }
    } else if (message.includes("hello")) {
        speak('how are you doing, how may i be of help...');
    } else if (message.includes("fine")) {
        speak('ok, how may i be of help...');
    }else if (message.includes("quiet")) {
        speak('Sorry...');
         window.speechSynthesis.cancel();
    } else if (message.includes("close")) {
        closeProductModal(); // Scroll to the bottom smoothly
    } else {
        speak("I didn't understand that command");
    }
}


$(document).ready(() => {
    const btn = document.querySelector('.talk');
    const content = document.querySelector('.content');


    btn.addEventListener('click', () => {
        content.value = "Listening...";
        recognition.start();
    });

    window.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'z':
                content.value = "Listening...";
                recognition.start();
                break;
        }
    });

    // Fetch and display categories
    fetchCategories();

    if (currentcart.length >= 1) {
        $('.cartcount').show();
        $('.cartcount').text(currentcart.length);
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

    document.getElementById('home').addEventListener('click', function () {
        fetchAndDisplayProducts("all");
    });

    // Initialize cart view
    updateCartView();
});
