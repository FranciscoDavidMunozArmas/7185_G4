import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/models/Product';
import { CONSTANTS } from 'src/lib/constants';

@Component({
  selector: 'app-catalogue-item',
  templateUrl: './catalogue-item.component.html',
  styleUrls: ['./catalogue-item.component.css']
})
export class CatalogueItemComponent implements OnInit, OnChanges {
  
  @Input() product: Product;
  @Input() enableSelection: boolean;
  @Output() handleSelection = new EventEmitter<any>();
  @Output() handleUnselection = new EventEmitter<any>();

  imagePath: string = "";
  showDetails: boolean = false;
  selectedProduct: boolean = false;
  counter: number = 1;

  constructor(private modalService: NgbModal) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.enableSelection) {
      this.showDetails = false;
      this.selectedProduct = false;
    } else {
      this.showDetails = false;
    }
  }

  ngOnInit(): void {
    this.imagePath = `${CONSTANTS.API_URL}/${this.product.image}`;
    this.enableSelection = (this.enableSelection) ? true : false;
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }

  toggleSelected() {
    this.selectedProduct = !this.selectedProduct;
    this.toggleDetails();
    if(this.enableSelection) {
      if(this.selectedProduct) {
        this.returnProduct();
      } else {
        this.handleUnselection.emit(this.product);
      }
    }
  }

  onErrorImage(event: any) {
    event.target.src = "../assets/images/non_image.png";
  }

  addCounter() {
    this.counter++;
    this.returnProduct();
  }

  removeCounter() {
    this.counter--;
    if(this.counter < 1) {
      this.counter = 1;
    }
    this.returnProduct();
  }

  returnProduct() {
    this.handleSelection.emit({
      product: this.product,
      quantity: this.counter
    });
  }


  formatNumber(): string {
    return this.product.price.toLocaleString(undefined, {minimumFractionDigits: 2});
  }

  triggerModal(content: any) {
    this.modalService.open(content).result;
  }

  modalClose() {
    this.modalService.dismissAll();
  }

}
