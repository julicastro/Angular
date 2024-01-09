import { Component, OnInit } from '@angular/core';
import {UserService} from 'src/app/services/user.service';
import {ProductService} from 'src/app/services/product.service';
import {Product} from 'src/app/models/product';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  userData: any;
  products: Product[] = [];
 
  public page!: number;
  constructor(private userService: UserService,private productService: ProductService) {
  }


  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }
}

