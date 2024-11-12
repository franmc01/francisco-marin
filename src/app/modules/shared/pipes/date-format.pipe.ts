import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string | Date, format: string = 'dd/MM/yyyy'): string {
    const date = typeof value === 'string' ? new Date(`${value}T00:00:00Z`) : new Date(value);

    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();

    switch (format) {
      case 'MM/dd/yyyy':
        return `${month}/${day}/${year}`;
      case 'yyyy-MM-dd':
        return `${year}-${month}-${day}`;
      case 'dd/MM/yyyy':
      default:
        return `${day}/${month}/${year}`;
    }
  }
}
