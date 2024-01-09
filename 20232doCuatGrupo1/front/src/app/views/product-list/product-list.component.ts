import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{

  userData: any;
  products: any;
  categories: any;
  public page!: number;
  selectedCategory: string = '';
  nombreProducto: string = '';

  constructor(private userService: UserService, private productService: ProductService, private categoryService: CategoryService, private route: ActivatedRoute) {
  }


  
  ngOnInit(): void {
    this.userService.getUser().subscribe(data => {
      this.userData = data;
      this.nombreProducto = this.route.snapshot.paramMap.get('nombreProducto') || '';

    if (this.nombreProducto) {
      this.getProductByName();
    }
    
  }
    );
    
    
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      console.log(this.products);
    });

    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
      console.log(this.categories);
    });
  }

    selectCategory(category: any) {
      this.selectedCategory = category.name; // Almacena la categoría seleccionada
      this.getProductsByCategory(); // Llama a la función para obtener productos por categoría
    }


    getProductsByCategory() {
      this.nombreProducto = '';
      if (this.selectedCategory) {
        this.productService.getPRoductByCategory(this.selectedCategory).subscribe(data => {
          this.products = data;
        });
      }
    }
    
    getProductByName() { 
      this.nombreProducto = this.route.snapshot.paramMap.get('nombreProducto') || '';
      if (this.nombreProducto) {
        this.productService.getProductByName(this.nombreProducto).subscribe(data => {
          this.products = data;
        });
      }

      (document.getElementById('nombreProducto') as HTMLInputElement).value = '';

    }

  }


