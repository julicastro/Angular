import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByNombre'
})
export class FilterByNamePipe implements PipeTransform {

  transform(items: any[], filtroNombre: string): any[] {
    if (!items || !filtroNombre) {
      return items;
    }
    return items.filter(item => item.name.toLowerCase().includes(filtroNombre.toLowerCase()));
  }

}

