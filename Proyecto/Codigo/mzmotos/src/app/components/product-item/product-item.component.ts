import { Component, Input, OnInit } from '@angular/core';
import { CONSTANTS } from 'src/lib/constants';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() product: any;

  imagePath: string = "";

  constructor() { }

  ngOnInit(): void {
    this.imagePath = `${CONSTANTS.API_URL}/${this.product.product.image}`;
    console.log(this.imagePath);
  }

  onErrorImage(event: any) {
    event.target.src = "../assets/images/non_image.png";
  }

}
