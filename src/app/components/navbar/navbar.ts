import { Component, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {
  protected i18n = inject(I18nService);
  private readonly router = inject(Router);
  private readonly themeService = inject(ThemeService);
  theme = this.themeService.theme;
  activeSection = signal('hero');
  menuOpen = signal(false);

  sections = [
    { id: 'hero', label: 'nav.home', route: null },
    { id: 'skills', label: 'nav.skills', route: null },
    { id: 'experience', label: 'nav.experience', route: null },
    { id: 'education', label: 'nav.education', route: null },
    { id: 'blog', label: 'nav.blog', route: '/blog' },
    { id: 'projects', label: 'nav.projects', route: '/projects' }
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    const scrollSections = this.sections.filter(s => s.route === null);
    for (const section of [...scrollSections].reverse()) {
      const el = document.getElementById(section.id);
      if (el && el.getBoundingClientRect().top <= 100) {
        this.activeSection.set(section.id);
        break;
      }
    }
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  scrollTo(id: string): void {
    this.menuOpen.set(false);
    const target = document.getElementById(id);

    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    this.router.navigateByUrl('/').then(() => {
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    });
  }

  getLabel(label: string): string {
    return this.i18n.t(label, label);
  }
}
