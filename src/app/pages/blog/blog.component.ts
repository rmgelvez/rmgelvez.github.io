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
      padding: 5rem 2rem 4rem;
    }

    .blog-header {
      margin-bottom: 2.5rem;
    }

    .blog-header h1 {
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

    .posts-grid {
      display: grid;
      gap: 2.5rem;
      margin-bottom: 3rem;
    }

    .post-card {
      padding: 1.5rem 0;
      border-bottom: 1px solid var(--border-color, #dfe3ea);
      transition: border-color 0.2s ease, transform 0.2s ease;
    }

    .post-card:hover {
      transform: translateX(4px);
      border-color: var(--accent-primary, #2c7be5);
    }

    .post-date {
      display: block;
      font-size: 0.9rem;
      color: var(--text-secondary, #666);
      margin-bottom: 0.5rem;
    }

    .post-card h2 {
      font-size: 1.65rem;
      font-weight: 700;
      margin: 0.5rem 0;
      line-height: 1.3;
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
      transition: all 0.3s ease;
      display: inline-block;
    }

    .read-more:hover {
      color: var(--text-primary, #111827);
    }

    .empty-state {
      text-align: center;
      padding: 3rem;
      color: var(--text-secondary, #666);
      font-size: 1.1rem;
    }

    @media (max-width: 768px) {
      .blog-container {
        padding: 2rem 1rem;
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
