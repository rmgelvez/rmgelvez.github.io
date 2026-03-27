import { Component, signal, OnInit } from '@angular/core';
import { PROFILE_DATA } from '../../data/profile.data';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class HeroComponent implements OnInit {
  profile = PROFILE_DATA;
  displayedName = signal('');
  showCursor = signal(true);

  ngOnInit(): void {
    const fullName = this.profile.name;
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
