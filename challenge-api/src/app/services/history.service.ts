import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private historial: any[] = [];

  agregarAlHistorial(item: any): void {
    this.historial.unshift(item);
  }

  obtenerHistorial(): any[] {
    return this.historial;
  }
  
  /* se podrian agregar más funciones como la de eliminar todo el historia o un solo item */

}