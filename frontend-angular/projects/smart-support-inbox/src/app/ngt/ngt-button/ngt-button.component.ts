import { booleanAttribute, Component, computed, ElementRef, inject, input, model, output, signal, viewChild } from '@angular/core';
import { MatButton, MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgtButtonInterface, NgtButtonScale, NgtButtonShape, NgtButtonStyling, NgtButtonType} from '@corporate/ng-base-components/src/lib/ngt-utilities';
import { NgtIconPosition } from '@corporate/ng-base-components/src/lib/ngt-utilities';
import { NgTemplateOutlet } from '@angular/common';
import { MatMenuModule, MatMenuPanel } from '@angular/material/menu';
import { ColorSchemeClass, NgtThemeService } from '@corporate/ng-base-components/src/lib/ngt-themes';
import { NgtBadgeComponent } from '@corporate/ng-base-components/src/lib/ngt-badge';
import { Subscription } from 'rxjs';

/**
 * Button component for actions, menus, and toggles.
 *
 * ### Inputs:
 * @param {NgtButtonStyling} styling Color palette (primary, secondary, tertiary, stroked). Default: "default".
 * @param {NgtButtonShape} shape Outer shape (rect, square, round, long=parent width). Default: "rect".
 * @param {NgtButtonScale} scale Size/height of the button (standard, small, xsmall). Default: "standard".
 * @param {NgtButtonType} type HTML button type ("button", "reset", "submit"). Default: "button".
 * @param {boolean} disabled Disabled state. Default: false.
 * @param {NgtIconPosition} iconPosition Icon before (text) content: "leading", icon after text: "trailing". Default: "leading".
 * @param {string} matIcon Material icon name (optional).
 * @param {string} svgIcon SVG icon name registered to NgtSvgRegistryService (optional).
 * @param {boolean} selectable Adds selected state to the button (for dropdowns). Default: false.
 * @param {MatMenuPanel} matMenuTriggerFor Reference to external MatMenu panel (optional).
 * @param {boolean} menuArrow Adds a dropdown arrow to the right of the button. Default: false.
 *
 * ### Model:
 * @param {boolean} selected Model as input and output to track the selected state (only if selectable=true).
 * @param {number | null} counter Counter badge value (optional).
 *
 * ### Internal:
 * @param {NgtBadgeComponent} badgeComponent Reference to badge component (if used).
 *
 * @example <ngt-button [styling]="'primary'" [matIcon]="'add'">Add</ngt-button>
 */
@Component({
  selector: 'ngt-button',
  imports: [
    MatButtonModule,
    MatIconModule,
    NgTemplateOutlet,
    MatMenuModule,
    NgtBadgeComponent,
  ],
  templateUrl: './ngt-button.component.html',
  styleUrl: './ngt-button.component.scss',
  host: {
    "[class.ngt-max-width]": "shape() === 'long'",
  },
})
export class NgtButtonComponent implements NgtButtonInterface {
  // style inputs
  styling = input<NgtButtonStyling>("default");
  shape = input<NgtButtonShape>("rect");
  scale = input<NgtButtonScale>("standard");
  // icon inputs
  matIcon = input<string>();
  svgIcon = input<string>();
  iconPosition = input<NgtIconPosition>("leading");
  // optional dropdown
  matMenuTriggerFor = input<MatMenuPanel>();
  menuArrow = input(false, { transform: booleanAttribute });
  counter = model<number|null>(null);
  // states
  type = input<NgtButtonType>("button");
  disabled = input(false, { transform: booleanAttribute });
  selectable = input(false, { transform: booleanAttribute });
  selected = model<boolean>(false);
  ngtClick = output<MouseEvent>();

  // color scheme and dropdown arrow
  readonly elementRef = inject(ElementRef);
  protected themeService = inject(NgtThemeService);
  readonly themeMode = signal<ColorSchemeClass>(ColorSchemeClass.LIGHT);
  protected menuArrowIcon = computed(() => this.selected() ? 'keyboard_arrow_up' : 'keyboard_arrow_down');
  private menuCloseSubscription: Subscription|undefined;

  ngAfterViewChecked(): void {
    // element ref or child elements are only available in or after the view init lifecycle hook
    // also, the themeMode needs to be changed when the service changes the color scheme mode
    this.themeMode.set(this.themeService.getClosestParentColorSchemeClass(this.elementRef));
    
    this.menuCloseSubscription?.unsubscribe();
    this.menuCloseSubscription = this.matMenuTriggerFor()?.close.subscribe(() => {
      // this.selected.set(false);
    });
  }

  ngOnDestroy():void{
    this.menuCloseSubscription?.unsubscribe();
  }

  //classes
  private ngtButtonClassOf = (val: string) => "ngt-" + val + "-button";
  private styleMapping = (styling: string) => {
    if (this.styling() === "default") {
      if (this.scale() === "mini") return "tertiary";
      if (this.shape() === "round") return "secondary";
      return "primary";
    }
    return this.styling();
  }
  protected buttonClasses = computed(() => [
    this.ngtButtonClassOf(this.styleMapping(this.styling())),
    this.ngtButtonClassOf(this.shape()),
    this.ngtButtonClassOf(this.scale()),
    this.disabled() ? null : (this.selected() ? this.ngtButtonClassOf("selected") : null)
  ].join(" "));

  // focus on input 
  readonly matButton = viewChild<MatButton|MatIconButton>('ngtbutton');
  focus() {
    if (this.matButton()) this.matButton()!.focus();
  }

  // outputs and selected state 
  onClick(event: MouseEvent) {
    if (this.disabled()) { return; }
    if (this.selectable()) {
      this.selected.set(!this.selected());
    } else {
      this.focus();
    }
    this.ngtClick.emit(event);
  }

  deselect() {
    this.selected.set(false);
  }
}
