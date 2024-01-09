import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  producto: any;

  constructor(private route: ActivatedRoute, private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        const productId = idParam;
        this.productService.getProductById(productId).subscribe(data => {
          if (Array.isArray(data) && data.length > 0) {
            this.producto = data[0];
          } else {
            this.router.navigate(['/404']);
          }
        });
      } else {
        this.router.navigate(['/404']);
      }
    });
  }

  
}