 import { showLoader,hideLoader } from "./loader";
 import $ from 'jquery';

 const screen = {
        shop: $('#shop-page'),
        sign: $('#auth-page')

    };


    export function switchPage() {
        screen.shop.fadeToggle()
        screen.sign.fadeToggle()
        showLoader()
        setTimeout(hideLoader,1300)
    }

    
    // accont entry
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = {
        login: document.getElementById('loginForm'),
        signup: document.getElementById('signupForm')
    };
    const quickLinks = document.querySelectorAll('[data-auth]');

    function switchAuth(target) {
        // switch tabs
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.auth === target);
        });
        // switch forms
        forms.login.classList.toggle('auth-form--active', target === 'login');
        forms.signup.classList.toggle('auth-form--active', target === 'signup');
    }

    quickLinks.forEach(el => {
        el.addEventListener('click', () => {
            const target = el.dataset.auth;
            if (!target) return;
            switchAuth(target);
        });
    });
