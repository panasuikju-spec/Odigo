// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.nav__hamburger');
    const navMenu = document.querySelector('.nav__menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav__menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav__menu a');
    
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
});