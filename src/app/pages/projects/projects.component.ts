import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentService, ContentItem } from '../../services/content.service';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export default class ProjectsComponent implements OnInit {
  protected i18n = inject(I18nService);
  private readonly contentService = inject(ContentService);
  
  projects: ContentItem[] = [];

  ngOnInit(): void {
    this.contentService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }
}
