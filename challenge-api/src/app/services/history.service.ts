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
}