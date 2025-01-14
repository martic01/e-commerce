import './css/bootstrap.css';
import './css/styles.css';
import './bootstrap.min.js';
import { speak } from './ui.js';
// loader.js
export function showLoader(showError = false) {
    const loader = document.getElementById('loader');
    const errorMessage = document.getElementById('errorMessage');

    loader.style.display = 'flex';
    if (showError) {
        speak("Please check your internet connection.");
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Please check your internet connection.';
    } else {
        errorMessage.style.display = 'none';
    }
}

export function hideLoader() {
    const loader = document.getElementById('loader');
    const errorMessage = document.getElementById('errorMessage');

    loader.style.display = 'none';
    errorMessage.style.display = 'none'; // Ensure error message is hidden
}
