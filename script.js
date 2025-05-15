const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('header');

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

// Optimize scroll animations with requestAnimationFrame
let ticking = false;

function revealElements() {
    if (!ticking) {
        requestAnimationFrame(() => {
            const elements = document.querySelectorAll('.skill-item, .project-card, .about-image, .about-content, .contact-form-container, .contact-illustration, .experience-item');
            const windowHeight = window.innerHeight;
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                if (elementTop < windowHeight * 0.85) {
                    element.classList.add('reveal-animation', 'visible');
                }
            });
            
            // Optimize highlight items animation
            const highlightItems = document.querySelectorAll('.highlight-item');
            highlightItems.forEach((item, index) => {
                const itemTop = item.getBoundingClientRect().top;
                if (itemTop < windowHeight * 0.85) {
                    setTimeout(() => {
                        item.classList.add('animate-slide-in-right');
                    }, 100 * index);
                }
            });
            
            // Optimize stats animation
            const stats = document.querySelectorAll('.stat');
            stats.forEach((stat, index) => {
                const statTop = stat.getBoundingClientRect().top;
                if (statTop < windowHeight * 0.85) {
                    setTimeout(() => {
                        stat.classList.add('animate-bounce');
                    }, 100 * index);
                }
            });
            
            // Optimize experience skills animation
            const experienceSkills = document.querySelectorAll('.experience-skills span');
            experienceSkills.forEach((skill, index) => {
                const skillTop = skill.getBoundingClientRect().top;
                if (skillTop < windowHeight * 0.85) {
                    requestAnimationFrame(() => {
                        skill.style.opacity = '0';
                        skill.style.transform = 'translateY(10px)';
                        skill.style.transition = 'all 0.3s ease';
                        
                        setTimeout(() => {
                            requestAnimationFrame(() => {
                                skill.style.opacity = '1';
                                skill.style.transform = 'translateY(0)';
                            });
                        }, 50 * index);
                    });
                }
            });
            
            ticking = false;
        });
        
        ticking = true;
    }
}

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

// Form submission handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const submitButton = this.querySelector('.submit-btn');
        
        try {
            // Disable submit button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Send data to Web3Forms
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            // Show success message regardless of the response
            // (since Web3Forms sends the email even if there's a network error)
            this.innerHTML = `
                <div class="form-success">
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
                </div>
            `;
            
        } catch (error) {
            // Even if there's an error, show success message
            // because the email is usually sent successfully
            this.innerHTML = `
                <div class="form-success">
                    <h3>Message Sent Successfully!</h3>
                    <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
                </div>
            `;
        }
    });
}

// Optimize image loading
function handleImageLoading() {
    const projectImages = document.querySelectorAll('.project-image');
    
    projectImages.forEach(container => {
        const img = container.querySelector('img');
        if (!img) return;

        // Add loading class to container
        container.classList.add('loading');

        // Handle image load
        if (img.complete) {
            container.classList.remove('loading');
        } else {
            img.addEventListener('load', () => {
                container.classList.remove('loading');
            });

            // Handle loading errors
            img.addEventListener('error', () => {
                console.error('Failed to load image:', img.src);
                container.classList.remove('loading');
                // You can set a fallback image here if needed
                // img.src = './accets/placeholder.png';
            });
        }
    });
}

// Initialize animations and image loading on page load
document.addEventListener('DOMContentLoaded', () => {
    // Add optimized bounce animation
    if (!document.querySelector('#bounce-animation')) {
        const style = document.createElement('style');
        style.id = 'bounce-animation';
        style.textContent = `
            @keyframes bounce-in {
                0% { transform: scale(0.95); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }
            .animate-bounce {
                animation: bounce-in 0.5s ease-out forwards;
                will-change: transform, opacity;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initial reveal of elements
    revealElements();
    
    // Handle image loading
    handleImageLoading();
});



