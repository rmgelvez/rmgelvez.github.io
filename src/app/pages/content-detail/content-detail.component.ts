import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContentItem, ContentService } from '../../services/content.service';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-content-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="content-detail">
      <div class="content-detail__container">
        <a class="content-detail__back" [routerLink]="backLink">
          ← {{ backLabel }}
        </a>

        <ng-container *ngIf="item; else missingContent">
          <header class="content-detail__header">
            <p *ngIf="item.date" class="content-detail__meta">{{ item.date }}</p>
            <h1>{{ item.title }}</h1>
            <p class="content-detail__excerpt">{{ item.excerpt }}</p>
          </header>

          <article class="content-detail__article" [innerHTML]="item.html"></article>
        </ng-container>

        <ng-template #missingContent>
          <section class="content-detail__empty">
            <h1>{{ missingTitle }}</h1>
            <p>{{ missingMessage }}</p>
            <a class="content-detail__back content-detail__back--inline" [routerLink]="backLink">
              ← {{ backLabel }}
            </a>
          </section>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .content-detail {
      padding: 5rem 0 4rem;
    }

    .content-detail__container {
      width: min(860px, calc(100% - 2rem));
      margin: 0 auto;
    }

    .content-detail__back {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      color: var(--accent-primary, #2c7be5);
      text-decoration: none;
      font-weight: 600;
      margin-bottom: 1.5rem;
    }

    .content-detail__back:hover {
      color: var(--text-primary, #1f2937);
    }

    .content-detail__back--inline {
      margin-bottom: 0;
      margin-top: 1rem;
    }

    .content-detail__header {
      padding: 0 0 1.75rem;
      border-bottom: 1px solid var(--border-color, #d7e0ea);
      margin-bottom: 2rem;
    }

    .content-detail__meta {
      font-size: 0.95rem;
      color: var(--text-tertiary, #7b8794);
      margin-bottom: 0.75rem;
    }

    .content-detail__header h1 {
      margin: 0;
      font-size: clamp(2.1rem, 4vw, 3rem);
      line-height: 1.15;
    }

    .content-detail__excerpt {
      margin-top: 1rem;
      color: var(--text-secondary, #526072);
      font-size: 1.1rem;
      max-width: 60ch;
    }

    .content-detail__article {
      color: var(--text-primary, #1f2937);
      line-height: 1.75;
      font-size: 1.08rem;
    }

    .content-detail__article :where(h2, h3, h4) {
      margin: 2rem 0 0.9rem;
      line-height: 1.2;
    }

    .content-detail__article :where(p, ul, ol, pre, blockquote) {
      margin: 0 0 1.1rem;
    }

    .content-detail__article ul,
    .content-detail__article ol {
      padding-left: 1.4rem;
    }

    .content-detail__article a {
      color: var(--accent-primary, #2c7be5);
      text-decoration: none;
    }

    .content-detail__article a:hover {
      text-decoration: underline;
    }

    .content-detail__article pre {
      overflow-x: auto;
      padding: 1rem 1.1rem;
      border-radius: 14px;
      background: var(--bg-secondary, #ffffff);
      border: 1px solid var(--border-color, #d7e0ea);
      box-shadow: var(--shadow, 0 10px 24px rgba(15, 23, 42, 0.06));
    }

    .content-detail__article code {
      font-family: var(--font-mono, 'JetBrains Mono', monospace);
      font-size: 0.95em;
    }

    .content-detail__article :not(pre) > code {
      padding: 0.15rem 0.35rem;
      border-radius: 6px;
      background: var(--bg-tertiary, #eaf0f7);
    }

    .content-detail__article blockquote {
      padding: 0.25rem 0 0.25rem 1rem;
      border-left: 3px solid var(--accent-primary, #2c7be5);
      color: var(--text-secondary, #526072);
    }

    .content-detail__empty {
      padding: 2rem 0;
    }

    .content-detail__empty h1 {
      margin-bottom: 0.5rem;
      font-size: 2rem;
    }

    .content-detail__empty p {
      color: var(--text-secondary, #526072);
    }

    @media (max-width: 768px) {
      .content-detail {
        padding: 4.25rem 0 3rem;
      }

      .content-detail__container {
        width: min(100% - 1.5rem, 860px);
      }

      .content-detail__article {
        font-size: 1rem;
      }
    }
  `]
})
export class ContentDetailComponent implements OnInit {
  protected readonly i18n = inject(I18nService);
  private readonly route = inject(ActivatedRoute);
  private readonly contentService = inject(ContentService);

  item?: ContentItem;
  backLink = '/blog';
  backLabel = 'Back to blog';
  missingTitle = 'Content not found';
  missingMessage = 'The requested content could not be loaded.';

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    const contentType = this.route.snapshot.data['type'] as 'post' | 'project';

    this.backLink = contentType === 'project' ? '/projects' : '/blog';
    this.backLabel = contentType === 'project'
      ? this.i18n.t('projects.title', 'Projects')
      : this.i18n.t('blog.title', 'Blog');
    this.missingTitle = contentType === 'project' ? 'Project not found' : 'Post not found';
    this.missingMessage = contentType === 'project'
      ? 'The selected project could not be loaded.'
      : 'The selected post could not be loaded.';

    const request = contentType === 'project'
      ? this.contentService.getProjectBySlug(slug)
      : this.contentService.getPostBySlug(slug);

    request.subscribe(item => {
      this.item = item;
    });
  }
}