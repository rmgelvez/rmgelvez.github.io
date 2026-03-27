import { Component } from '@angular/core';
import { PROFILE_DATA } from '../../data/profile.data';
import { SocialLink } from '../../models/profile.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class FooterComponent {
  socialLinks: SocialLink[] = PROFILE_DATA.socialLinks;
  currentYear = new Date().getFullYear();
  name = PROFILE_DATA.name;
}
