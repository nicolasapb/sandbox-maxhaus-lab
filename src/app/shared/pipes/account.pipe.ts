import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'account'
})
export class AccountPipe implements PipeTransform {

  transform(value: any) {
    if (typeof value === 'string') {
      return value.replace(/(\d{4})(\d{10})/g, '\$1\/\$2');
    } else {
      return null;
    }
  }

}
