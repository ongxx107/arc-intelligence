import { booleanAttribute, ChangeDetectionStrategy, Component, effect, ElementRef, inject, input, model, viewChild, viewChildren } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgtButtonBaseConfig } from '@corporate/ng-base-components/src/lib/ngt-utilities';
import { MatIcon } from "@angular/material/icon";

/**
 * Segmented control component for grouped toggle buttons.
 *
 * ### Inputs:
 * @param {NgtButtonBaseConfig[]} buttons Toggle elements [{key: string, label?: string, matIcon?: string}] (required).
 * @param {boolean} multiple Enable multiple selection. Default: false.
 * @param {boolean} disabled Disable the toggle group. Default: false.
 * @param {boolean} vertical Change the toggle group direction to vertical. Default: false.
 *
 * ### Outputs:
 * @param {string | string[]} value Sets and returns the key(s) of the (pre-)selected toggle button(s).
 *
 * @example <ngt-segmented-control [buttons]="myButtons" [multiple]="true" (value)="onValueChange($event)"></ngt-segmented-control>
 */
@Component({
  selector: 'ngt-segmented-control',
  imports: [MatButtonToggleModule, MatIcon],
  templateUrl: './ngt-segmented-control.component.html',
  styleUrl: './ngt-segmented-control.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgtSegmentedControlComponent {
  buttons = input.required<NgtButtonBaseConfig[]>();
  multiple = input(false, {transform: booleanAttribute});
  disabled = input(false, {transform: booleanAttribute});
  vertical = input(false, {transform: booleanAttribute});
  value = model<string|string[]>();

}
