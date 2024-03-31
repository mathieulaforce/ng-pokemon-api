import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'padLeft',
  standalone: true
})
export class PadLeftPipe implements PipeTransform {

  transform(value: string | number, char: string, maxLength: number): string {
    let paddedValue = value.toString();
    if(paddedValue.length < maxLength) {
      paddedValue = char.repeat(maxLength - paddedValue.length) + paddedValue;
    }    
    return paddedValue;
  }

}
