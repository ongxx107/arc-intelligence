import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { NavbarPanelComponent } from '../navbar-panel/navbar-panel.component';
import { NavbarButtonComponent } from '../navbar-button/navbar-button.component';
import { NavbarService } from '../../../service/navbar.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tlm-navbar',
  imports: [
    RouterLink,
    MatIconModule,
    MatMenuModule,
    NavbarPanelComponent,
    NavbarButtonComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {

  navbarService = inject(NavbarService);

}
