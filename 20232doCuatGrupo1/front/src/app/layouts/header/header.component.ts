import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent {
  userLogueado: any;
  badgeCarrito: number = 0;
  datosUsuario: any;
  products: any;
  nombreProducto: string = '';

  constructor(private us: UserService, private router: Router, private carrito: CarritoService, public producto: ProductService) {
    this.userLogueado = us.getUserSession();
    this.datosUsuario = us.getUser().subscribe(data => {
      if (Array.isArray(data) && data.length > 0) {
        this.datosUsuario = data[0];
      }
    })
    this.producto.getProducts().subscribe(data => {
      this.products = data;
    });
    
  }

  ngOnInit() {
    this.carrito.getCarrito().subscribe(carritoValue => {
      this.badgeCarrito = carritoValue;
    });
  }

  logOut() {
    this.us.logout();
    this.router.navigate(['/login']);
  }

 

 
}

