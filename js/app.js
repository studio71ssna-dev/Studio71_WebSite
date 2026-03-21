import { inHouseProducts, services } from './data.js';
import { createProjectCard, createServiceItem } from './components.js';

document.addEventListener("DOMContentLoaded", () => {
    const projectGrid = document.querySelector('.project-grid');
    const servicesGrid = document.getElementById('services-grid');

    // Render In-House Products
    if (projectGrid) {
        projectGrid.innerHTML = inHouseProducts.map(p => createProjectCard(p)).join('');
    }

    // Render Services
    if (servicesGrid) {
        servicesGrid.innerHTML = services.map(s => createServiceItem(s)).join('');
    }

    // Typewriter logic remains encapsulated here
    initTypewriter();
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