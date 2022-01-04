import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.css']
})
export class AgreementComponent implements OnInit {

  @Input() text: string
  @Output() agreeEvent = new EventEmitter<boolean>();
  @Output() dismissEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  cancel() {
    this.dismissEvent.emit(false);
  }

  agree() {
    this.agreeEvent.emit(true);
  }

}
