# GitHub Copilot Instructions for viktormaruna.github.io

## Project Overview

This is a personal portfolio website hosted on GitHub Pages. It's a simple, static website showcasing Viktor Maruna's professional profile as a Cloud Solution Architect & Data Engineer focusing on Data & AI.

## Technology Stack

- **Platform**: GitHub Pages with Jekyll (minimal configuration)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Build**: No build process required - static files are served directly
- **Deployment**: Automatic deployment via GitHub Pages on push to main branch

## Project Structure

```
.
├── index.html           # Main landing page
├── stylesheet.css       # Main stylesheet
├── reset.css           # CSS reset
├── _config.yml         # Jekyll configuration
├── favicon.svg         # Favicon and related files
├── .well-known/        # For domain verification
└── autodiscover/       # Email autodiscover configuration
```

## Development Guidelines

### HTML

- Use semantic HTML5 elements
- Maintain accessibility standards (ARIA labels, alt text, proper heading hierarchy)
- Include comprehensive meta tags for SEO and social media (Open Graph, Twitter Cards)
- Use JSON-LD structured data for rich search results
- Keep the design minimal and responsive

### CSS

- Use modern CSS with fallbacks for older browsers
- Mobile-first responsive design
- Use CSS custom properties (variables) when appropriate
- Maintain consistency with existing design system:
  - Font: System font stack (-apple-system, BlinkMacSystemFont, 'Segoe UI', etc.)
  - Colors: #333 (text), #666 (secondary), #fafafa (background), #fff (cards)
  - Spacing: rem-based units

### JavaScript

- Use vanilla JavaScript (no frameworks)
- Keep scripts minimal and performance-focused
- Use modern ES6+ syntax where supported
- Implement progressive enhancement

## Code Style

- Use 4-space indentation for HTML
- Use lowercase with hyphens for CSS class names (BEM-like approach)
- Keep files focused and organized
- Comment complex logic or non-obvious implementations

## Testing & Validation

- Validate HTML using W3C validator
- Test responsive design on multiple screen sizes (desktop, tablet, mobile)
- Check cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Verify all external links are working
- Test accessibility with screen readers and keyboard navigation

## Deployment

- Changes to the main branch are automatically deployed via GitHub Pages
- No build step required
- DNS is configured via CNAME file
- Site is served over HTTPS

## What NOT to Change

- Do not modify the CNAME file unless explicitly changing the domain
- Do not remove the `.well-known` directory (required for domain verification)
- Preserve existing meta tags and SEO optimizations
- Keep the minimal design philosophy

## Best Practices

- Always test changes locally before committing
- Keep the site lightweight and fast-loading
- Maintain backward compatibility
- Follow web accessibility guidelines (WCAG 2.1)
- Optimize images and assets for web delivery
- Use semantic, meaningful commit messages

## Contact & Links

The site includes contact methods and external links that should remain functional:
- Email (obfuscated for spam prevention)
- LinkedIn
- GitHub
- Signal
- Dev Blog
