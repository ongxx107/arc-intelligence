import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, model, output, signal, viewChild } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ColorSchemeClass, NgtThemeService } from "@corporate/ng-base-components/src/lib/ngt-themes";
import { NgtInputFieldComponent } from "@corporate/ng-base-components/src/lib/ngt-input-field";
import { NgtFormfieldInterface, NgtInputInterface, NgtInputType, NgtScale, getKeyFromOptions, isNamedOptionGroup, NgtInputMode, NgtWidth,
  NgtOptionsInterface, NgtNamedOptionGroup, NgtOption  } from "@corporate/ng-base-components/src/lib/ngt-utilities";

/**
 * Autocomplete dropdown component for selecting options with input field.
 *
 * ### Inputs:
 * @param {NgtInputType} type Input type (default: 'text').
 * @param {string} placeholder Placeholder text for the input (default: '').
 * @param {NgtOption[] | NgtNamedOptionGroup[]} options List of selectable options (default: []).
 * @param {string} panelClass CSS class for the autocomplete panel (default: '').
 * @param {NgtWidth} panelWidth Width of the autocomplete panel (default: 'auto').
 * @param {string} label Label for the form field (default: '').
 * @param {NgtInputMode} mode Input mode (default: 'normal').
 * @param {NgtScale} scale Input scale/size (default: 'normal').
 * @param {NgtWidth} width Width of the input (default: 'auto').
 * @param {string | null} matIconPrefix Material icon prefix (default: null).
 * @param {string | null} unit Unit label (default: null).
 * @param {string | null} matIcon Material icon (default: null).
 * @param {string | null} svgIcon SVG icon (default: null).
 *
 * ### Outputs:
 * @param {string} valueKey Emits the key of the selected value.
 * @param {void} iconClick Emits when the icon is clicked.
 * @param {void} iconHover Emits when the icon is hovered.
 *
 * ### Model:
 * @param {string | number | null} value The value of the input.
 *
 * ### Internal:
 * @param {boolean} confirmed Whether the selection is confirmed.
 * @param {NgtInputFieldComponent} ngtInput Reference to the input field component.
 * @param {ElementRef} ngtAutocomplete Reference to the autocomplete element.
 * @param {ColorSchemeClass} themeMode Current color scheme class.
 *
 * @example <ngt-autocomplete-dropdown [options]="myOptions" (valueKey)="onValueKey($event)"></ngt-autocomplete-dropdown>
 */
@Component({
  selector: 'ngt-autocomplete-dropdown',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    NgtInputFieldComponent
],
  templateUrl: './ngt-autocomplete-dropdown.component.html',
  styleUrl: './ngt-autocomplete-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgtAutocompleteComponent 
  implements NgtInputInterface, NgtOptionsInterface, NgtFormfieldInterface {

  // NgtInputInterface
  value = model<string | number | null >(null);
  type = input<NgtInputType>('text');
  placeholder = input<string>('');

  // NgtOptionsInterface
  options = input<NgtOption[] | NgtNamedOptionGroup[]>([]);
  valueKey = output<string>();
  panelClass = input<string>('');
  panelWidth = input<NgtWidth>('auto');
  isNamedOptionGroup = isNamedOptionGroup;

  //NgtFormFieldInterface
  label = input<string>('');
  mode = input<NgtInputMode>('normal');
  scale = input<NgtScale>('normal');
  width = input<NgtWidth>('auto');

  //NgtFormFieldExtendedInterface
  matIconPrefix = input<string|null>(null);
  unit = input<string | null>(null);
  matIcon = input<string | null>(null);
  svgIcon= input<string | null>(null);
  iconClick = output<void>();
  iconHover = output<void>();

  //Class interface
  confirmed = signal(false);
 
  // panel color scheme
  protected elRef = inject(ElementRef);
  protected themeService = inject(NgtThemeService);
  protected themeMode = signal<ColorSchemeClass>(ColorSchemeClass.LIGHT);

  ngAfterViewChecked(): void { 
    this.themeMode.set(this.themeService.getClosestParentColorSchemeClass(this.elRef));
  }

  readonly ngtInput = viewChild(NgtInputFieldComponent);
  readonly ngtAutocomplete = viewChild<ElementRef>('ngtauto');

  onKeydown(event: KeyboardEvent){ 
  
    if(event.key === 'Enter') {
      this.confirmed.set(true);
      this.valueKey.emit(getKeyFromOptions(this.value() as string, this.options()));
      this.ngtAutocomplete()?.nativeElement.blur();
      this.ngtInput()?.blur();
    }else {
      this.confirmed.set(false);
    }
  }

}

