import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToAttributeFormat'
})
export class ConvertToAttributeFormatPipe implements PipeTransform {

  transform(value: string, indicator?: string): string {
    let finalValue: string = "";
    if(indicator){
      finalValue+=indicator;
    }
    return finalValue + value.toLowerCase().replace(/ /g, "-")
  }

}
