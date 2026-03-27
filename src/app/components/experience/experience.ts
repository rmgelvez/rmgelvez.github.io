import { Component } from '@angular/core';
import { PROFILE_DATA } from '../../data/profile.data';
import { Experience } from '../../models/profile.model';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.html',
  styleUrl: './experience.scss'
})
export class ExperienceComponent {
  experiences: Experience[] = PROFILE_DATA.experience;
}
