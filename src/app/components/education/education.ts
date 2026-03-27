import { Component } from '@angular/core';
import { PROFILE_DATA } from '../../data/profile.data';
import { Education, Certification, Language } from '../../models/profile.model';

@Component({
  selector: 'app-education',
  templateUrl: './education.html',
  styleUrl: './education.scss'
})
export class EducationComponent {
  education: Education[] = PROFILE_DATA.education;
  certifications: Certification[] = PROFILE_DATA.certifications;
  aptitudes: string[] = PROFILE_DATA.aptitudes;
  languages: Language[] = PROFILE_DATA.languages;
}
