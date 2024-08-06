import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseDate',
  standalone: true,
})
export class ParseDatePipe implements PipeTransform {

  transform(value: string): Date | null {
    if (!value || value.length !== 8) {
      return null;
    }

    const year = parseInt(value.substring(0, 4), 10);
    const month = parseInt(value.substring(4, 6), 10) - 1;
    const day = parseInt(value.substring(6, 8), 10);

    return new Date(year, month, day);
  }
}
