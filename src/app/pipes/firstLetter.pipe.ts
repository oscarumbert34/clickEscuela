import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLetter'
})
export class FirstLetterPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if (args != null)
    {
      if (args == 'first') {
        let val = value.charAt(0).toUpperCase()
        return val

      }
    }
    return null;
  }

}
