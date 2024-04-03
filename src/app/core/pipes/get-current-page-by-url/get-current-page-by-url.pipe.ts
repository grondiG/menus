import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getCurrentPageByUrl',
  standalone: true
})
export class GetCurrentPageByUrlPipe implements PipeTransform {

  transform(value: string): string {
    return value ? "/" + value.split('/')[value.split('/').length-1] : "/";
  }
}
