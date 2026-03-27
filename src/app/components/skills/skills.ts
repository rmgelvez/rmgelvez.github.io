import { Component, inject } from '@angular/core';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class SkillsComponent {
  protected readonly i18n = inject(I18nService);
  skillIconsUrl = 'https://skillicons.dev/icons?i=cs,dotnet,azure,docker,git,github,js,html,css,mongodb,angular,ts&perline=6';
}
