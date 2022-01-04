import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {

  @Output() notifyEvent= new EventEmitter<string>();
  @Output() cancelEvent= new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  notify() {
    this.notifyEvent.emit();
  }

  cancel() {
    this.cancelEvent.emit();
  }

}
