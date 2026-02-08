import { ChangeDetectionStrategy, Component, computed, input, model } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { NgtScale, NgtWidth, NgtNamedOptionGroup, NgtOption, NgtInputMode, NgtFormfieldInterface } from '@corporate/ng-base-components/src/lib/ngt-utilities';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { NgtAutocompleteComponent } from "@corporate/ng-base-components/src/lib/ngt-autocomplete";


/**
 * NgtSearchFieldComponent
 *
 * A search field component with suggestions and recent searches, supporting various display modes and sizes.
 *
 * ### Inputs
 * @param {string} label The label for the search field. Default: 'Search'.
 * @param {NgtInputMode} mode The input mode (e.g., 'normal'). Default: 'normal'.
 * @param {NgtScale} scale The scale/size of the field. Default: 'normal'.
 * @param {NgtWidth} width The width of the field. Default: 'auto'.
 * @param {string} suggestionsTitle The title for the suggestions group. Default: 'SUGGESTIONS'.
 * @param {NgtOption[]} suggestions The list of suggestion options. Default: [].
 * @param {string} recentSearchesTitle The title for the recent searches group. Default: 'RECENT SEARCHES'.
 * @param {NgtOption[]} recentSearches The list of recent search options. Default: [].
 * @param {string | number | null} panelWidth The width of the autocomplete panel. Default: 'auto'.
 *
 * ### Model
 * @param {string | number | null} value The current value of the search field. Default: ''.
 *
 * @example
 * <ngt-search-field
 *   [label]="'Find user'"
 *   [suggestions]="userSuggestions"
 *   [recentSearches]="recentUserSearches"
 *   [(value)]="searchValue">
 * </ngt-search-field>
 */
@Component({
  selector: 'ngt-search-field',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
    NgtAutocompleteComponent
],
  templateUrl: './ngt-search-field.component.html',
  styleUrl: './ngt-search-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class.ngt-width-max]": "width()==='max'"
  }
})
export class NgtSearchFieldComponent implements NgtFormfieldInterface {

  //NgtFormFieldInterface
  label = input<string>('Search');
  mode = input<NgtInputMode>('normal');
  scale = input<NgtScale>('normal');
  width = input<NgtWidth>('auto');

  //Class interface
  value = model<string | number | null>('');
  suggestionsTitle = input<string>('SUGGESTIONS');
  suggestions = input<NgtOption[]>([]);
  recentSearchesTitle = input<string>('RECENT SEARCHES');
  recentSearches = input<NgtOption[]>([]);
  
  panelWidth = input<string | number | null>('auto');

  protected options = computed(()=> {
    let optionGroup: NgtNamedOptionGroup[]=[];
    if(this.value() && this.value()!=""){
      if (this.suggestions() && this.suggestions().length >0) 
        optionGroup = [{ name: this.suggestionsTitle(), options: this.suggestions()}];
    } else {
      if (this.recentSearches()&& this.recentSearches().length >0) 
        optionGroup =  [{name: this.recentSearchesTitle(), options: this.recentSearches()}];
    }
    return optionGroup;
  });

  protected hasValue = computed(() => this.value() && (this.value() != ''));

}
