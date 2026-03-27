import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PROFILE_DATA } from '../../data/profile.data';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class HeroComponent {
  profile = PROFILE_DATA;
  aboutHtml = toSignal(inject(ContentService).getAboutHtml(), { initialValue: '' });
}
