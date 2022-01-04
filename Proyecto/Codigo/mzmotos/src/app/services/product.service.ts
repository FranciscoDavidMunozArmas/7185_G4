import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from 'src/lib/constants';
import { Product, productConverter } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(`${CONSTANTS.API_URL}/products`);
  }

  postProduct(product: Product, file: File) {
    const form: FormData = new FormData();
    form.append('name', product.name);
    form.append('imagePart', file);
    form.append('price', product.price.toString());
    form.append('stock', product.stock.toString());
    return this.http.post(`${CONSTANTS.API_URL}/products`, form);
  }

  deleteProducts() {
    return this.http.delete(`${CONSTANTS.API_URL}/products`);
  }

  getProductByID(id: string) {
    return this.http.get<Product>(`${CONSTANTS.API_URL}/products/${id}`);
  }

  putProductByID(id: string, product: Product, file?: File) {
    if(file) {
      const form: FormData = new FormData();
      form.append('name', product.name);
      form.append('imagePart', file);
      form.append('price', product.price.toString());
      form.append('stock', product.stock.toString());
      return this.http.put(`${CONSTANTS.API_URL}/products/${id}`, form);
    } else {
      return this.http.put(`${CONSTANTS.API_URL}/products/${id}`, productConverter.toJSON(product));
    }
  }

  deleteProductByID(id: string) {
    return this.http.delete(`${CONSTANTS.API_URL}/products/${id}`);
  }
}
