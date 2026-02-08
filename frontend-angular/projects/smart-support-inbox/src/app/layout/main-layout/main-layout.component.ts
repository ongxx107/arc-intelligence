import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavbarComponent } from '../navbars/navbar/navbar.component';


@Component({
  selector: 'tlm-main-layout',
  imports: [
    RouterModule,
    MatIconModule,
    MatSidenavModule,
    NavbarComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent {
  title = input('ARC-Intelligence');
  environment = environment;
}
