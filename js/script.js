// Mobile menu toggle and scroll effects
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.nav__hamburger');
    const menu = document.querySelector('.nav__menu');
    const header = document.querySelector('.header');
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            menu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Header background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav__menu a').forEach(function(link) {
        link.addEventListener('click', function() {
            menu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav') && menu.classList.contains('active')) {
            menu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const whatInput = document.querySelector('.search-input[placeholder*="What"]');
            const whereInput = document.querySelector('.search-input[placeholder*="Where"]');
            
            if (whatInput && whereInput) {
                const whatValue = whatInput.value.trim();
                const whereValue = whereInput.value.trim();
                
                if (whatValue || whereValue) {
                    alert(`Searching for: ${whatValue} in ${whereValue}`);
                    // Тут можна додати реальну логіку пошуку
                } else {
                    alert('Please enter search criteria');
                }
            }
        });
    }
    
    // Add enter key support for search
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(function(input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    });
});