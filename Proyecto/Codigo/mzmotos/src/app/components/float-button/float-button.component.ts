import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-float-button',
  templateUrl: './float-button.component.html',
  styleUrls: ['./float-button.component.css']
})
export class FloatButtonComponent implements OnInit {

  @Input() icon: string = "fa fa-plus";
  @Output() eventFunction = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  clickFloating(){
    this.eventFunction.emit();
  }

}
