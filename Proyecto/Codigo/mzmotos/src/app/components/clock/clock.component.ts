import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  hour:string = "";
  minutes:string = "";
  seconds:string = "";
  dayTime:string = "";
  date:string = "";

  constructor() {
      setInterval(() => this.setTime(), 1000);
  }

  ngOnInit(): void {
    this.setTime();
  }

  setTime(){
    let date = new Date();
    this.hour = (date.getHours() < 10)? "0" + date.getHours().toString():date.getHours().toString();
    this.minutes = (date.getMinutes() < 10)? "0" + date.getMinutes().toString():date.getMinutes().toString();
    this.seconds = (date.getSeconds() < 10)? "0" + date.getSeconds().toString():date.getSeconds().toString();
    this.dayTime = (date.getHours() < 12)? "AM":"PM";
    this.date = moment(date).format("YYYY/MM/DD");
  }

}
