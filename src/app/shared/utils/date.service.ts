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

  static dateToString(data :Date) :string {
    if (data) {
      let month = (data.getMonth() + 1).toString();
      if (month.length == 1) month = "0"+month;

      let day = data.getDate().toString();
      if (day.length == 1) day = "0"+day;
      
      return data.getFullYear() +"-"+ month +"-"+ day;
    }
    return "";
  }
}
