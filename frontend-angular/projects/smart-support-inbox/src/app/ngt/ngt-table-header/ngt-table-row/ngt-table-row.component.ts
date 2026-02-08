import { booleanAttribute, ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Table row component for table layouts.
 *
 * ### Inputs:
 * @param {boolean} highlighted Whether the row is highlighted. Default: false.
 *
 * @example <ngt-table-row [highlighted]="true"></ngt-table-row>
 */
@Component({
  selector: 'ngt-table-row',
  imports: [],
  templateUrl: './ngt-table-row.component.html',
  styleUrl: './ngt-table-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.highlighted]": "highlighted()",
  },
})
export class NgtTableRowComponent {

  highlighted = input(false, { transform: booleanAttribute });
}
