import { Component, signal, OnInit, inject } from '@angular/core';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class HeroComponent implements OnInit {
  protected readonly i18n = inject(I18nService);
  displayedName = signal('');
  showCursor = signal(true);

  ngOnInit(): void {
    const fullName = this.i18n.profile().name;
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullName.length) {
        this.displayedName.set(fullName.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => this.showCursor.set(false), 2500);
      }
    }, 80);
  }

  scrollToNext(): void {
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
  }
}
