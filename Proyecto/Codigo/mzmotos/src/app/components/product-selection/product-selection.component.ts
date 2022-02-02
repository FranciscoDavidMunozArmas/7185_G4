import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product, productConverter } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-selection',
  templateUrl: './product-selection.component.html',
  styleUrls: ['./product-selection.component.css']
})
export class ProductSelectionComponent implements OnInit {
  @Input() selectedProduct: Product;
  @Output() closeEvent = new EventEmitter<any>();
  @Output() handleSelection = new EventEmitter<Product>();

  products: Product[];
  searchResults: Product[];

  constructor(
    private service: ProductService,
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this.service.getProducts()
    .subscribe(res => {
      if(res.length > 0) {
        this.products = res.map(productConverter.fromJSON);
      } else {
        this.products = [];
      }
      this.searchResults = this.products;
    });
  }

  searchProduct(text: string) {
      this.searchResults = this.products.filter((element: Product) => element.name === text)
  }

  cancelSearch() {
    this.searchResults = this.products;
  }

  handleSelectionProduct(product: Product) {
    this.selectedProduct = product;
    this.handleSelection.emit(product);
  }

  close() {
    this.closeEvent.emit();
  }
}
