import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject} from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api';
  private productAdded = new Subject<any>();

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/getAllProduct`);
  }

  getProduct(name: string) {
    return this.http.get(this.apiUrl + '/products/getProduct/{name}');
  }

  getProductById(productId: string) {
    return this.http.get(this.apiUrl + '/products/getProductById/' + productId);
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post(`${this.apiUrl}/products/add`, product)
  }

  productAdded$(): Observable<any> {
    return this.productAdded.asObservable();
  }

  getProductByName(name: string) {
    return this.http.get(this.apiUrl + '/products/getProductByName/' + name);
  }

  getPRoductByCategory(category: string) {
    return this.http.get(this.apiUrl + '/products/getProductByCategory/' + category);
  }
  uploadImage(image: File): Observable<string> {
    const formData = new FormData();
    console.log(typeof image)
    formData.append('image', image, image.name); // Agrega el nombre del archivo

    return this.http.post<string>(`${this.apiUrl}/products/uploadImage`, formData);
  }

  
}

