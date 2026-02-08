import { ElementRef, Injectable, computed, signal } from '@angular/core';
import { ThemeSetting, ColorSchemeClass } from './ngt-theme.data';

@Injectable({
  providedIn: 'root'
})
export class NgtThemeService {
  private systemDarkMode = signal(false);
  themeSetting = signal(ThemeSetting.SYSTEM);
  
  isDarkMode = computed(() => {
    if (this.themeSetting() === ThemeSetting.SYSTEM) {
      if (this.systemDarkMode()) {
        return true;
      }
      return false;
    }
    if (this.themeSetting() === ThemeSetting.DARK) {
      return true;
    }
    return false;
  });

  colorSchemeClass = computed(() => this.isDarkMode()? ColorSchemeClass.DARK : ColorSchemeClass.LIGHT);

  constructor() {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.systemDarkMode.set(darkModeMediaQuery.matches);
    darkModeMediaQuery.addEventListener("change", (event) => {
      this.systemDarkMode.set(event.matches);
    });
  }

   getClosestParentColorSchemeClass(elementRef: ElementRef){
      const nativeHost = elementRef.nativeElement;
      const lightParent = nativeHost?.closest(".light-mode");
      const darkParent = nativeHost?.closest(".dark-mode");
      if(darkParent){
        if(!lightParent) return ColorSchemeClass.DARK;
        if (!darkParent.contains(lightParent)) return ColorSchemeClass.DARK;
      }
      return ColorSchemeClass.LIGHT;
    }
  
}
