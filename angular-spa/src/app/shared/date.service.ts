import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(private datePipe: DatePipe) { }


  getFormattedDate(timestamp: number | undefined): string | null {
    if (timestamp) {
      const date = new Date(timestamp);
      return this.datePipe.transform(date.toISOString(), 'dd.MM.yyyy | HH:mm');
     
    }
    return null;
  }

}
