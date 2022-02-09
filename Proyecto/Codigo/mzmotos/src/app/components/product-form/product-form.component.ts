import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product, productConverter } from 'src/app/models/Product';
import { NgForm } from '@angular/forms';
import { CONSTANTS, IMAGE_URI } from 'src/lib/constants';
import { ERROR_MESSAGE_FILL_FIELDS, ERROR_TITLE, SUCCESS_MESSAGE_MODIFY, SUCCESS_TITLE } from 'src/lib/strings';
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
    _id: ""
  }

  file: File;
  imageSelected: string | ArrayBuffer;

  constructor(
    private productService: ProductService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    if (this.product) {
      this.input.name = this.product.name;
      this.input.price = this.product.price;
      this.input.stock = this.product.stock;
      this.input._id = this.product._id;
      this.imageSelected = `${CONSTANTS.API_URL}/${this.product.image}`
    }
  }

  onImageSelected(event: HTMLInputElement) {
    if (event.files && event.files[0]) {
      this.file = event.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  onChange(value: HTMLInputElement) {
    this.input = { ...this.input, [value.name]: value.value };
  }

  onSubmit(productForm: NgForm) {
    if (!this.checkCreateForm(productForm.value) && !this.product) {
      this.toast.error(ERROR_MESSAGE_FILL_FIELDS, ERROR_TITLE, {
        timeOut: 1500,
      });
      return;
    }

    if (!!this.product) {
      this.onEditData(this.input);
    } else {
      this.onCreateData(this.input);
    }
  }

  checkCreateForm(data: any) {
    return !!data.name && !!data.price && !!data.stock
  }

  onEditData(data: any) {
    try {
      const newData = productConverter.fromJSON(data);
      this.productService.putProductByID(newData._id, newData, this.file).subscribe(
        (response: any) => {
          this.onSubmitEvent.emit(response);
          this.toast.success(SUCCESS_MESSAGE_MODIFY, SUCCESS_TITLE, {
            timeOut: 1500,
          });
        }
      );
    } catch (error: any) {
      this.toast.error(ERROR_MESSAGE_FILL_FIELDS, ERROR_TITLE, {
        timeOut: 1500,
      });
    }
  }

  onCreateData(data: any) {
    try {
      const newData = productConverter.fromJSON(data);
      this.productService.postProduct(newData, this.file).subscribe(
        (response: any) => {
          this.onSubmitEvent.emit(response);
          this.toast.success(SUCCESS_MESSAGE_MODIFY, SUCCESS_TITLE, {
            timeOut: 1500,
          });
        }
      );
    } catch (error: any) {
      this.toast.error(ERROR_MESSAGE_FILL_FIELDS, ERROR_TITLE, {
        timeOut: 1500,
      });
    }
  }

}
