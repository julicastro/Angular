import { Component } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { UserService } from "../../services/user.service";
import Swal from 'sweetalert2';
import {BuyService} from "../../services/buy.service";
import {Buy} from "../../models/buy";
@Component({
  selector: 'carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent {
  productosEnCarrito: any[] = [];
  datosUsuario: any;
  nextBuy :any;


  constructor(private carritoService: CarritoService, private us: UserService, private buyService: BuyService) {
    this.productosEnCarrito = this.carritoService.productosEnCarrito;
    this.datosUsuario = us.getUser().subscribe(data => {
      if (Array.isArray(data) && data.length > 0) {
        this.datosUsuario = data[0];
      }
    })


  }

  async grabarCompra() {
    try {
      const data: any = await this.buyService.getNextBuy().toPromise();

      if (data && data.buyNumber !== undefined) {
        const buyNumber = Number(data.buyNumber) + 1;
        console.log(buyNumber);

        const buy: any = {
          buyNumber: buyNumber,
          user: this.datosUsuario,
          items: this.productosEnCarrito,
          total: this.calcularTotal(),
          quantity: this.calcularCantidadTotal(),
          date: new Date(),
        };

        console.log(buy);
        return this.buyService.addBuy(buy).toPromise();
      } else {
        console.error('Error obteniendo el próximo número de compra.');
        return Promise.reject('Error obteniendo el próximo número de compra.');
      }
    } catch (error) {
      console.error('Error al procesar la compra:', error);
      return Promise.reject('Error al procesar la compra.');
    }
  }

  confirmarCompra() {


    Swal.fire({
      title: '¿Estás seguro de realizar la compra?',
      text: "Se confirmo la compra verificar en tu lista de compra realizadas en la pagina.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar compra'
    }).then((result) => {
      if (result.isConfirmed) {
        this.grabarCompra();


        this.carritoService.vaciarCarrito();
        Swal.fire(
          '¡Compra realizada!',
          'Verifica en tu lista de compras realizadas',
          'success'
          ).then(() => {
            window.location.href = '/home';
          });
      } else {
        Swal.fire(
          'Compra cancelada',
          'Tu compra ha sido cancelada',
          'error'
        );
      }
    }).catch((error) => {
      // Manejar el error si ocurre algún problema al mostrar la alerta
      console.error('Error al confirmar la compra:', error);
    });
  }

  aumentarCantidad(producto: any) {
    this.carritoService.agregarAlCarrito(producto);
  }

  disminuirCantidad(producto: any) {
    this.carritoService.eliminarDelCarrito(producto);
  }

  calcularTotal() {
    let total = 0;
    for (const producto of this.productosEnCarrito) {
      total += producto.price * producto.cantidad;
    }
    return total;
  }

  calcularCantidadTotal() {
    let total = 0;
    for (const producto of this.productosEnCarrito) {
      total +=  producto.cantidad;
    }
    return total;
  }


}
