import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { SecurityStore } from '../../shared/security/security-store';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  standalone: true,
  imports: [MatButtonModule, RouterLink, MatBadgeModule],
})
export class SidemenuComponent {
  securityStore = inject(SecurityStore);
}
