import { ChangeDetectionStrategy, Component, inject, input, Signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgtBadgeComponent, NgtStatus } from 'ng-base-components';
import { NavbarService } from '../../../service/navbar.service';

@Component({
  selector: 'tlm-navbar-button',
  imports: [
    MatIconModule,
    NgtBadgeComponent,
  ],
  templateUrl: './navbar-button.component.html',
  styleUrl: './navbar-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "(click)":"navigate()",
  }  
})
export class NavbarButtonComponent {

  navbarService = inject(NavbarService);

  matIcon = input.required<string>();
  label = input.required<string>();

  count = input<number|undefined>();
  status = input<NgtStatus|undefined>();
  statusIcon = input<string|undefined>();
  name = input<Signal<string>|undefined>();
  
}
