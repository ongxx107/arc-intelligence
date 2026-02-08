import { Component, inject } from '@angular/core';
import { NgtThemeService } from './../ngt-theme.service';

/**
 * Theme container component for providing theme context.
 *
 * @example <ngt-theme-container></ngt-theme-container>
 */
@Component({
  selector: 'ngt-theme-container',
  standalone: true,
  imports: [], 
  templateUrl: './ngt-theme-container.component.html',
})
export class NgtThemeContainerComponent {
  themeService = inject(NgtThemeService);
}
