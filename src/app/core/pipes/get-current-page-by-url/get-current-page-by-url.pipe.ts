import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getCurrentPageByUrl',
  standalone: true
})
export class GetCurrentPageByUrlPipe implements PipeTransform {

  transform(value: string): string {
    if(value){
      return "/"+value.split('/')[1];
    }
    return "/";
  }
}
