import { ModelSignal, InputSignal, OutputEmitterRef, Signal, InputSignalWithTransform } from "@angular/core";
import { ErrorStateMatcher } from '@angular/material/core';

import { NgtWidth } from "./ngt-sizes.model";
import { Subscription } from "rxjs";
import { FormControl } from "@angular/forms";
import { MatAutocomplete } from "@angular/material/autocomplete";

export type NgtScale = 'normal' | 'small';
export type NgtInputMode = 'normal' | 'disabled' | 'readonly';
export type NgtInputType = "text" | "number" | 'time' | "email" | "tel" | "password";

/**
 * @param {string} label descriptor of the form field. when the scale is normal, label and placeholder are displayed as usual. When the scale is small, only the label is displayed.
 * @param {NgtScale} scale height setting of the form field
 * @param {NgtWidth} width width setting of the form field
 */
export interface NgtFormfieldInterface {
  //Inputs
  label: InputSignal<string>;
  mode: InputSignal<NgtInputMode>;
  scale: InputSignal<NgtScale>;
  width: InputSignal<NgtWidth>;
}

/**
 * @param {string} matIconPrefix (optional) name of the icon at the start of the field. 
 * @param {string} prefix prefix text at the end of the field
 * @param {string} unit suffix text at the end of the field
 * @param {string} matIcon name of the icon at the end of the field. Only one of matIcon and svgIcon should be set.
 * @param {string} svgIcon name of the icon at the end of the field. Only one of matIcon and svgIcon should be set.
 * @param {void} iconClick event when the end icon is clicked
 * @param {void} iconHover event when the end icon is hovered
 */
export interface NgtFormFieldExtendedInterface {
  //Inputs
  matIconPrefix?: InputSignal<string|null>;
  prefix?: InputSignal<string | null>;
  unit: InputSignal<string | null>;
  matIcon: InputSignal<string | null>; // End Icon
  svgIcon: InputSignal<string | null>; // End Icon
  //Outputs
  iconClick: OutputEmitterRef<void>;
  iconHover: OutputEmitterRef<void>;
}

/**
 * @param {string | number} value two-way binding of the form input value
 * @param type: for the email type, the angular email validator is added
 * @param mode: enabled, readonly or disabled mode
 * @param placeholder: when the scale is normal, label and placeholder are displayed as usual. When the scale is small, only the label is displayed.
 */
export interface NgtInputInterface {
  //Models
  value: ModelSignal<any>;
  formControl?: ModelSignal<FormControl<any>>;
  valueSubscription?: Subscription|null ;
  //Inputs
  type?: InputSignal<NgtInputType>;
  placeholder: InputSignal<string>;
  matAutocomplete?: InputSignal<MatAutocomplete|null>;
}

/**
 * @param {stringified boolean} required sets the input to require content or not
 * @param {NgtType} type for the email type, the angular email validator is added
 * @param {stringified boolean} maxLength optional maximal limit for the length of the input content value
 * @param {number} min optional minimum value for number inputs
 * @param {number} max optional maximum value for number binputs
 * @param {string} helperText optional helper text. On validation error this is replaced with the error message.
 * @param {ErrorStateMatcher} errorStateMatcher error state matcher i.e. NgtErrorStateMatcher.
 */
export interface NgtInputValidatorsInterface {
  // Inputs
  required?: InputSignalWithTransform<boolean, unknown>;
  type?: InputSignal<NgtInputType>;
  maxLength?: InputSignalWithTransform<number, unknown>;
  min?: InputSignal<number>;
  max?: InputSignal<number>;
  helperText?: InputSignal<string | null>;
  // Properties
  errorStateMatcher: ErrorStateMatcher; // i.e. NgtErrorStateMatcher
}

