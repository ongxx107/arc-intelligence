import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavbarService } from '../../../service/navbar.service';

@Component({
  selector: 'tlm-navbar-panel',
  imports: [
    MatIconModule,
  ],
  templateUrl: './navbar-panel.component.html',
  styleUrl: './navbar-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[style]": "'width: ' + (navbarService.expanded() ? '280px' : '56px') + '; align-items: ' + (navbarService.expanded() ? 'stretch' : 'center')",
  }
})
export class NavbarPanelComponent {

  navbarService = inject(NavbarService);

  toggleExpanded() {
    this.navbarService.expanded.update(expanded => !expanded);
  }
}
