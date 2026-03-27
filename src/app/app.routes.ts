import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./pages/content-detail/content-detail.component').then(m => m.ContentDetailComponent),
    data: { type: 'post' }
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent)
  },
  {
    path: 'projects/:slug',
    loadComponent: () => import('./pages/content-detail/content-detail.component').then(m => m.ContentDetailComponent),
    data: { type: 'project' }
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
