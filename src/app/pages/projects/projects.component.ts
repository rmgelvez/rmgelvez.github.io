import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentService, ContentItem } from '../../services/content.service';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="projects-container">
      <div class="projects-header">
        <h1>{{ i18n.t('projects.title') }}</h1>
        <p class="subtitle">A selection of projects I've built and contributed to</p>
      </div>

      <div class="projects-grid">
        <div *ngFor="let project of projects" class="project-card">
          <div class="project-content">
            <h2>{{ project.title }}</h2>
            <p class="project-excerpt">{{ project.excerpt }}</p>
            <a [routerLink]="['/projects', project.slug]" class="view-project">
              {{ i18n.t('projects.viewProject') }} →
            </a>
          </div>
        </div>
      </div>

      <div *ngIf="projects.length === 0" class="empty-state">
        <p>{{ i18n.t('projects.noProjectsYet') }}</p>
      </div>
    </div>
  `,
  styles: [`
    .projects-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 5rem 2rem 4rem;
    }

    .projects-header {
      margin-bottom: 2.5rem;
    }

    .projects-header h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin: 0;
      line-height: 1.2;
    }

    .subtitle {
      font-size: 1rem;
      color: var(--text-secondary, #666);
      margin-top: 0.75rem;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2.5rem;
      margin-bottom: 3rem;
    }

    .project-card {
      padding: 2rem;
      border: 1px solid var(--border-color, #dfe3ea);
      border-radius: 14px;
      transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
      background: var(--bg-secondary, #fff);
      box-shadow: var(--shadow, 0 8px 24px rgba(15, 23, 42, 0.06));
    }

    .project-card:hover {
      border-color: var(--accent-primary, #2c7be5);
      box-shadow: var(--shadow-lg, 0 18px 38px rgba(15, 23, 42, 0.12));
      transform: translateY(-4px);
    }

    .project-content {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .project-card h2 {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0 0 1rem 0;
      line-height: 1.3;
    }

    .project-excerpt {
      color: var(--text-secondary, #666);
      margin: 0 0 1.5rem 0;
      line-height: 1.6;
      font-size: 1rem;
      flex-grow: 1;
    }

    .view-project {
      color: var(--accent-primary, #2c7be5);
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      display: inline-block;
      align-self: flex-start;
    }

    .view-project:hover {
      color: var(--text-primary, #111827);
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
      color: var(--text-secondary, #666);
      font-size: 1.1rem;
    }

    @media (max-width: 768px) {
      .projects-container {
        padding: 2rem 1rem;
      }

      .projects-header h1 {
        font-size: 2rem;
      }

      .projects-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
    }
  `]
})
export class ProjectsComponent implements OnInit {
  protected i18n = inject(I18nService);
  private readonly contentService = inject(ContentService);
  
  projects: ContentItem[] = [];

  ngOnInit(): void {
    this.contentService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }
}
