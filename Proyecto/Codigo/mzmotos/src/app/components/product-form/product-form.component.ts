import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/Product';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @Input() product;
  @Output() onSubmitEvent = new EventEmitter<any>();

  input = {
    name: "",
    image: "",
    price: "",
    stock: "",
    id: ""
  }

  constructor(
    private productService: ProductService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.product) {
      this.input.name = this.product.name;
      this.input.image = this.product.image;
      this.input.price = this.product.price;
      this.input.stock = this.product.stock;
      this.input.id = this.product.id;
    }
  }
  
  

  onChange(value: any) {
    console.log(value);
  }
  onSubmit(productForm: NgForm) {
    if (!this.checkCreateForm(productForm.value) && !this.product) {
      this.toast.error("Complete todos los campos", 'Error', {
        timeOut: 1500,
      });
      return;
    } else if (!this.checkEditForm(productForm.value)) {
      this.toast.error("Complete todos los campos", 'Error', {
        timeOut: 1500,
      });
      return;
    }

    if (!!this.product) {
      this.onEditData(productForm.value);
    } else {
      this.onCreateData(productForm.value);
    }
  }

  checkCreateForm(data: any) {
    return !!data.name && !!data.image && !!data.price && !!data.stock
  }

  checkEditForm(data: any) {
    return !!data.name && !!data.image && !!data.price && !!data.stock
  }

  onEditData(data: any) {
    const newData: any = {
      name: data.name ,
      image: data.image,
      price: data.price,
      stock: data.stock,
    }

    this.productService.putProductByID(this.product._id, newData).subscribe(
      (data: any) => {
        this.onSubmitEvent.emit(data);
      }
    );
  }

  onCreateData(data: any) {
    const product: Product = {
      name: data.name,
      image: data.image,
      price: data.price,
      stock: data.stock,
      _id: data.id
    };
    this.productService.postProduct(product,).subscribe(
      (data: any) => {
        this.onSubmitEvent.emit(data);
      }
    );
    

  }

}
