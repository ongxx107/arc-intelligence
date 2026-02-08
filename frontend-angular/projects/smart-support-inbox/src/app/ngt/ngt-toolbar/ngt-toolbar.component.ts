import { booleanAttribute, ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';
import { MatToolbar } from "@angular/material/toolbar";
import { NgtButtonComponent } from "@corporate/ng-base-components/src/lib/ngt-button";
import { NgtSearchFieldComponent } from "@corporate/ng-base-components/src/lib/ngt-search-field";
import { NgtFilterButtonComponent } from "@corporate/ng-base-components/src/lib/ngt-filter-button";
import { NgtButtonBaseConfig, NgtNamedOptionGroup, NgtOption } from '@corporate/ng-base-components/src/lib/ngt-utilities';
import { NgtBadgeComponent } from "@corporate/ng-base-components/src/lib/ngt-badge";
import { NgtSegmentedControlComponent } from '@corporate/ng-base-components/src/lib/ngt-segmented-control';

/**
 * Toolbar component for displaying actions, filters, search, and more.
 *
 * ### Inputs:
 * @param {string} label Title of the toolbar.
 * @param {boolean} hasBorder Switch lower border line on/off. Default: false.
 * @param {number} counter Value to set a counter badge element.
 * @param {boolean} hasAddButton Adds a secondary action button with an add symbol. Default: false.
 * @param {NgtButtonBaseConfig[]} toggles Array of toggle button configs.
 * @param {string | string[]} toggleValue Current value(s) of the toggles.
 * @param {NgtButtonBaseConfig[]} actions Array of action buttons.
 * @param {string} filterLabel Label of the filter button. Default: 'Filter'.
 * @param {NgtOption[] | NgtNamedOptionGroup[]} filterOptions Options for the filter button dropdown.
 * @param {string[]} filterValue Current filter value(s).
 * @param {string} sortLabel Label of the sorting button. Default: 'Sort'.
 * @param {NgtOption[] | NgtNamedOptionGroup[]} sortOptions Options for the sort button dropdown.
 * @param {string} sortValue Current sort value.
 * @param {boolean} hasSearch Adds a search field at the end of the toolbar. Default: false.
 * @param {string} searchLabel Label of the search field. Default: 'Search'.
 * @param {NgtOption[]} recentSearches Recent search terms.
 * @param {NgtOption[]} suggestions Suggested search terms for autocomplete.
 *
 * ### Outputs:
 * @param {void} add Emits when the add button is clicked.
 * @param {string} actionsKey Emits the action key when an action button is clicked.
 * @param {string} searchValue Emits the chosen search term or key.
 *
 * ### Model:
 * @param {string | string[]} toggleValue Current value(s) of the toggles.
 * @param {string[]} filterValue Current filter value(s).
 * @param {string} sortValue Current sort value.
 *
 * @example <ngt-toolbar [label]="'My Toolbar'" [actions]="myActions" (add)="onAdd()"></ngt-toolbar>
 */
@Component({
  selector: 'ngt-toolbar',
  imports: [MatToolbar, 
    NgtButtonComponent, NgtSearchFieldComponent, NgtFilterButtonComponent, 
    NgtBadgeComponent, NgtSegmentedControlComponent],
  templateUrl: './ngt-toolbar.component.html',
  styleUrl: './ngt-toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgtToolbarComponent {
  hasBorder=input(false, {transform: booleanAttribute});
  label=input<string>();
  counter=model<number>();
  hasAddButton= input(false,{transform: booleanAttribute});
  add = output<void>();
  toggles = input<NgtButtonBaseConfig[]>([]);
  toggleValue = model<string|string[]>([]);
  actions= input<NgtButtonBaseConfig[]>([]);
  actionsKey = output<string>();
  filterLabel = input<string | undefined>('Filter');
  filterOptions = input<NgtOption[]|NgtNamedOptionGroup[]>();
  filterValue = model<string[]>([]);
  sortLabel = input<string | undefined>('Sort');
  sortOptions = input<NgtOption[]|NgtNamedOptionGroup[]>();
  sortValue = model<string>();
  hasSearch=input(false, {transform: booleanAttribute});
  searchLabel=input<string>('Search');
  recentSearches=input<NgtOption[]>([]);
  suggestions=input<NgtOption[]>([]);
  searchValue=output<string>();

  onSearchValue(value: string|number|null){
    if(!value || value === '') return this.searchValue.emit('');
    return this.searchValue.emit(value.toString());
  }

  onSortValue(value: string[]){
    if (!value || value.length === 0) return '';
    return value.at(0);
  }

}
