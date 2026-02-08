import { booleanAttribute, ChangeDetectionStrategy, Component, computed, effect, ElementRef, input, model, numberAttribute, OnInit, output, signal, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgtWidth, NgtInputErrorStateMatcher, NgtScale, NgtInputType, NgtInputInterface, NgtFormfieldInterface, NgtInputMode } from '@corporate/ng-base-components/src/lib/ngt-utilities';
import { debounceTime, Subscription } from 'rxjs';
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';


/**
 * NgtInputFieldComponent
 *
 * An input field component with support for labels, icons, validation, and custom display modes.
 *
 * ### Inputs
 * @param {string | number | null} value Two-way binding of the input value. Default: null.
 * @param {FormControl} formControl The form control for the input. Default: new FormControl().
 * @param {NgtInputType} type The input type ('number', 'text', 'time', 'email', 'tel', 'password'). Default: 'text'.
 * @param {string} placeholder Placeholder text. Default: ''.
 * @param {MatAutocomplete | null} matAutocomplete Autocomplete instance. Default: null.
 * @param {string} label Label for the input. Required.
 * @param {NgtInputMode} mode Input mode. Default: 'normal'.
 * @param {NgtScale} scale Input scale. Default: 'normal'.
 * @param {NgtWidth} width Input width. Default: 'auto'.
 * @param {string | null} matIconPrefix Material icon prefix. Default: null.
 * @param {string | null} prefix Prefix text. Default: null.
 * @param {string | null} unit Suffix at the end of the field. Default: null.
 * @param {string | null} matIcon Material icon at the end of the field. Default: null.
 * @param {string | null} svgIcon SVG icon at the end of the field. Default: null.
 * @param {boolean} required Whether the field is required. Default: false.
 * @param {number} maxLength Maximum input length. Default: 0.
 * @param {number} min Minimum value (for number type). Default: undefined.
 * @param {number} max Maximum value (for number type). Default: undefined.
 * @param {string | null} helperText Helper text for the field. Default: null.
 * @param {string} errorText Error text for the field. Default: derived from helperText.
 *
 * ### Outputs
 * @param {void} iconClick Event emitted when the icon is clicked.
 * @param {void} iconHover Event emitted when the icon is hovered.
 *
 * ### Model
 * @param {FormControl} formControl The form control instance.
 * @param {Subscription | null} valueSubscription Subscription to value changes.
 * @param {NgtInputErrorStateMatcher} errorStateMatcher Error state matcher instance.
 * 
 * ### Internal
 * @param {boolean} focused Signal for input focus state.
 * @param {boolean} confirmed Signal for confirmation state.
 * @param {ElementRef<HTMLInputElement>} idInput Reference to the input element.
 *
 * ### Methods
 * @param {function} focus Focuses the input element.
 * @param {function} blur Blurs the input element.
 *
 * @example
 * <ngt-input-field
 *   [label]="'Email'"
 *   [type]="'email'"
 *   [placeholder]="'Enter your email'"
 *   [(value)]="emailValue"
 *   [required]="true">
 * </ngt-input-field>
 */
@Component({
  selector: 'ngt-input-field',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIcon,
    MatTooltipModule,
    MatAutocompleteModule
],
  templateUrl: './ngt-input-field.component.html',
  styleUrl: './ngt-input-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgtInputFieldComponent implements OnInit,
  NgtInputInterface, NgtFormfieldInterface {
  
  // NgtInputInterface
  value = model<string | number | null >(null);
  formControl = model<FormControl>(new FormControl()) ;
  valueSubscription: Subscription|null = null;
  type = input<NgtInputType>('text');
  placeholder = input<string>('');
  matAutocomplete = input<MatAutocomplete|null>(null);

  //NgtFormFieldInterface
  label = input.required<string>();
  mode = input<NgtInputMode>('normal');
  scale = input<NgtScale>('normal');
  width = input<NgtWidth>('auto');

  //NgtFormFieldExtendedInterface
  matIconPrefix = input<string|null>(null);
  prefix = input<string | null>(null);
  unit = input<string | null>(null);
  matIcon = input<string | null>(null);
  svgIcon= input<string | null>(null);
  iconClick = output<void>();
  iconHover = output<void>();

  // NgtInputValidatorsInterface
  required = input(false, { transform: booleanAttribute });
  maxLength = input(0, { transform: numberAttribute });
  min = input<number>();
  max = input<number>()
  helperText = input<string | null>(null);
  errorStateMatcher = new NgtInputErrorStateMatcher();

  // Class interface
  focused = signal<boolean>(false);
  focusedDebounced = toSignal(toObservable(this.focused).pipe(debounceTime(200)));
  confirmed = signal<boolean>(false);
  errorText = input<string>(this.helperText() ? "! " + this.helperText() : "");

 displayedLabel = computed(() => {
    if (this.scale() === 'small') { return null; }
    return this.label();
  });

  displayedPlaceholder = computed(() => {
    if (this.scale() === 'small') {
      if (this.focused()) {
        return '';
      }
      if (this.label()) {
        if (this.required()) {
          return this.label() + '*';
        } else {
          return this.label();
        }
      }
    }
    return this.placeholder();
  });


  //change input field structure and behavior for warnings about max length 
  readonly errorTooltip = computed(() => {
    if (this.helperText() !== "") {
      return null;
    }
    return this.errorText() ? this.errorText() : null;
  });;

  constructor() {

    effect(() => {
      if (this.value() !== undefined && this.value() !== null) {
        this.formControl().setValue(String(this.value()));
        // this.formControl().updateValueAndValidity();
      }
    });

    effect(() => {
      if (this.mode() === 'readonly' || this.mode() === 'disabled') {
        this.formControl().disable();
      } else {
        this.formControl().enable();
      }
    });

    effect(() => {
      const validators = [];
      if (this.required()) validators.push(Validators.required);
      if (this.maxLength() > 0) validators.push(Validators.maxLength(this.maxLength()));
      if (this.min()) validators.push(Validators.min(this.min()!));
      if (this.max()) validators.push(Validators.max(this.max()!));
      if (this.type() && this.type() == 'email') validators.push(Validators.email); 
      // if (this.type() && this.type() == 'tel') this.validators.push(Validators.pattern());
      this.formControl().setValidators(validators);
      this.formControl().updateValueAndValidity();
    });

  }

  ngOnInit() {
    this.valueSubscription = this.formControl().valueChanges.subscribe(val => {
      this.value.set(this.typedValue(String(val || '')));
    });
  }

  ngOnDestroy() {
    if (this.valueSubscription) {
      this.valueSubscription.unsubscribe();
      this.valueSubscription = null;
    }
  }
  
  readonly idInput = viewChild<ElementRef<HTMLInputElement>>('ngtinput');

  focus(){
    this.idInput()?.nativeElement.focus();
  }

  blur(){
    this.idInput()?.nativeElement.blur();
  }

  private typedValue(value: string) {
    if (!value) {
      return '';
    }
    if (this.type() === "number" && typeof value === "string") {
      return parseFloat(value);
    }
    return value;
  }
}
