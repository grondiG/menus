import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getNumberPrice'
})
export class GetNumberPricePipe implements PipeTransform {

  transform(value: string): number {
    if (value) {
      return parseFloat(value.replace(/\D/g, ""));
    }
    return null;
  }
}
