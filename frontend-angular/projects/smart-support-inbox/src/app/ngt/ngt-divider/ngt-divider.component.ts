import { booleanAttribute, Component, input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';


/**
 * NgtDividerComponent
 *
 * A divider component for separating content, supporting horizontal/vertical orientation, scale, and inset.
 *
 * ### Inputs
 * @param {"horizontal"|"vertical"} direction The direction of the divider. Default: 'horizontal'.
 * @param {"small"|"medium"} scale The scale/size of the divider. Default: 'small'.
 * @param {boolean} inset Whether the divider is inset. Default: false.
 *
 * @example
 * <ngt-divider [direction]="'vertical'" [scale]="'medium'" [inset]="true"></ngt-divider>
 */
@Component({
  selector: 'ngt-divider',
  imports: [MatDividerModule],
  templateUrl: './ngt-divider.component.html',
  styleUrl: './ngt-divider.component.css',
  host:{
    "[class.ngt-horizontal-divider]": "direction()==='horizontal'",
    "[class.ngt-vertical-divider]": "direction()==='vertical'",
    "[class.ngt-divider-medium]":"scale()==='medium'"
  }
})
export class NgtDividerComponent {
  direction = input<"horizontal"|"vertical">("horizontal");
  scale = input<"small"|"medium">("small");
  inset = input(false, {transform: booleanAttribute});
}
