import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentService, ContentItem } from '../../services/content.service';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="blog-container">
      <div class="blog-header">
        <h1>{{ i18n.t('blog.title') }}</h1>
        <p class="subtitle">Thoughts, insights, and articles about web development</p>
      </div>

      <div class="posts-grid">
        <article *ngFor="let post of posts" class="post-card">
          <time *ngIf="post.date" class="post-date">{{ post.date }}</time>
          <h2>{{ post.title }}</h2>
          <p class="post-excerpt">{{ post.excerpt }}</p>
          <a [routerLink]="['/blog', post.slug]" class="read-more">
            {{ i18n.t('blog.readMore') }} →
          </a>
        </article>
      </div>

      <div *ngIf="posts.length === 0" class="empty-state">
        <p>{{ i18n.t('blog.noPostsYet') }}</p>
      </div>
    </div>
  `,
  styles: [`
    .blog-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 6rem 2rem 4rem;
    }

    .blog-header {
      margin-bottom: 2.75rem;
      padding: 2rem;
      border: 1px solid var(--border-color);
      border-radius: 16px;
      background: var(--bg-secondary);
      box-shadow: none;
    }

    .blog-header h1 {
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 800;
      margin: 0;
      line-height: 1.2;
      letter-spacing: -0.05em;
    }

    .subtitle {
      font-size: 1rem;
      color: var(--text-secondary, #666);
      margin-top: 0.75rem;
      max-width: 46rem;
    }

    .posts-grid {
      display: grid;
      gap: 2.5rem;
      margin-bottom: 3rem;
    }

    .post-card {
      padding: 1.6rem 1.75rem;
      border: 1px solid var(--border-color, #dfe3ea);
      border-radius: 14px;
      background: var(--bg-secondary);
      box-shadow: none;
      transition: border-color 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease;
    }

    .post-card:hover {
      transform: translateY(-4px);
      border-color: var(--accent-primary, #2c7be5);
      box-shadow: var(--shadow, 0 18px 38px rgba(15, 23, 42, 0.12));
    }

    .post-date {
      display: block;
      font-size: 0.78rem;
      color: var(--accent-primary, #666);
      margin-bottom: 0.7rem;
      font-family: var(--font-label, monospace);
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    .post-card h2 {
      font-size: 1.75rem;
      font-weight: 800;
      margin: 0.25rem 0 0.5rem;
      line-height: 1.15;
      letter-spacing: -0.04em;
    }

    .post-excerpt {
      color: var(--text-secondary, #666);
      margin: 1rem 0;
      line-height: 1.6;
      font-size: 1rem;
    }

    .read-more {
      color: var(--accent-primary, #2c7be5);
      text-decoration: none;
      font-weight: 600;
      transition: all 0.22s ease;
      display: inline-block;
    }

    .read-more:hover {
      color: var(--text-primary, #111827);
      transform: translateX(4px);
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
      color: var(--text-secondary, #666);
      font-size: 1.1rem;
    }

    @media (max-width: 768px) {
      .blog-container {
        padding: 5rem 1rem 2rem;
      }

      .blog-header h1 {
        font-size: 2rem;
      }

      .post-card {
        padding: 1.5rem 0;
      }

      .post-card h2 {
        font-size: 1.4rem;
      }
    }
  `]
})
export class BlogComponent implements OnInit {
  protected i18n = inject(I18nService);
  private readonly contentService = inject(ContentService);
  
  posts: ContentItem[] = [];

  ngOnInit(): void {
    this.contentService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }
}
