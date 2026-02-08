import { InputSignal, InputSignalWithTransform, OutputEmitterRef } from "@angular/core";
import { ColorSchemeClass } from "@corporate/ng-base-components/src/lib/ngt-themes";
import { NgtWidth } from "./ngt-sizes.model";

/** Option items for select dropdowns or menus */
export type NgtOption = { key: string; label: string; matIcon?: string; svgIcon?: string; };

/** Option groups for select dropdowns  grouped items and group titles (=name)*/
export type NgtNamedOptionGroup = {
    name: string,
    options: NgtOption[];
};/**
 * @param {any} options array of dropdown options as objects like strings or NgtOptions or NgtOptionGroups
 * @param {boolean} multiple switch to enable multiselection of options
 * @param {ColorSchemeClass | string} panelClass string with the colorscheme (light/dark) of the theming as css class or more other css classes
 * @param {NgtWidth} panelWidth width of the option panel
 */

export interface NgtOptionsInterface {
  // outputs
  valueKey: OutputEmitterRef<string>;
  //inputs
  options: InputSignal<Array<any>>;
  multiple?: InputSignalWithTransform<boolean, unknown>;
  panelClass: InputSignal<ColorSchemeClass | string>;
  panelWidth: InputSignal<NgtWidth>;
  //functions
  isNamedOptionGroup: Function;
}

