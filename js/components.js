export function createProjectCard(project) {
  const links = project.links || {};

  return `
    <div class="project-card">

      <!-- CLICKABLE IMAGE -->
      <a href="${project.url}" target="_blank" class="card-image-link">
        <div class="card-image"
             style="background-image:url('${project.image}')">
        </div>
      </a>

      <div class="card-content">

        ${project.featured ? `<span class="badge">Featured</span>` : ""}

        <h3 class="game-title">${project.title}</h3>
        <div class="project-subtitle">${project.subtitle}</div>

        <p class="project-desc">${project.description}</p>

        <div class="tags">
          ${(project.tags || [])
            .map(tag => `<span class="tag">${tag}</span>`)
            .join("")}
        </div>

        <div class="card-footer">

          <div class="store-links">

            ${links.playstore ? `
              <a href="${links.playstore}" target="_blank"
                 class="store-icon" title="Google Play">
                 📱
              </a>
            ` : ""}

            ${links.steam ? `
              <a href="${links.steam}" target="_blank"
                 class="store-icon" title="Steam">
                 🎮
              </a>
            ` : ""}

            ${links.itch ? `
              <a href="${links.itch}" target="_blank"
                 class="store-icon" title="itch.io">
                 🕹️
              </a>
            ` : ""}

          </div>

          <button class="button small-btn">Details</button>

        </div>

      </div>
    </div>
  `;
}

export function createServiceItem(service) {
    return `
        <div class="service-item">
            <h3 class="service-title">${service.title}</h3>
            <p class="service-desc">${service.desc}</p>
            <div class="service-status">Status: Operational</div>
        </div>
    `;
}
