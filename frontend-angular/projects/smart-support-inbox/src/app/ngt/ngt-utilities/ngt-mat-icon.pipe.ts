import { Pipe, PipeTransform } from '@angular/core';

export type NgtMatIconType = {matIcon: string};

@Pipe({
  name: 'ngtMatIcon'
})
export class NgtMatIconPipe implements PipeTransform {

  transform(value: unknown): string {
    return (value as NgtMatIconType).matIcon;
  }

}
