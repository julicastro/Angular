import { Component, OnInit } from '@angular/core';
import { ApiClimaService } from 'src/app/services/api-clima.service';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  datosClima: any;
  filtroNombre: string = '';

  constructor(private climaService: ApiClimaService, private router: Router) {}

  ngOnInit(): void {
    this.climaService.obtenerDatosClima().subscribe((data) => {
      this.datosClima = data;
      console.log(data.name); 
    });
  }

  verHistorial(): void {
    this.router.navigate(['/history']);
  }
  
  verDetallesCiudad(id: string): void {
    this.router.navigate(['/city-details', id]);
  }


}