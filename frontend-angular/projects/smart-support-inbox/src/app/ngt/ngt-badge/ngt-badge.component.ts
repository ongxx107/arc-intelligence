import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgtStatus, NgtHeight, NgtIconPosition } from '@corporate/ng-base-components/src/lib/ngt-utilities';

export type NgtBadgeStyling = "filled" | "stroked" | "dot";

/**
 * Badge component for displaying status, icons, and styling.
 *
 * ### Inputs:
 * @param {NgtBadgeStyling} styling Badge style variant ("filled", "stroked", or "dot"). Default: "filled".
 * @param {NgtStatus} status Status color ("neutral", "success", "warn", "error"). Default: "neutral".
 * @param {string} matIcon Name of the Material icon to display (optional).
 * @param {string} svgIcon Name of the SVG icon to display (optional).
 * @param {NgtIconPosition} iconPosition Icon position ("leading" or "trailing"). Default: "leading".
 * @param {NgtHeight} scale Badge size ("medium" or "small"). Default: "medium".
 * @param {boolean} disabled Disabled state. Default: false.
 *
 * @example <ngt-badge [status]="'success'" [matIcon]="'check'">Success</ngt-badge>
 */

@Component({
  selector: 'ngt-badge',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: "./ngt-badge.component.html",
  styleUrl: "./ngt-badge.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgtBadgeComponent {
  styling = input<NgtBadgeStyling>("filled");
	status = input<NgtStatus>("neutral");
	matIcon = input<string>();
  svgIcon = input<string>();
  iconPosition = input<NgtIconPosition>("leading");
  scale = input<NgtHeight>("medium");
  disabled = input(false, {transform: booleanAttribute});
  protected badgeClass = computed( () => 
      "ngt-badge " + ("ngt-"+this.styling()+"-badge ") + ("ngt-status-"+this.status()+" ") + ("ngt-"+this.scale()+"-badge ")  + (this.disabled()? "ngt-disabled-badge ": "")
  );
  }
