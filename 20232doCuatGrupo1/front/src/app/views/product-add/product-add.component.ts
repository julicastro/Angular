import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from '../../models/category';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit{
  productForm: FormGroup;
  productAdded$ = new BehaviorSubject<boolean>(false);
  categories: Category[] = [];

  constructor(private fb: FormBuilder, private ps: ProductService, private router: Router, private cs: CategoryService) {
    this.productForm = this.fb.group({
      name : ['', Validators.required],
      description: [''],
      clasification: ['', Validators.required],
      stock: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(1)]],
      image: [new File([], '')]
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      if (productData.image instanceof File) {
        console.log('productData.image', productData.image);
        this.ps.uploadImage(productData.image).subscribe(
          (imageUrl) => {
            console.log(imageUrl);
            productData.image = imageUrl;

            this.ps.addProduct(productData).subscribe(
              () => {
                this.productAdded$.next(true);
                this.router.navigate(['/product-list']);
              },
              (error) => {
                console.error('Error al agregar el producto:', error);
              }
            );
          },
          (error) => {
            console.error('Error al cargar la imagen:', error);
          }
        );
      }
    }
  }  
  
  ngOnInit() {
    this.loadCategories();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.productForm.patchValue({
      image: file
    });
    const imageControl = this.productForm.get('image');
    if (imageControl) {
      imageControl.updateValueAndValidity();
    }
  }
  

  loadCategories() {
    this.cs.getCategories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error al cargar las categorías:', error);
      }
    );
  }
  
}
