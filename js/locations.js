// Locations Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Locations page loaded'); // Додаємо лог для перевірки

    // Filter functionality
    const filterTabs = document.querySelectorAll('.filter-tab');
    const locationCards = document.querySelectorAll('.location-card');
    const searchInput = document.getElementById('locationSearch');
    const searchBtn = document.querySelector('.search-btn');
    const locationsGrid = document.getElementById('locationsGrid');
    const mapPoints = document.querySelectorAll('.map-point');
    const exploreBtns = document.querySelectorAll('.explore-btn');
    const header = document.querySelector('.header');

    // Current filter state
    let currentFilter = 'all';
    let currentSearch = '';

    console.log('Found elements:', {
        filterTabs: filterTabs.length,
        locationCards: locationCards.length,
        searchInput: !!searchInput,
        locationsGrid: !!locationsGrid
    });

    // Header scroll effect
    function handleHeaderScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleHeaderScroll);
    handleHeaderScroll(); // Initialize

    // Filter by category
    function filterLocations() {
        console.log('Filtering with:', { currentFilter, currentSearch });
        
        let hasVisibleCards = false;

        locationCards.forEach(card => {
            try {
                const categories = card.dataset.category.split(' ');
                const name = card.dataset.name.toLowerCase();
                const matchesFilter = currentFilter === 'all' || categories.includes(currentFilter);
                const matchesSearch = currentSearch === '' || name.includes(currentSearch.toLowerCase());

                console.log(`Card ${card.dataset.name}:`, { categories, matchesFilter, matchesSearch });

                if (matchesFilter && matchesSearch) {
                    card.style.display = 'block';
                    hasVisibleCards = true;
                    
                    // Highlight search term
                    if (currentSearch !== '') {
                        const cardTitle = card.querySelector('h3');
                        const originalText = cardTitle.textContent;
                        const regex = new RegExp(`(${currentSearch})`, 'gi');
                        cardTitle.innerHTML = originalText.replace(regex, '<span class="highlight">$1</span>');
                    }
                } else {
                    card.style.display = 'none';
                }
            } catch (error) {
                console.error('Error filtering card:', error);
            }
        });

        // Show no results message
        let noResults = locationsGrid.querySelector('.no-results');
        if (!hasVisibleCards) {
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.innerHTML = `
                    <h3>Локації не знайдено</h3>
                    <p>Спробуйте змінити фільтр або пошуковий запит</p>
                `;
                locationsGrid.appendChild(noResults);
            }
        } else if (noResults) {
            noResults.remove();
        }

        console.log('Filter completed. Visible cards:', hasVisibleCards);
    }

    // Filter tabs event listeners
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            console.log('Filter tab clicked:', this.dataset.filter);
            
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            // Update current filter
            currentFilter = this.dataset.filter;
            // Apply filter
            filterLocations();
        });
    });

    // Search functionality
    function handleSearch() {
        currentSearch = searchInput.value.trim();
        console.log('Search:', currentSearch);
        filterLocations();
    }

    if (searchInput && searchBtn) {
        searchInput.addEventListener('input', handleSearch);
        searchBtn.addEventListener('click', handleSearch);

        // Enter key for search
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }

    // Map point interactions
    mapPoints.forEach(point => {
        point.addEventListener('click', function() {
            const location = this.dataset.location;
            console.log('Map point clicked:', location);
            highlightLocation(location);
        });
        
        point.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3)';
            this.style.zIndex = '20';
        });
        
        point.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.zIndex = '10';
        });
    });

    // Explore button interactions
    exploreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const location = this.dataset.location;
            console.log('Explore button clicked:', location);
            highlightLocation(location);
        });
    });

    // Highlight location function
    function highlightLocation(location) {
        console.log('Highlighting location:', location);
        
        // Remove highlight from all cards
        locationCards.forEach(card => {
            card.style.transform = 'none';
            card.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
        });

        // Remove highlight from all map points
        mapPoints.forEach(point => {
            point.style.transform = 'scale(1)';
            const pointElement = point.querySelector('.point');
            if (pointElement) {
                pointElement.style.background = '#ff5252';
            }
        });

        // Find and highlight corresponding card
        const targetCard = Array.from(locationCards).find(card => {
            const exploreBtn = card.querySelector('.explore-btn');
            return exploreBtn && exploreBtn.dataset.location === location;
        });

        if (targetCard) {
            console.log('Found target card');
            // Scroll to card
            targetCard.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            
            // Add highlight effect
            targetCard.style.transform = 'scale(1.05)';
            targetCard.style.boxShadow = '0 25px 50px rgba(0,109,254,0.3)';
            
            // Remove highlight after 3 seconds
            setTimeout(() => {
                targetCard.style.transform = 'none';
                targetCard.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
            }, 3000);
        }

        // Find and highlight corresponding map point
        const targetPoint = Array.from(mapPoints).find(point => 
            point.dataset.location === location
        );

        if (targetPoint) {
            console.log('Found target point');
            targetPoint.style.transform = 'scale(1.5)';
            const pointElement = targetPoint.querySelector('.point');
            if (pointElement) {
                pointElement.style.background = '#006DFE';
            }
            setTimeout(() => {
                targetPoint.style.transform = 'scale(1)';
                if (pointElement) {
                    pointElement.style.background = '#ff5252';
                }
            }, 3000);
        }
    }

    // Initialize filter
    filterLocations();

    // Mobile menu functionality
    const hamburger = document.querySelector('.nav__hamburger');
    const navMenu = document.querySelector('.nav__menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    const navLinks = document.querySelectorAll('.nav__menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && hamburger) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && hamburger && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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