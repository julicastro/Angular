import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.sass']
})
export class CityDetailsComponent {

  item: any;
  horaLocal: string = "";

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.item = history.state.item;
    this.obtenerHoraLocal();
  }

  obtenerHoraLocal() {
    const horaActual = new Date();
    this.horaLocal = horaActual.toLocaleTimeString();
  }
}