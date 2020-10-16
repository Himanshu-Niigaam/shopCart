import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterShowMore'
})
export class FilterShowMorePipe implements PipeTransform {
  transform(items: any[]): any {
    if (!items) return 0;
    if (items.length > 5) return items.length - 5;
    else return false;
  }
}
