import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {UserService} from "./user.service";
import {BuyService} from "./buy.service";
import {Buy} from "../models/buy";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class CarritoService {


  productosEnCarrito: any[] = [];
  private carritoSubject = new BehaviorSubject<number>(0);
  datosUsuario:any;

  constructor(private http: HttpClient) {
    const carrito = sessionStorage.getItem('carrito');
    if (carrito) {
      this.productosEnCarrito = JSON.parse(carrito);
      this.actualizarCarrito(this.productosEnCarrito.length);
    }
  }

  getCarrito() {
    return this.carritoSubject.asObservable();
  }

  actualizarCarrito(valor: number) {
    this.carritoSubject.next(valor);
  }

  agregarAlCarrito(producto: any) {
    const productoExistente = this.productosEnCarrito.find(item => item._id === producto._id);

    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      producto.cantidad = 1;
      this.productosEnCarrito.push(producto);
    }

    sessionStorage.setItem('carrito', JSON.stringify(this.productosEnCarrito));
    this.actualizarCarrito(this.productosEnCarrito.length);
    this.guardarCarritoEnSesion();
  }
  eliminarDelCarrito(producto: any) {
    const index = this.productosEnCarrito.findIndex(item => item._id === producto._id);

    if (index !== -1) {
      const productoExistente = this.productosEnCarrito[index];

      if (productoExistente.cantidad > 1) {
        productoExistente.cantidad--; // Reducir la cantidad si hay más de uno
      } else {
        this.productosEnCarrito.splice(index, 1); // Eliminar por completo si la cantidad es 1
      }

      sessionStorage.setItem('carrito', JSON.stringify(this.productosEnCarrito));
      this.actualizarCarrito(this.productosEnCarrito.length);
      this.guardarCarritoEnSesion();
    }
  }

  private guardarCarritoEnSesion() {
    sessionStorage.setItem('carrito', JSON.stringify(this.productosEnCarrito));
  }

  //vaciar carrito
  vaciarCarrito() {
    this.productosEnCarrito = [];
    sessionStorage.setItem('carrito', JSON.stringify(this.productosEnCarrito));
    this.actualizarCarrito(this.productosEnCarrito.length);
  }


}
