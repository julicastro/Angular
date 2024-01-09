import { Component, OnInit } from '@angular/core';
import { ApiClimaService } from 'src/app/services/api-clima.service';
import { Router } from '@angular/router';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  datosClima: any;
  filtroNombre: string = '';

  constructor(private climaService: ApiClimaService, private router: Router, private historyService: HistoryService) {}

  ngOnInit(): void {
    this.climaService.obtenerDatosClima().subscribe((data) => {
      this.datosClima = data;
      console.log(data.name); 
    });
  }

  verHistorial(): void {
    this.router.navigate(['/history']);
  }
  
  verDetallesCiudad(id: string, item: any): void {
    this.historyService.agregarAlHistorial(item);
    this.router.navigate(['/city-details', id]);
  }
  

}