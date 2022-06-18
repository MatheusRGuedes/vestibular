import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  static stringToDate(data: string): Date {
    if (data.length !== 10) {
      return null;
    }
    const dia = data.substring(8, 10);
    const mes = data.substring(5, 7);
    const ano = data.substring(0, 4);
    return new Date(mes + '-' + dia + '-' + ano);
  }

  static dateToString(data: Date): string {
    if (data) {
      let month = (new Date(data).getMonth() + 1).toString();
      if (month.length === 1) { month = '0' + month; }

      let day = new Date(data).getDate().toString();
      if (day.length === 1) { day = '0' + day; }

      return new Date(data).getFullYear() + '-' + month + '-' + day;
    }
    return '';
  }
}
