---
title: Building Responsive UIs with Modern CSS
slug: modern-css-responsive
date: 2024-03-15
excerpt: Discover techniques for building beautiful, responsive user interfaces with modern CSS Grid and Flexbox.
---

# Building Responsive UIs with Modern CSS

Modern CSS provides powerful tools for creating responsive, adaptive user interfaces. Let's explore some best practices and techniques.

## CSS Grid for Layout

CSS Grid gives us a powerful two-dimensional layout system:

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
```

## Flexbox for Components

Flexbox excels at one-dimensional layouts and component alignment:

```css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
```

## Mobile-First Approach

Start with mobile styles and enhance for larger screens:

```css
/* Mobile first */
.sidebar {
  margin-top: 2rem;
}

/* Desktop enhancement */
@media (min-width: 768px) {
  .sidebar {
    margin-left: 2rem;
    margin-top: 0;
  }
}
```

## Container Queries

The future of responsive design uses container queries:

```css
@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

These modern techniques help us build interfaces that work beautifully across all devices.
