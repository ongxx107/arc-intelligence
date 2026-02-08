import { booleanAttribute, ChangeDetectionStrategy, Component, computed, effect, input, model, viewChild } from '@angular/core';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { isNamedOptionGroup, NgtMatIconPipe, NgtNamedOptionGroup, NgtOption, NgtSvgIconPipe, NgtIconPosition } from '@corporate/ng-base-components/src/lib/ngt-utilities';
import { NgtButtonComponent  } from '@corporate/ng-base-components/src/lib/ngt-button';
import { NgtButtonStyling , NgtButtonScale, NgtButtonShape, NgtButtonType  } from '@corporate/ng-base-components/src/lib/ngt-utilities';

/**
 * Button with select dropdown:
 * 
 *  - button inputs:
 * @param {NgtButtonStyling} styling - color palette (primary, secondary, tertiary*, stroked) *default: tertiary
 * @param {NgtButtonShape} shape - outer shape (rect, square*, round, long=parent width)
 * @param {NgtButtonScale} scale - size/height of the button (medium*, small, [xsmall - only for square or round shape])
 * @param {NgtButtonType} type - html button type. Default: "text", others: "email", "password", "number"
 * @param {boolean} disabled - disabled state
 * @param {NgtIconPosition} iconPosition - icon before (text) content: "leading", icon after text: "trailing"
 * @param {string} matIcon - mat-icon name (can also be set via tag content)
 * @param {string} svgIcon - svg icon name registered to NgtSvgRegistryService (only one icon possible via parameters)
 * @param {boolean} menuArrow - adds a dropdown arrow to the right of the button
 *  - select inputs:
 * @param {boolean} isReadonly - set options to readonly
 * @param {string | boolean} nullOption - add a reset to unselected option with a label (string) or as empty option ("true")
 * @param {boolean} multiple - allow multiple options to be selected at once (checkbox style)
 * @param {NgtNamedOptionGroup[] | NgtOption[]} options - options that can be selected (NgtOptionGroup[] or NgtOption[])
 *  - model:
 * @param {string| string[] | null} value - model as input and output to track the selected option (or options if multiple is set)
 */
@Component({
  selector: 'ngt-filter-button',
  imports: [NgtButtonComponent, MatSelectModule, MatIconModule, NgtMatIconPipe, NgtSvgIconPipe],
  templateUrl: './ngt-filter-button.component.html',
  styleUrl: './ngt-filter-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgtFilterButtonComponent {
  // Button inputs
  // style inputs
  styling = input<NgtButtonStyling>("tertiary");
  shape = input<NgtButtonShape>("rect");
  scale = input<NgtButtonScale>("standard");
  // icon inputs
  matIcon = input<string>();
  svgIcon = input<string>();
  iconPosition = input<NgtIconPosition>("leading");
  // optional dropdown
  menuArrow = input(false, { transform: booleanAttribute });
  showCounter = input(false, { transform: booleanAttribute });
// states
  type = input<NgtButtonType>("button");
  disabled = input(false, { transform: booleanAttribute })

  // Select inputs
  // style
  height = input<"small"|"medium">("medium");
  // states
  isReadonly = input(false, {transform: booleanAttribute});

  // dropdown style
  panelWidth =  input<string | number | null>(null);
  // setup
  multiple=input(false, {transform: booleanAttribute});
  nullOption = input<string>();
  // content
  options = input<NgtNamedOptionGroup[] | NgtOption[]>([]);
  isNamedOptionGroup = isNamedOptionGroup;

  // chosen value
  value = model<string|string[]>();

  readonly matSelect = viewChild.required<MatSelect>('ngtselectmenu');
  protected ngtButton = viewChild.required<NgtButtonComponent>('ngtselectbutton');

  constructor(){
    if(this.value()===undefined) this.value.set(this.multiple()? []: '');

  }

  counter = computed(() => {
      if (!this.value()) {
        return 0;
      }else  if (typeof this.value() === 'string') {
        return 1;
      }else {
       return this.value()!.length;
      }
    });

}
