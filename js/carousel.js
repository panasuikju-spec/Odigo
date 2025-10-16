class Carousel {
    constructor(container) {
        this.container = container;
        this.track = container.querySelector('.carousel__track');
        this.slides = Array.from(container.querySelectorAll('.carousel__slide'));
        this.prevBtn = container.querySelector('.carousel__btn--prev');
        this.nextBtn = container.querySelector('.carousel__btn--next');
        this.dots = container.querySelectorAll('.dot');
        
        this.currentIndex = 0;
        this.slideWidth = this.slides[0].getBoundingClientRect().width;
        
        this.init();
    }
    
    init() {
        // Set slide positions
        this.slides.forEach((slide, index) => {
            slide.style.left = `${this.slideWidth * index}px`;
        });
        
        // Event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Touch/swipe support
        this.addTouchSupport();
        
        // Auto slide
        this.startAutoSlide();
        
        this.updateCarousel();
    }
    
    updateCarousel() {
        this.track.style.transform = `translateX(-${this.currentIndex * this.slideWidth}px)`;
        
        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateCarousel();
        this.resetAutoSlide();
    }
    
    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateCarousel();
        this.resetAutoSlide();
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
        this.resetAutoSlide();
    }
    
    addTouchSupport() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.stopAutoSlide();
        });
        
        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchend', () => {
            if (!isDragging) return;
            
            const diff = startX - currentX;
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            
            isDragging = false;
            this.startAutoSlide();
        });
    }
    
    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }
    
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
    }
    
    resetAutoSlide() {
        this.stopAutoSlide();
        this.startAutoSlide();
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const carouselContainer = document.querySelector('.carousel');
    if (carouselContainer) {
        new Carousel(carouselContainer);
    }
});