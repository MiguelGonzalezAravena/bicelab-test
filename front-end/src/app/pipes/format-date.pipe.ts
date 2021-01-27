import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    const f = new Date(value * 1000);
    const date = f.getUTCDate();
    const month = f.getUTCMonth() + 1;
    const year = f.getUTCFullYear();
    return `${this.strDate(date)}-${this.strDate(month)}-${year}`;
  }

  strDate(val: number) {
    return ('0' + val).substr(-2);
  }
}
