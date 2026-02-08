import { Pipe, PipeTransform } from '@angular/core';
import { NgtOption } from './ngt-option.data';

@Pipe({
  name: 'ngtOptions'
})
export class NgtOptionsPipe implements PipeTransform {

  transform(value: string | string[]): NgtOption[] {
    if (Array.isArray(value)) 
      return value.map(val => ({label: val, key: val.toLocaleLowerCase()} as NgtOption));
    else 
      return [({label: value, key: value.toLocaleLowerCase()} as NgtOption)];
  }

}
