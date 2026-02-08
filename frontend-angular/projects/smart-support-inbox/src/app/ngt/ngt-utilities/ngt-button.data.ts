import { InputSignal, InputSignalWithTransform, ModelSignal, OutputEmitterRef } from "@angular/core";
import { NgtIconPosition } from "./ngt-sizes.model";
import { MatMenuPanel } from "@angular/material/menu";

export type NgtButtonStyling = "default" | "primary" | "secondary" | "muted" | "tertiary" | "outline" | "stroked";
export type NgtButtonShape = "rect" | "square"| "round" | "long";
export type NgtButtonScale = "standard" | "mini"; // "xsmall" | "small" | "medium" // | "tiny" | "compact" | "standard"
export type NgtButtonType = "button" | "reset" | "submit";

export type NgtButtonBaseConfig = {
  label?: string, matIcon?: string, key: string
}

/**
 *  - inputs:
 * @param {NgtButtonStyling} styling - color palette 
 * @param {NgtButtonShape} shape - outer shape 
 * @param {NgtButtonScale} scale - size/height of the button 
 * @param {NgtButtonType} type - html button type. Default: "button", others: "reset", "submit"
 * @param {boolean} disabled - disabled state
 * @param {NgtIconPosition} iconPosition - icon before  content: "leading", icon after text: "trailing"
 * @param {string} matIcon - mat-icon name 
 * @param {string} svgIcon - svg icon name registered to NgtSvgRegistryService 
 * @param {boolean} selectable - adds selected state to the button i.e. for dropdowns. When matMenuTriggerFor is set, the button is automatically selectable.
 * @param {ElementRef} matMenuTriggerFor - reference to MatMenu ElementRef
 * @param {boolean} menuArrow - adds a dropdown arrow to the right of the button
 *  - models:
 * @param {boolean} selected - model as input and output to track the selected state 
 */
export interface NgtButtonInterface{
  // style inputs
  styling?: InputSignal<NgtButtonStyling>;
  shape?: InputSignal<NgtButtonShape>;
  scale?: InputSignal<NgtButtonScale>;
  // icon inputs
  matIcon?: InputSignal<string|undefined>;
  svgIcon?: InputSignal<string|undefined>;
  iconPosition?: InputSignal<NgtIconPosition>;
  // optional dropdown
  matMenuTriggerFor?: InputSignal<MatMenuPanel|undefined>;
  menuArrow?: InputSignalWithTransform<boolean, unknown>;
  counter?: ModelSignal<number|null>;
  // states
  type?: InputSignal<NgtButtonType>;
  disabled?: InputSignalWithTransform<boolean, unknown>;
  selectable?: InputSignalWithTransform<boolean, unknown>;
  selected?: ModelSignal<boolean>;
  ngtClick?: OutputEmitterRef<MouseEvent>;

}