import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductFormComponent } from 'src/app/components/product-form/product-form.component';
import { ProductService } from 'src/app/services/product.service';
import { CONSTANTS } from 'src/lib/constants';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @ViewChild("productForm") productForm: ElementRef;

  selected: any = null;
  editable: any = null;
  products: any[] = [];

  imagePath: string;

  constructor(
    private modalService: NgbModal,
    private productService: ProductService) { }

    ngOnInit(): void {
      this.getUsers();
    }
  
    getUsers() {
      this.productService.getProducts().subscribe(
        (data: any[]) => {
          this.products = this.products.concat(data.map(item =>{
            return item;
          }));
        });
    }
  
    submitData(data: any) {
      if (!!this.editable) {
        this.editData(data);
      } else {
        this.products.push(data);
      }
      this.modalClose();
    }
  
    editData(data: any) {
      this.products = this.products.map(item => {
        if (item._id === this.editable._id) {
          return data;
        }
        return item;
      });
      this.modalClose();
    }
  
    onDelete(product: any) {
        this.productService.deleteProductByID(product._id).subscribe(
          (data: any) => {
            this.products = this.products.filter(item => item._id !== product._id);
          }
        );
      this.unselectedProduct();
    }
  
    onEdit(product: any) {
      this.editable = product;
      this.showProductForm();
    }
  
    selectedProduct(product: any) {
      this.selected = product;
      this.imagePath = `${CONSTANTS.API_URL}/${this.selected.image}`
    }
  
    unselectedProduct() {
      this.selected = null;
    }
  
    showProductForm() {
      this.triggerModal(this.productForm);
    }
  
    triggerModal(content: any) {
      this.modalService.open(content).result;
    }
  
    modalClose() {
      this.modalService.dismissAll();
    }
  
  }
  