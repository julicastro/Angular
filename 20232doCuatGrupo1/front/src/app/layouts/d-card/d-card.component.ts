import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarritoService } from 'src/app/services/carrito.service';


@Component({
  selector: 'd-card',
  templateUrl: './d-card.component.html',
  styleUrls: ['./d-card.component.scss']
})
export class DCardComponent {
  @Input() producto: any;

  constructor(private carrito: CarritoService, private toastr: ToastrService) { }

  addToCart(product: any){
    this.toastr.success('El producto se agregó con éxito', 'Éxito');
    this.carrito.agregarAlCarrito(product);
  }

  aumentarCantidad(producto: any) {
    this.carrito.agregarAlCarrito(producto);
  }

  disminuirCantidad(producto: any) {
    this.carrito.eliminarDelCarrito(producto);
  }

}
