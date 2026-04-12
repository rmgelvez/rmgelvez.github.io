import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home')
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./pages/content-detail/content-detail.component'),
    data: { type: 'post' }
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog.component')
  },
  {
    path: 'projects/:slug',
    loadComponent: () => import('./pages/content-detail/content-detail.component'),
    data: { type: 'project' }
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects.component')
  },
  {
    path: '**',
    redirectTo: ''
  }
];
