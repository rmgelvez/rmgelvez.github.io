import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero';
import { SkillsComponent } from '../../components/skills/skills';
import { ExperienceComponent } from '../../components/experience/experience';
import { EducationComponent } from '../../components/education/education';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    SkillsComponent,
    ExperienceComponent,
    EducationComponent
  ],
  templateUrl: './home.html'
})
export default class HomeComponent {}
