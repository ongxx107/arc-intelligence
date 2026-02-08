import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { NgtButtonComponent} from 'ng-base-components';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

@Component({
  selector: 'tdp-root',
  standalone: true,
  imports: [
    MatIconModule,
    NgtButtonComponent,
    MatSidenavModule,
    MainLayoutComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'dark-mode'
  }
})
export class AppComponent {
  title = 'Smart Support Inbox';

  authenticated = signal(false);
}
