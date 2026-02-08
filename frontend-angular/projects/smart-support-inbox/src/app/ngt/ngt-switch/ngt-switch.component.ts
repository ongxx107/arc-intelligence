import { booleanAttribute, Component, input, model, ViewChild, viewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatSlideToggle, MatSlideToggleModule } from "@angular/material/slide-toggle";
/**
 * Switch component for toggling boolean values.
 *
 * ### Inputs:
 * @param {string} name Name of the switch. Default: 'ngtswitch'.
 * @param {boolean} disabled Whether the switch is disabled. Default: false.
 *
 * ### Model:
 * @param {boolean} checked Checked state of the switch.
 *
 * ### Internal:
 * @param {MatSlideToggle} matSwitch Reference to the slide toggle (ViewChild).
 *
 * @example <ngt-switch [checked]="isChecked" (change)="onChange($event)"></ngt-switch>
 */

@Component({
    selector: 'ngt-switch',
    imports: [MatSlideToggleModule, FormsModule],
    templateUrl: './ngt-switch.component.html',
    styleUrl: './ngt-switch.component.scss'
})
export class NgtSwitchComponent {

    name = input<string>('ngtswitch');
    checked = model(false);
    disabled = input(false, {transform: booleanAttribute});

    matSlideToggle = viewChild.required(MatSlideToggle);
    @ViewChild(MatSlideToggle) matSwitch!: MatSlideToggle;
    focus(){
        this.matSwitch.focus();
    }

    onChange(checked: boolean){
        this.checked.set(checked);
    }

}