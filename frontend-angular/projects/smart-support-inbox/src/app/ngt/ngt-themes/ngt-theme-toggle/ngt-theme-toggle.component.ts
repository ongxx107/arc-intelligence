import { Component, computed, inject, input, model } from '@angular/core';
import { NgtThemeService } from '../ngt-theme.service';
import { ThemeSetting } from '../ngt-theme.data';
import { NgtSwitchComponent } from "@corporate/ng-base-components/src/lib/ngt-switch";

@Component({
  selector: 'ngt-theme-toggle',
  imports: [NgtSwitchComponent],
  templateUrl: './ngt-theme-toggle.component.html'
})
export class NgtThemeToggleComponent {

  themeService = inject(NgtThemeService);

  label = input<string>('dark mode');
  value = model<boolean>(this.themeService.isDarkMode());

  readonly internalValue = computed<boolean>(() => this.themeService.isDarkMode()); 

  onChange(checked: boolean) {
    if (checked) {
      this.themeService.themeSetting.set(ThemeSetting.DARK);
    } else {
      this.themeService.themeSetting.set(ThemeSetting.LIGHT);
    }
    this.value.set(checked);
  }
}
