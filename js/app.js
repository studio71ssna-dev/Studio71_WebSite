import { inHouseProducts, services } from './data.js';
import { createProjectCard, createServiceItem } from './components.js';

document.addEventListener("DOMContentLoaded", () => {
    const projectGrid = document.getElementById('project-grid');
    const servicesGrid = document.getElementById('services-grid');

    // Render Projects
    if (projectGrid) {
        projectGrid.innerHTML = inHouseProducts.map(p => createProjectCard(p)).join('');
    }

    // Render Services
    if (servicesGrid) {
        servicesGrid.innerHTML = services.map(s => createServiceItem(s)).join('');
    }

    initTypewriter();
    initMobileNav();
});

function initTypewriter() {
    const textElement = document.getElementById('typewriter');
    if (!textElement) return;
    
    const text = textElement.innerText;
    textElement.innerText = '';
    let i = 0;

    function type() {
        if (i < text.length) {
            textElement.innerText += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    type();
}

function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const overlay = document.getElementById('nav-overlay');

    if (!hamburger || !navLinks) return;

    function openMenu() {
        hamburger.classList.add('open');
        navLinks.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => {
        hamburger.classList.contains('open') ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}
