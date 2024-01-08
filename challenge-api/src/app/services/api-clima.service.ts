import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiClimaService {
  private apiUrl = 'https://ws.smn.gob.ar/map_items/weather';

  constructor(private httpClient: HttpClient) {}

  obtenerDatosClima(): Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }
}