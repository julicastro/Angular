import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }
  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.apiUrl + '/categories/getAllCategory');
  }

}
