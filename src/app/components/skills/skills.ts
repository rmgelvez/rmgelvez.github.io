import { Component } from '@angular/core';
import { PROFILE_DATA } from '../../data/profile.data';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class SkillsComponent {
  skills = PROFILE_DATA.skills;
  skillIconsUrl = 'https://skillicons.dev/icons?i=cs,dotnet,azure,docker,git,github,js,html,css,mongodb,angular,ts&perline=6';
}
