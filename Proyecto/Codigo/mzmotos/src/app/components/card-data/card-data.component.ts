import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-data',
  templateUrl: './card-data.component.html',
  styleUrls: ['./card-data.component.css']
})
export class CardDataComponent implements OnInit {

  @Input() data: any;
  @Output() handleClick = new EventEmitter<any>();
  @Output() handleHover = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  hoverSelect() {
    this.handleHover.emit(this.data);
  }

  clickSelect() {
    this.handleClick.emit(this.data);
  }

}
