import { Component, OnInit } from '@angular/core';
import { ApiClimaService } from 'src/app/services/api-clima.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  datosClima: any;

  constructor(private climaService: ApiClimaService) { }

  ngOnInit(): void {
    this.climaService.obtenerDatosClima().subscribe((data) => {
      this.datosClima = data;
      console.log(data.name); 
    });
  }

}
