import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ContentItem, ContentService } from '../../services/content.service';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-content-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './content-detail.html',
  styleUrl: './content-detail.scss'
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