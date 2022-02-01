import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HINT_SEARCH } from 'src/lib/strings';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  text: string = "";

  @Input() placeholder: string;
  @Input() tooltip: string;
  @Output() searchEvent= new EventEmitter<string>();
  @Output() cancelEvent= new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  search(searchBox: NgForm) {
    this.searchEvent.emit(searchBox.value.search);
  }

  cancel() {
    this.text = "";
    this.cancelEvent.emit();
  }

}
