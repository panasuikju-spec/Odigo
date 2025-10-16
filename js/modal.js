// Login Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const loginModal = document.getElementById('loginModal');
    const loginLinks = document.querySelectorAll('.login-link');
    const modalClose = document.querySelector('.modal-close');
    
    // Open modal when clicking login link
    loginLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal when clicking close button
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            loginModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close modal when clicking outside
    loginModal.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && loginModal.classList.contains('active')) {
            loginModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Form submission
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            // Simulate login process
            console.log('Login attempt:', { email, password });
            
            // Here you would typically send data to your backend
            alert('Успішний вхід! (Демо)');
            
            // Close modal after successful login
            loginModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Social buttons functionality
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.classList.contains('google-btn') ? 'Google' : 'Facebook';
            alert(`Увійти через ${platform} - функціонал в розробці!`);
        });
    });
});