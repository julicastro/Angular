import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';
import esLocale from 'date-fns/locale/es';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(dateString: string): string {
    const date = new Date(dateString);
    return format(date, 'dd/MM/yyyy', { locale: esLocale });
  }
}