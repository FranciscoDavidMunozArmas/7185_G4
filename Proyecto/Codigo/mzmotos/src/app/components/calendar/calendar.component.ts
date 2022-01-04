import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from "moment";
import { Day } from './Day';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Input() appointments: Date[] = [];
  @Output() dateOutput = new EventEmitter<Date>();

  week: any = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo"
  ];

  monthSelect: any = [];
  dateSelect: any = [];
  todayDate: number = 0;

  constructor() { }

  ngOnInit() {
    let date = new Date();
    this.todayDate = date.getDate();
    this.getDaysFromDate(date.getMonth() + 1, date.getFullYear());
  }

  ngOnChanges(event: any) {
    this.ngOnInit();
  }

  getDaysFromDate(month: number, year: number) {
    const startDay = moment(`${year}/${month}/01`);
    const endDay = startDay.clone().endOf('month');

    this.dateSelect = startDay;
    const diffDays = endDay.diff(startDay, "days", true);

    const numberOfDays = Math.round(diffDays);

    const arrayOfDays = Object.keys([...Array(numberOfDays)]).map((element: any) => {
      element = parseInt(element) + 1;
      const dayObject = moment(`${year}-${month}-${element}`);
      const day: Day = {
        name: dayObject.format('dddd'),
        value: element,
        indexWeek: dayObject.isoWeekday(),
        appointment: this.checkAppointment(element, month, year)
      }

      return day;
    });
    this.monthSelect = arrayOfDays;
  }

  checkAppointment(day: number, month: number, year: number): boolean {
    if (this.appointments) {
      const actualAppointments = this.appointments.find((element: Date) => 
      element.getDate().toString() === day.toString() && 
      (element.getMonth() + 1).toString() === month.toString() && 
      element.getFullYear().toString() === year.toString());
      return (actualAppointments)? true : false;
    }
    return false;
  }

  changeMonth(flag: number) {
    if (flag < 0) {
      const prevDate = this.dateSelect.clone().subtract(1, "month");
      this.getDaysFromDate(prevDate.format('M'), prevDate.format('YYYY'));
    } else if (flag > 0) {
      const nextDate = this.dateSelect.clone().add(1, "month");
      this.getDaysFromDate(nextDate.format('M'), nextDate.format('YYYY'));
    } else {
      let date = new Date();
      this.getDaysFromDate(date.getMonth() + 1, date.getFullYear());
      this.dateOutput.emit(date);
    }
  }

  clickDay(day: any) {
    const parse = this.dateSelect.format('YYYY/MM/DD');
    const date = new Date(parse);
    date.setDate(day.value);
    this.dateOutput.emit(date);
  }

}
