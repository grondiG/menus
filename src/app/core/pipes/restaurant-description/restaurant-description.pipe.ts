import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'restaurantDescription',
  standalone: true
})
export class RestaurantDescriptionPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }
    if (value.length > 30) {
      return value.slice(0, 30) + '...';
    }
    return value;
  }

}
