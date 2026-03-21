export function createProjectCard(project) {
    const tagsHTML = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    return `
        <div class="project-card ${project.featured ? 'featured' : ''}">
            <div class="card-image"></div>
            <div class="card-content">
                ${project.featured ? '<span class="badge">Flagship</span>' : ''}
                <h3 class="game-title">${project.title}</h3>
                <p class="project-subtitle">${project.subtitle}</p>
                <p>${project.description}</p>
                <div class="tags">${tagsHTML}</div>
                <button class="button small-btn" onclick="window.location.href='${project.link}'">Access Data</button>
            </div>
        </div>
    `;
}

export function createServiceItem(service) {
    return `
        <div class="service-item">
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        </div>
    `;
}