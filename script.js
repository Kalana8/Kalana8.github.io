

const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(isDark) {
    if (isDark) {
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
    const isDarkMode = document.body.style.backgroundColor === 'rgb(17, 17, 17)';
    setTheme(!isDarkMode);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
});

// Wave animation on load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const wave = document.querySelector('.wave');
        wave.style.animation = 'wave 2s 1';
        setTimeout(() => {
            wave.style.animation = 'none';
        }, 2000);
    }, 1000);
});



