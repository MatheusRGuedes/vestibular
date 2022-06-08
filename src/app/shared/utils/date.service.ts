import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  static stringToDate(data :string) :Date {
    if (data.length !== 10) {
      return null;
    }
    let dia = data.substring(8, 10);
    let mes = data.substring(5, 7);
    let ano = data.substring(0, 4);
    return new Date(mes +'-'+ dia +'-'+ ano);
  }
}
