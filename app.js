// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
themeToggle.setAttribute('aria-label', savedTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');

// Toggle theme function
function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.setAttribute('aria-label', newTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    
    // Show toast notification
    showToast(`Switched to ${newTheme} theme`);
}

// Add click event to theme toggle
themeToggle.addEventListener('click', toggleTheme);

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNav = document.getElementById('mobileNav');

mobileMenuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    mobileMenuToggle.setAttribute('aria-expanded', mobileNav.classList.contains('active'));
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
});

// Close mobile menu when clicking a link
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
    });
});

// Toast Notification System
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

function showToast(message, duration = 3000) {
    toastMessage.textContent = message;
    toast.classList.add('active');
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, duration);
}

// Subscribe Form Handling
const subscribeForm = document.getElementById('subscribeForm');
if (subscribeForm) {
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = subscribeForm.querySelector('.subscribe-input');
        const email = emailInput.value.trim();
        
        if (email) {
            // Simulate subscription
            emailInput.value = '';
            showToast('Subscribed successfully! Check your email for confirmation.');
        }
    });
}

// Iframe Loading State
const gameIframe = document.getElementById('gameIframe');
const gameLoading = document.getElementById('gameLoading');

if (gameIframe) {
    gameIframe.addEventListener('load', () => {
        gameLoading.style.display = 'none';
    });
    
    gameIframe.addEventListener('error', () => {
        gameLoading.innerHTML = `
            <div class="game-spinner"></div>
            <span>Failed to load game. Please refresh or try again later.</span>
            <button onclick="location.reload()" style="margin-top: 16px; padding: 8px 16px; background: var(--text-primary); color: var(--bg-primary); border: 2px solid var(--border-color); cursor: pointer;">
                Retry
            </button>
        `;
    });
}

// Game features interaction
const featureCards = document.querySelectorAll('.feature-card[href]');
featureCards.forEach(card => {
    card.addEventListener('click', (e) => {
        if (!card.href || card.href === '#' || card.href === window.location.href) {
            e.preventDefault();
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's a page link (not an anchor)
        if (href === '#') return;
        
        const targetElement = document.querySelector(href);
        if (targetElement && href.startsWith('#')) {
            e.preventDefault();
            
            // If it's a mobile link, close the menu
            if (this.classList.contains('mobile-nav-link')) {
                mobileNav.classList.remove('active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add keyboard support for theme toggle
themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
    }
});

// System theme detection
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Only apply system preference if user hasn't explicitly set a preference
if (!localStorage.getItem('theme')) {
    const systemTheme = prefersDarkScheme.matches ? 'dark' : 'light';
    body.setAttribute('data-theme', systemTheme);
    themeToggle.setAttribute('aria-label', systemTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
}

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    // Only update if user hasn't explicitly set a preference
    if (!localStorage.getItem('theme')) {
        const systemTheme = e.matches ? 'dark' : 'light';
        body.setAttribute('data-theme', systemTheme);
        themeToggle.setAttribute('aria-label', systemTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
        showToast(`System theme detected: ${systemTheme}`);
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial ARIA labels
    const currentTheme = body.getAttribute('data-theme');
    themeToggle.setAttribute('aria-label', currentTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    
    // Set mobile menu ARIA state
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    
    // Show welcome message
    setTimeout(() => {
        showToast('Welcome to Strands Unlimited!');
    }, 1000);
});
