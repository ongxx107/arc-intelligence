import { FormControl, FormGroupDirective, NgForm, ValidatorFn, Validators } from '@angular/forms';

import { ErrorStateMatcher } from '@angular/material/core';

import { NgtInputValidatorsInterface } from './ngt-input.data';


/** Error state matcher of the ngt library.
 *  @function isErrorState returns true when invalid control is dirty, touched, or submitted. 
 */
export class NgtInputErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/** Collect standard angular and custom validators in an array
 * 
 * @param validatorSettings 
 * @param customValidators 
 * @returns 
 */
export function prefillInputValidators(
  validatorSettings: NgtInputValidatorsInterface, 
  customValidators: ValidatorFn[]):
  ValidatorFn[]{
  const validators: ValidatorFn[] = [];
  if(validatorSettings){
    if (validatorSettings.required) validators.push(Validators.required);
    if (validatorSettings.maxLength && validatorSettings.maxLength!() > 0)  validators.push(Validators.maxLength(validatorSettings.maxLength())); 
    if (validatorSettings.min && validatorSettings.min()) validators.push(Validators.min(validatorSettings.min()));
    if (validatorSettings.max) validators.push(Validators.max(validatorSettings.max()));
    if (validatorSettings.type && validatorSettings.type() == 'email') validators.push(Validators.email); 
    // if (validatorSettings.type() && validatorSettings.type() == 'tel') validators.push(Validators.pattern());
  }
  if (customValidators && customValidators.length > 0){
    for (let validator of customValidators){
      validators.push(validator);
    }
  }
  return validators;
}

/** Returns the value typed as emtpy string, string or floating number
 * 
 * @param value 
 * @param type 
 * @returns 
 */
export function typedValue(value: string, type: string) {
  if (!value) {
    return '';
  }
  if (type === "number" && typeof value === "string") {
    return parseFloat(value);
  }
  return value;
}


