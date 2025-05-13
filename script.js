const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('header');

// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

function setTheme(isDark) {
    if (isDark) {
        document.body.classList.add('dark-mode');
        document.body.style.backgroundColor = '#111';
        document.body.style.color = '#fff';
        document.querySelectorAll('a:not(.download-btn)').forEach(el => {
            el.style.color = '#fff';
        });
        document.querySelectorAll('.social-links svg').forEach(el => {
            el.style.fill = '#fff';
        });
        themeToggle.textContent = '🌙';
    } else {
        document.body.classList.remove('dark-mode');
        document.body.style.backgroundColor = '#fff';
        document.body.style.color = '#111';
        document.querySelectorAll('a:not(.download-btn)').forEach(el => {
            el.style.color = '#111';
        });
        document.querySelectorAll('.social-links svg').forEach(el => {
            el.style.fill = '#111';
        });
        themeToggle.textContent = '☀️';
    }
}

// Check for saved theme preference or use OS preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
    setTheme(true);
} else {
    setTheme(false);
}

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    const isDarkMode = document.body.classList.contains('dark-mode');
    setTheme(!isDarkMode);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
});

// Mobile menu toggle
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Custom cursor
document.addEventListener('mousemove', (e) => {
    if (cursor && cursorFollower) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }
});

// Hover effect for clickable elements
const clickables = document.querySelectorAll('a, button, .project-card, .skill-item, input, textarea');
clickables.forEach((element) => {
    element.addEventListener('mouseenter', () => {
        if (cursor && cursorFollower) {
            cursor.style.width = '0px';
            cursor.style.height = '0px';
            cursorFollower.style.width = '50px';
            cursorFollower.style.height = '50px';
            cursorFollower.style.borderWidth = '2px';
            cursorFollower.style.backgroundColor = 'rgba(108, 100, 255, 0.1)';
        }
    });
    
    element.addEventListener('mouseleave', () => {
        if (cursor && cursorFollower) {
            cursor.style.width = '10px';
            cursor.style.height = '10px';
            cursorFollower.style.width = '30px';
            cursorFollower.style.height = '30px';
            cursorFollower.style.borderWidth = '2px';
            cursorFollower.style.backgroundColor = 'transparent';
        }
    });
});

// Hide cursor when leaving window
document.addEventListener('mouseout', () => {
    if (cursor && cursorFollower) {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    }
});

document.addEventListener('mouseover', () => {
    if (cursor && cursorFollower) {
        cursor.style.opacity = '0.7';
        cursorFollower.style.opacity = '0.5';
    }
});

// Scroll animations
window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Reveal animations
    revealElements();
});

// Implement smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Reveal elements on scroll
function revealElements() {
    const elements = document.querySelectorAll('.skill-item, .project-card, .about-image, .about-content, .contact-form-container, .contact-illustration');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.85) {
            element.classList.add('animate-fade-in');
        }
    });
    
    // Animate about section highlight items with a staggered delay
    const highlightItems = document.querySelectorAll('.highlight-item');
    highlightItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (itemTop < windowHeight * 0.85) {
            setTimeout(() => {
                item.classList.add('animate-slide-in-right');
            }, 300 * index);
        }
    });
    
    // Animate stats with a bounce effect
    const stats = document.querySelectorAll('.stat');
    stats.forEach((stat, index) => {
        const statTop = stat.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (statTop < windowHeight * 0.85) {
            setTimeout(() => {
                stat.classList.add('animate-bounce');
            }, 200 * index);
        }
    });
}

// Form submission handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formValues = Object.fromEntries(formData.entries());
        
        // Here you would typically send the data to a server
        // For now, let's just show a success message
        this.innerHTML = `
            <div class="form-success">
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out, ${formValues.name}. I'll get back to you soon!</p>
            </div>
        `;
    });
}

// Handle "Load more" button in projects section
const loadMoreBtn = document.querySelector('.load-more-btn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
        // This would typically load more projects from a database or API
        // For now, let's just show a message
        this.innerHTML = 'No more projects to load';
        this.disabled = true;
        this.style.opacity = '0.5';
        
        // Optional: Add animation to indicate end of projects
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-check"></i> All projects loaded';
        }, 1500);
    });
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add bounce animation if not already defined
    if (!document.querySelector('#bounce-animation')) {
        const style = document.createElement('style');
        style.id = 'bounce-animation';
        style.textContent = `
            @keyframes bounce-in {
                0% { transform: scale(0.5); opacity: 0; }
                50% { transform: scale(1.05); opacity: 1; }
                70% { transform: scale(0.95); }
                100% { transform: scale(1); opacity: 1; }
            }
            .animate-bounce {
                animation: bounce-in 0.8s ease forwards;
            }
        `;
        document.head.appendChild(style);
    }
    
    revealElements();
});



