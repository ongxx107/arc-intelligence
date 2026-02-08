import { Pipe, PipeTransform } from '@angular/core';

export type NgtSvgIconType = {svgIcon: string};

@Pipe({
  name: 'ngtSvgIcon'
})
export class NgtSvgIconPipe implements PipeTransform {

  transform(value: unknown): string {
    return (value as NgtSvgIconType).svgIcon;
  }

}
