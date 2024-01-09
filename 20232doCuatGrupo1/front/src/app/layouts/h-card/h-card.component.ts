import { Component, Input} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'h-card',
  templateUrl: './h-card.component.html',
  styleUrls: ['./h-card.component.scss']
})
export class HCardComponent {
  @Input() product: any;

  constructor(private carrito: CarritoService, private toastr: ToastrService) { }

  addToCart(product: any){
    this.toastr.success('El producto se agregó con éxito', 'Éxito');
    this.carrito.agregarAlCarrito(product);
  }
}
