import { Pipe, PipeTransform } from '@angular/core';
import { mobileFormat } from '../Format/mobile-format';

@Pipe({
  name: 'mobileFormat'
})
export class MobileFormatPipe implements PipeTransform {

  transform(value:string): string {
    return mobileFormat(value);
  }

}
