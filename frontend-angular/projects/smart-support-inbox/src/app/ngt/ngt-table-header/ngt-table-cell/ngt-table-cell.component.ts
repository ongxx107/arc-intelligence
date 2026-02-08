import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Table cell component for table layouts.
 *
 * ### Inputs:
 * @param {number} width Width of the cell (required).
 * @param {boolean} fixed Whether the cell is fixed. Default: false.
 * @param {'left'|'center'|'right'} justify Content justification. Default: 'center'.
 *
 * @example <ngt-table-cell [width]="100" [fixed]="true" [justify]="'left'"></ngt-table-cell>
 */
@Component({
  selector: 'ngt-table-cell',
  imports: [],
  templateUrl: './ngt-table-cell.component.html',
  styleUrl: './ngt-table-cell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[style]": "'width: ' + width() + 'px; justify-content: ' + justify() + ''",
    "[class.fixed]": "fixed()",
  },
})
export class NgtTableCellComponent {

  width = input.required<number>();
  fixed = input(false, { transform: booleanAttribute });
  justify = input<'left'|'center'|'right'>('center');
}