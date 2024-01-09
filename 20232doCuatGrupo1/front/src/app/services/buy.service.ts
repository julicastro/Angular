import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject} from 'rxjs';
import { Buy } from '../models/buy';
import {Product} from "../models/product";


@Injectable({
  providedIn: 'root'
})
export class BuyService {
  private apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  getBuys(): Observable<Buy[]> {
    return this.http.get<Buy[]>(`${this.apiUrl}/buys/getAllBuy`);
  }

  getBuyById(buyId: string) {
    return this.http.get(this.apiUrl + '/buys/getBuyById/' + buyId);
  }

  getNextBuy(): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/buys/getMaxBuyNumber') ;
  }


  addBuy(buy: Buy): Observable<any> {
    return this.http.post(`${this.apiUrl}/buys/addBuy`, buy)
  }

}
