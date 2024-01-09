import { Component, Input} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() product: any;

  constructor(private carrito: CarritoService, private toastr: ToastrService) { }

  addToCart(product: any){
    this.toastr.success('El producto se agregó con éxito', 'Éxito');
    this.carrito.agregarAlCarrito(product);
  }
}
