import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getCurrentPageByUrl',
  standalone: true
})
export class GetCurrentPageByUrlPipe implements PipeTransform {

  transform(value: string): string {
    // Homework please create unit test and replace this logic by one line
    if(value){
      return "/" + value.split('/')[1];
    }

    return "/";
  }
}
